import { ExpectingTransaction } from "@/interfaces";
import { Currency } from "@/types";
import { CURRENCIES } from "@/utils";
import { create } from "zustand";

interface SettingsState {
    baseCurrency: Currency
    selectedCurrency: Currency
    setBaseCurrency: (currency: Currency) => void
    setSelectedCurrency: (newCurr: Currency) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
    baseCurrency: CURRENCIES.EUR,
    setBaseCurrency: (currency) => set({ baseCurrency: currency}),

    selectedCurrency: CURRENCIES.EUR,
    setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),
}))