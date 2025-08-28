# Budget Tracker


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



### Tasks ✏️

- pridat fetching data from db after login
- remove doubled id inside the transaction data on db.. saving, fetching. everywhere
- Add setting to change the currancy
- Vytvorti moznost tvorby vlastnej kategorie, ktoru budeme storovat v databazach
- Pridat moznost pridania pravidelnej transakcie - ci expense alebo income
- Spravit realnejsi prehlad o tom aky je stav kolko viem minut, trvale prikazy vs predpokladany prijem... funkcionalita: ked je den pravidelnej transakcie, tak sa pri prvej v dany den navstevy spytat ci uz vyplata prisla, ak ano, ci prisla presna predpokladana suma. moznost vypnut tuto funkcionalitu vyskakovacieho okna (niekde do nastaveni...))
- Nastavit ukladanie nastaveni
- Pripojit investicie, suhrn kam a kolko som investoval...
- Remove blue border on focus of DatePicker MUI Material feature
- Add feature, when user tries to add transaction with same stats (amount, type, category, date etc.), ask him if he really want to add another identical transaction (via Modal -> yes/no button)

LATER TASKS:
- First fetch of data after login, will be from last 5 years maybe? to prevent long waiting after login... or maybe last 1000 transactions? up to descusion
- Zjednotit vysku selectov v New Entry
- finish styling of date select (Mui Material component)... pain in the ass :D

#### DONE TASKS ✅
- Odfiltrovat categories, aby sa nezobrazil salary ked je nastavene expense - niekto by mozno chcel mat party ako income, ak poriada pary eventy a za kazdu z nich ma nejake peniaze... z toho dovodu som sa zatial rozhodol ponechat vsetky kategorie mozne nastaveniu income aj expence...
- Popis pouzivania listu aj ostatnych funkcii v appke, dat do nejakej ikonky...
- Prehodit summary s listom
- If no ammount is added, disable option of submiting the Entry form with error message that please fill out all neccessery inputs...
- Pridat Login (via google account)