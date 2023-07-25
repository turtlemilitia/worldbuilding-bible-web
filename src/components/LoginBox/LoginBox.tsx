import React, {JSX} from "react";
import PrimaryButton from "../Forms/Fields/PrimaryButton";
import LoginForm from "../Forms/LoginForm";

const LoginBox = (): JSX.Element => {
  return (
    <div className="w-96 rounded-3xl bg-neutral-800 px-8 py-10 bg-opacity-50 backdrop-blur-md shadow-lg max-sm:px-8">
      <div className="text-white">
        <div className="mb-8 border-b border-b-amber-300 border-opacity-50 pb-8 flex flex-col items-center">
          <h1 className="mb-2 text-2xl">Login</h1>
          <span className="text-stone-300">Enter Login Details</span>
        </div>
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginBox;