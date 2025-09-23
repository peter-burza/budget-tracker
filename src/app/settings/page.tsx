'use client'

import AddExpectingTransaction from "@/components/AddExpectingTransaction"
import CurrencySelector from "@/components/ui/CurrencySelector"
import { ExpectingTransaction } from "@/interfaces"
import { useState } from "react"

interface SettingsPageProps {

}

const SettingsPage: React.FC<SettingsPageProps> = () => {
    const [showAddExpectingTR, setShowAddExpectingTR] = useState<boolean>(true)

    return (
        <>
            <div id="settings" className="base-container">
                <h3>App Settings</h3>

                <div className="flex flex-col gap-1 max-w-[232px] w-full">
                    <p>Select Currency:</p>
                    <CurrencySelector />
                </div>

                <hr className="text-[var(--color-dark-blue)] w-[85%] mb-3 mt-4" />

                <div id="add-expecting-transaction">
                    {
                        showAddExpectingTR
                            ?
                            <AddExpectingTransaction />
                            :
                            <div>

                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SettingsPage