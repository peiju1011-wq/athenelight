import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminNews(){

  const [news,setNews] = useState([]);

  useEffect(()=>{

    async function loadNews(){

const { data, error } = await supabase
  .from("news")
  .select("*")
  .order("sort_order");

if (error) {
  alert(error.message);
  return;
}

      setNews(data || []);
    }

    loadNews();

  },[]);

  return(

    <main className="pt-[140px] px-10 pb-20">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl text-white">
          News
        </h1>

      </div>

      <div className="space-y-4">

        {news.map(item=>(

          <div
            key={item.id}
            className="
              flex
              justify-between
              items-center
              border
              border-white/10
              rounded-xl
              p-6
            "
          >

            <div>

              <h2 className="text-white text-xl">
                {item.title_zh}
              </h2>

              <p className="text-white/40 text-sm">
                {item.slug}
              </p>

            </div>

            <Link
              to={`/admin/news/${item.slug}`}
              className="
                px-5
                py-2
                rounded
                bg-[#C8A46A]
                text-black
              "
            >
              EDIT
            </Link>

          </div>

        ))}

      </div>

    </main>

  );

}