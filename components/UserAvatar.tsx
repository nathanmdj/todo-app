
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import LogoutButton from "./LogoutButton";
import { PersonCircle } from "react-bootstrap-icons";
type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null |undefined;
} | undefined

type Props = {
  user: User,
  pagetype: string,
}

 
const UserAvatar = ({user, pagetype}: Props) => {
  const [firstName] = user?.name ? user.name.split(' ') : [];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-3 px-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage src={user?.image as string} alt="avatar" />
          <AvatarFallback>
            {/* <PersonCircle size={32}/> */}
            {user?.name[0].toLocaleUpperCase() || ''}
          </AvatarFallback>
        </Avatar>
        <div className='flex items-center gap-1 text-sm font-bold'>
          {firstName}
          <ChevronDown size={15}/>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem><LogoutButton/></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    

    
  )
}

export default UserAvatar