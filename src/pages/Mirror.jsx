import { Link } from "react-router-dom";
import useLang from "../hooks/useLang";
export default function Mirror(){

  const lang = useLang();

  const mirrorSeries = [
    { key:"RF", zh:"方框鏡", en:"Rectangular Frame", img:"/images/products/mirror/rf-62.png" },
    { key:"RL", zh:"圓角鏡", en:"Rounded Mirror", img:"/images/products/mirror/rl-106.png" },
    { key:"CF", zh:"圓形鏡", en:"Circle Mirror", img:"/images/products/mirror/cf-146.png" },
    { key:"CL", zh:"橢圓鏡", en:"Oval Mirror", img:"/images/products/mirror/cl-181.png" },
    { key:"IR", zh:"不規則鏡", en:"Irregular Mirror", img:"/images/products/mirror/ir-273.png" },
    { key:"FL", zh:"全身鏡", en:"Full Length Mirror", img:"/images/products/mirror/fl-295.png" },
    { key:"MC", zh:"多功能鏡", en:"Smart Mirror", img:"/images/products/mirror/mc-321.png" }
  ];

  return(
    <main className="bg-white pt-[120px] pb-32">

      <div className="max-w-[1100px] mx-auto px-6">

        {/* ✅ 放這裡才會對齊 */}
        <div className="pt-6 md:pt-10 mb-14 md:mb-16">

          <Link
            to={`/${lang}/products`}
            className="
              inline-block mb-5
              text-[11px]
              tracking-[0.28em]
              text-black/40
              hover:text-black
              transition
            "
          >
            ← BACK
          </Link>

          <div className="text-[11px] tracking-[0.28em] text-black/40">

            <Link to={`/${lang}/products`} className="hover:text-black transition">
              PRODUCTS
            </Link>

            <span className="mx-2 text-black/25">/</span>

            <span className="text-black">
              MIRROR
            </span>

          </div>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-12">

          {mirrorSeries.map(item => (

            <Link
              key={item.key}
              to={`/${lang}/products/mirror/${item.key}`}
              state={{ from: `/${lang}/products/mirror` }}
              className="group block"
            >

              <img
                src={item.img}
                className="w-full h-[260px] object-cover"
              />

              <div className="mt-6 text-center">

                <h3 className="tracking-[0.15em]">
                  {item[lang]}
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  {item.key}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}