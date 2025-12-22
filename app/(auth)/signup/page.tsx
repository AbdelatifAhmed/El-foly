import Button from "@/components/common/Button"
import Image from "next/image"
import Link from "next/link"
const SignupPage = () => {
  return (
    <div className="flex flex-col items-center width-full ">
       <div className="mb-6 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold tracking-[0.2em]">Create an Account</h3>
        <p className="text-lg">Sign up to get started!</p>
       </div>
        <form className="w-full flex flex-col gap-10 pr-4">
            <input 
            type="text"
            placeholder="Name"
            className="w-full border-b-1 border-black text-lg focus:outline-none  focus:border-[var(--primary-color)]"
            
            />
            <input 
            type="email"
            placeholder="Email or Phone"
            className="w-full border-b-1 border-black  text-lg focus:outline-none  focus:border-[var(--primary-color)]"
            
            />
            <input 
            type="password"
            placeholder="Password"
            className="w-full border-b-1 border-black  text-lg focus:outline-none  focus:border-[var(--primary-color)]"
            
            />
            <div className="flex flex-col gap">
              <Button Title="Create Account"/>
              <button  className="w-full mt-4 py-3 px-4 border border-gray-300 rounded-lg text-lg
               font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer flex justify-center items-center">
                <Image 
                src="/images/Google-Symbol.png"
                width={24}
                height={24}
                alt='Google symbol'
                />
                Sign up with Google
              </button>
            </div>
        </form>
        <p className="mt-4 ">Already have an Account ? <span>
          <Link href="/login" className=" underline">
          Log in
          </Link>
          </span>
        </p>
    </div>
  )
}

export default SignupPage