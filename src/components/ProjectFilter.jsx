export default function ProjectFilter({ active, setActive }) {

  const lang = useLang();

const filters = [
  { zh: "全部", en: "ALL" },
  { zh: "照明設計", en: "LIGHTING" },
  { zh: "外牆", en: "FACADE" },
  { zh: "景觀", en: "LANDSCAPE" },
  { zh: "商業空間", en: "COMMERCIAL" },
  { zh: "室內空間", en: "INTERIOR" },
  { zh: "亮化工程", en: "ILLUMINATION" },
  { zh: "燈會", en: "FESTIVAL" }
];

  return (

    <div className="px-6 md:px-10 lg:px-10 mb-0">

      <div className="
        flex gap-8
        overflow-x-auto whitespace-nowrap
        pb-8
      ">

        {filters.map((item) => {

          const label = lang === "en" ? item.en : item.zh;
const isActive = item.en === active;

          return (

            <button
              key={label}
              onClick={() => setActive(item.en)}
              className={`
                group relative text-[12px]

                ${lang === "en"
                  ? "tracking-[0.12em] uppercase"
                  : "tracking-[0.2em]"
                }
              `}
            >

              {/* 文字 */}
              <span
                className={`
                  transition duration-300
                  ${isActive
                    ? "text-[#111]"
                    : "text-[#999] group-hover:text-[#111]"
                  }
                `}
              >
                {label}
              </span>

              {/* 底線動畫 */}
           <span
  className={`
    absolute left-0 -bottom-2 w-full h-[1px] bg-[#111]
    origin-left scale-x-0
    transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

    ${isActive ? "scale-x-100" : "group-hover:scale-x-100"}
  `}
/>

            </button>

          );

        })}

      </div>

    </div>
  );
}