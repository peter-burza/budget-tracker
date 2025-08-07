import Entry from "../../components/Entry";
import List from "../../components/List";
import Summary from "../../components/Summary";
import TopNav from "../../components/TopNav";
import { useState } from "react"

enum Category {
  Salary = "Salary",
  Rent = "Rent",
  Food = "Food",
  Entertainment = "Entertainment",
  Car = "Car",
  Vacation = "Vacation",
  Home = "Home",
  Garden = "Garden",
  Date = "Date",
  Christmass = "Christmass",
  Birthdays = "Birthdays",
  Utilities = "Utilities",
  Other = "Other"
}

interface Transaction {
    readonly id: string
    ammount: number
    type: "income" | "expense"
    date: Date
    category: Category
    description?: string

}

export default function App() {
const [transactions, setTransactions] = useState<Transaction[]>([])

  return (
    <>
      <main>
        <TopNav />
        <Entry />
        <List />
        <Summary />
      </main>
      <footer>
        
      </footer>
    </>
  );
}
