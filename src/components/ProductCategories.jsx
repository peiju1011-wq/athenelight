export default function ProductCategories({ active, setActive }){

const items = [
  { label:"燈光系列", key:"ALL" },
  { label:"室內照明", key:"INDOOR" },
  { label:"戶外照明", key:"OUTDOOR" },
  { key:"LIGHTING_DESIGN", zh:"照明設計", en:"LIGHTING DESIGN" },
{ key:"INTERIOR_LIGHTING", zh:"室內燈具", en:"INTERIOR LIGHTING" },
{ key:"FESTIVAL", zh:"節慶", en:"FESTIVAL" },
{ key:"INSTALLATION", zh:"施工安裝", en:"INSTALLATION" },
{ key:"CUSTOM", zh:"訂製燈具", en:"CUSTOM LIGHTING" },
  { label:"智慧控制", key:"SMART" }
];

return(

<div className="flex gap-3 flex-wrap">

{items.map((item)=>{

const isActive = active === item.key

return(

<button
key={item.key}
onClick={()=>setActive(item.key)}
className={`
px-4 py-2 text-[12px] tracking-[0.1em] rounded-full transition

${isActive
? "bg-[#C8A48A] text-white shadow-[0_4px_12px_rgba(200,164,106,0.3)]"
: "bg-[#f2f2f2] text-[#666] hover:bg-[#C8A48A]/15 hover:text-[#111]"
}
`}
>
{item.label}
</button>

)

})}

</div>

)
}