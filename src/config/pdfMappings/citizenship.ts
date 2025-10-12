/**
 * PDF Field Mappings for Citizenship (OBY) Template
 * Maps database columns from master_table to PDF form field names
 * 12-page Polish citizenship application form (Pages 1-11 mapped, Page 12 is informational)
 * 
 * COMPLETE MAPPING - ~100 fields covering all legally required data
 */

export const CITIZENSHIP_PDF_MAP: Record<string, string> = {
  // ========== HEADER & ADMIN FIELDS ==========
  'wojewoda': 'voivodeship',
  'decyzja': 'decision_type',
  'posiadanie1': 'citizenship_possession_info',
  'cel_ubiegania': 'application_purpose',
  'nazwa_organu': 'authority_name',
  'r_w_obyw_dziec': 'residence_citizenship_info',
  
  // Submission date & location
  'dzien_zloz': 'application_submission_date.day',
  'miesiac_zloz': 'application_submission_date.month',
  'rok_zloz': 'application_submission_date.year',
  'miejscowosc_zl': 'submission_location',
  
  // ========== APPLICANT SECTION ==========
  // Name fields
  'imie_wniosko': 'applicant_first_name',
  'nazwisko_wniosko': 'applicant_last_name',
  'nazwisko_rodowe_wniosko': 'applicant_maiden_name',
  'imie_nazwisko_wniosko': 'applicant_first_name|applicant_last_name',
  'imie_nazwisko_wniosko_cd': 'applicant_first_name|applicant_last_name',
  
  // Birth info
  'dzien_uro': 'applicant_dob.day',
  'miesiac_uro': 'applicant_dob.month',
  'rok_uro': 'applicant_dob.year',
  'miejsce_uro': 'applicant_pob',
  
  // Personal details
  'plec': 'applicant_sex',
  'stan_cywilny': 'applicant_is_married',
  'nr_pesel': 'applicant_pesel',
  
  // Address
  'miasto_zam': 'applicant_address.city',
  'miejscowosc_zamieszkania': 'applicant_address.city',
  'kod_pocztowy': 'applicant_address.postal_code',
  'kraj_zam': 'applicant_address.country',
  'nr_domu': 'applicant_address.house_number',
  'nr_mieszkania': 'applicant_address.apartment_number',
  
  // Contact
  'telefon': 'applicant_phone',
  
  // Citizenship & name history
  'obce_obywatelstwa': 'applicant_other_citizenships',
  'obce_obywatelstwa_cd1': 'applicant_other_citizenships',
  'obce_obywatelstwa_cd2': 'applicant_other_citizenships',
  'uzywane_nazwiska': 'applicant_previous_names',
  'uzywane_nazwiska_cd': 'applicant_previous_names',
  
  // Previous decisions
  'wydana_decyzja': 'previous_decision_info',
  'zezwolenie_na_zmiane_obyw': 'citizenship_change_permission',
  'pozbawienie_obywatelstwa_polskiego': 'polish_citizenship_deprivation',
  'miejsce_zamieszk_pl_granica': 'residence_citizenship_info',
  
  // Additional applicant fields
  'imie_nazw_3': 'applicant_first_name',
  'imie_nazw_4': 'applicant_last_name',
  
  // ========== MOTHER SECTION ==========
  // Name fields
  'nazwisko_matki': 'mother_last_name',
  'nazwisko_rodowe_matki': 'mother_maiden_name',
  'imie_matki': 'mother_first_name',
  'imie_nazwisko_rodowe_matki': 'mother_first_name|mother_maiden_name',
  
  // Mother's parents
  'imie_nazwisko_ojca_matki': 'mgf_first_name|mgf_last_name',
  'imie_nazw_rod_matki_matki': 'mgm_first_name|mgm_maiden_name',
  
  // Birth info
  'dzien_uro_matki': 'mother_dob.day',
  'miesiac_uro_matki': 'mother_dob.month',
  'rok_uro_matki': 'mother_dob.year',
  'miejsce_uro_matki': 'mother_pob',
  
  // Additional mother info
  'stan_cywilny_matki': 'mother_marital_status',
  'pesel_matki': 'mother_pesel',
  'uzywane_nazwiska_matki': 'mother_previous_names',
  
  // Mother's marriage
  'dzien_zaw_zwiazku_matki': 'mother_marriage_date.day',
  'miesiac_zaw_zwiazku_matki': 'mother_marriage_date.month',
  'rok_zaw_zwiazku_matki': 'mother_marriage_date.year',
  'miejsce_zaw_zwiazku_matki': 'father_mother_marriage_place',
  
  // ========== FATHER SECTION ==========
  // Name fields
  'nazwisko_ojca': 'father_last_name',
  'nazwisko_rodowe_ojca': 'father_maiden_name',
  'imie_ojca': 'father_first_name',
  'imie_nazwisko_ojca': 'father_first_name|father_last_name',
  
  // Father's parents
  'imie_nazwisko_ojca_ojca': 'pgf_first_name|pgf_last_name',
  'imie_nazw_rod_matki_ojca': 'pgm_first_name|pgm_maiden_name',
  
  // Birth info
  'dzien_uro_ojca': 'father_dob.day',
  'miesiac_uro_ojca': 'father_dob.month',
  'rok_uro_ojca': 'father_dob.year',
  'miejsce_uro_ojca': 'father_pob',
  
  // Additional father info
  'stan_cywilny_ojca': 'father_marital_status',
  'pesel_ojca': 'father_pesel',
  'uzywane_nazwiska_ojca': 'father_previous_names',
  
  // Father's marriage
  'dzien_zaw_zwiazku_ojca': 'father_marriage_date.day',
  'miesiac_zaw_zwiazku_ojca': 'father_marriage_date.month',
  'rok_zaw_zwiazku_ojca': 'father_marriage_date.year',
  'miejsce_zaw_zwiazku_ojca': 'father_mother_marriage_place',
  
  // ========== MATERNAL GRANDFATHER (MGF) ==========
  'nazwisko_dziadka_m': 'mgf_last_name',
  'nazwisko_rodowe_dziadka_m': 'mgf_maiden_name',
  'imie_dziadka_m': 'mgf_first_name',
  
  // MGF's parents (great-grandparents)
  'imie_nazw_pradziadek_d_m': 'mggf_first_name|mggf_last_name',
  'imie_nazw_prababka_d_m': 'mggm_first_name|mggm_maiden_name',
  
  // MGF birth info
  'dzien_uro_dziadka_m': 'mgf_dob.day',
  'miesiac_uro_dziadka_m': 'mgf_dob.month',
  'rok_uro_dziadka_m': 'mgf_dob.year',
  'miejsce_uro_dziadka_m': 'mgf_pob',
  'pesel_dziadka_m': 'mgf_pesel',
  
  // Citizenship at applicant's birth
  'posiadane_obywatel_matki_uro_wniosko': 'mgf_citizenship_at_birth',
  'posiadane_obywatel_matki_uro_wniosko_cd': 'mgf_citizenship_at_birth',
  
  // ========== MATERNAL GRANDMOTHER (MGM) ==========
  'nazwisko_babki_m': 'mgm_last_name',
  'nazwisko_rodowe_babki_m': 'mgm_maiden_name',
  'imie_babki_m': 'mgm_first_name',
  
  // MGM's parents (great-grandparents)
  'imie_nazw_pradziadek_b_m': 'mggf_first_name|mggf_last_name',
  'imie_nazw_rod_prababka_b_m': 'mggm_first_name|mggm_maiden_name',
  
  // MGM birth info
  'dzien_uro_babki_m': 'mgm_dob.day',
  'miesiac_uro_babki_m': 'mgm_dob.month',
  'rok_uro_babki_m': 'mgm_dob.year',
  'miejsce_uro_babki_m': 'mgm_pob',
  'pesel_babki_m': 'mgm_pesel',
  
  // ========== PATERNAL GRANDFATHER (PGF) ==========
  'nazwisko_dziadka_o': 'pgf_last_name',
  'nazwisko_rodowe_dziadka_o': 'pgf_maiden_name',
  'imie_dziadka_o': 'pgf_first_name',
  
  // PGF's parents (great-grandparents)
  'imie_nazw_pradziadek_d_o': 'pggf_first_name|pggf_last_name',
  'imie_nazw_rod_prababka_d_o': 'pggm_first_name|pggm_maiden_name',
  
  // PGF birth info
  'dzien_uro_dziadka_o': 'pgf_dob.day',
  'miesiac_uro_dziadka_o': 'pgf_dob.month',
  'rok_uro_dziadka_o': 'pgf_dob.year',
  'miejsce_uro_dziadka_o': 'pgf_pob',
  'pesel_dziadka_o': 'pgf_pesel',
  
  // Citizenship at applicant's birth
  'posiadane_obywatel_ojca_uro_wniosko': 'pgf_citizenship_at_birth',
  'posiadane_obywatel_ojca_uro_wniosko_cd': 'pgf_citizenship_at_birth',
  
  // ========== PATERNAL GRANDMOTHER (PGM) ==========
  'nazwisko_babki_o': 'pgm_last_name',
  'nazwisko_rodowe_babki_o': 'pgm_maiden_name',
  'imie_babki_o': 'pgm_first_name',
  
  // PGM's parents (great-grandparents)
  'imie_nazw_pradziadek_b_o': 'pggf_first_name|pggf_last_name',
  'imie_nazw_rod_prababka_b_o': 'pggm_first_name|pggm_maiden_name',
  
  // PGM birth info
  'dzien_uro_babki_o': 'pgm_dob.day',
  'miesiac_uro_babki_o': 'pgm_dob.month',
  'rok_uro_babki_o': 'pgm_dob.year',
  'miejsce_uro_babki_o': 'pgm_pob',
  'pesel_babki_o': 'pgm_pesel',
  
  // ========== PAGE 11 - ATTACHMENTS (CRITICAL) ==========
  'zal1': 'attachment_1_included',
  'zal2': 'attachment_2_included',
  'zal3': 'attachment_3_included',
  'zal4': 'attachment_4_included',
  'zal5': 'attachment_5_included',
  'zal6': 'attachment_6_included',
  'zal7': 'attachment_7_included',
  'zal8': 'attachment_8_included',
  'zal9': 'attachment_9_included',
  'zal10': 'attachment_10_included',
  
  // Additional page 11 fields
  'polskie_dok_wstepnych': 'polish_preliminary_docs_info',
  'istotne_info': 'important_additional_info',
  'decyzja_rodzenstwo': 'sibling_decision_info',
};

export const CITIZENSHIP_REQUIRED_FIELDS = [
  'applicant_first_name',
  'applicant_last_name',
  'applicant_dob',
  'applicant_pob',
  'applicant_sex',
  'father_first_name',
  'father_last_name',
  'mother_first_name',
  'mother_last_name',
  'mother_maiden_name',
  'voivodeship',
];
