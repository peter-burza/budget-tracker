const Footer = () => {


    return (
        <div id="footer" className="bg-gray-900 text-gray-300 px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">BudgeTer</h2>
                    <p className="text-sm">Track your spending, save smarter, and take control of your financial future.</p>
                </div>

                {/* <div>
                    <h3 className="text-center text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <div className="flex gap-3 justify-around">
                        <ul className="text-center space-y-2 text-sm">
                            <li><a href="#transaction-entry" className="clickable transition">New entry</a></li>
                            <li><a href="#transactions-history" className="clickable transition">Transactions history</a></li>
                        </ul>
                        <div className="w-px h-16 bg-[var(--color-dark-blue)]"></div>
                        <ul className="text-center space-y-2 text-sm">
                            <li><a href="#summary" className="clickable transition">Summary</a></li>
                            <li><a href="#expense-breakdown" className="clickable transition">Expense breakdown</a></li>
                        </ul>
                    </div>
                </div> */}

                {/* <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
                    <p className="text-sm mb-4">Get tips and updates on budgeting straight to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="email" placeholder="Your email" className="" />
                        <button type="submit" className="primary-btn !my-0">Subscribe</button>
                    </div>
                </div> */}

                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
                    <div className="flex space-x-4 mb-4">
                        <a target="blank" href="https://www.linkedin.com/in/peter-burza-695958326/" className="clickable"><i className="fab fa-linkedin"></i></a>
                        <a target="blank" href="https://github.com/peter-burza/budget-tracker" className="clickable"><i className="fab fa-github"></i></a>
                    </div>
                    {/* <ul className="space-y-2 text-sm text-center">
                        <li><a href="https://github.com/peter-burza/budget-tracker" className="clickable transition">GitHub Repository</a></li>
                        <li><a href="/contact" className="clickable transition">Contact Us</a></li>
                    </ul> */}
                </div>
            </div>

            <div className="mt-5 border-t border-gray-700 pt-6 text-center text-gray-500">
                <p className="!text-sm">© 2025 BudgeTer. All rights reserved.</p>
                <p className="!text-sm">Created by <a className="clickable text-gray-400" target="blank" href="https://peterburzaportfolio.netlify.app">Peter Burza</a></p>
            </div>

        </div>
    )
}

export default Footer