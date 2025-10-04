import { config } from "@/services/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

interface AccountPayload {
  name: string;
  currency: string;
}

interface TransactionPayload {
  account: string;
  type: "income" | "expense";
  amount: number;
  description: string;
}

interface Transaction {
  _id: string;
  account: string;
  type: string;
  amount: number;
  description: string;
  walletname: string;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  _id: string;
  name: string;
  currency: string;
  balance: number;
  user: string;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

class Services {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.API_KEY,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  Accounts = {
    getAll: async (): Promise<Account[]> => {
      const res = await this.api.get("/accounts");
      return res.data;
    },
    getById: async (id: string): Promise<Account> => {
      const res = await this.api.get(`/accounts/${id}`);
      return res.data;
    },
    create: async (payload: AccountPayload): Promise<Account> => {
      const res = await this.api.post("/accounts", payload);
      return res.data.account;
    },
    getAccountsWithTransactions: async (userId: string): Promise<Account[]> => {
      const res = await this.api.get(`/accounts/user/${userId}`);
      return res.data;
    },
  };

  Transactions = {
    getByAccount: async (accountId: string): Promise<Transaction[]> => {
      const res = await this.api.get(`/transactions/${accountId}`);
      return res.data.transactions || [];
    },
    create: async (payload: TransactionPayload): Promise<Transaction> => {
      const res = await this.api.post("/transactions", payload);
      return res.data.transaction;
    },
  };

  Auth = {
    saveToken: async (token: string) => {
      await AsyncStorage.setItem("token", token);
    },
    logout: async () => {
      await AsyncStorage.removeItem("token");
    },
  };
}

const services = new Services();
export default services;
