'use client'

import Entry from "../components/Entry";
import { useEffect, useState } from "react"
import { Transaction } from "../interfaces";
import TransactionHistory from "../components/TransactionHistory";
import { useAuth } from "../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSettingsStore } from "@/context/SettingsState";
// import { useTransactions } from "../../../context/TransactionsContext";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const { transactions, setTransactions } = useTransactions()
  const selectedCurrency = useSettingsStore((state) => state.selectedCurrency)
  const [screenWidth, setScreenWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useAuth()


  async function saveTransaction(newTr: Transaction) {
    // Guard closes
    if (!newTr.id || !newTr?.amount || isLoading) return
    if (!currentUser?.uid) {
      throw new Error("User is not authenticated");
    }

    // // Look for identical transactions
    // // when user tries to add transaction with same stats (amount, type, category, date etc.), ask him if he really want to add another identical transaction (via Modal -> yes/no button)
    // if (transactions)

    // Save try
    try {
      setIsLoading(true)
      const trRef = doc(db, "users", currentUser?.uid, "transactions", newTr.id)
      const savingTransactionOnDb = await setDoc(trRef, {
        id: newTr.id,
        amount: newTr.amount,
        type: newTr.type,
        date: newTr.date,
        category: newTr.category,
        description: newTr.description || '',
        createdAt: serverTimestamp(),
      })
      setTransactions((prev) => [...prev, newTr])
      console.log('Transaction (id: ' + newTr.id + ') saved successfully');
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
      throw new Error("User is not authenticated");
    }

    // ask if user is sure to delete this transaction

    // Delete try
    try {
      setIsLoading(true)

      const transactionRef = doc(db, "users", currentUser?.uid, "transactions", deleteTrId)
      const removingTr = await deleteDoc(transactionRef)

      const updatedTransactions = transactions.filter(t => (t.id !== deleteTrId))
      setTransactions(updatedTransactions)
      console.log('Transaction (id: ' + deleteTrId + ') deleted successfully');
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Screen size
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Transactions from db
  useEffect(() => {
    async function fetchTransactions() { // this fetches all transactions
      if (!currentUser || isLoading) return
      try {
        setIsLoading(true)
        const transactionsRef = collection(db, 'users', currentUser.uid, 'transactions')
        const snapshot = await getDocs(transactionsRef)
        const fetchedTransactions = snapshot.docs.map((doc) => {
          const tr = doc.data()

          return {
            id: tr.id,
            amount: tr.amount,
            type: tr.type,
            date: tr.date,
            category: tr.category,
            description: tr.description || ''
          }
        })
        setTransactions(fetchedTransactions)
      } catch (error: any) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTransactions()
  }, [currentUser])

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
  );
}
