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
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link key={i} to={item.link} className={baseClass}>
                    {item.label}
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