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

- CURRENCY:
        - zmena Transaction interface: add:
                - amount - to je amount v urcenej mene (1)
                - currency - urcena mena (USD)
                - baseAmount - zadana ciastka v base mene (0.84)
        - v liste sa bude zobrazovat vzdy transakcia vo vykonanej mene,
        - v Summary bude celkova ciastka v mene ktoru sme pouzivali najviac, a po rozkliknuti bude rozdelenie (v kazdej mene summary zvlast, ze kolko sme platili v kazdej mene zvlast)
        - Expense Breakdown - zobrazit tak isto vsetky vydaje v mene v ktorej sa dany mesiac platilo najviac/ alebo neviem este...
        - v Entry si bude moct urcit menu danej transakcie
        - uzivatel si na zaciatku (po registracii) urci aku menu chce v aplikacii pouzivat (dalej ju nebude moct menit) -
                k tomu by som dal este vysvetlivku ze ak bude ale aj platit v inej mene, bude mu zaznamenana dana mena, ze moze vykonavat transakcie aj v inej mene ako je nim urcena baseCurrency.
- po registracii sa spytat na base currency
- Pridat moznost pridania pravidelnej transakcie - ci expense alebo income
- Vytvorti moznost tvorby vlastnej kategorie, ktoru budeme storovat v databazach
- Spravit realnejsi prehlad o tom aky je stav kolko viem minut, trvale prikazy vs predpokladany prijem... funkcionalita: ked je den pravidelnej transakcie, tak sa pri prvej navsteve v dany den spytat ci uz vyplata prisla, ak ano, ci prisla presna predpokladana suma. moznost vypnut tuto funkcionalitu vyskakovacieho okna (niekde do nastaveni...)
- Pripojit investicie, suhrn kam a kolko som investoval...


#### LATER TASKS:

- First fetch of data after login, will be from last 5 years maybe? to prevent long waiting after login... or maybe last 1000 transactions? up to descusion
- Zjednotit vysku selectov v New Entry
- finish styling of date select (Mui Material component) - [blue border on focus, width on resize...]... pain in the ass :D


#### Consultations:

-Do we want to have precise historical exchanging system? which means: when user changes the currency: 
{
        in the list he will see the amounts exchanged according historical exchange rates from that day 
        || 
        in the list he will see the amounts exchanged by actual exchange rates
} 
It depends what we want to


#### DONE TASKS ✅

- Odfiltrovat categories, aby sa nezobrazil salary ked je nastavene expense - niekto by mozno chcel mat party ako income, ak poriada pary eventy a za kazdu z nich ma nejake peniaze... z toho dovodu som sa zatial rozhodol ponechat vsetky kategorie mozne nastaveniu income aj expence...
- Popis pouzivania listu aj ostatnych funkcii v appke, dat do nejakej ikonky...
- Prehodit summary s listom
- If no ammount is added, disable option of submiting the Entry form with error message that please fill out all neccessery inputs...
- Pridat Login (via google account)
- pridat fetching data from db after login
- remove doubled id inside the transaction data on db.. saving, fetching. everywhere
- Add setting to change the currancy
- pre transactions vytvorit context a nie pushovat to vsade do componentov
        - ponechane, lebo to nepushujem do vela komponentov, iba do dvoch v podstate (zatial)
- components and context folder prehodit do src foldru, a prepisat vsetky cesty
- default category set Other.
- type default Expense
- z typu v transaction spravit enum a bude nie + a - ale boolean (true/false)
- prekopat entry, break new transaction into more useState variables and setNewTransaction az ked sa submitne, aj to id z tade vyhodit potom...
- vlozit currency selector
- Nastavit ukladanie nastaveni
- incorrect ordering of income/expense/null in List
- currency zmena by mala zahrnat aj nejaky prepocet podla aktualnych kurzov?
- when you have opend Dropdown menu and click outside of the menu, close the menu
- ked odstranim transakciu, tak po jej odstraneni ostane otvoreny akoby detail ale dalsej transakcie.. opravit aby neostalo nic dalsie otvorene.
- close button na modaly (ked kliknes na i ikonu vyysvetliviek)
- If the deletion causes the filtered list to become empty, you might want to show a message like:
        {dateFilteredTransactions.length === 0 && (
        <p className="text-gray-400">No transactions for selected filters.</p>
        )}
- When user clickes on delete transaction button - ask him: "Are you sure?"...
- Add feature, when user tries to add transaction with same stats (amount, type, category, date etc.), ask him if he really want to add another identical transaction (via Modal -> yes/no button)
- saving of the settings (currency select) does not save on new user firestore...