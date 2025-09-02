import { JSX } from '@emotion/react/jsx-runtime'

export enum Category {
  Salary = 'Salary',
  Rent = 'Rent',
  Groceries = 'Groceries',
  Food = 'Food',
  InternetPhone = 'Internet & Phone',
  HealthInsurance = 'Health Insurance',
  Savings = 'Savings',
  FixedExp = 'Fixed expenses',
  Shopping = 'Shopping',
  Entertainment = 'Entertainment',
  CarMaintenance = 'Car Maintenance',
  KidsSchool = 'Kids & School',
  Pets = 'Pets',
  GymFitness = 'Gym & Fitness',
  StreamingServices = 'Streaming Services',
  Home = 'Home',
  Investment = 'Investment',
  Vacation = 'Vacation',
  Birthdays = 'Birthdays',
  Christmass = 'Christmass',
  Party = 'Party',
  Date = 'Date',
  Garden = 'Garden',
  Other = 'Other'
}

// export const CategoryIcons = {
//   Salary: <i className="fa-solid fa-money-check-dollar"></i>,
//   Rent: <i className="fa-solid fa-person-cane"></i>,
//   Groceries: <i className="fa-solid fa-cart-shopping"></i>,
//   Food: <i className="fa-solid fa-utensils"></i>,
//   internetPhone: <i className="fa-solid fa-globe"></i>,
//   HealthInsurance: <i className="fa-solid fa-notes-medical"></i>,
//   Savings: <i className="fa-solid fa-piggy-bank"></i>,
//   FixedExp: <i className="fa-solid fa-wallet"></i>,
//   shopping: <i className="fa-solid fa-bag-shopping"></i>,
//   Entertainment: <i className="fa-solid fa-microphone-lines"></i>,
//   CarMaintenance: <i className="fa-solid fa-car"></i>,
//   KidsSchool: <i className="fa-solid fa-child"></i>,
//   Pets: <i className="fa-solid fa-paw"></i>,
//   GymFitness: <i className="fa-solid fa-dumbbell"></i>,
//   StreamingServices: <i className="fa-solid fa-tv"></i>,
//   Home: <i className="fa-solid fa-house-chimney"></i>,
//   Investment: <i className="fa-solid fa-money-bill-trend-up"></i>,
//   Vacation: <i className="fa-solid fa-umbrella-beach"></i>,
//   Birthdays: <i className="fa-solid fa-cake-candles"></i>,
//   Christmass: <i className="fa-solid fa-gift"></i>,
//   Party: <i className="fa-solid fa-champagne-glasses"></i>,
//   Date: <i className="fa-solid fa-heart"></i>,
//   Garden: <i className="fa-solid fa-tree"></i>,
//   Other: <i className="fa-solid fa-star-of-life"></i>,
// }

export const CategoryIcons: Record<Category, JSX.Element> = {
  [Category.Salary]: (
    <i
      className="fa-solid fa-money-check-dollar"
      title="Salary"
    ></i>
  ),
  [Category.Rent]: (
    <i
      className="fa-solid fa-person-cane"
      title="Rent"
    ></i>
  ),
  [Category.Groceries]: (
    <i
      className="fa-solid fa-cart-shopping"
      title="Groceries"
    ></i>
  ),
  [Category.Food]: (
    <i
      className="fa-solid fa-utensils"
      title="Food"
    ></i>
  ),
  [Category.InternetPhone]: (
    <i
      className="fa-solid fa-globe"
      title="Internet & Phone"
    ></i>
  ),
  [Category.HealthInsurance]: (
    <i
      className="fa-solid fa-notes-medical"
      title="Health Insurance"
    ></i>
  ),
  [Category.Savings]: (
    <i
      className="fa-solid fa-piggy-bank"
      title="Savings"
    ></i>
  ),
  [Category.FixedExp]: (
    <i
      className="fa-solid fa-wallet"
      title="Fixed Expenses"
    ></i>
  ),
  [Category.Shopping]: (
    <i
      className="fa-solid fa-bag-shopping"
      title="Shopping"
    ></i>
  ),
  [Category.Entertainment]: (
    <i
      className="fa-solid fa-microphone-lines"
      title="Entertainment"
    ></i>
  ),
  [Category.CarMaintenance]: (
    <i
      className="fa-solid fa-car"
      title="Car Maintenance"
    ></i>
  ),
  [Category.KidsSchool]: (
    <i
      className="fa-solid fa-child"
      title="Kids & School"
    ></i>
  ),
  [Category.Pets]: (
    <i
      className="fa-solid fa-paw"
      title="Pets"
    ></i>
  ),
  [Category.GymFitness]: (
    <i
      className="fa-solid fa-dumbbell"
      title="Gym & Fitness"
    ></i>
  ),
  [Category.StreamingServices]: (
    <i
      className="fa-solid fa-tv"
      title="Streaming Services"
    ></i>
  ),
  [Category.Home]: (
    <i
      className="fa-solid fa-house-chimney"
      title="Home"
    ></i>
  ),
  [Category.Investment]: (
    <i
      className="fa-solid fa-money-bill-trend-up"
      title="Investment"
    ></i>
  ),
  [Category.Vacation]: (
    <i
      className="fa-solid fa-umbrella-beach"
      title="Vacation"
    ></i>
  ),
  [Category.Birthdays]: (
    <i
      className="fa-solid fa-cake-candles"
      title="Birthdays"
    ></i>
  ),
  [Category.Christmass]: (
    <i
      className="fa-solid fa-gift"
      title="Christmas"
    ></i>
  ),
  [Category.Party]: (
    <i
      className="fa-solid fa-champagne-glasses"
      title="Party"
    ></i>
  ),
  [Category.Date]: (
    <i
      className="fa-solid fa-heart"
      title="Date"
    ></i>
  ),
  [Category.Garden]: (
    <i
      className="fa-solid fa-tree"
      title="Garden"
    ></i>
  ),
  [Category.Other]: (
    <i
      className="fa-solid fa-star-of-life"
      title="Other"
    ></i>
  )
}


// export enum Category {
//   Salary = 'Salary',

export enum TrType {
  Income = 'income',
  Expense = 'expense'
}

export interface Transaction {
  readonly id?: string
  amount: number
  type: TrType.Income | TrType.Expense
  date: string
  category: Category
  description?: string
}
