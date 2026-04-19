const products = [
{
name:"裝飾吊燈",
category:"indoor",
img:"/images/products/p1.png"
},
{
name:"嵌入式筒燈",
category:"indoor",
img:"/images/products/p2.png"
},
{
name:"軌道燈",
category:"indoor",
img:"/images/products/p3.png"
},
{
name:"階梯燈",
category:"outdoor",
img:"/images/products/p4.png"
},
{
name:"水下燈",
category:"outdoor",
img:"/images/products/p5.png"
},
{
name:"智慧控制系統",
category:"smart",
img:"/images/products/p8.png"
},
]

export default function ProductCardWall({ active }){

const filtered =
active === "all"
? products
: products.filter(p=>p.category===active)

return(

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">

{filtered.map((p,i)=>(

<div key={i} className="group cursor-pointer">

{/* 圖片 */}
<div className="
relative overflow-hidden bg-[#f5f5f5]
aspect-[4/5]
">

<img
src={p.img}
className="
w-full h-full object-cover
transition duration-700 ease-out
group-hover:scale-[1.03]
"
/>

{/* 🔥 微金光（重點） */}
<div className="
absolute inset-0 opacity-0 group-hover:opacity-100
transition duration-500 pointer-events-none
"
style={{
boxShadow:"inset 0 -60px 120px rgba(0,0,0,0.25), 0 20px 60px rgba(201,162,91,0.15)"
}}
/>

</div>

{/* 文字 */}
<div className="mt-4">

<p className="
text-[13px]
tracking-[0.06em]
text-[#111]
group-hover:text-[#c9a25b]
transition
">
{p.name}
</p>

</div>

</div>

))}

</div>

)
}