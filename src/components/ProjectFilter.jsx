export default function ProjectFilter({ active, setActive }) {

  const lang = useLang();

  const filters = [
    { zh: "全部", en: "ALL" },
    { zh: "建築外觀", en: "ARCHITECTURE" },
    { zh: "室內空間", en: "INTERIOR" },
    { zh: "景觀照明", en: "LANDSCAPE" }
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
          const isActive = label === active;

          return (

            <button
              key={label}
              onClick={() => setActive(label)}
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
                  absolute left-0 -bottom-2 h-[1px] bg-[#111]
                  transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />

            </button>

          );

        })}

      </div>

    </div>
  );
}
