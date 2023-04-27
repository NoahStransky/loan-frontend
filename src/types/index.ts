type IForm = {
  name: string;
  establishedYear: string;
  yearEstablished: string;
  loanAmount: string;
  accountingProvider: string;
};
enum IResult {
  approved = 'Approved',
  rejected = 'Rejected',
}

type AccoutingProvider = {
  name: string;
  id: number;
};
type BalanceSheet = {
  year: string;
  month: string;
  profitOrLoss: number;
  assetsValues: number;
};
type DecisionType = {
  loanAmount: number;
  name: string;
  yearEstablished: string;
  balanceSheet: BalanceSheet[];
};
export type { IForm, IResult, AccoutingProvider, BalanceSheet, DecisionType };
