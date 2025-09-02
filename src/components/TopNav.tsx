'use client'

import { useAuth } from '../context/AuthContext'
import React from 'react'
import DropdownMenu from './ui/DropdownMenu'

// interface TopNavProps {

// }

// const TopNav: React.FC<TopNavProps> = () => {
export default function TopNav() {
  const { signInWithGoogle, currentUser } = useAuth()
  return (
    <div
      id="top-nav-container"
      className="flex justify-between items-center"
    >
      <h3 className="text-4xl p-2 px-2">
        <span className="text-sky-300">BudgeTer</span> {currentUser ? ' - ' + currentUser?.displayName : ''}
      </h3>
      {currentUser ? (
        <DropdownMenu />
      ) : (
        <button
          onClick={signInWithGoogle}
          className="px-2 secondary-btn"
        >
          <h5>Sign in with Google</h5>
        </button>
      )}
    </div>
  )
}

// export default TopNav
