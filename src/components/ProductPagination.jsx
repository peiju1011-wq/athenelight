export default function ProductPagination(){

return(

<div className="
flex items-center justify-center
gap-6
py-20
text-[13px]
tracking-[0.2em]
text-[#999]
">

<button className="hover:text-black transition">
PREV
</button>

<div className="flex gap-4">

<span className="text-[#999]">01</span>

<span className="text-black">02</span>

<span className="text-[#999]">03</span>

<span className="text-[#ccc]">…</span>

</div>

<button className="hover:text-black transition">
NEXT
</button>

</div>

)
}