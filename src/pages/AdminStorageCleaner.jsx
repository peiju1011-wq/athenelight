import { useState,useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AdminStorageCleaner(){

  const [productOrphans,setProductOrphans] = useState([]);
  const [projectOrphans,setProjectOrphans] = useState([]);
  const [loading,setLoading] = useState(false);

  function getFileName(url,bucket){

    if(!url) return "";

    return url
      .split(`/${bucket}/`)
      .pop()
      ?.split("?")[0];
  }

  async function scanAll(){

// const productSize =
//   productOrphansFound.reduce(
//     (sum,file)=>
//       sum + (file.metadata?.size || 0),
//     0
//   );

// console.log(
//   "PRODUCT SIZE",
//   productSize / 1024 / 1024,
//   "MB"
// );    

    setLoading(true);

    /* =========================
       PRODUCTS
    ========================= */

    const productUsed = new Set();

    const { data: products } =
      await supabase
        .from("products")
        .select("*");

    products?.forEach(item=>{

      if(item.cover){
        productUsed.add(
          getFileName(item.cover,"products")
        );
      }

      if(item.cover2){
        productUsed.add(
          getFileName(item.cover2,"products")
        );
      }

      item.gallery?.forEach(img=>{
        productUsed.add(
          getFileName(img,"products")
        );
      });

    });
const {
  data: deletedProducts
} = await supabase
  .from("deleted_products")
  .select("*");

console.log(
  "DELETED PRODUCTS",
  deletedProducts
);

deletedProducts?.forEach(item=>{

  console.log(
    "TRASH COVER",
    item.data?.cover
  );

});

deletedProducts?.forEach(item=>{

  console.log(
    "TRASH COVER",
    item.data?.cover
  );

  console.log(
    "TRASH GALLERY",
    item.data?.gallery
  );

});

deletedProducts?.forEach(item=>{

  const p = item.data;

  if(p?.cover){
    productUsed.add(
      getFileName(
        p.cover,
        "products"
      )
    );
  }

  if(p?.cover2){
    productUsed.add(
      getFileName(
        p.cover2,
        "products"
      )
    );
  }

  p?.gallery?.forEach(img=>{
    productUsed.add(
      getFileName(
        img,
        "products"
      )
    );
  });

});

const {
  data: productFiles,
  error: productError
} = await supabase.storage
  .from("products")
  .list("",{
    limit:1000
  });

console.log("PRODUCT FILES");
console.log(productFiles);

console.log("PRODUCT ERROR");
console.log(productError);



  const productOrphansFound =
  productFiles
    ?.filter(
      file =>
        !productUsed.has(
          file.name
        )
    )
    .map(file=>{

      const { data } =
        supabase.storage
          .from("products")
          .getPublicUrl(
            file.name
          );

      return {
        ...file,
        preview:
          data.publicUrl
      };

    }) || [];

    setProductOrphans(
      productOrphansFound
    );

    /* =========================
       PROJECTS
    ========================= */

    const projectUsed = new Set();

    const { data: projects } =
      await supabase
        .from("projects")
        .select("*");

    projects?.forEach(item=>{

      if(item.cover){
        projectUsed.add(
          getFileName(
            item.cover,
            "projects"
          )
        );
      }

      item.gallery?.forEach(img=>{
        projectUsed.add(
          getFileName(
            img,
            "projects"
          )
        );
      });

    });

    const {
      data: deletedProjects
    } = await supabase
      .from("deleted_projects")
      .select("*");

    deletedProjects?.forEach(item=>{

      const p = item.data;

      if(p?.cover){
        projectUsed.add(
          getFileName(
            p.cover,
            "projects"
          )
        );
      }

      p?.gallery?.forEach(img=>{
        projectUsed.add(
          getFileName(
            img,
            "projects"
          )
        );
      });

    });

const {
  data: projectFiles,
  error: projectError
} = await supabase.storage
  .from("projects")
  .list("",{
    limit:1000
  });

console.log("PROJECT FILES");
console.log(projectFiles);

console.log("PROJECT ERROR");
console.log(projectError);




const projectOrphansFound =
  projectFiles
    ?.filter(
      file =>
        !projectUsed.has(
          file.name
        )
    )
    .map(file=>{

      const { data } =
        supabase.storage
          .from("projects")
          .getPublicUrl(
            file.name
          );

      return {
        ...file,
        preview:
          data.publicUrl
      };

    }) || [];



    setProjectOrphans(
      projectOrphansFound
    );

    console.log(
      "PRODUCT ORPHANS",
      productOrphansFound
    );

    console.log(
      "PROJECT ORPHANS",
      projectOrphansFound
    );

    setLoading(false);
  }

async function deleteProductFile(file){

  const ok = window.confirm(
    `刪除 ${file.name} ?`
  );

  if(!ok) return;

const { data,error } =
  await supabase.storage
.from("products")
.remove([
  file.name
])

console.log("PRODUCT FILES");
console.log(data);

console.log("PRODUCT ERROR");
console.log(error);

  console.log("DELETE DATA",data);
  console.log("DELETE ERROR",error);

  if(error){
    alert(error.message);
    return;
  }

  alert("刪除成功");

  await scanAll();
}

async function deleteProjectFile(file){

  const ok = window.confirm(
    `刪除 ${file.name} ?`
  );

  if(!ok) return;

  const { error } =
    await supabase.storage
      .from("projects")
      .remove([
        file.name
      ]);

  if(error){
    alert(error.message);
    return;
  }

  alert("刪除成功");

  await scanAll();
}


async function deleteAllOrphans(){

  const ok = window.confirm(
    "確定刪除所有孤兒圖片？"
  );

  if(!ok) return;

  try{

    const productFiles =
      productOrphans.map(
        file => file.name
      );

    const projectFiles =
      projectOrphans.map(
        file => file.name
      );

    console.log(productFiles);
    console.log(projectFiles);

    /* =========================
       PRODUCTS
    ========================= */

    for(
      let i=0;
      i<productFiles.length;
      i+=20
    ){

      const batch =
        productFiles.slice(
          i,
          i+20
        );

      const { error } =
        await supabase.storage
          .from("products")
          .remove(batch);

      if(error){
        console.error(
          "PRODUCT DELETE ERROR",
          error
        );
      }

      console.log(
        "PRODUCT BATCH",
        batch
      );

      console.log(
        "PRODUCT ERROR",
        error
      );

    }

    /* =========================
       PROJECTS
    ========================= */

    for(
      let i=0;
      i<projectFiles.length;
      i+=20
    ){

      const batch =
        projectFiles.slice(
          i,
          i+20
        );

      const { error } =
        await supabase.storage
          .from("projects")
          .remove(batch);

      if(error){
        console.error(
          "PROJECT DELETE ERROR",
          error
        );
      }

      console.log(
        "PROJECT BATCH",
        batch
      );

      console.log(
        "PROJECT ERROR",
        error
      );

    }

    await scanAll();

    alert("全部刪除完成");

  }catch(err){

    console.error(err);

    alert("刪除失敗");

  }



}

useEffect(()=>{

  scanAll();

},[]);


  return(

    

<main className="pt-[140px] px-10 pb-20">

  <div className="flex justify-between items-center mb-10">

    <h1 className="text-3xl text-white">
      Storage Cleaner
    </h1>

    <div className="flex gap-3">

      <button
        onClick={scanAll}
        className="
          px-5
          py-3
          bg-[#C8A46A]
          text-black
          rounded
        "
      >
        {loading
          ? "掃描中..."
          : "掃描全部"}
      </button>

      {(productOrphans.length > 0 ||
        projectOrphans.length > 0) && (

        <button
          onClick={deleteAllOrphans}
          className="
            px-5
            py-3
            border
            border-red-500
            text-red-400
            rounded
          "
        >
          全部刪除
        </button>

      )}

    </div>

  </div>

      {/* PRODUCTS */}
<h2 className="text-xl text-white mb-4">
  Products Bucket
  ({productOrphans.length})
</h2>



      <div className="space-y-3 mb-12">

        {productOrphans.map(file=>(

          <div
            key={file.name}
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

  <img
    src={file.preview}
    alt=""
    className="
      w-20
      h-20
      object-cover
      rounded
      border
      border-white/10
    "
  />

<div>

  <p className="text-white">
    {file.name}
  </p>

  <p className="text-white/40 text-xs">
    {Math.round(
      file.metadata?.size / 1024
    ) || 0} KB
  </p>

<p className="text-white/40 text-xs">
  建立：
  {
    file.created_at
      ? new Date(
          file.created_at
        ).toLocaleString()
      : "-"
  }
</p>

</div>

</div>

<div className="flex gap-2">

  <a
    href={file.preview}
    download
    target="_blank"
    rel="noreferrer"
    className="
      px-4
      py-2
      border
      border-yellow-500
      text-yellow-400
    "
  >
    下載
  </a>

  <button
    onClick={() =>
      deleteProductFile(file)
    }
    className="
      px-4
      py-2
      border
      border-red-500
      text-red-400
    "
  >
    刪除
  </button>



</div>

          </div>

        ))}

      </div>

      {/* PROJECTS */}

      <h2 className="text-xl text-white mb-4">
        Projects Bucket
        ({projectOrphans.length})
      </h2>

      

      <div className="space-y-3">

        {projectOrphans.map(file=>(

          <div
            key={file.name}
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

  <img
    src={file.preview}
    alt=""
    className="
      w-20
      h-20
      object-cover
      rounded
      border
      border-white/10
    "
  />

<div>

  <p className="text-white">
    {file.name}
  </p>

  <p className="text-white/40 text-xs">
    {Math.round(
      file.metadata?.size / 1024
    ) || 0} KB
  </p>

<p className="text-white/40 text-xs">
  建立：
  {
    file.created_at
      ? new Date(
          file.created_at
        ).toLocaleString()
      : "-"
  }
</p>

</div>

</div>

<div className="flex gap-2">

  <a
    href={file.preview}
    download
    target="_blank"
    rel="noreferrer"
    className="
      px-4
      py-2
      border
      border-yellow-500
      text-yellow-400
    "
  >
    下載
  </a>

<button
  onClick={() =>
    deleteProjectFile(file)
    }
    className="
      px-4
      py-2
      border
      border-red-500
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