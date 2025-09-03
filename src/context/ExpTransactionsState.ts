import { ExpectingTransaction } from "@/interfaces";
import { create } from "zustand";

interface ExpTransactionsSTate {
    expectingTransactions: ExpectingTransaction[]
    setExpectingTransactions: (newCurr: ExpectingTransaction[]) => void
}

export const useExpTransactionsStore = create<ExpTransactionsSTate>((set) => ({
    expectingTransactions: [],
    setExpectingTransactions: (newExpTrs: ExpectingTransaction[]) => set({ expectingTransactions: newExpTrs }),

}))