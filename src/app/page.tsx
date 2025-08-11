'use client'

import Entry from "../../components/Entry";
import List from "../../components/List";
import Summary from "../../components/Summary";
import TopNav from "../../components/TopNav";
import { useEffect, useState } from "react"
import { Transactions } from "./types/Transactions";
import { JSX } from "@emotion/react/jsx-runtime";

export default function App() {
  const [transactions, setTransactions] = useState<Transactions>([])
  const [currency, setCurrency] = useState<JSX.Element>(<i className="fa-solid fa-euro-sign text-base"></i>) // <i class="fa-solid fa-dollar-sign text-xl"></i>

  return (
    <>
      <main className="flex flex-col gap-3 p-3">
        <TopNav />
        <hr />
        <Entry
          setTransactions={setTransactions}
        />
        <List currency={currency} />
        <Summary />
      </main>
      <footer>

      </footer>
    </>
  );
}
