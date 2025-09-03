import CurrencySelector from "@/components/ui/CurrencySelector"

interface SettingsPageProps {

}

const SettingsPage: React.FC<SettingsPageProps> = () => {

    return (
        <div id="settings" className="base-container">
            <h3>App Settings</h3>

            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Select Currency:</p>
                <CurrencySelector />
            </div>

            <div className="flex flex-col gap-1 max-w-[232px] w-full">
                <p>Manage monthly expecting transactions</p>
                <CurrencySelector />
            </div>

        </div>
    )
}

export default SettingsPage