import { create } from 'zustand'
import { useProfileStore } from './ProfileState';

type Rates = Record<string, number>

interface CurrencyState {
  // selectedCurrency: Currency
  rates: Rates
  // setSelectedCurrency: (item: Currency) => void
  fetchRates: () => Promise<void>
  convert: (amountInBaseCurr: number) => number
}

export const useCurrencyStore = create<CurrencyState>((set, get, selectedCurrenty) => ({
  // selectedCurrency: CURRENCIES.USD,
  rates: {USD: 1},

  // setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),

  fetchRates: async () => {
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/EUR`)
      const data = await res.json()
      console.log(data);
      
      set({ rates: data.rates })
    } catch (error) {
      console.error('Failed to fetch rates', error)
    }
  },

  convert: (amountInBaseCurr) => {
    const selectedCurrency = useProfileStore.getState().selectedCurrency; 
    const { rates } = get()
    return amountInBaseCurr * (rates[selectedCurrency.code] || 1)
  }

}))
