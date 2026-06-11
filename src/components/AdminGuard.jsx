import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminGuard({ children }){

  const [loading,setLoading] =
    useState(true);

  const [user,setUser] =
    useState(null);

  useEffect(()=>{

    async function checkUser(){

      const {
        data,
        error
      } = await supabase.auth.getUser();

      if(error){
        console.log(error);
      }

      setUser(data?.user || null);

      setLoading(false);

    }

    checkUser();

  },[]);

  if(loading){

    return(

      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
        "
      >

        <div className="text-white/60">
          Loading...
        </div>

      </main>

    );

  }

  if(!user){

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return children;

}