'use client'

import Entry from "../../components/Entry";
import List from "../../components/List";
import Summary from "../../components/Summary";
import TopNav from "../../components/TopNav";
import { useState } from "react"
import { Transactions } from "./types/Transactions";

export default function App() {
  const [transactions, setTransactions] = useState<Transactions>([])

  return (
    <>
      <main className="flex flex-col gap-3 p-3">
        <TopNav />
        <hr />
        <Entry
          setTransactions={setTransactions}
        />
        <List />
        <Summary />
      </main>
      <footer>

      </footer>
    </>
  );
}
