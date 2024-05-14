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

const formSchema = z.object({
  username: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required').min(8, {
    message: 'Password must be atleast 8 characters'
  }).max(50),
}).refine(data => data.username && data.password, {
  
})


const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState<string >('');
  const [password, setPassword] = useState<string >('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(e.target.value);
  //   setErrorMessage(null);
  // }

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  //   setErrorMessage(null);
  // }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        callbackUrl: "/today"
      });
      console.log(result?.url);
      
      if(result?.ok){
        console.log('form submitted');
        setErrorMessage(null);
        router.push("/today");
      } else {
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      
    }
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
                <Input placeholder="mail@example.com" {...field} 
                  onChangeCapture={()=>setErrorMessage(null)}
                />
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
                <Input placeholder="Enter your password" {...field} 
                  type="password"
                  onChangeCapture={()=>setErrorMessage(null)}
                  />
              </FormControl>
              <FormMessage className="text-xs"/>              
            </FormItem>
          )}
        />
        <p className="text-red-500 text-xs">{errorMessage ? errorMessage : null}</p>
        <Button type="submit"
          className="w-full"
        >Login</Button>
        <h1 className="mx-auto flex items-center before:mr-4  before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4  after:block after:h-px after:flex-grow after:bg-stone-400">Or Login Using</h1>
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