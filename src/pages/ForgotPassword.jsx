import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import{toast} from "react-toastify";
import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] =useState("");

  function onChange(e) {
  setEmail(e.target.value);
  }

  async function onSubmit(){
    e.preventDefault()
    try{
      const auth = getAuth()
      await sendPasswordResetEmail(auth , email)
      toast.success("Email was sent");

    }catch(error){
      toast.error("Could not send reset password")
    }
  }
  return (
   <section>
    <h1 className="text-3xl text-center mt-6 font-bold"> Forgot Password</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto"> 
      <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
        <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
         alt="key"
         className="w-full rounded-2xl"/>
      </div>       
        <div className="w-full md:w-[127%] lg:w-[%] lg:ml-20">
          < form onSubmit={onSubmit}>
        <input 
        type="email"
        id="email"
        value={email} 
        onChange={onchange}
        placeholder="Email address"
        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
        rounded transition ease-in-out"/>
        < div className="relative">
        <input
         type={showPassword ? "text" : "password"}
        id="password "
        value={password} 
        onChange={onchange}
        placeholder="Password"
        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
        rounded transition ease-in-out"
        />
        {showPassword ?( 
           <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer " 
           onClick={()=>setShowPassword
           ((prevState)=>!prevState)}
            />
           ) : (
           <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer "
           onClick={()=>setShowPassword
           ((prevState)=>!prevState)} />
           
           )}
        </div>
        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
          <p>Don't have a account?
            <link to="/sign-up" className="text-red-600 hover:text-red-700 
            transition duration-200 ease-in-out ml-1">Register</link>
          </p>
          <p className="mb-6">
            <link to="/sign-in"  className="text-blue-600 hover:text-blue-800
             transition duration-200 ease-in-out ml-1">Sign in instead</link>
          </p>
        </div>
        <button className="w-full bg-blue-600 text-white px-7 py-3 
        text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 
        transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        type="submit">Send reset password</button>
        <div classname=" flex 
        items-center my-4 
        before:border-t before:flex-1 
         before:border-gray-300 
         after:border-t after:flex-1 
         after:border-gray-300
         ">
          <p className="text-center font-semibold text mx-4">= OR</p>
        </div>
        <OAuth />
        </form>
        </div>
        </div>
   </section>
  )};