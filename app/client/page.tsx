'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import { signOut } from "next-auth/react";
import AddTaskForm from "@/components/addTaskForm/AddTaskForm";
const ClientPage = () => {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect('api/auth/signin?callbackUrl=/client')
    }
  });
  
  
  return (
    <section>
      <UserAvatar user={session?.user} pagetype={"Client"}/>
      <AddTaskForm user={session?.user}/>
    </section>
  )
}

export default ClientPage