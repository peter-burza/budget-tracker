import { Currency } from "@/types";
import { CURRENCIES } from "@/utils";
import { create } from "zustand";

interface ProfileState {
    baseCurrency: Currency
    selectedCurrency: Currency
    setBaseCurrency: (currency: Currency) => void
    setSelectedCurrency: (newCurr: Currency) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
    baseCurrency: CURRENCIES.EUR,
    selectedCurrency: CURRENCIES.EUR,

    setBaseCurrency: (currency) => set({ baseCurrency: currency}),
    setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),
}))