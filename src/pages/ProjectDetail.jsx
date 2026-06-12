import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";

export default function ProjectDetail(){

  const { projectId } = useParams();

  useEffect(() => {

  async function loadProject(){

    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", projectId)
      .single();

if(data){
  console.log("PROJECT");
  console.log(data);

  console.log("COVER");
  console.log(data.cover);

  setProject(data);
}

  }

  loadProject();

}, [projectId]);
  const navigate = useNavigate();
  const location = useLocation();

  const isEnglish = location.pathname.startsWith("/en");

  const [project,setProject] = useState(null);

const [current, setCurrent] = useState(0);
useEffect(() => {

  setCurrent(0);

}, [projectId]);


const images = [
  ...(project?.images || [])
].filter(Boolean);


console.log("SLIDER");
console.log(images);



useEffect(()=>{

  if(images.length <= 1) return;

  const timer = setInterval(()=>{
    setCurrent(prev => (prev + 1) % images.length);
  },4000);

  return ()=>clearInterval(timer);

},[images.length]);



  if(!project){
    return (
      <div className="min-h-screen flex items-center justify-center text-[#999]">
        Project not found
      </div>
    );
  }

  const title =
  isEnglish
    ? project.title_en
    : project.title_zh;
const desc =
  isEnglish
    ? project.desc_en
    : project.desc_zh;
 const category = project.category || "";

  const locationText = isEnglish
    ? (project.location_en || "Taiwan")
    : (project.location || "台灣");



console.log("cover =", project.cover);
return(
<>
  <Helmet>
    <title>
      {project.seo_title ||
        `${project.title_zh}｜ATHENE LIGHT`}
    </title>

    <meta
      name="description"
      content={
        project.seo_description ||
        `${project.title_zh} ${project.category} 案例介紹`
      }
    />


    <meta
  property="og:title"
  content={
    project.seo_title ||
    `${project.title_zh}｜ATHENE LIGHT`
  }
/>

<meta
  property="og:description"
  content={
    project.seo_description ||
    `${project.title_zh} ${project.category} 案例介紹`
  }
/>

<meta
  property="og:image"
  content={project.cover}
/>

<meta
  property="og:type"
  content="website"
/>
  </Helmet>



   <main className="flex flex-col lg:flex-row min-h-screen bg-white">

      {/* ================= 左圖 ================= */}
<div className="
  relative
  w-full

  

  h-[60vh]
  sm:h-[38vh]
  md:h-[75vh]
  lg:h-screen

  bg-black
  overflow-hidden
">

 



{images.map((img,i)=>{

  console.log("RENDER", img);

  

  return(

    

  <div
    key={i}
    className={`
      absolute
      inset-x-0
      top-[70px]
      bottom-0
      z-0

      transition-all
      duration-[1400ms]
      ease-[cubic-bezier(0.22,1,0.36,1)]

      ${
        i===current
          ? "opacity-100 scale-100"
          : "opacity-0 scale-105"
      }
    `}
  >
<img
  src={
    typeof img === "string"
      ? img
      : img?.src
  }
  alt={img?.alt || project.title_zh}
style={{
  objectPosition:
    typeof img === "string"
      ? "center"
      : img?.position || "center"
}}
  className="
    w-full
    h-full
    object-cover
  "
  onError={()=>{
    console.log("IMAGE ERROR");
    console.log(img);
  }}
/>
    <div
      className="
        absolute
        inset-0
        pointer-events-none
        bg-gradient-to-r
        from-black/35
        via-black/10
        to-transparent
      "
    />

  </div>




  );

})}




        {/* ===== BACK（完全修好🔥） ===== */}
        <button
          onClick={()=>navigate(-1)}
className="
  absolute top-[100px] left-4 lg:top-[110px] lg:left-12 z-[999]

  flex items-center gap-2 lg:gap-3

  text-white text-[10px] lg:text-[11px] tracking-[0.35em]

  px-3 py-1.5 lg:px-6 lg:py-2 rounded-full

  bg-black/20 lg:bg-black/60 backdrop-blur-md

  hover:bg-black/70 transition-all duration-500
"
        >
<span className="text-sm lg:text-lg leading-none">←</span>
<span className="hidden lg:inline">BACK</span>
<span className="lg:hidden">BACK</span>
        </button>

        {/* ===== dots ===== */}
       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:right-14 flex gap-4 z-50">

         {images.map((_,i)=>(
            <div
              key={i}
              onClick={()=>setCurrent(i)}
              className="relative cursor-pointer w-4 h-4 flex items-center justify-center"
            >
              <div className={`
                absolute w-4 h-4 rounded-full
                border border-white/60
                transition-all duration-500
                ${i===current ? "scale-125 opacity-100" : "scale-75 opacity-0"}
              `}/>

              <div className={`
                w-2 h-2 rounded-full
                transition-all duration-500
                ${i===current ? "bg-white scale-110" : "bg-white/40"}
              `}/>
            </div>
          ))}

        </div>

      </div>


      {/* ================= 右文字 ================= */}
  <div className="w-full lg:w-[32%] px-6 md:px-10 lg:px-14 py-16 lg:py-24 flex flex-col bg-[#f8f8f8]">

        <p className="text-[11px] tracking-[0.45em] text-[#6B8BD6] mb-6">
         {category}
        </p>

    <h1 className="text-[26px] md:text-[32px] lg:text-[36px] leading-[1.35] text-[#111] mb-6 tracking-[0.05em]">
          {title}
        </h1>

        <p className="text-[12px] tracking-[0.25em] text-[#999] mb-12">
          {locationText}
        </p>

        <div className="w-12 h-[1px] bg-[#ddd] mb-12"/>

       <p className="text-[14px] leading-[2] text-[#666] mb-12 lg:mb-20 max-w-full lg:max-w-[320px]">
          {desc}
        </p>

        <div className="mt-auto pt-10 border-t border-[#eee] space-y-6">

          <div className="flex justify-between items-center">
            <span className="text-[10px] tracking-[0.3em] text-[#aaa]">
              YEAR
            </span>
            <span className="text-[14px] text-[#333]">
              {project.year}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[10px] tracking-[0.3em] text-[#aaa]">
              CLIENT
            </span>
            <span className="text-[14px] text-[#333]">
              {project.client}
            </span>
          </div>

        </div>

      </div>

</main>
</>
);
}
