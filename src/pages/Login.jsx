import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  useEffect(()=>{

    supabase.auth.getUser()
      .then(({data})=>{

        if(data.user){

          navigate("/admin");

        }

      });

  },[]);

  async function handleLogin(){

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password

      });

    if(error){
      alert(error.message);
      return;
    }

    navigate("/admin");

  }



  return(

    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        
      "
    >

      <div className="w-[360px] space-y-4">

        <h1 className="text-3xl text-center">
          Admin Login
        </h1>

<input
  value={email}
  onChange={(e)=>
    setEmail(e.target.value)
  }
  placeholder="Email"
  className="
    w-full
    border
    p-3
    bg-white
    text-black
  "
/>

<input
  type="password"
  value={password}
  onChange={(e)=>
    setPassword(e.target.value)
  }
  placeholder="Password"
  className="
    w-full
    border
    p-3
    bg-white
    text-black
  "
/>
        <button
          onClick={handleLogin}
          className="
            w-full
            bg-black
            text-white
            py-3
          "
        >
          Login
        </button>

      </div>

    </main>

  );

}
