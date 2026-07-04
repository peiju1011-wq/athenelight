import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminHome() {

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ===========================
  // Hero
  // ===========================

  const [heroTitleZh, setHeroTitleZh] = useState("");
  const [heroTitleEn, setHeroTitleEn] = useState("");

  const [heroSubZh, setHeroSubZh] = useState("");
  const [heroSubEn, setHeroSubEn] = useState("");

  const [heroVideo, setHeroVideo] = useState("");

  const [heroCover, setHeroCover] = useState("");
  const [heroCoverFile, setHeroCoverFile] = useState(null);

  // ===========================
  // Home Products
  // ===========================

  const [products, setProducts] = useState([]);

  // ===========================
  // Home Projects
  // ===========================

  const [projects, setProjects] = useState([]);

  // ===========================
  // Load
  // ===========================

  async function loadHome() {

    

    const { data, error } = await supabase
      .from("home_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    

if (data) {

   console.log("HOME DATA");
  console.log(data);

  console.log("HOME PRODUCTS");
  console.log(data.products);

  console.log("HOME PROJECTS");
  console.log(data.projects);

console.log(data.products);
console.log(Array.isArray(data.products));

  setHeroTitleZh(data.hero_title_zh || "");
  setHeroTitleEn(data.hero_title_en || "");

  setHeroSubZh(data.hero_sub_zh || "");
  setHeroSubEn(data.hero_sub_en || "");

  setHeroVideo(data.hero_video || "");

  setHeroCover(data.hero_cover || "");

setProducts(
  typeof data.products === "string"
    ? JSON.parse(data.products)
    : Array.isArray(data.products)
      ? data.products
      : [
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" }
        ]
);

setProjects(
  typeof data.projects === "string"
    ? JSON.parse(data.projects)
    : Array.isArray(data.projects)
      ? data.projects
      : [
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" },
          { image:"", link:"" }
        ]
);

}

setLoading(false);

  }

  useEffect(() => {
    loadHome();
  }, []);


async function handleSave(){

  setSaving(true);

  let finalHeroCover = heroCover;

  // Hero Cover
  if(heroCoverFile){

    const ext =
      (heroCoverFile.name.split(".").pop() || "jpg")
        .toLowerCase();

    const fileName =
      `hero.${ext}`;

    const { error: uploadError } =
      await supabase.storage
        .from("home")
        .upload(
          fileName,
          heroCoverFile,
          {
            upsert:true
          }
        );

    if(uploadError){

      alert(uploadError.message);

      setSaving(false);

      return;

    }

    const { data } =
      supabase.storage
        .from("home")
        .getPublicUrl(fileName);

    finalHeroCover =
      `${data.publicUrl}?v=${Date.now()}`;

  }

  // Products
  const saveProducts=[...products];

  for(let i=0;i<saveProducts.length;i++){

    if(saveProducts[i].file){

      const ext =
        (saveProducts[i].file.name.split(".").pop() || "jpg")
          .toLowerCase();

    
        const fileName =
  `product-${i}.${ext}`;

      const { error } =
        await supabase.storage
          .from("home")
          .upload(
            fileName,
            saveProducts[i].file,
            {
              upsert:true
            }
          );

      if(error){

        alert(error.message);

        setSaving(false);

        return;

      }

      const { data } =
        supabase.storage
          .from("home")
          .getPublicUrl(fileName);

      saveProducts[i].image =
        `${data.publicUrl}?v=${Date.now()}`;

    }

    delete saveProducts[i].file;
    delete saveProducts[i].preview;

  }

  // Projects
  const saveProjects=[...projects];

  for(let i=0;i<saveProjects.length;i++){

    if(saveProjects[i].file){

      const ext =
        (saveProjects[i].file.name.split(".").pop() || "jpg")
          .toLowerCase();

    const fileName =
  `project-${i}.${ext}`;

      const { error } =
        await supabase.storage
          .from("home")
          .upload(
            fileName,
            saveProjects[i].file,
            {
              upsert:true
            }
          );

      if(error){

        alert(error.message);

        setSaving(false);

        return;

      }

      const { data } =
        supabase.storage
          .from("home")
          .getPublicUrl(fileName);

      saveProjects[i].image =
        `${data.publicUrl}?v=${Date.now()}`;

    }

    delete saveProjects[i].file;
    delete saveProjects[i].preview;

  }

  const { error } =
    await supabase
      .from("home_settings")
      .update({

        hero_title_zh:heroTitleZh,
        hero_title_en:heroTitleEn,

        hero_sub_zh:heroSubZh,
        hero_sub_en:heroSubEn,

        hero_video:heroVideo,
        hero_cover:finalHeroCover,

        products:saveProducts,
        projects:saveProjects

      })
      .eq("id",1);

  setSaving(false);

  if(error){

    alert(error.message);

    return;

  }

 alert("首頁更新成功");

loadHome();

}




  if (loading) {

    return (

      <main className="pt-[140px] px-10 text-white">
        Loading...
      </main>

    );

  }

    return (

    <main className="pt-[140px] pb-24 px-10 max-w-[1200px] mx-auto">

      <h1 className="text-4xl text-white mb-12">
        Home Management
      </h1>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

<section className="mb-20">

  <h2 className="text-2xl text-[#C8A46A] mb-8">
    Hero
  </h2>

  <p className="text-white/60 mb-2">
    Hero 主標（中文）
  </p>

  <input
    value={heroTitleZh}
    onChange={(e)=>setHeroTitleZh(e.target.value)}
    placeholder="例如：ATHENE LIGHT"
    className="
      w-full
      p-4
      mb-6
      border
      border-white/10
      bg-white
      text-black
      text-lg
    "
  />

  <p className="text-white/60 mb-2">
    Hero 主標（英文）
  </p>

  <input
    value={heroTitleEn}
    onChange={(e)=>setHeroTitleEn(e.target.value)}
    placeholder="Example：ATHENE LIGHT"
    className="
      w-full
      p-4
      mb-6
      border
      border-white/10
      bg-white
      text-black
      text-lg
    "
  />

  <p className="text-white/60 mb-2">
    Hero 副標（中文）
  </p>

  <textarea
    rows="3"
    value={heroSubZh}
    onChange={(e)=>setHeroSubZh(e.target.value)}
    placeholder="例如：光，為空間留下溫度"
    className="
      w-full
      p-4
      mb-6
      border
      border-white/10
      bg-white
      text-black
    "
  />

  <p className="text-white/60 mb-2">
    Hero 副標（英文）
  </p>

  <textarea
    rows="3"
    value={heroSubEn}
    onChange={(e)=>setHeroSubEn(e.target.value)}
    placeholder="Example：Leave Warmth in Every Space"
    className="
      w-full
      p-4
      mb-8
      border
      border-white/10
      bg-white
      text-black
    "
  />

<p className="text-white/60 mb-2">
  Hero 影片網址
</p>

<input
  value={heroVideo}
  onChange={(e)=>setHeroVideo(e.target.value)}
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>

{heroVideo && (

  <>

    <p className="text-white/60 mb-2">
      目前影片
    </p>

<video
  src={heroVideo}
  controls
  muted
  playsInline
  preload="metadata"
  poster={heroCover}
  className="
    w-full
    max-h-[420px]
    rounded
    border
    border-white/10
    bg-black
    mb-8
  "
/>

  </>

)}

<p className="text-white/60 mb-2">
  Hero 封面圖片
</p>

{(heroCover || heroCoverFile) && (

  <>
    <img
      src={
        heroCoverFile
          ? URL.createObjectURL(heroCoverFile)
          : heroCover
      }
      alt=""
     className="
  w-full
  max-h-[420px]
  object-contain
  rounded
  border
  border-white/10
  bg-[#111]
"
    />

    <p className="text-xs text-white/50 mb-4">
      {heroCoverFile
        ? heroCoverFile.name
        : heroCover
          ? heroCover.split("/").pop()
          : ""}
    </p>

  </>

)}


<p className="text-white/60 mb-2">
  更換圖片
</p>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    setHeroCoverFile(file);

  }}
  className="
    w-full
    p-3
    mb-12
    border
    bg-white
    text-black
  "
/>

</section>

{/* ==================================== */}
{/* 首頁精選產品 */}
{/* ==================================== */}

<section className="mb-20">

  <h2 className="text-2xl text-[#C8A46A] mb-8">
    首頁精選產品
  </h2>
        {products.map((item,index)=>(

  <div
    key={index}
    className="
      border
      border-white/10
      rounded-xl
      p-6
      mb-10
    "
  >

    <h3 className="text-white text-lg mb-6">
      Product {index + 1}
    </h3>

  

<p className="text-white/60 mb-2">
  圖片點擊連結
</p>

<input
  value={item.link || ""}
  onChange={(e)=>{

    const arr = [...products];

    arr[index].link = e.target.value;

    setProducts(arr);

  }}
  placeholder="/zh/lights/linear-light"
  className="w-full p-3 mb-4 border bg-white text-black"
/>

<p className="text-white/60 mb-2">
  目前圖片
</p>

{(item.image || item.preview) && (

  <div className="mb-4">

    <img
      src={item.preview || item.image}
      alt=""
     className="
  w-full
  max-h-[320px]
  object-contain
  rounded
  border
  border-white/10
  bg-[#111]
"
    />

    <p className="text-xs text-white/50 mt-2 break-all">

      {item.file
        ? item.file.name
        : item.image?.split("/").pop()}

    </p>

  </div>

)}

<p className="text-white/60 mb-2">
  更換圖片
</p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>{

        const file=e.target.files[0];

        if(!file) return;

        const arr=[...products];

        arr[index].file=file;

        arr[index].preview=
          URL.createObjectURL(file);

        setProducts(arr);

      }}
      className="
        w-full
        p-3
        border
        bg-white
        text-black
      "
    />

  </div>

))}

</section>

{/* ====================================================== */}
{/* 首頁精選案例 */}
{/* ====================================================== */}

<section className="mb-20">

  <h2 className="text-2xl text-[#C8A46A] mb-8">
    首頁精選案例
  </h2>

  {projects.map((item,index)=>(

<div
  key={index}
  className="
    border
    border-white/10
    rounded-xl
    p-8
    mb-12
  "
>

    <h3 className="text-white text-lg mb-6">
      Project {index + 1}
    </h3>

<p className="text-white/60 mb-2">
  圖片點擊連結
</p>

<input
  value={item.link || ""}
  onChange={(e)=>{

    const arr = [...projects];

    arr[index].link = e.target.value;

    setProjects(arr);

  }}
  placeholder="/zh/projects/project-1"
  className="w-full p-3 mb-4 border bg-white text-black"
/>

<p className="text-white/60 mb-2">
  目前圖片
</p>

{(item.image || item.preview) && (

  <div className="mb-4">

    <img
      src={item.preview || item.image}
      alt=""
   className="
  w-full
  max-h-[320px]
  object-contain
  rounded
  border
  border-white/10
  bg-[#111]
"
    />

    <p className="text-xs text-white/50 mt-2 break-all">

      {item.file
        ? item.file.name
        : item.image?.split("/").pop()}

    </p>

  </div>

)}

<p className="text-white/60 mb-2">
  更換圖片
</p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>{

        const file=e.target.files[0];

        if(!file) return;

        const arr=[...projects];

        arr[index].file=file;

        arr[index].preview=
          URL.createObjectURL(file);

        setProjects(arr);

      }}
      className="
        w-full
        p-3
        border
        bg-white
        text-black
      "
    />

  </div>

))}

<div className="mt-16">

  <button
    onClick={handleSave}
    disabled={saving}
    className="
      px-8
      py-4
      bg-[#C8A46A]
      rounded
      text-black
      hover:opacity-80
      disabled:opacity-50
    "
  >
    {saving
      ? "儲存中..."
      : "儲存首頁設定"}
  </button>

  

</div>

</section>

</main>

);

}