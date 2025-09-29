'use client'

import Entry from "../components/Entry"
import { useEffect, useState } from "react"
import { Transaction } from "../interfaces"
import TransactionHistory from "../components/TransactionHistory"
import { useAuth } from "../context/AuthContext"
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useSettingsStore } from "@/context/SettingsState"
import { useCurrencyStore } from "@/context/CurrencyState"
import { useTransactions } from "@/context/TransactionsContext"
import { areTransactionSetsEqual } from "@/utils"
import { useAppStore } from "@/context/AppStore"
import { useExpTransactionsStore } from "@/context/ExpTransactionsStore"

export default function Dashboard() {
  const { transactions, setTransactions } = useTransactions()
  const { expTransactions, setExpTransactions } = useExpTransactionsStore()
  const screenWidth = useAppStore((state) => state.screenWidth)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useAuth()

  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency)
  const fetchUserSettings = useSettingsStore((state) => state.fetchUserSettings)
  const fetchRates = useCurrencyStore((state) => state.fetchRates)


  async function saveTransaction(newTr: Transaction) {
    // Guard closes
    if (!newTr.id || !newTr?.baseAmount || isLoading) return
    if (!currentUser?.uid) {
      throw new Error("User is not authenticated")
    }

    // Save try
    try {
      setIsLoading(true)
      const trRef = doc(db, "users", currentUser?.uid, "transactions", newTr.id)
      const savingTransactionOnDb = await setDoc(trRef, {
        id: newTr.id,
        origAmount: newTr.origAmount,
        baseAmount: newTr.baseAmount,
        currency: newTr.currency,
        signature: newTr.signature,
        type: newTr.type,
        date: newTr.date,
        category: newTr.category,
        description: newTr.description || '',
        exchangeRate: newTr.exchangeRate,
        createdAt: serverTimestamp(),
      })
      setTransactions((prev) => [...prev, newTr])
      console.log('Transaction (id: ' + newTr.id + ') saved successfully')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Delete Transaction
  async function deleteTransaction(deleteTrId: string | undefined) {
    // Guard closes
    if (isLoading || deleteTrId === undefined) return
    if (!currentUser?.uid) {
      throw new Error("User is not authenticated")
    }

    // ask if user is sure to delete this transaction

    // Delete try
    try {
      setIsLoading(true)

      const transactionRef = doc(db, "users", currentUser?.uid, "transactions", deleteTrId)
      const removingTr = await deleteDoc(transactionRef)

      const updatedTransactions = transactions.filter(t => (t.id !== deleteTrId))
      setTransactions(updatedTransactions)
      console.log('Transaction (id: ' + deleteTrId + ') deleted successfully')
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchTransactions() { // this fetches all transactions
    if (!currentUser) return
    try {
      const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions')
      const snapshot = await getDocs(transactionsRef)
      const fetchedTransactions = snapshot.docs.map((doc) => {
        const tr = doc.data()
        return {
          id: tr.id,
          origAmount: tr.origAmount,
          baseAmount: tr.baseAmount,
          currency: tr.currency,
          signature: tr.signature,
          type: tr.type,
          date: tr.date,
          category: tr.category,
          description: tr.description || '',
          exchangeRate: tr.exchangeRate,
        }
      })

      if (!areTransactionSetsEqual(transactions, fetchedTransactions)) {
        setTransactions(fetchedTransactions)
        console.log('Transaction history fetched')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  async function fetchExpTransactions() { // this fetches all expecting transactions
    if (!currentUser) return
    try {
      const transactionsRef = collection(db, 'users', currentUser.uid, 'expTransactions')
      const snapshot = await getDocs(transactionsRef)
      const fetchedTransactions = snapshot.docs.map((doc) => {
        const tr = doc.data()
        return {
          id: tr.id,
          origAmount: tr.origAmount,
          baseAmount: tr.baseAmount,
          currency: tr.currency,
          signature: tr.signature,
          type: tr.type,
          payDay: tr.payDay,
          startDate: tr.startDate,
          category: tr.category,
          description: tr.description || '',
          exchangeRate: tr.exchangeRate,
        }
      })

      if (!areTransactionSetsEqual(expTransactions, fetchedTransactions)) {
        setExpTransactions(fetchedTransactions)
        console.log('Expecting Transactions fetched')
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (!currentUser) return

    async function fetchAll() {
      setIsLoading(true)
      try {
        await Promise.allSettled([
          fetchUserSettings(currentUser),
          fetchTransactions(),
          fetchExpTransactions()
        ])
      } finally {
        setIsLoading(false)
      }
    }


    fetchAll()
  }, [currentUser])

  // // Screen size
  // useEffect(() => {
  //   function handleResize() {
  //     setScreenWidth(window.innerWidth)
  //   }
  //   handleResize()
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [])

  // Fetch rates on app startup
  useEffect(() => {
    fetchRates()
  }, [fetchRates])


  return (
    <>
      <Entry
        saveTransaction={saveTransaction}
        isLoading={isLoading}
      />
      <TransactionHistory
        transactions={transactions}
        selectedCurrency={selectedCurrency}
        deleteTransaction={deleteTransaction}
        screenWidth={screenWidth}
        isLoading={isLoading}
      />
    </>
  )
}
