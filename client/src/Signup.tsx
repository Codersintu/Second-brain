import { useRef, useState} from 'react'
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {emailAtom, passwordAtom, registerAtom, usernameAtom } from './Atom';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './Config';


function Signup() {
  const isRegistered=useRecoilValue(registerAtom)
  const setIsRegistered=useSetRecoilState(registerAtom)
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const setUsername=useSetRecoilState(usernameAtom)
  const setEmail=useSetRecoilState(emailAtom)
  const setPassword=useSetRecoilState(passwordAtom)
  const username=useRecoilValue(usernameAtom)
  const email=useRecoilValue(emailAtom)
  const password=useRecoilValue(passwordAtom)
  const [loadable,setloadable]=useState(true)
  const navigate=useNavigate()

 async function signup(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const username = usernameref.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }
    setloadable(false)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/register`, {
        username,
        email,
        password,
      });
      console.log(response);
       setIsRegistered(true)
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
    }finally{
      setloadable(true)
    }
  }

  // ----------- Signin Handler -----------

async function SigninHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }
     setloadable(false)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/login`, {
        email,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); // store token
      }
      navigate("/")

    } catch (error: any) {
      alert(error.response?.data?.message || "Signin failed");
    }finally{
      setloadable(true)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        {isRegistered ? (
          // ----------- Login Form -----------
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
            <form className="space-y-4">
              <input
              ref={emailRef}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
              ref={passwordRef}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
                required
              />
              <button
              onClick={SigninHandler}
                type="submit"
                className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                {loadable ? "Login" : "Loading..."}
              </button>
            </form>
            <p className="text-center mt-4">
              Don’t have an account?{" "}
              <span
                className="text-red-600 cursor-pointer font-semibold"
                onClick={() => setIsRegistered(false)}
              >
                Register
              </span>
            </p>
          </div>
        ) : (
          // ----------- Register Form -----------
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
            <form className="space-y-4">
              <input
              ref={usernameref}
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
              ref={emailRef}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
              ref={passwordRef}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
                required
              />
              <button
              onClick={signup}
                type="submit"
                className="w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                {loadable ? "Register" : "Loading..."}
              </button>
            </form>
            <p className="text-center mt-4">
              Do you have an account?{" "}
              <span
                className="text-red-600 cursor-pointer font-semibold"
                onClick={() => setIsRegistered(true)}
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup;