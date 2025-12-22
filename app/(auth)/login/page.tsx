import Button from '@/components/common/Button'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center width-full ">
       <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold tracking-[0.2em]">Login to El-Foly</h3>
        <p className="text-lg">Sign in to continue!</p>
       </div>
        <form className="w-full flex flex-col gap-10 pr-4">
            <input 
            type="email"
            placeholder="Email or Phone"
            className="w-full border-b-1 border-black  text-lg focus:outline-none focus:border-[var(--primary-color)] "
            
            />
            <input 
            type="password"
            placeholder="Password"
            className="w-full border-b-1 border-black  text-lg focus:outline-none  focus:border-[var(--primary-color)]"
            
            />
            <div className="flex justify-between items-center">
              <Button Title="Sign In"/>
              <p className='text-lg text-[var(--primary-color)] underline cursor-pointer '>Forget Password ? </p>
            </div>
        </form>
        <p className="mt-4 ">Don&apos;t have an Account ? <span>
          <Link href="/signup" className=" underline">
          Sign up
          </Link>
          </span>
        </p>
    </div>
  )
}

export default LoginPage