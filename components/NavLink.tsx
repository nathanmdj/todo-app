'use client'
import Link from "next/link"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

type Links = {
  name: string,
  path: string,
  icon? : any,
  icon2? : any,
}
const NavLink = ({name, path, icon, icon2} : Links) => {
  const pathname = usePathname()
  
  const isActive = pathname === path  
  return (
    <Link href={path} className={`flex items-center gap-2 hover:bg-[#d9ed92] px-2 py-2 rounded-md ${isActive ? 'bg-[#d9ed92] text-red-500' : ''}` }>
      {isActive? icon2 : icon}
      {name}
    </Link>
  )
}

export default NavLink