import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const DropdownMenu = () => {
  const { logout } = useAuth()

  const logoutUser = async (): Promise<void> => {
    await logout()
    // TransactionsContext.Clear()
  }
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="!p-2 !m-0 !bg-transparent secondary-btn group"
      >
        <i className="fa-solid fa-bars text-xl group-hover:text-sky-300 duration-200"></i>
      </button>

      {/* Underlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-0 bg-transparent"
        />
      )}

      <div
        className={`absolute right-0 mt-2 w-40 bg-[var(--background)] border border-[var(--color-light-blue)] rounded-sm z-10 duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
        style={{ boxShadow: '0 0 15px 1px var(--background)' }}
      >
        <ul>
          <li
            onClick={() => {
              toggleMenu()
              router.push('/')
            }}
            className="px-4 py-2 hover:bg-[var(--background-muted)] duration-200 cursor-pointer"
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              toggleMenu()
              // router.push("/")
            }}
            className="px-4 py-2 hover:bg-[var(--background-muted)] duration-200 cursor-pointer"
          >
            Profile
          </li>
          <li
            onClick={() => {
              toggleMenu()
              router.push('/settings')
            }}
            className="px-4 py-2 hover:bg-[var(--background-muted)] duration-200 cursor-pointer"
          >
            Settings
          </li>
          <li
            onClick={() => {
              toggleMenu()
              logoutUser()
            }}
            className="px-4 py-2 hover:bg-[var(--background-muted)] duration-200 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DropdownMenu
