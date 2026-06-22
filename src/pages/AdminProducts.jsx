import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminProducts(){

  const navigate = useNavigate();
const [products,setProducts] = useState([]);
const [role,setRole] = useState("");

  const [stats,setStats] = useState({

  total:0,
  indoor:0,
  outdoor:0,
  installation:0,
  custom:0

});

  async function handleDuplicate(product){

    const {
      id,
      created_at,
      ...newProduct
    } = product;

    const { error } = await supabase
      .from("products")
      .insert([
        {
          ...newProduct,

          slug: `${product.slug}-copy-${Date.now()}`,

          title_zh: `${product.title_zh} 複製`,

          sort_order: -Date.now()
        }
      ]);

    if(error){
      alert(error.message);
      return;
    }

    alert("複製成功");

    window.location.reload();
  }

  // handleDelete
  // moveUp
  // moveDown
  // loadProducts

async function handleDelete(product){

  const ok = window.confirm(
    "確定要刪除這個產品嗎？"
  );

  if(!ok) return;

  const { error: trashError } =
    await supabase
      .from("deleted_products")
      .insert([
        {
          slug: product.slug,
          title_zh: product.title_zh,
          data: product
        }
      ]);

  if(trashError){
    alert(trashError.message);
    return;
  }

  const { error } =
    await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

  if(error){
    alert(error.message);
    return;
  }

  alert("已移至垃圾桶");

  loadProducts();
}

async function moveUp(item,index){

  console.log("UP");
  console.log(item);

  if(index === 0) return;

  const prev = products[index - 1];

  const r1 = await supabase
    .from("products")
    .update({
      sort_order: prev.sort_order
    })
    .eq("id", item.id);

  console.log("r1", r1);

  const r2 = await supabase
    .from("products")
    .update({
      sort_order: item.sort_order
    })
    .eq("id", prev.id);

  console.log("r2", r2);

  loadProducts();
}

async function moveDown(item,index){

    console.log("DOWN");
  console.log(item);

  if(index === products.length - 1) return;

 

  const next = products[index + 1];

  await supabase
    .from("products")
    .update({
      sort_order: next.sort_order
    })
    .eq("id", item.id);

  await supabase
    .from("products")
    .update({
      sort_order: item.sort_order
    })
    .eq("id", next.id);

  loadProducts();
}

async function loadRole(){

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if(!user) return;

  const { data,error } = await supabase
    .from("users")
    .select("role")
    .eq("email", user.email)
    .maybeSingle()

  if(error){
    console.log(error);
    return;
  }

  if(data){
    setRole(data.role);
    console.log("ROLE =", data.role);
  }

}



async function loadProducts(){

  const { data,error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order",{ ascending:true });

  console.log(data);

  if(error){
    console.log(error);
    return;
  }

  if(data){

    setProducts(data);

    setStats({

      total:data.length,

    indoor:
  data.filter(
    p =>
      p.category === "INDOOR" ||
      p.category === "INTERIOR_LIGHTING"
  ).length,

      outdoor:
        data.filter(
          p => p.category === "OUTDOOR"
        ).length,

      installation:
        data.filter(
          p => p.category === "INSTALLATION"
        ).length,

      custom:
        data.filter(
          p => p.category === "CUSTOM"
        ).length

    });

  }

}

useEffect(() => {

  loadRole();

  loadProducts();

},[]);

return(


<main
  className="
    pt-[140px]
    px-4
    md:px-10
    pb-20
  "
>

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
    產品管理
  </span>

</div>

<h1 className="text-3xl text-white mb-8">
  Product Admin
</h1>

<p className="text-[#C8A46A] mb-8">
  目前權限：{role}
</p>

<div
  className="
    grid
    grid-cols-2
    md:grid-cols-5
    gap-4
    mb-8
  "
>
  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      全部產品
    </p>

    <h3 className="text-3xl text-white">
      {stats.total}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Indoor
    </p>

    <h3 className="text-3xl text-white">
      {stats.indoor}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Outdoor
    </p>

    <h3 className="text-3xl text-white">
      {stats.outdoor}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Installation
    </p>

    <h3 className="text-3xl text-white">
      {stats.installation}
    </h3>
  </div>

  <div className="border border-white/10 rounded p-4">
    <p className="text-white/50 text-xs">
      Custom
    </p>

    <h3 className="text-3xl text-white">
      {stats.custom}
    </h3>
  </div>



</div>
<div className="flex gap-4 mb-8">

    <Link
      to="/admin/trash"
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

    <Link
      to="/admin/products/new"
      className="
        px-5
        py-3
        bg-[#C8A46A]
        text-black
        rounded
      "
    >
      新增產品
    </Link>

  </div>

  <div className="space-y-4">

   {products.map((item,index) => (

      <div
        key={item.id}
className="
  border
  border-white/10
  p-4
  rounded

  flex
  flex-col

  lg:flex-row
  lg:justify-between
  lg:items-center

  gap-4
"
      >

<div
  className="
    flex
    items-start
    gap-4
    flex-1
    min-w-0
  "
>

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

   <p
  className="
    text-white
    break-words
  "
>
      {item.title_zh}
    </p>

    <p className="text-white/50 text-sm">
      {item.slug}
    </p>
    
<p className="text-[#C8A46A] text-xs">

  {item.category === "INDOOR" && "室內燈具"}
  {item.category === "INTERIOR_LIGHTING" && "室內燈具"}

  {item.category === "OUTDOOR" && "戶外燈具"}

  {item.category === "FESTIVAL" && "節慶燈具"}

  {item.category === "INSTALLATION" && "施工安裝"}

  {item.category === "CUSTOM" && "訂製燈具"}

  {item.category === "LIGHTING_DESIGN" && "照明設計"}

  {item.sub_category === "TRACK" && " / 軌道燈"}
  {item.sub_category === "PENDANT" && " / 吊燈"}
  {item.sub_category === "DOWNLIGHT" && " / 崁燈"}
  {item.sub_category === "CEILING" && " / 吸頂燈"}
  {item.sub_category === "LINEAR" && " / 線型燈"}
  {item.sub_category === "WALL" && " / 壁燈"}
  {item.sub_category === "MAGNETIC" && " / 磁吸軌道燈"}

  {item.sub_category === "WASHER" && " / 洗牆燈"}
  {item.sub_category === "SPOT" && " / 投射燈"}
  {item.sub_category === "FLOOD" && " / 泛光燈"}
  {item.sub_category === "LANDSCAPE_POLE" && " / 景觀高燈"}
  {item.sub_category === "LANDSCAPE_BOLLARD" && " / 景觀矮燈"}
  {item.sub_category === "SPIKE" && " / 插地燈"}
  {item.sub_category === "INGROUND" && " / 地埋燈"}
  {item.sub_category === "STEP" && " / 階梯燈"}
  {item.sub_category === "UNDERWATER" && " / 水底燈"}

</p>

    <p className="text-white/40 text-xs">
      排序：{item.sort_order}
    </p>

  </div>

</div>

<div
  className="
    flex
    flex-col
    gap-3
  "
>

  <div className="flex gap-4">

    <button
      onClick={() => moveUp(item,index)}
      className="text-green-400 text-sm"
    >
      ↑
    </button>

    <button
      onClick={() => moveDown(item,index)}
      className="text-blue-400 text-sm"
    >
      ↓
    </button>

  </div>

  <div className="flex gap-3 items-center">

    <button
      onClick={()=>{
        if(!item.slug){
          alert("找不到 slug");
          return;
        }

        navigate(`/admin/products/${item.slug}`);
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

</div>

    ))}

  </div>

</main>

);

}