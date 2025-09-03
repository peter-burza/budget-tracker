// store.ts
import { create } from 'zustand'
import { Currency } from "../types";
import { CURRENCIES } from '../utils';

type Rates = Record<string, number>

interface CurrencyState {
  selectedCurrency: Currency
  rates: Rates
  setSelectedCurrency: (item: Currency) => void
  fetchRates: () => Promise<void>
  convert: (amountInEur: number) => number
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  selectedCurrency: CURRENCIES.EUR,
  rates: {USD: 1},

  setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),

  fetchRates: async () => {
    try {
      const res = await fetch(`https://v6.exchangerate-api.com/v6/a871058e46ac4dddd7291b00/latest/EUR`)
      const data = await res.json()
      console.log(data);
      
      set({ rates: data.conversion_rates })
    } catch (error) {
      console.error('Failed to fetch rates', error)
    }
  },

  convert: (amountInEUR) => {
    const { selectedCurrency, rates } = get()
    // console.log(rates + ' ' + rates[selectedCurrency.code]);
    
    return amountInEUR * (rates[selectedCurrency.code] || 1)
  }

}))
