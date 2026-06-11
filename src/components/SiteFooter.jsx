import { Link } from "react-router-dom";
import useLang from "../hooks/useLang";
import { text } from "../data/text";

export default function SiteFooter() {

  const lang = useLang();
  const t = text;

  return (
    <footer className="bg-[#eceae6] text-[#444] pt-20 pb-12">

      <div className="max-w-[1100px] mx-auto px-6">

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-14">

          {/* BRAND */}
          <div>
           <h3 className="text-[#1a1a1a] text-lg tracking-[0.12em] mb-2 font-semibold">
              {lang === "en" ? "Athene Light" : "宇碩光"}
              <span className="block text-[10px] tracking-[0.35em] text-[#999] mt-1">
                ATHENE LIGHT
              </span>
            </h3>

            <p className="text-[#6b6b6b] text-sm leading-7 max-w-[260px] mt-4">
              {t?.footer?.desc?.[lang]}
            </p>
          </div>


          {/* PRODUCTS */}
          <div>
            <h4 className="text-[#C8A46A] text-[11px] tracking-[0.35em] mb-6">
              {t?.footer?.products?.title?.[lang]}
            </h4>

            <ul className="space-y-3 text-[13px]">
              {t?.footer?.products?.items?.map((item,i)=>(
                <li key={i}>
                  <Link to="/products" className="hover:text-[#C8A46A] transition">
                    {item?.[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* COMPANY（🔥已支援下載） */}
          <div>
            <h4 className="text-[#C8A46A] text-[11px] tracking-[0.35em] mb-6">
              {t?.footer?.company?.title?.[lang]}
            </h4>

            <ul className="space-y-3 text-[13px]">

              {t?.footer?.company?.items?.map((item,i)=>{

                const textLabel = item?.label?.[lang];

                // 🔥 PDF下載
                if(item.download){
                  return (
                    <li key={i}>
                      <a
                        href={item.link}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#C8A46A] transition flex items-center gap-2"
                      >
                        {textLabel}
                        <span className="text-[10px] opacity-60">↓</span>
                      </a>
                    </li>
                  );
                }

                // 🔥 一般頁面
                return (
                  <li key={i}>
                    <Link to={item.link} className="hover:text-[#C8A46A] transition">
                      {textLabel}
                    </Link>
                  </li>
                );

              })}

            </ul>
          </div>


          {/* SOCIAL */}
          <div>
            <h4 className="text-[#C8A46A] text-[11px] tracking-[0.35em] mb-6">
              {t?.footer?.connect?.title?.[lang]}
            </h4>

            <div className="flex gap-3">

              {t?.footer?.connect?.items?.map((item,i)=>{

                const baseClass = `
                  text-[11px]
                  
                  px-3 py-2
                  border border-[#d8d4cc]
                  rounded-full
                  hover:border-[#C8A46A]
                  hover:text-[#C8A46A]
                  transition
                `;

                if(item.type === "external"){
                  return (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={baseClass}
                    >
                   <>
  {item.label === "FB" && (
    <svg
      viewBox="0 0 26 24"
      className="w-[16px] h-[16px]"
      fill="currentColor"
    >
      <path d="M14 8.5h2V5.2c-.35-.05-1.55-.15-2.95-.15-2.9 0-4.9 1.8-4.9 5.15v2.9H5v3.7h3.15V24h3.9v-7.2h3.05l.5-3.7h-3.55v-2.55c0-1.05.3-2.05 1.95-2.05Z"/>
    </svg>
  )}

  {item.label === "LINE" && (
    <svg
      viewBox="0 0 24 24"
      className="w-[18px] h-[18px]"
      fill="none"
    >
      <path
        d="M12 4C7.6 4 4 6.85 4 10.35c0 3.15 2.85 5.8 6.7 6.3L12 20l2.15-3.25C17.5 16.1 20 13.55 20 10.35 20 6.85 16.4 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )}
</>
                    </a>
                  );
                }

return (
  <Link key={i} to={item.link} className={baseClass}>

    {item.label === "MAIL" ? (
      <svg
        viewBox="0 0 24 24"
        className="w-[18px] h-[18px]"
        fill="none"
      >
        <path
          d="M4 6.5h16v11H4v-11Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 7l7.5 6 7.5-6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      item.label
    )}

  </Link>
);

              })}

            </div>
          </div>

        </div>


        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-[#dcd8d0] text-[11px] text-[#888] flex flex-col md:flex-row justify-between gap-4">

          <p>© 2026 ATHENE LIGHT</p>

          <div className="flex gap-6">
            <span className="hover:text-[#C8A46A] cursor-pointer">
              {t?.footer?.privacy?.[lang]}
            </span>
            <span className="hover:text-[#C8A46A] cursor-pointer">
              {t?.footer?.terms?.[lang]}
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}