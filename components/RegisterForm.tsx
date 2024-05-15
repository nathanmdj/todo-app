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
import { useState } from "react"
import { useRouter } from "next/navigation"
import Loading from "./Loading"

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Please enter a valid email' }),
  name: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required').min(8, {
    message: 'Password must be atleast 8 characters'
  }).max(50),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const formItem = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: 'name',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter your username',
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password', 
    placeholder: 'Confirm your password',
  }
]

const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    },
  })

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })

      if(result?.status === 400) {
        setErrorMessage("User already exists");
      } else if(result?.status === 201) {
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/today"
        })
      }
      
    } catch (error) {
      console.log('error', error);
      
    }finally{
      setIsLoading(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[360px] border border-gray-300 p-5 rounded-lg relative">
        <h1>Register</h1>
        
        {formItem.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name === 'email' ? 'email' : item.name === 'name' ? 'name' : item.name === 'password' ? 'password' : 'confirmPassword'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input placeholder={item.placeholder} {...field} 
                    type={item.type}
                    onChangeCapture={()=>setErrorMessage(null)}
                  />
                </FormControl>
                <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />
        ))}
        <p className="text-red-500 text-xs">{errorMessage ? errorMessage : null}</p>
        <Button type="submit"
          className="w-full"
        >Register</Button>
        <h1 className="mx-auto flex items-center before:mr-4  before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4  after:block after:h-px after:flex-grow after:bg-stone-400">Or Login Using</h1>
        <div className="flex justify-center ">
          <Button 
            type="button"
            className="bg-transparent hover:bg-gray-200 text-black h-12 w-12 rounded-full px-2"
            onClick={() => {
              signIn('github', { callbackUrl: '/today' })
              setIsLoading(true)
            }}
          ><Github size={30} /></Button>
          <Button 
            type="button"
            className="bg-transparent hover:bg-gray-200 text-black h-12 w-12 rounded-full px-2"
            onClick={() => signIn('google', { callbackUrl: '/today' })}
          ><Google size={30} /></Button>
        </div>
        <p className="text-xs">Already have an account
          <Link href={"/login"} className="text-blue-500"> Go to Login</Link>
        </p>
        <Loading isLoading={isLoading}/>
      </form>
      
    </Form>
  )
}

export default RegisterForm