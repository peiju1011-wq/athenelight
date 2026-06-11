import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminProjectsTrash(){
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
      .from("deleted_projects")
      .select("*")
      .order("deleted_at",{
        ascending:false
      });

    if(error){
      console.log(error);
      return;
    }

    console.log("PROJECT TRASH");
    console.log(data);

    setItems(data || []);
  }

  async function handleRestore(item){

    const { error: insertError } =
      await supabase
        .from("projects")
        .insert([
          item.data
        ]);

    if(insertError){
      alert(insertError.message);
      return;
    }

    await supabase
      .from("deleted_projects")
      .delete()
      .eq("id", item.id);

    alert("還原成功");

    loadTrash();
  }



  async function handlePermanentDelete(item){

    if(role !== "ADMIN"){
  alert("沒有權限");
  return;
}

    const ok = window.confirm(
      "永久刪除？此動作無法復原"
    );

    if(!ok) return;

    const { error } =
      await supabase
        .from("deleted_projects")
        .delete()
        .eq("id", item.id);

    if(error){
      alert(error.message);
      return;
    }

    alert("永久刪除成功");

    loadTrash();
  }

useEffect(()=>{

  loadRole();

  loadTrash();

},[]);

  return(

    <main className="pt-[140px] px-10 pb-20">

      <div className="flex justify-between items-center mb-10">

        <div>
  <h1 className="text-3xl text-white">
    案例垃圾桶
  </h1>

  <p className="text-[#C8A46A] mt-2">
    目前權限：{role}
  </p>
</div>

        <Link
          to="/admin/projects"
          className="
            px-5
            py-3
            border
            border-white/20
            rounded
          "
        >
          返回案例
        </Link>

      </div>

      <div className="space-y-4">

        {items.map(item=>(

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

            <div>

              <p className="text-white">
                {item.title_zh}
              </p>

              <p className="text-white/50 text-sm">
                {item.slug}
              </p>

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