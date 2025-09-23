import { ExpectingTransaction } from "@/interfaces";
import { create } from "zustand";

interface ExpTransactionsState {
  expTransactions: ExpectingTransaction[];
  setExpTransactions: (
    updater: ExpectingTransaction[] | ((prev: ExpectingTransaction[]) => ExpectingTransaction[])
  ) => void;
}

export const useExpTransactionsStore = create<ExpTransactionsState>((set) => ({
  expTransactions: [],
  setExpTransactions: (updater) =>
    set((state) => ({
      expTransactions:
        typeof updater === 'function' ? updater(state.expTransactions) : updater,
    })),
}));
