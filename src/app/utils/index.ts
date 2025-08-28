import { Category, Transaction } from "../interfaces/Transaction";

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


const categoryList: Category[] = Object.values(Category);

const descriptions: Partial<Record<Category, string>> = {
  [Category.Salary]: 'Monthly salary credited with performance bonus.',
  [Category.Rent]: 'Paid rent including utilities and maintenance.',
  [Category.Groceries]: 'Weekly groceries: produce, dairy, and snacks.',
  [Category.Food]: 'Dinner at a local restaurant.',
  [Category.InternetPhone]: 'Monthly internet and phone bill.',
  [Category.HealthInsurance]: 'Health insurance premium payment.',
  [Category.Savings]: 'Transferred funds to savings account.',
  [Category.FixedExp]: 'Fixed monthly expenses like insurance.',
  [Category.Shopping]: 'Bought clothes and accessories.',
  [Category.Entertainment]: 'Streaming service or movie night.',
  [Category.CarMaintenance]: 'Routine car maintenance and fuel.',
  [Category.KidsSchool]: 'School supplies and tuition fees.',
  [Category.Pets]: 'Vet visit and pet food.',
  [Category.GymFitness]: 'Gym membership and fitness classes.',
  [Category.StreamingServices]: 'Subscription for streaming platforms.',
  [Category.Home]: 'Home office upgrades and repairs.',
  [Category.Investment]: 'Dividend payout from stock portfolio.',
  [Category.Vacation]: 'Travel expenses and bookings.',
  [Category.Birthdays]: 'Birthday gifts and celebration costs.',
  [Category.Christmass]: 'Holiday shopping and decorations.',
  [Category.Party]: 'Party supplies and snacks.',
  [Category.Date]: 'Romantic dinner with partner.',
  [Category.Garden]: 'Gardening tools and plants.',
  [Category.Other]: 'Miscellaneous income or expense.',
};

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

export const FAKE_TRANSACTIONS: Transaction[] = [];

let txCounter = 1;

for (let year = 2022; year <= 2024; year++) {
  for (let month = 1; month <= 12; month++) {
    for (let i = 0; i < 5; i++) {
      const category = categoryList[(txCounter + i) % categoryList.length];
      const type = i % 2 === 0 ? '+' : '-';
      const amount = type === '+' ? 3000 + (i * 100) : 100 + (i * 50);
      const day = pad(i + 1);
      const date = `${year}-${pad(month)}-${day}`;
      FAKE_TRANSACTIONS.push({
        id: `tx${pad(txCounter++)}`,
        amount,
        type,
        date,
        category,
        description: descriptions[category] || 'General transaction.'
      });
    }
  }
}

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

export function calculateTotal(type: string, transactions: Transaction[]): number {
    const filteredTransactions = transactions.filter(t => (t.type === type))
    const amounts = filteredTransactions.map(t => t.amount)
    const totalAmount = amounts.reduce((sum, t) => sum + t, 0)
    return totalAmount
}

export function handleToggle(x: boolean, setX: React.Dispatch<React.SetStateAction<boolean>>): void {
  setX(!x)
}