
import UserAvatar from './UserAvatar'
import { BellIcon, PanelLeft } from 'lucide-react'

const SidebarHeader = () => {
  return (
    <div className='flex justify-between mb-5'>
      <UserAvatar/>
      <div className="flex gap-3 items-center">
        <BellIcon size={20}/>
        <PanelLeft size={20}/>
      </div>
    </div>
  )
}

export default SidebarHeader