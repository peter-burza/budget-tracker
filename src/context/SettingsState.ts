import { ExpectingTransaction } from "@/interfaces";
import { Currency } from "@/types";
import { CURRENCIES } from "@/utils";
import { create } from "zustand";

interface SettingsState {
    baseCurrency: Currency
    setBaseCurrency: (currency: Currency) => void

    selectedCurrency: Currency
    setSelectedCurrency: (newCurr: Currency) => void
    // TODO:
    // Create some enum or something for the language too
    language: string,
    setLanguage: (newLang: string) => void,
}

console.log(CURRENCIES.EUR);


export const useSettingsStore = create<SettingsState>((set) => ({
    baseCurrency: CURRENCIES.EUR,
    setBaseCurrency: (currency) => set({ baseCurrency: currency}),

    selectedCurrency: CURRENCIES.EUR,
    setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),

    language: "en",
    setLanguage: (newLang: string) => set({ language: newLang }),
}))