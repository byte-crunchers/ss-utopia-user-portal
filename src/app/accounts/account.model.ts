export interface AccountType {
  id: string;
  interest: number;
  annualFee: number;
  foodiePoints: number;
  cashBack: number;
  lateFee: number;
}

export interface Account {
  id: number;
  userId: number;
  balance: number;
}
