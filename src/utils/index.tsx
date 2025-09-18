import { JSX } from "@emotion/react/jsx-runtime";
import { Transaction } from "../interfaces";
import { Currency } from "../types";
import { Category, TrType } from "@/enums";
import { useCurrencyStore } from "@/context/CurrencyState";

// const convertGlobalFunc = useCurrencyStore(state => state.convertGlobalFunc)

// export const FAKE_TRANSACTIONS: Transaction[] = [
//   { id: 'tx001', amount: 3200, type: '+', date: '2025-08-01', category: Category.Salary, description: 'Received monthly salary from full-time employment, including base pay and performance bonus.' },
//   { id: 'tx002', amount: 850, type: '-', date: '2025-08-02', category: Category.Rent, description: 'Paid rent for downtown apartment, including utilities and maintenance fees.' },
//   { id: 'tx003', amount: 120, type: '-', date: '2025-08-03', category: Category.Groceries, description: 'Bought weekly groceries: vegetables, fruits, dairy, and snacks.' },
//   { id: 'tx004', amount: 60, type: '-', date: '2025-08-04', category: Category.Entertainment, description: 'Cinema outing with friends, including tickets and snacks.' },
//   { id: 'tx005', amount: 400, type: '+', date: '2025-08-05', category: Category.Other, description: 'Freelance design project payment for marketing materials.' },
//   { id: 'tx006', amount: 75, type: '-', date: '2025-08-06', category: Category.CarMaintenance, description: 'Gas refill and tire pressure check at local station.' },
//   { id: 'tx007', amount: 1500, type: '+', date: '2025-08-07', category: Category.Vacation, description: 'Refund from travel agency for canceled vacation plans.' },
//   { id: 'tx008', amount: 90, type: '-', date: '2025-08-08', category: Category.Garden, description: 'Purchased gardening tools, soil, and flower seeds.' },
//   { id: 'tx009', amount: 45, type: '-', date: '2025-08-09', category: Category.Date, description: 'Romantic dinner with partner at a cozy restaurant.' },
//   { id: 'tx010', amount: 500, type: '+', date: '2025-08-10', category: Category.Home, description: 'Employer stipend for home office upgrades.' },
//   { id: 'tx011', amount: 130, type: '-', date: '2025-08-11', category: Category.Birthdays, description: 'Birthday gift and celebration expenses for a friend.' },
//   { id: 'tx012', amount: 180, type: '-', date: '2025-08-12', category: Category.Christmass, description: 'Car maintenance including oil change and brake inspection.' },
//   { id: 'tx013', amount: 220, type: '-', date: '2025-08-13', category: Category.InternetPhone, description: 'Monthly internet and phone service bill.' },
//   { id: 'tx014', amount: 95, type: '-', date: '2025-08-14', category: Category.Food, description: 'Family dinner at a restaurant for a special occasion.' },
//   { id: 'tx015', amount: 300, type: '+', date: '2025-08-15', category: Category.Savings, description: 'Transferred funds to savings account for emergency fund.' },
//   { id: 'tx016', amount: 110, type: '-', date: '2025-08-16', category: Category.StreamingServices, description: 'Monthly subscription for streaming platforms.' },
//   { id: 'tx017', amount: 60, type: '-', date: '2025-08-17', category: Category.Party, description: 'Bought drinks and decorations for weekend house party.' },
//   { id: 'tx018', amount: 100, type: '-', date: '2025-08-18', category: Category.HealthInsurance, description: 'Monthly health insurance premium payment.' },
//   { id: 'tx019', amount: 250, type: '+', date: '2025-08-19', category: Category.Investment, description: 'Dividend payout from stock portfolio.' },
//   { id: 'tx020', amount: 90, type: '-', date: '2025-08-20', category: Category.GymFitness, description: 'Monthly gym membership fee and fitness class.' },
//   { id: 'tx021', amount: 150, type: '-', date: '2025-08-21', category: Category.KidsSchool, description: 'School supplies and tuition fees for children.' },
//   { id: 'tx022', amount: 80, type: '-', date: '2028-08-22', category: Category.Pets, description: 'Vet visit and pet food for the family dog.' },
//   { id: 'tx023', amount: 200, type: '-', date: '2027-08-23', category: Category.Shopping, description: 'Bought clothes and accessories during seasonal sale.' },
//   { id: 'tx024', amount: 400, type: '-', date: '2026-08-24', category: Category.FixedExp, description: 'Monthly fixed expenses including insurance and subscriptions.' }
// ];


// const categoryList: Category[] = Object.values(Category);

// const descriptions: Partial<Record<Category, string>> = {
//   [Category.Salary]: 'Monthly salary credited with performance bonus.',
//   [Category.Rent]: 'Paid rent including utilities and maintenance.',
//   [Category.Groceries]: 'Weekly groceries: produce, dairy, and snacks.',
//   [Category.Food]: 'Dinner at a local restaurant.',
//   [Category.InternetPhone]: 'Monthly internet and phone bill.',
//   [Category.HealthInsurance]: 'Health insurance premium payment.',
//   [Category.Savings]: 'Transferred funds to savings account.',
//   [Category.FixedExp]: 'Fixed monthly expenses like insurance.',
//   [Category.Shopping]: 'Bought clothes and accessories.',
//   [Category.Entertainment]: 'Streaming service or movie night.',
//   [Category.CarMaintenance]: 'Routine car maintenance and fuel.',
//   [Category.KidsSchool]: 'School supplies and tuition fees.',
//   [Category.Pets]: 'Vet visit and pet food.',
//   [Category.GymFitness]: 'Gym membership and fitness classes.',
//   [Category.StreamingServices]: 'Subscription for streaming platforms.',
//   [Category.Home]: 'Home office upgrades and repairs.',
//   [Category.Investment]: 'Dividend payout from stock portfolio.',
//   [Category.Vacation]: 'Travel expenses and bookings.',
//   [Category.Birthdays]: 'Birthday gifts and celebration costs.',
//   [Category.Christmass]: 'Holiday shopping and decorations.',
//   [Category.Party]: 'Party supplies and snacks.',
//   [Category.Date]: 'Romantic dinner with partner.',
//   [Category.Garden]: 'Gardening tools and plants.',
//   [Category.Other]: 'Miscellaneous income or expense.',
// };

// function pad(num: number): string {
//   return num.toString().padStart(2, '0');
// }

// export const FAKE_TRANSACTIONS: Transaction[] = [];

// let txCounter = 1;

// for (let year = 2022; year <= 2024; year++) {
//   for (let month = 1; month <= 12; month++) {
//     for (let i = 0; i < 5; i++) {
//       const category = categoryList[(txCounter + i) % categoryList.length];
//       const type = i % 2 === 0 ? '+' : '-';
//       const amount = type === '+' ? 3000 + (i * 100) : 100 + (i * 50);
//       const day = pad(i + 1);
//       const date = `${year}-${pad(month)}-${day}`;
//       FAKE_TRANSACTIONS.push({
//         id: `tx${pad(txCounter++)}`,
//         amount,
//         type,
//         date,
//         category,
//         description: descriptions[category] || 'General transaction.'
//       });
//     }
//   }
// }

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', symbol: '$', name: 'United States Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound Sterling' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan Renminbi' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  CHF: { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  DKK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  CZK: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  HUF: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  RON: { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  BGN: { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  HRK: { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  ISK: { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona' },
  RUB: { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  MXN: { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  ARS: { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  CLP: { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  COP: { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  PEN: { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates Dirham' },
  SAR: { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  ILS: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel' },
  EGP: { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  KES: { code: 'KES', symbol: 'Sh', name: 'Kenyan Shilling' },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  TWD: { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar' },
}


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

// FUNCTIONS
export function getMonthName(monthNum: string): string {
  switch (monthNum) {
    case "01":
      return 'January';
    case "02":
      return 'February';
    case "03":
      return 'March';
    case "04":
      return 'April';
    case "05":
      return 'May';
    case "06":
      return 'June';
    case "07":
      return 'July';
    case "08":
      return 'August';
    case "09":
      return 'September';
    case "10":
      return 'October';
    case "11":
      return 'November';
    case "12":
      return 'December';
    default:
      return 'Invalid month';
  }
}

export function getMonthNumber(monthName: string): string {
  switch (monthName.toLowerCase()) {
    case 'january':
      return '01';
    case 'february':
      return '02';
    case 'march':
      return '03';
    case 'april':
      return '04';
    case 'may':
      return '05';
    case 'june':
      return '06';
    case 'july':
      return '07';
    case 'august':
      return '08';
    case 'september':
      return '09';
    case 'october':
      return '10';
    case 'november':
      return '11';
    case 'december':
      return '12';
    default:
      return 'Invalid month';
  }
}

export function getMonth(date: string): string {
  return date.slice(5, 7)
}

export function getYear(date: string): string {
  return date.slice(0, 4)
}

export function getYearsFromTransactions(transactions: Transaction[]): string[] {
  const yearsSet = new Set<string>();

  for (const t of transactions) {
    const year = t.date.slice(0, 4);
    yearsSet.add(year);
  }

  return Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));
}

// Calculate total Income / Expense
// export function calculateTotal(
//   type: TrType,
//   transactions: Transaction[],
//   setTotal: React.Dispatch<React.SetStateAction<number>>,
//   baseCurrCode: string,
//   selectedCurrCode: string
// ): void {
//   const filteredTransactions = transactions.filter(t => (t.type === type))
//   const convertedTrAmountsPromises = filteredTransactions.map((t) => {
//     return baseCurrCode === selectedCurrCode
//       ? Promise.resolve(t.baseAmount)
//       : t.currency.code === selectedCurrCode
//         ? Promise.resolve(t.origAmount)
//         : convertGlobalFunc(t.currency.code, selectedCurrCode, t.origAmount)
//   })

//   Promise.all(convertedTrAmountsPromises).then((resolvedAmounts) => {
//     const total = calculateTotalSimplier(resolvedAmounts)
//     setTotal(roundToTwo(total))
//   })
// }

export function calculateTotalSimplier(amounts: number[]): number {
  return amounts.reduce((sum, amount) => {
    console.log(sum + amount);
    return sum + amount
  }, 0);
}


export function handleToggle(x: boolean, setX: React.Dispatch<React.SetStateAction<boolean>>): void {
  setX(!x)
}

export function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100
}

export function areTransactionSetsEqual(arr1: Transaction[], arr2: Transaction[]): boolean {
  if (arr1.length !== arr2.length) return false;

  const sortById = (a: Transaction, b: Transaction) => a.id!.localeCompare(b.id!);

  const sorted1 = [...arr1].sort(sortById);
  const sorted2 = [...arr2].sort(sortById);

  return sorted1.every((tr1, index) => {
    const tr2 = sorted2[index];
    return (
      tr1.id === tr2.id &&
      tr1.baseAmount === tr2.baseAmount &&
      tr1.type === tr2.type &&
      tr1.date === tr2.date &&
      tr1.category === tr2.category &&
      (tr1.description || '') === (tr2.description || '')
    );
  });
}

export function fancyNumber(num: number): string {
  return num.toFixed(2).toLocaleString()
}
