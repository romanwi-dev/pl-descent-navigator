export interface POAField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export interface POAFormConfig {
  title: string;
  pdfType: string;
  fields: POAField[];
}

export const poaFormConfigs: Record<string, POAFormConfig> = {
  adult: {
    title: "POA Adult",
    pdfType: "poa-adult",
    fields: [
      { name: "applicant_first_name", label: "Applicant given names / Imię/ imiona" },
      { name: "applicant_last_name", label: "Applicant full last name / Nazwisko" },
      { name: "applicant_passport_number", label: "ID/ passport number / Nr dokumentu tożsamości" },
    ]
  },
  minor: {
    title: "POA Minor",
    pdfType: "poa-minor",
    fields: [
      { name: "applicant_first_name", label: "Parent given names / Imię/ imiona rodzica" },
      { name: "father_last_name", label: "Parent full last name / Nazwisko rodzica" },
      { name: "applicant_passport_number", label: "Parent ID/ passport number / Nr dokumentu tożsamości" },
      { name: "child_1_first_name", label: "Child given names / Imię/ imiona dziecka" },
      { name: "child_1_last_name", label: "Child full last name / Nazwisko dziecka" },
    ]
  },
  spouses: {
    title: "POA Spouses",
    pdfType: "poa-spouses",
    fields: [
      { name: "applicant_first_name", label: "Husband given names / Imię/imiona męża" },
      { name: "father_last_name", label: "Husband full last name / Nazwisko męża" },
      { name: "applicant_passport_number", label: "Husband ID/passport number / Nr dokumentu tożsamości męża" },
      { name: "spouse_first_name", label: "Wife given names / Imię/imiona żony" },
      { name: "spouse_last_name", label: "Wife full last name / Nazwisko żony" },
      { name: "spouse_passport_number", label: "Wife ID/passport number / Nr dokumentu tożsamości żony" },
      { name: "spouse_last_name_after_marriage", label: "Wife's full last name after marriage / Nazwisko żony po zawarciu małżeństwa" },
      { name: "child_1_last_name", label: "Children's full last name(s) / Nazwisko/a dzieci" },
    ]
  }
};
