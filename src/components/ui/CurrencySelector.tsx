'use client'

import { useCurrencyStore } from '@/context/CurrencyContext'
import { CURRENCIES } from '@/utils'
import React, { useEffect } from 'react'

const CurrencySelector: React.FC = () => {
    const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency)
    const setSelectedCurrency = useCurrencyStore((state) => state.setSelectedCurrency)
    const fetchRates = useCurrencyStore((state) => state.fetchRates)

    function setCurrency(selectedCurrCode: string): void {
        setSelectedCurrency(CURRENCIES[selectedCurrCode]);
    }

    useEffect(() => {
        fetchRates()
    }, [fetchRates])

    return (
        <div className="flex flex-col gap-2 w-full max-w-sm">
            <select
                id="currency_select"
                value={selectedCurrency.code}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.values(CURRENCIES).map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.code}  -  {currency.name}  -  &#91;{currency.symbol}&#93;
                    </option>
                ))}
            </select>
        </div>
    )
}

export default CurrencySelector
