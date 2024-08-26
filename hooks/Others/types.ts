export type IPUProps = {
  category: string;
  businessName: string;
  entity: string;
  cacRegDetails: string;
  description: string;
  industry: string;
  website: string;
  deflationNumber: string;
  businessEmail: string;
  businessAddress: string;
  promoterFullName: string;
  promoterphoneNumber: string;
  promoterEmail: string;
  promoterBVN: string;
  promoterNIN: string;
};

export type CPUProps = {
  category: string;
  firstName: string;
  lastName: string;
  businessName: string;
  NIN: string;
  bvn: string;
  email: string;
  address: string;
  nextofkinFullName: string;
  nextofkinPhoneNumber: string;
  nextofkinEmail: string;
  nextofkinAddress: string;
  nextofkinOccupation: string;
  nextofkinRelationship: string;
};

export type ResourceProps = {
  category: string;
  description: string;
  makeType: string;
  totalQuantity: string;
  pricePerKG: string;
  quantityAvailable: string;
  quantityDisbursement: string;
  yieldExpectation: string;
  beneficiary: string;
};

export type AgentProps = {
  industry: string;
  name: string;
  location: string;
  entity: string;
};
