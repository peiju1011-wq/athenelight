import { useParams, useNavigate } from "react-router-dom";
import useLang from "../hooks/useLang";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function NewsDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();
  const lang = useLang();

 const [news, setNews] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {

async function loadNews(){

  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if(data){
    setNews(data);
  }

  setLoading(false);
}

  loadNews();

}, [slug]);

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
  Loading...
</main>
  );
}

if (!news) {
    return (
     <main className="min-h-screen bg-black pt-[180px] pb-32 text-center text-white">

        <h1 className="text-3xl mb-6">
          404
        </h1>

        <p className="text-gray-500 mb-8">
          {lang === "en"
            ? "News not found."
            : "找不到此文章"}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border"
        >
          {lang === "en"
            ? "Back"
            : "返回"}
        </button>

      </main>
    );
  }

  return (

    <main className="bg-black min-h-screen pt-[140px] pb-28">

      <div className="max-w-[900px] mx-auto px-6">

        {/* 返回 */}

<button
  onClick={() => navigate(-1)}
  className="
    inline-flex
    items-center
    gap-3

    mb-10

    text-white
    text-[11px]
    tracking-[0.35em]

    px-6
    py-3

    rounded-full

    bg-[#3A3A3A]

    hover:bg-[#4A4A4A]

    transition-all
    duration-300
  "
>
  <span className="text-lg leading-none">←</span>

<span>
  {lang === "en" ? "BACK" : "返回"}
</span>
</button>

{/* 影片 / 圖片 */}

{news.video ? (

 <video
  src={news.video}
  poster={news.cover || undefined}
  controls
  playsInline
  preload="metadata"
  className="w-full rounded-xl mb-10"
/>

) : news.cover ? (

  <img
    src={news.cover}
    alt={
      lang === "en"
        ? news.title_en
        : news.title_zh
    }
    className="w-full rounded-xl mb-10"
  />

) : null}

        {/* 標題 */}

<h1
  className="
    text-white
    text-center
    text-[22px]
    md:text-[32px]
    tracking-[0.08em]
    mb-8
  "
>
  {lang === "en"
    ? news.title_en
    : news.title_zh}
</h1>

        {/* 內文 */}

<div
  className="
    text-white/70
    text-left
    text-[15px]
    leading-9
    max-w-[760px]
    mx-auto
    mb-12
  "
  dangerouslySetInnerHTML={{
    __html:
      lang === "en"
        ? news.content_en || news.desc_en
        : news.content_zh || news.desc_zh
  }}
/>





        {/* Facebook 外連 */}



      </div>

    </main>

  );
}