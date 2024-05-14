"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { Github, Google } from 'react-bootstrap-icons'
import Link from "next/link"

const formSchema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(8).max(50),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
 
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: true,
      callbackUrl: "/today"
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[300px] border border-gray-300 p-5 rounded-lg">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage className="text-xs"/>          
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password"/>
              </FormControl>
              <FormMessage className="text-xs"/>              
            </FormItem>
          )}
        />
           
        <Button type="submit"
          className="w-full"
        >Login</Button>
        <h1 className="text-center">Or Login Using</h1>
        <div className="flex justify-center ">
          <Button 
            type="button"
            className="bg-transparent hover:bg-gray-200 text-black h-12 w-12 rounded-full px-2"
            onClick={() => signIn('github', { callbackUrl: '/today' })}
          ><Github size={30} /></Button>
          <Button 
            type="button"
            className="bg-transparent hover:bg-gray-200 text-black h-12 w-12 rounded-full px-2"
            onClick={() => signIn('google', { callbackUrl: '/today' })}
          ><Google size={30} /></Button>
        </div>
        <p className="text-xs">Don&apos;t have an account?
          <Link href={"/signup"} className="text-blue-500"> Sign Up</Link>
        </p>
      </form>
    </Form>
  )
}

export default LoginForm