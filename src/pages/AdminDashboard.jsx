
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect,useState } from "react";



export default function AdminDashboard(){

    const [stats,setStats] = useState({

  products:0,
  projects:0,
  trash:0

});

  const cards = [

    

    {
      title: "📦 產品管理",
      desc: "管理燈具資料",
      link: "/admin/products"
    },

    {
  title: "🗂️ 分類管理",
  desc: "管理產品與案例分類",
  link: "/admin/categories"
},

    {
      title: "🏗 案例管理",
      desc: "管理案例作品與分類",
      link: "/admin/projects"
    },

    {
      title: "📰 最新消息",
      desc: "管理新聞與公告內容",
      link: "/admin/news"
    },


    {
  title: "🏠 首頁管理",
  desc: "管理首頁 Hero、產品、案例",
  link: "/admin/home"
},

{
  title: "📁 Footer",
  desc: "管理型錄下載與產品連結",
  link: "/admin/footer"
},

    {
      title: "🗑 垃圾桶",
      desc: "還原或永久刪除資料",
      link: "/admin/trash"
    },

    {
      title: "🧹 Storage 清理",
      desc: "掃描未使用圖片",
      link: "/admin/storage-cleaner"
    }




  ];

  useEffect(()=>{

  async function loadStats(){

    

    const {
      count: productCount
    } = await supabase
      .from("products")
      .select("*",{
        count:"exact",
        head:true
      });

    const {
      count: projectCount
    } = await supabase
      .from("projects")
      .select("*",{
        count:"exact",
        head:true
      });

    const {
      count: trashCount
    } = await supabase
      .from("deleted_products")
      .select("*",{
        count:"exact",
        head:true
      });

        console.log("PRODUCT");
  console.log(productCount);

  console.log("PROJECT");
  console.log(projectCount);

  console.log("TRASH");
  console.log(trashCount);

  setStats({
    products: productCount || 0,
    projects: projectCount || 0,
    trash: trashCount || 0
  });

    setStats({

      products:
        productCount || 0,

      projects:
        projectCount || 0,

      trash:
        trashCount || 0

    });

  }

  loadStats();

},[]);

  

  async function handleLogout(){

  await supabase.auth.signOut();

  window.location.href =
    "/admin/login";

}

  return(

    <main className="pt-[140px] px-10 pb-20">

        {/* Header */}
<div className="flex justify-between items-start mb-12">

  <div>

  </div>

  <button
    onClick={handleLogout}
    className="
      px-5
      py-2
      border
      border-red-500
      text-red-400
      rounded-lg

      hover:bg-red-500/10
      transition
    "
  >
    登出
  </button>

</div>

      {/* Header */}
      <div className="mb-12">

        <p className="text-[#C8A46A] tracking-[0.25em] text-sm mb-3">
          CMS DASHBOARD
        </p>

        <h1 className="text-5xl text-white font-light mb-3">
          ATHENE Admin
        </h1>

        <p className="text-white/50">
          宇碩光後台管理系統
        </p>

      </div>

      {/* Cards */}

      <div
  className="
    grid
    md:grid-cols-3
    gap-6
    mb-10
  "
>

  <div
    className="
      border
      border-white/10
      rounded-xl
      p-6
    "
  >

    <p className="text-white/50 text-sm">
      產品數量
    </p>

    <h2 className="text-4xl text-white mt-2">
      {stats.products}
    </h2>

  </div>

  <div
    className="
      border
      border-white/10
      rounded-xl
      p-6
    "
  >

    <p className="text-white/50 text-sm">
      案例數量
    </p>

    <h2 className="text-4xl text-white mt-2">
      {stats.projects}
    </h2>

  </div>

  <div
    className="
      border
      border-white/10
      rounded-xl
      p-6
    "
  >

    <p className="text-white/50 text-sm">
      垃圾桶數量
    </p>

    <h2 className="text-4xl text-white mt-2">
      {stats.trash}
    </h2>

  </div>

</div>


      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {cards.map((card,index)=>(

          <Link
            key={index}
            to={card.link}
            className="
              group
              border
              border-white/10
              rounded-xl
              p-8
              bg-white/[0.02]

              hover:border-[#C8A46A]
              hover:bg-white/[0.04]

              transition-all
              duration-300
            "
          >

            <h2
              className="
                text-xl
                text-white
                mb-3

                group-hover:text-[#C8A46A]
              "
            >
              {card.title}
            </h2>

            <p className="text-white/50 text-sm">
              {card.desc}
            </p>

          </Link>

        ))}

      </div>

      {/* Footer */}
      <div
        className="
          mt-16
          pt-8
          border-t
          border-white/10
          text-white/30
          text-sm
        "
      >
        ATHENE LIGHT CMS v1.0
      </div>

    </main>

  );

}