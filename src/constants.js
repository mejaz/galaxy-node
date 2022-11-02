
const SALARY_CERTIFICATE = "Salary Certificate"
const SALARY_TRANSFER_CERTIFICATE = "Salary Transfer Certificate"
const EXPERIENCE_LETTER = "Experience Letter"

const SALARY_CERTIFICATE_SHORT = "SC"
const SALARY_TRANSFER_CERTIFICATE_SHORT = "STC"
const EXPERIENCE_LETTER_SHORT = "EL"

const CERTIFICATES_OBJ = {
  [SALARY_CERTIFICATE_SHORT]: SALARY_CERTIFICATE,
  [SALARY_TRANSFER_CERTIFICATE_SHORT]: SALARY_TRANSFER_CERTIFICATE,
  [EXPERIENCE_LETTER_SHORT]: EXPERIENCE_LETTER,
}

const CERTIFICATES_SHORT_OBJ = {
  [SALARY_CERTIFICATE]: SALARY_CERTIFICATE_SHORT,
  [SALARY_TRANSFER_CERTIFICATE]: SALARY_TRANSFER_CERTIFICATE_SHORT,
  [EXPERIENCE_LETTER]: EXPERIENCE_LETTER_SHORT,
}

module.exports = {
  CERTIFICATES_OBJ,
  SALARY_CERTIFICATE_SHORT,
  SALARY_TRANSFER_CERTIFICATE_SHORT,
  EXPERIENCE_LETTER_SHORT,
  SALARY_CERTIFICATE,
  SALARY_TRANSFER_CERTIFICATE,
  EXPERIENCE_LETTER,
  CERTIFICATES_SHORT_OBJ
}