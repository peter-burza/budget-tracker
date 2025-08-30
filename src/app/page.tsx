'use client'

import Entry from "../../components/Entry";
import TopNav from "../../components/TopNav";
import { useEffect, useState } from "react"
import { JSX } from "@emotion/react/jsx-runtime";
// import { FAKE_TRANSACTIONS } from "./utils";
import { Transaction } from "./interfaces/Transaction";
import TransactionHistory from "../../components/TransactionHistory";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Currency } from "./types";
import { CURRENCIES } from "./utils";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  // const [selectedCurrency, setSelectedCurrency] = useState<JSX.Element>(<i className="fa-solid fa-euro-sign text-base"></i>) // <i class="fa-solid fa-dollar-sign text-xl"></i>
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES.EUR)
  const [screenWidth, setScreenWidth] = useState(0);
  // const [isSavingNewTr, setIsSavingNewTr] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useAuth()

  // function saveTransaction(transaction: Transaction) {
  //   setTransactions((prev) => [...prev, transaction])
  // }

  function deleteTransaction(transaction: Transaction): void {
    const updatedTransactions = transactions.filter(t => (t.id !== transaction.id))
    setTransactions(updatedTransactions)
  }

  async function handleSaveNewTr(newTr: Transaction) {
    // Guard closes
    if (!newTr?.amount || isLoading) return
    if (!currentUser?.uid) {
      throw new Error("User is not authenticated");
    }

    // // Look for identical transactions
    // if (transactions)

    // Saving try
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
      <header className="flex flex-col gap-3 p-3 pb-0">
        <TopNav
          setTransactions={setTransactions}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      </header>
      <main className="flex flex-col gap-3 p-3">
        <Entry
          saveTransaction={handleSaveNewTr}
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
      <footer>
        <Footer />
      </footer>
    </>
  );
}
