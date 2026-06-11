import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";


export default function AdminProjects(){

  const navigate = useNavigate();

  const [projects,setProjects] = useState([]);

  const [stats,setStats] = useState({

  total:0,
  lighting:0,
  facade:0,
  landscape:0,
  commercial:0,
  interior:0,
  illumination:0,
  festival:0

});

  async function handleDuplicate(product){

    const {
      id,
      created_at,
      ...newProduct
    } = product;

    const { error } = await supabase
      .from("projects")
      .insert([
        {
          ...newProduct,

          slug: `${product.slug}-copy-${Date.now()}`,

          title_zh: `${product.title_zh} 複製`,

          sort_order: Date.now()
        }
      ]);

   if(error){
  console.log(error);
  alert(error.message);
  return;
}

  alert("複製成功");

loadProjects();
  }

  // handleDelete
  // moveUp
  // moveDown
  // loadprojects
async function handleDelete(project){

  const ok = window.confirm(
    "確定要刪除這個案例嗎？"
  );

  if(!ok) return;

  const { error: trashError } =
    await supabase
      .from("deleted_projects")
      .insert([
        {
          slug: project.slug,
          title_zh: project.title_zh,
          data: project
        }
      ]);

  if(trashError){
    alert(trashError.message);
    return;
  }

  const { error } =
    await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);

  if(error){
    alert(error.message);
    return;
  }

  alert("已移至垃圾桶");

  loadProjects();
}

async function moveUp(item,index){

  console.log("UP");
  console.log(item);

  if(index === 0) return;

  const prev = projects[index - 1];

  const r1 = await supabase
    .from("projects")
    .update({
      sort_order: prev.sort_order
    })
    .eq("id", item.id);

  console.log("r1", r1);

  const r2 = await supabase
    .from("projects")
    .update({
      sort_order: item.sort_order
    })
    .eq("id", prev.id);

  console.log("r2", r2);

  loadProjects();
}

async function moveDown(item,index){

    console.log("DOWN");
  console.log(item);

  if(index === projects.length - 1) return;

 

  const next = projects[index + 1];

  await supabase
    .from("projects")
    .update({
      sort_order: next.sort_order
    })
    .eq("id", item.id);

  await supabase
    .from("projects")
    .update({
      sort_order: item.sort_order
    })
    .eq("id", next.id);

  loadProjects();
}


async function loadProjects(){

  const { data,error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order",{ ascending:true });

  console.log("DATA:", data);
console.log("ERROR:", error);

  if(error){
    console.log(error);
    return;
  }

if(data){

  setProjects(data);

  setStats({

    total:data.length,

    lighting:
      data.filter(
        p => p.category === "LIGHTING DESIGN"
      ).length,

    facade:
      data.filter(
        p => p.category === "FACADE"
      ).length,

    landscape:
      data.filter(
        p => p.category === "LANDSCAPE"
      ).length,

    commercial:
      data.filter(
        p => p.category === "COMMERCIAL"
      ).length,

    interior:
      data.filter(
        p => p.category === "INTERIOR"
      ).length,

    illumination:
      data.filter(
        p => p.category === "ILLUMINATION"
      ).length,

    festival:
      data.filter(
        p => p.category === "FESTIVAL"
      ).length

  });

}
}

useEffect(() => {
  loadProjects();
},[]);

return(


<main className="pt-[140px] px-10 pb-20">

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
    案例管理
  </span>

</div>

<div className="flex justify-between items-center mb-10">

  <h1 className="text-3xl text-white">
    Projects Admin
  </h1>

<div
  className="
    grid
    md:grid-cols-4
    xl:grid-cols-8
    gap-4
    mb-8
  "
>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      全部案例
    </p>

    <h3 className="text-3xl text-white">
      {stats.total}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Lighting
    </p>

    <h3 className="text-3xl text-white">
      {stats.lighting}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Facade
    </p>

    <h3 className="text-3xl text-white">
      {stats.facade}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Landscape
    </p>

    <h3 className="text-3xl text-white">
      {stats.landscape}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Commercial
    </p>

    <h3 className="text-3xl text-white">
      {stats.commercial}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Interior
    </p>

    <h3 className="text-3xl text-white">
      {stats.interior}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Illumination
    </p>

    <h3 className="text-3xl text-white">
      {stats.illumination}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Festival
    </p>

    <h3 className="text-3xl text-white">
      {stats.festival}
    </h3>
  </div>

</div>

  <div className="flex gap-4">

    <Link
      to="/admin/projects/new"
      className="
        px-5
        py-3
        bg-[#C8A46A]
        text-black
        rounded
      "
    >
      新增案例
    </Link>

        <Link
      to="/admin/projects/trash"
      className="
        px-5
        py-3
        border
        border-red-500
        text-red-400
        rounded
      "
    >
      垃圾桶
    </Link>

  </div>

</div>

  <div className="space-y-4">

   {projects.map((item,index) => (

      <div
        key={item.id}
        className="
          border
          border-white/10
          p-4
          rounded
          flex
          justify-between
          items-center
        "
      >

<div className="flex items-center gap-4">

  {item.cover && (
    <img
      src={item.cover}
      alt={item.title_zh}
      className="
        w-20
        h-20
        object-cover
        rounded
        bg-white/10
      "
    />
  )}

  <div>

    <p className="text-white">
      {item.title_zh}
    </p>

    <p className="text-white/50 text-sm">
      {item.slug}
    </p>

    <p className="text-white/40 text-xs">
      {item.category}・{item.year}・{item.location}
    </p>

    <p className="text-yellow-400 text-xs">
      排序：{item.sort_order}
    </p>

    <p
      className={
        item.published
          ? "text-green-400 text-xs"
          : "text-red-400 text-xs"
      }
    >
      {item.published ? "已發佈" : "未發佈"}
    </p>

  </div>

</div>

<div className="flex gap-3 items-center">

<button
  onClick={() => moveUp(item,index)}
  className="
    text-green-400
    text-sm
  "
>
  ↑
</button>

<button
  onClick={() => moveDown(item,index)}
  className="
    text-blue-400
    text-sm
  "
>
  ↓
</button>


<button
  onClick={()=>{
  if(!item.slug){
  alert("找不到 slug");
  return;
}

navigate(`/admin/projects/${item.slug}`);
  }}
>
  EDIT
</button>



<button
  onClick={() => handleDuplicate(item)}
  className="
    px-3 py-2
    text-xs
    border
    border-white/20
  "
>
  複製
</button>

<button
  onClick={() => handleDelete(item)}
  className="
    px-3 py-2
    text-xs
    border
    border-red-500/40
    text-red-400
  "
>
  刪除
</button>



</div>

      </div>

    ))}

  </div>

</main>


);

}
