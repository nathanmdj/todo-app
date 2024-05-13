'use client'
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}
      className="border-t border-gray-300 w-full text-left"
    >Sign out</button>
  )
}

export default LogoutButton