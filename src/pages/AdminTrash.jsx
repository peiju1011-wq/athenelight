import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminTrash(){
const [keyword,setKeyword] = useState("");
const [items,setItems] = useState([]);
const [role,setRole] = useState("");


async function loadRole(){

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if(!user) return;

  const { data,error } = await supabase
    .from("users")
    .select("role")
    .eq("email", user.email)
    .single();

  if(error){
    console.log(error);
    return;
  }

  if(data){
    setRole(data.role);
  }

}

  async function loadTrash(){

    const { data,error } = await supabase
      .from("deleted_products")
      .select("*")
      .order("deleted_at",{
        ascending:false
      });

    if(error){
      console.log(error);
      return;
    }
console.log("TRASH");
console.log(data);
    setItems(data || []);
  }

  async function handleRestore(item){


    const { error: insertError } =
      await supabase
        .from("products")
        .insert([
          item.data
        ]);

    if(insertError){
      alert(insertError.message);
      return;
    }

    await supabase
      .from("deleted_products")
      .delete()
      .eq("id", item.id);

    alert("還原成功");

    loadTrash();
  }

  async function handlePermanentDelete(item){

    console.log(item.data);

    const ok = window.confirm(
      "永久刪除？此動作無法復原"
    );

    if(!ok) return;

    const { error } =
      await supabase
        .from("deleted_products")
        .delete()
        .eq("id", item.id);

    if(error){
      alert(error.message);
      return;
    }

    alert("永久刪除成功");

    loadTrash();
  }

const filteredItems =
  items.filter(item=>{

    const title =
      item.title_zh ||
      item.data?.title_zh ||
      "";

    return title
      .toLowerCase()
      .includes(
        keyword.toLowerCase()
      );

  });



async function handleDeleteAll(){

  const ok = window.confirm(
    "確定永久刪除全部垃圾桶資料？"
  );

  if(!ok) return;

  const { error } =
    await supabase
      .from("deleted_products")
      .delete()
      .neq("id",0);

  if(error){
    alert(error.message);
    return;
  }

  alert("全部永久刪除完成");

  loadTrash();

}



useEffect(()=>{

  loadRole();

  loadTrash();

},[]);

  return(

    <main className="pt-[140px] px-10 pb-20">

      <div className="flex flex-wrap items-center gap-4 mb-8">

        <h1 className="text-3xl text-white">
          垃圾桶
        </h1>

<p className="text-[#C8A46A]">
  目前權限：{role}
</p>



        <input
          value={keyword}
          onChange={(e)=>
            setKeyword(e.target.value)
          }
          placeholder="搜尋垃圾桶..."
          className="
            px-4
            py-2
            bg-black
            border
            border-white/20
            rounded
            text-white
          "
        />

        <Link
          to="/admin/products"
          className="
            px-5
            py-3
            border
            border-white/20
            rounded
          "
        >
          返回產品
        </Link>


{role === "ADMIN" && (

<button
  onClick={handleDeleteAll}
  className="
    px-4
    py-2
    border
    border-red-500
    text-red-400
    rounded
  "
>
  全部永久刪除
</button>

)}

      </div>

      <div className="space-y-4">

        {filteredItems.length === 0 && (

          <div
            className="
              text-center
              py-20
              text-white/40
            "
          >
            垃圾桶目前是空的
          </div>

        )}

        {filteredItems.map(item=>(

          <div
            key={item.id}
            className="
              border
              border-white/10
              rounded
              p-4
              flex
              justify-between
              items-center
            "
          >

            <div className="flex items-center gap-4">

<img
  src={
    item.data?.cover ||
    item.cover
  }
  className="
    w-20
    h-20
    object-cover
    rounded
  "
/>
              <div>

                <p className="text-white">
                  {item.title_zh || item.data?.title_zh}
                </p>

                <p className="text-white/50 text-sm">
                  {item.slug || item.data?.slug}
                </p>

                <p className="text-xs text-white/40">
                  刪除時間：
                  {new Date(item.deleted_at)
                    .toLocaleString("zh-TW")}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  handleRestore(item)
                }
                className="
                  px-3
                  py-2
                  border
                  border-green-500
                  text-green-400
                "
              >
                還原
              </button>

{role === "ADMIN" && (

<button
  onClick={() =>
    handlePermanentDelete(item)
  }
  className="
    px-3
    py-2
    border
    border-red-500
    text-red-400
  "
>
  永久刪除
</button>

)}

            </div>

          </div>

        ))}

      </div>

    </main>

  );

}

