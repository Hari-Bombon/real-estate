import { useState } from "react";
import {AiFillEyeInvisible ,AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth , createUserWithEmailAndPassword,updataProfile, updateProfile} from "firebase/auth"
import {db} from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";

export default function SignUp() {
  const[showPassword, setShowPassword] = useState(false);
  const[doc, setDoc] = useState();
  const [formData, setFormData] =useState({
    name:"",
    email:"",
    password:"",
  });
  const notify = () => toast.success("Vannakkam da mapla!",{
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
   
  const { name,email, password } = formData;
  const navigate = useNavigate()
  function onChange(e){
  setFormData((prevState)=>({
    ...prevState,
    [e.target.id]:e.target.value,
  
  }));
}
  async function onSubmit(e) {
    e.preventDefault();

    try{
      const auth = getAuth()
      const userCredential = await
      createUserWithEmailAndPassword
      (auth, email, password);
      updateProfile(auth.currentUser , {
        displayName: name
      })
      const user = userCredential.user;
      const formDataCopy ={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid),formDataCopy)
      toast.success("Sign up was success")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with registration")

    }

  }
  return (
   <section>
    <h1 className="text-3xl text-center mt-6 font-bold"> SignUp</h1>
    <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto"> 
      <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
        <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
         alt="key"
         className="w-full rounded-2xl"/>
      </div>
      <div className="w-full md:w-[127%] lg:w-[%] lg:ml-20">        
        {/* <form Onsubmit={onsubmit}> */}
        <input 
        type="text"
        id="name"
        value={name} 
        onChange={onchange}
        placeholder="Full name"
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
          <p> Have a account?
            <Link to="/sign-in" className="text-red-600 hover:text-red-700 
            transition duration-200 ease-in-out ml-1">Sign in</Link>
          </p>
          <p className="mb-6">
            <Link to="/forgot-password"  className="text-blue-600 hover:text-blue-800
             transition duration-200 ease-in-out ml-1">Forgot password?</Link>
          </p>
        </div>
        <button onClick={notify} className="w-full bg-blue-600 text-white px-7 py-3 
        text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 
        transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        type="submit">Sign Up</button>
        <div className=" flex 
        items-center my-4 
        before:border-t before:flex-1 
         before:border-gray-300 
         after:border-t after:flex-1 
         after:border-gray-300
         ">
          <p className="text-center font-semibold text mx-4">OR</p>
        </div>
        <OAuth />
        {/* </form> */}
        </div>
        </div>
   </section>
  )};
