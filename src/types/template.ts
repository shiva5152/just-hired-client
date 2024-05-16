export interface Price {
  duration: string;
  amount: number;
  currency: {
    abbreviation: string;
    name: string;
    symbol: string;
  };
}

export interface EmpOffering {
  isCandidateSearchLimited: boolean;
  jobPostLimit: number;
  aiTokenLimit: number;
  isChatApplicable: boolean;
  isRequestApplicable: boolean;
}

export interface IEmployerSub {
  _id: string;
  subscriptionType: string;
  subscriptionFor: string;
  price: Price[];
  offering: EmpOffering;
}

export interface CanOffering {
  isFeedBackLimit: boolean;
  jobApplicationLimit: number;
  aiTokenLimit: number;
  isSaveApplicable: boolean;
  isFullCompanyView: boolean;
}

export interface ICandidateSub {
  _id: string;
  subscriptionType: string;
  subscriptionFor: string;
  price: Price[];
  offering: CanOffering;
}
