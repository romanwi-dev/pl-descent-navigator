import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const OCRReviewDashboard = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("all");

  const { data: documents, isLoading } = useQuery({
    queryKey: ["ocr-documents", statusFilter, confidenceFilter],
    queryFn: async () => {
      let query = supabase
        .from("documents")
        .select("*")
        .not("ocr_status", "is", null);

      if (statusFilter !== "all") {
        query = query.eq("ocr_status", statusFilter);
      }

      if (confidenceFilter === "high") {
        query = query.gte("ocr_confidence", 0.9);
      } else if (confidenceFilter === "medium") {
        query = query.gte("ocr_confidence", 0.75).lt("ocr_confidence", 0.9);
      } else if (confidenceFilter === "low") {
        query = query.lt("ocr_confidence", 0.75);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from("documents")
        .update({
          ocr_status: "completed",
          ocr_reviewed_by: user?.id,
          ocr_reviewed_at: new Date().toISOString(),
        })
        .eq("id", documentId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("OCR results approved");
      queryClient.invalidateQueries({ queryKey: ["ocr-documents"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const { error } = await supabase
        .from("documents")
        .update({ ocr_status: "needs_review" })
        .eq("id", documentId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.warning("Marked for re-review");
      queryClient.invalidateQueries({ queryKey: ["ocr-documents"] });
    },
  });

  const rescanMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const { error } = await supabase
        .from("documents")
        .update({ ocr_status: "pending" })
        .eq("id", documentId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.info("Reset for re-scanning");
      queryClient.invalidateQueries({ queryKey: ["ocr-documents"] });
    },
  });

  const getConfidenceBadge = (confidence: number | null) => {
    if (!confidence) return <Badge variant="outline">N/A</Badge>;
    if (confidence >= 0.9) return <Badge className="bg-green-500">Excellent</Badge>;
    if (confidence >= 0.75) return <Badge className="bg-yellow-500">Good</Badge>;
    return <Badge className="bg-red-500">Review Needed</Badge>;
  };

  const getStatusBadge = (status: string | null) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-gray-500" },
      processing: { label: "Processing", className: "bg-blue-500" },
      completed: { label: "Completed", className: "bg-green-500" },
      failed: { label: "Failed", className: "bg-red-500" },
      needs_review: { label: "Needs Review", className: "bg-orange-500" },
    };

    const config = statusMap[status || "pending"];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (isLoading) {
    return <div>Loading OCR review dashboard...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OCR Review Dashboard</CardTitle>
        <CardDescription>
          Review and approve OCR-processed documents
        </CardDescription>
        <div className="flex gap-4 mt-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="needs_review">Needs Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Confidence</SelectItem>
              <SelectItem value="high">High (90%+)</SelectItem>
              <SelectItem value="medium">Medium (75-89%)</SelectItem>
              <SelectItem value="low">Low (&lt;75%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents?.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Type: {doc.document_type || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getConfidenceBadge(doc.ocr_confidence)}
                  {getStatusBadge(doc.ocr_status)}
                </div>
              </div>

              {doc.ocr_text && (
                <div className="text-sm bg-muted p-3 rounded max-h-32 overflow-y-auto">
                  {doc.ocr_text.substring(0, 300)}
                  {doc.ocr_text.length > 300 && "..."}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => approveMutation.mutate(doc.id)}
                  disabled={approveMutation.isPending}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => rejectMutation.mutate(doc.id)}
                  disabled={rejectMutation.isPending}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Needs Review
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => rescanMutation.mutate(doc.id)}
                  disabled={rescanMutation.isPending}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Re-scan
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                >
                  <a href={`/admin/cases/${doc.case_id}`}>
                    <Eye className="w-4 h-4 mr-1" />
                    View Case
                  </a>
                </Button>
              </div>
            </div>
          ))}

          {documents?.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No documents match the current filters
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
