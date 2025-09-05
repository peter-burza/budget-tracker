import { ExpectingTransaction } from "@/interfaces";
import { Currency } from "@/types";
import { CURRENCIES } from "@/utils";
import { User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../../firebase";

interface SettingsState {
    baseCurrency: Currency
    setBaseCurrency: (currency: Currency) => void

    selectedCurrency: Currency
    setSelectedCurrency: (newCurr: Currency) => void
    // TODO:
    // Create some enum or something for the language too
    lang: string,
    setLanguage: (newLang: string) => void,

    setUserSettings: (baseCurr: Currency, selectedCurr: Currency, lang: string) => void
    fetchUserSettings: (currentUser: User | null) => void
    hasFetchedUserSettings: boolean
    setHasFetchedUserSettings: (val: boolean) => void
}


export const useSettingsStore = create<SettingsState>((set, get) => ({
    baseCurrency: CURRENCIES.EUR,
    setBaseCurrency: (currency) => set({ baseCurrency: currency}),

    selectedCurrency: CURRENCIES.EUR,
    setSelectedCurrency: (newCurr: Currency) => set({ selectedCurrency: newCurr }),

    lang: "en",
    setLanguage: (newLang: string) => set({ lang: newLang }),
    
    hasFetchedUserSettings: false,
    setHasFetchedUserSettings: (val) => set({ hasFetchedUserSettings: val}),

    setUserSettings: (baseCurr: Currency, selectedCurr: Currency, lang: string) => {
        const { setBaseCurrency, setSelectedCurrency, setLanguage } = get()
        setBaseCurrency(baseCurr)
        setSelectedCurrency(selectedCurr)
        setLanguage(lang)
        console.log(`Settings saved (baseCurr = ${baseCurr.code}  |  selectedCurr = ${selectedCurr.code}  |  lang = ${lang})`);
    },

      // Fetch User App Settings from db
    fetchUserSettings: async (currentUser: User | null) => { // this fetches all User App Settings
        const { setUserSettings, baseCurrency, selectedCurrency, lang, hasFetchedUserSettings, setHasFetchedUserSettings } = get()

        if (!currentUser || hasFetchedUserSettings) return
        // first check if we already have any settings set
        try {
            const userDocRef = doc(db, "users", currentUser.uid)
            // const userSnap = await getDoc(userDocRef)
            const userData = (await getDoc(userDocRef)).data()

            if (userData?.baseCurrency) {
                // User already have some settings — return them
                console.log("Settings found:", userData);
                setUserSettings(userData.baseCurrency, userData.selectedCurrency, userData.lang)
            } else {
                // db save
                await updateDoc(userDocRef, {
                baseCurrency: baseCurrency,
                selectedCurrency: selectedCurrency,
                lang: lang,
                });
                console.log(lang);
                
                // Local save
                setUserSettings(baseCurrency, selectedCurrency, lang)
                console.log("New settings saved:");
            }

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setHasFetchedUserSettings(true)
        }
    }
}))