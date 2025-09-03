'use client'

import { useCurrencyStore } from '@/context/CurrencyState'
import { useProfileStore } from '@/context/ProfileState'
import { CURRENCIES } from '@/utils'
import React, { useEffect } from 'react'

const CurrencySelector: React.FC = () => {
    const selectedCurrency = useProfileStore((state) => state.selectedCurrency)
    const setSelectedCurrency = useProfileStore((state) => state.setSelectedCurrency)
    const fetchRates = useCurrencyStore((state) => state.fetchRates)

    function setCurrency(selectedCurrCode: string): void {
        setSelectedCurrency(CURRENCIES[selectedCurrCode]);
    }

    useEffect(() => {
        fetchRates()
    }, [fetchRates])

    return (
        <select
            id="currency_select"
            value={selectedCurrency.code}
            onChange={(e) => setCurrency(e.target.value)}
        >
            {Object.values(CURRENCIES).map((currency) => (
                <option key={currency.code} value={currency.code}>
                    {currency.code}  -  {currency.name}  -  &#91;{currency.symbol}&#93;
                </option>
            ))}
        </select>
    )
}

export default CurrencySelector
