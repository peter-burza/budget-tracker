const Footer = () => {


    return (
        <div id="footer" className="bg-gray-900 text-gray-300 px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">BudgeTer</h2>
                    <p className="text-sm">Track your spending, save smarter, and take control of your financial future.</p>
                </div>

                <div>
                    <h3 className="text-center text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <div className="flex gap-3 justify-around">
                        <ul className="text-center space-y-2 text-sm">
                            <li><a href="#transaction-entry" className="hover:text-white transition">New entry</a></li>
                            <li><a href="#transactions-history" className="hover:text-white transition">Transactions history</a></li>
                        </ul>
                        <div className="w-px h-16 bg-[var(--color-dark-blue)]"></div>
                        <ul className="text-center space-y-2 text-sm">
                            <li><a href="#summary" className="hover:text-white transition">Summary</a></li>
                            <li><a href="#expense-breakdown" className="hover:text-white transition">Expense breakdown</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
                    <p className="text-sm mb-4">Get tips and updates on budgeting straight to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="email" placeholder="Your email" className="" />
                        <button type="submit" className="primary-btn !my-0">Subscribe</button>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="hover:text-white"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                        <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                © 2025 BudgetWise. All rights reserved.
            </div>

        </div>
    )
}

export default Footer