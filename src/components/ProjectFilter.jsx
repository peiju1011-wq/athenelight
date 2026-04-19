export default function ProjectFilter({ active, setActive }) {

const filters = [
  "全部",
  "建築外觀",
  "室內空間",
  "景觀照明"
]

return (

<div className="
px-6 md:px-10 lg:px-10   /* 🔥 關鍵：和圖片一樣 */
mb-0
">

  <div className="
  flex gap-10
  overflow-x-auto whitespace-nowrap
  pb-8
  ">

  {filters.map((item) => {

    const isActive = item === active

    return (

      <button
        key={item}
        onClick={() => setActive(item)}
        className="group relative text-[12px] tracking-[0.2em] uppercase"
      >

        {/* 文字 */}
        <span
          className={`
          transition duration-300
          ${isActive ? "text-[#111]" : "text-[#999] group-hover:text-[#111]"}
          `}
        >
          {item}
        </span>

        {/* 🔥 底線動畫 */}
        <span
          className={`
          absolute left-0 -bottom-2 h-[1px] bg-[#111]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />

      </button>

    )

  })}

  </div>

</div>

)
}