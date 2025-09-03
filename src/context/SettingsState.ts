import { ExpectingTransaction } from "@/interfaces";
import { Currency } from "@/types";
import { CURRENCIES } from "@/utils";
import { create } from "zustand";

interface SettingsState {
    baseCurrency: Currency
    selectedCurrency: Currency
    setBaseCurrency: (currency: Currency) => void
    setSelectedCurrency: (newCurr: Currency) => void
    expectingTransactions: ExpectingTransaction[]
}

export const useSettingsStore = create<SettingsState>((set) => ({
    baseCurrency: CURRENCIES.EUR,
    selectedCurrency: CURRENCIES.EUR,
    expectingTransactions: [],

    setBaseCurrency: (currency) => set({ baseCurrency: currency}),
    setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),
}))