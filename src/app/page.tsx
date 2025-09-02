'use client'

import Entry from "../../components/Entry";
// import TopNav from "../../../components/TopNav";
import { useEffect, useState } from "react"
// import { FAKE_TRANSACTIONS } from "./utils";
import { Transaction } from "./interfaces/Transaction";
import TransactionHistory from "../../components/TransactionHistory";
// import Footer from "../../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Currency } from "./types";
import { CURRENCIES } from "./utils";
// import { useTransactions } from "../../../context/TransactionsContext";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const { transactions, setTransactions } = useTransactions()
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES.EUR)
  const [screenWidth, setScreenWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useAuth()


  async function saveTransaction(newTr: Transaction) {
    // Guard closes
    if (!newTr?.amount || isLoading) return
    if (!currentUser?.uid) {
      throw new Error("User is not authenticated");
    }

    // // Look for identical transactions
    // // when user tries to add transaction with same stats (amount, type, category, date etc.), ask him if he really want to add another identical transaction (via Modal -> yes/no button)
    // if (transactions)

    // Save try
    try {
      setIsLoading(true)
      const newId = crypto.randomUUID()
      const trRef = doc(db, "users", currentUser?.uid, "transactions", newId)
      const savingTransactionOnDb = await setDoc(trRef, {
        id: newId,
        amount: newTr.amount,
        type: newTr.type,
        date: newTr.date,
        category: newTr.category,
        description: newTr.description || '',
        createdAt: serverTimestamp(),
      })
      setTransactions((prev) => [...prev, newTr])
      console.log('Transaction (id: ' + newId + ') saved successfully');
    } catch (error: any) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }


  // function deleteTransaction(transaction: Transaction): void {
  // const updatedTransactions = transactions.filter(t => (t.id !== transaction.id))
  // setTransactions(updatedTransactions)
  // }


  // const deleteTr = (transactionId: string) => {
  //   const transactionRef = doc(db, "transactions", transactionId)
  //   return
  // }


  async function deleteTransaction(deleteTrId: string) {
    // Guard closes
    if (isLoading) return
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

      <main className="flex flex-col gap-3 p-3">
        <Entry
          saveTransaction={saveTransaction}
          // savingNewTr={isSavingNewTr}
          isLoading={isLoading}
        />
        <TransactionHistory
          transactions={transactions}
          selectedCurrency={selectedCurrency}
          deleteTransaction={deleteTransaction}
          screenWidth={screenWidth}
          isLoading={isLoading}
        />
      </main>

    </>
  );
}
