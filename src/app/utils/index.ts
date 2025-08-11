import { Category, Transaction } from "../interfaces/Transaction";

export const FAKE_TRANSACTIONS: Transaction[] = [
  { id: 'tx001', amount: 3200, type: '+', date: '2025-08-01', category: Category.Salary, description: 'Received monthly salary from full-time employment, including base pay and performance bonus.' },
  { id: 'tx002', amount: 850, type: '-', date: '2025-08-02', category: Category.Rent, description: 'Paid rent for downtown apartment, including utilities and maintenance fees.' },
  { id: 'tx003', amount: 120, type: '-', date: '2025-08-03', category: Category.Groceries, description: 'Bought weekly groceries: vegetables, fruits, dairy, and snacks.' },
  { id: 'tx004', amount: 60, type: '-', date: '2025-08-04', category: Category.Entertainment, description: 'Cinema outing with friends, including tickets and snacks.' },
  { id: 'tx005', amount: 400, type: '+', date: '2025-08-05', category: Category.Other, description: 'Freelance design project payment for marketing materials.' },
  { id: 'tx006', amount: 75, type: '-', date: '2025-08-06', category: Category.CarMaintenance, description: 'Gas refill and tire pressure check at local station.' },
  { id: 'tx007', amount: 1500, type: '+', date: '2025-08-07', category: Category.Vacation, description: 'Refund from travel agency for canceled vacation plans.' },
  { id: 'tx008', amount: 90, type: '-', date: '2025-08-08', category: Category.Garden, description: 'Purchased gardening tools, soil, and flower seeds.' },
  { id: 'tx009', amount: 45, type: '-', date: '2025-08-09', category: Category.Date, description: 'Romantic dinner with partner at a cozy restaurant.' },
  { id: 'tx010', amount: 500, type: '+', date: '2025-08-10', category: Category.Home, description: 'Employer stipend for home office upgrades.' },
  { id: 'tx011', amount: 130, type: '-', date: '2025-08-11', category: Category.Birthdays, description: 'Birthday gift and celebration expenses for a friend.' },
  { id: 'tx012', amount: 180, type: '-', date: '2025-08-12', category: Category.Christmass, description: 'Car maintenance including oil change and brake inspection.' },
  { id: 'tx013', amount: 220, type: '-', date: '2025-08-13', category: Category.InternetPhone, description: 'Monthly internet and phone service bill.' },
  { id: 'tx014', amount: 95, type: '-', date: '2025-08-14', category: Category.Food, description: 'Family dinner at a restaurant for a special occasion.' },
  { id: 'tx015', amount: 300, type: '+', date: '2025-08-15', category: Category.Savings, description: 'Transferred funds to savings account for emergency fund.' },
  { id: 'tx016', amount: 110, type: '-', date: '2025-08-16', category: Category.StreamingServices, description: 'Monthly subscription for streaming platforms.' },
  { id: 'tx017', amount: 60, type: '-', date: '2025-08-17', category: Category.Party, description: 'Bought drinks and decorations for weekend house party.' },
  { id: 'tx018', amount: 100, type: '-', date: '2025-08-18', category: Category.HealthInsurance, description: 'Monthly health insurance premium payment.' },
  { id: 'tx019', amount: 250, type: '+', date: '2025-08-19', category: Category.Investment, description: 'Dividend payout from stock portfolio.' },
  { id: 'tx020', amount: 90, type: '-', date: '2025-08-20', category: Category.GymFitness, description: 'Monthly gym membership fee and fitness class.' },
  { id: 'tx021', amount: 150, type: '-', date: '2025-08-21', category: Category.KidsSchool, description: 'School supplies and tuition fees for children.' },
  { id: 'tx022', amount: 80, type: '-', date: '2025-08-22', category: Category.Pets, description: 'Vet visit and pet food for the family dog.' },
  { id: 'tx023', amount: 200, type: '-', date: '2025-08-23', category: Category.Shopping, description: 'Bought clothes and accessories during seasonal sale.' },
  { id: 'tx024', amount: 400, type: '-', date: '2025-08-24', category: Category.FixedExp, description: 'Monthly fixed expenses including insurance and subscriptions.' }
];
