import React, {JSX} from "react";

const LoginBox = (): JSX.Element => {
  return (
    <div className="w-96 rounded-3xl bg-neutral-800 px-8 py-10 shadow-lg max-sm:px-8">
      <div className="text-white">
        <div className="mb-8 border-b border-b-gray-400 border-opacity-50 pb-8 flex flex-col items-center">
          <h1 className="mb-2 text-2xl">Login</h1>
          <span className="text-gray-300">Enter Login Details</span>
        </div>
        <form action="#">
          <div className="mb-4 text-md">
            <input
              className="w-full rounded-lg border-none bg-neutral-600 bg-opacity-50 px-6 py-3 text-center text-inherit placeholder:text-slate-200 outline-none"
              type="text" name="name" placeholder="your@email.com"/>
          </div>

          <div className="mb-4 text-md">
            <input
              className="w-full rounded-lg border-none bg-neutral-600 bg-opacity-50 px-6 py-3 text-center text-inherit placeholder:text-slate-200 outline-none"
              type="Password" name="name" placeholder="*********"/>
          </div>
          <div className="mt-8 flex justify-center text-md text-black">
            <button type="submit" className="rounded-full bg-emerald-800 hover:bg-emerald-600 px-10 py-3 text-white transition-colors duration-300">Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginBox;