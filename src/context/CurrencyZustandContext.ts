// store.ts
import { create } from 'zustand'
import { Currency } from "../types";
import { CURRENCIES } from '../utils';

interface GlobalState {
  selectedCurrency: Currency
  setSelectedCurrency: (item: Currency) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  selectedCurrency: CURRENCIES.USD,
  setSelectedCurrency: (item: Currency) => {
    set({ selectedCurrency: item })
    console.log(item);
    
  }
}))
