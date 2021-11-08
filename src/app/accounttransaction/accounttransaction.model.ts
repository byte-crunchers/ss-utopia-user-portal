export interface Transaction {
  id: number;
  date: string;
  memo: string;
  value: number;
  balance: number;
}

export interface Transactions {
  id: number;
  date: string;
  memo: string;
  value: string;
}
