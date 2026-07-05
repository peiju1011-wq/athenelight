import { Link } from "react-router-dom";
import CategoryManager from "./CategoryManager";

export default function AdminCategories() {

  return (

    <main className="pt-[140px] px-10 pb-20">

      {/* 麵包屑 */}

      <div
        className="
          mb-8
          text-lg
          tracking-wide
          text-white/50
          flex
          gap-3
          items-center
        "
      >

        <Link
          to="/admin"
          className="hover:text-[#C8A46A]"
        >
          後台首頁
        </Link>

        <span className="text-[#C8A46A]">
          →
        </span>

        <span className="text-white">
          分類管理
        </span>

      </div>

      {/* 標題 */}

      <h1 className="text-3xl text-white mb-8">

        Category Manager

      </h1>

      {/* 分類管理 */}

   <h2 className="text-2xl text-[#C8A46A] mb-6">
  📦 產品分類
</h2>

<CategoryManager type="product" />

     <div className="mt-16">

  <h2 className="text-2xl text-[#C8A46A] mb-6">
    🏗 案例分類
  </h2>

  <CategoryManager type="project" />

</div>

    </main>

  );

}