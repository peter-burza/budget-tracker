'use client'

import { useAuth } from '../context/AuthContext'
import React from 'react'
import DropdownMenu from './ui/DropdownMenu'
import { useRouter } from 'next/navigation'


export default function TopNav() {
  const { signInWithGoogle, currentUser } = useAuth()
  const router = useRouter()
  
  return (
    <div
      id="top-nav-container"
      className="flex justify-between items-center"
    >
      <div className='flex justify-between items-center'>
        <h3 onClick={() => {router.push("/")}} className="text-4xl p-2 px-2 cursor-pointer"> <span className="text-sky-300">BudgeTer</span> </h3>
        <h4>{currentUser ? ' - ' + currentUser?.displayName : ''}</h4>
      </div>
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