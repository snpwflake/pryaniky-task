export type ISO =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export interface UserDocs {
  id: string;
  companySigDate: ISO;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: ISO;
  employeeSignatureName: string;
}
