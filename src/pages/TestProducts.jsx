import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function TestProducts(){

  const [products,setProducts] = useState([]);

useEffect(() => {

  async function load(){

    const { data,error } = await supabase
      .from("products")
      .select("*");

console.log("DATA:", data);
console.log("ERROR:", error);
console.log("MESSAGE:", error?.message);

    if(data){
      setProducts(data);
    }

  }

  load();

},[]);

return (

  <div className="pt-[180px] px-10">

    <h1 className="text-3xl mb-10">
      Supabase Test
    </h1>

    {products.map(item => (

      <div
        key={item.id}
        className="mb-4 border p-4"
      >
        <p>{item.title_zh}</p>
        <p>{item.title_en}</p>
        <p>{item.slug}</p>
      </div>

    ))}

  </div>

);
}