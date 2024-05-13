
import UserAvatar from './UserAvatar'
import { BellIcon, PanelLeft } from 'lucide-react'
import { getServerSession} from 'next-auth/next'
import {authOptions} from '../app/api/auth/[...nextauth]/options';

const SidebarHeader = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='flex justify-between mb-5'>
      <UserAvatar user={session?.user} pagetype='Avatar'/>
      <div className="flex gap-3 items-center">
        <BellIcon size={20}/>
        <PanelLeft size={20}/>
      </div>
    </div>
  )
}

export default SidebarHeader