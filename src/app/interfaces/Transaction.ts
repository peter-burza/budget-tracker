export enum Category {
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

export interface Transaction {
    readonly id: string
    ammount: number
    type: "income" | "expense"
    date: Date
    category: Category
    description?: string
}