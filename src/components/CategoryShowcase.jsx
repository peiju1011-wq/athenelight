import { useNavigate } from "react-router-dom"

export default function CategoryShowcase({ onSelect }){

const navigate = useNavigate()

const items = [
{ name:"室內", key:"indoor", img:"/images/products/p1.png", link:"/products/indoor" },
{ name:"室外", key:"indoor", img:"/images/products/p2.png", link:"/products/indoor" },
{ name:"節能", key:"indoor", img:"/images/products/p3.png", link:"/products/indoor" },
{ name:"多功能", key:"outdoor", img:"/images/products/p4.png", link:"/products/outdoor" },
{ name:"訂製服務", key:"outdoor", img:"/images/products/p5.png", link:"/products/outdoor" },
{ name:"規劃服務", key:"outdoor", img:"/images/products/p6.png", link:"/products/outdoor" },
]

const handleClick = (item)=>{
  onSelect(item.key)

  // 🔥 延遲讓動畫跑一下
  setTimeout(()=>{
    navigate(item.link)
  }, 250)
}

return(

<section className="mb-20">

<p className="text-[10px] tracking-[0.4em] text-[#bbb] mb-6 uppercase">
CATEGORY
</p>

<div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">

{items.map((item,i)=>(

<div
key={i}
onClick={()=>handleClick(item)}
className="
group cursor-pointer relative overflow-hidden bg-[#f6f6f6]
"
>

{/* 圖片 */}
<img
src={item.img}
className="
absolute inset-0 w-full h-full object-cover
transition duration-700 ease-out
group-hover:scale-[1.05]
"
/>

{/* 漸層 */}
<div className="
absolute inset-0
bg-gradient-to-t from-black/40 via-black/10 to-transparent
transition duration-700
group-hover:from-black/25
"/>

{/* 光滑過去（絲滑🔥） */}
<div className="
absolute inset-0
opacity-0 group-hover:opacity-100
transition duration-700 pointer-events-none
"
style={{
background:"linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
transform:"translateX(-120%)",
}}
/>

{/* 用 Tailwind group-hover 做動畫 */}
<div className="
absolute inset-0 pointer-events-none
group-hover:animate-[shine_1.2s_ease]
"/>


{/* 文字 */}
<div className={`
  absolute bottom-4 left-4
  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
  ${lang==="en" 
    ? "translate-y-6 group-hover:translate-y-0"
    : "translate-y-3 group-hover:translate-y-[-2px]"
  }
`}>

<p className="
text-[14px]
tracking-[0.18em]
text-white
drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
">
{item.name}
</p>

</div>

</div>

))}

</div>

</section>

)
}