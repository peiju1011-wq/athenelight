import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import imageCompression from "browser-image-compression";


export default function AdminProjectsEdit(){


  const [newCover,setNewCover] = useState(null);

const [newGallery1,setNewGallery1] = useState(null);
const [newGallery2,setNewGallery2] = useState(null);
const [newGallery3,setNewGallery3] = useState(null);

  const { slug } = useParams();

  const [project,setProject] = useState(null);
const [role,setRole] = useState("");

useEffect(()=>{

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
        console.log("ROLE =", data.role);
      }

    }

async function loadProject(){

  console.log("SLUG =", slug);

  const { data,error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug",slug);

  console.log("DATA =", data);
  console.log("ERROR =", error);

  if(error){
    console.log(error);
    return;
  }

  if(data?.length){
    setProject(data[0]);
  }

}

   loadRole();
loadProject();

  },[slug]);






async function handleUpdate(){

 const COMPRESS_LIMIT =
  8 * 1024 * 1024;

  let coverUrl = project.cover;

let imageUrls = [
  ...(project.images || [])
];



if(newCover){

  const ext =
    newCover.name.split(".").pop();

const fileName =
`${slug}-cover.${ext}`;

let compressedCover =
  newCover;

if(newCover.size > COMPRESS_LIMIT){

  compressedCover =
    await imageCompression(
      newCover,
{
  maxSizeMB: 8,
  useWebWorker: true,
  maxWidthOrHeight: 3840
}
    );

}



  const { error: uploadError } =
    await supabase.storage
      .from("projects")
     .upload(
  fileName,
  compressedCover,
  {
    upsert:true
  }
);

if(uploadError){

  console.log("UPLOAD ERROR");
  console.log(uploadError);

  alert(
    JSON.stringify(
      uploadError,
      null,
      2
    )
  );

  return;

}
  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

 coverUrl =
  `${data.publicUrl}?v=${Date.now()}`;
}

if(newGallery1){

  const ext =
    newGallery1.name.split(".").pop();

 const fileName =
`${slug}-01.${ext}`;

  let compressedGallery1 =
    newGallery1;

  if(newGallery1.size > COMPRESS_LIMIT){

    compressedGallery1 =
      await imageCompression(
        newGallery1,
{
  maxSizeMB: 8,
  useWebWorker: true,
  maxWidthOrHeight: 3840
}
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("projects")
      .upload(
        fileName,
        compressedGallery1,
        {
          upsert:true
        }
      );

if(uploadError){

  console.log("UPLOAD ERROR");
  console.log(uploadError);

  alert(
    JSON.stringify(
      uploadError,
      null,
      2
    )
  );

  return;

}

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

imageUrls[0] =
  `${data.publicUrl}?v=${Date.now()}`;
}



if(newGallery2){

  const ext =
    newGallery2.name.split(".").pop();

  const fileName =
`${slug}-02.${ext}`;

  let compressedGallery2 =
    newGallery2;

  if(newGallery2.size > COMPRESS_LIMIT){

    compressedGallery2 =
      await imageCompression(
        newGallery2,
{
  maxSizeMB: 8,
  useWebWorker: true,
  maxWidthOrHeight: 3840
}
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("projects")
      .upload(
        fileName,
        compressedGallery2,
        {
          upsert:true
        }
      );

if(uploadError){

  console.log("UPLOAD ERROR");
  console.log(uploadError);

  alert(
    JSON.stringify(
      uploadError,
      null,
      2
    )
  );

  return;

}

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

imageUrls[1] =
  `${data.publicUrl}?v=${Date.now()}`;
}



if(newGallery3){

  const ext =
    newGallery3.name.split(".").pop();

  const fileName =
`${slug}-03.${ext}`;

  let compressedGallery3 =
    newGallery3;

  if(newGallery3.size > COMPRESS_LIMIT){

    compressedGallery3 =
      await imageCompression(
        newGallery3,
{
  maxSizeMB: 8,
  useWebWorker: true,
  maxWidthOrHeight: 3840
}
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("projects")
      .upload(
        fileName,
        compressedGallery3,
        {
          upsert:true
        }
      );

if(uploadError){

  console.log("UPLOAD ERROR");
  console.log(uploadError);

  alert(
    JSON.stringify(
      uploadError,
      null,
      2
    )
  );

  return;

}
  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);


imageUrls[2] =
  `${data.publicUrl}?v=${Date.now()}`;
}


console.log("UPDATE DATA");
console.log({
  cover: coverUrl,
  images: imageUrls
});

const { error } = await supabase
  .from("projects")
  .update({

    

    title_zh: project.title_zh,
    title_en: project.title_en,

    desc_zh: project.desc_zh,
    desc_en: project.desc_en,

    desc_long_zh: project.desc_long_zh,
    desc_long_en: project.desc_long_en,

    year: project.year,
    location: project.location,
    client: project.client,

    category: project.category,

    cover: coverUrl,

    images: imageUrls,

    featured: project.featured,

    seo_title:
      project.seo_title ||
      `${project.title_zh}｜ATHENE LIGHT`,

    seo_description:
      project.seo_description ||
      `${project.title_zh} ${project.category} 案例介紹`,

    published: project.published

  })
  .eq("slug", slug);

if(error){

  console.log("FULL ERROR");
  console.log(error);

  alert(
    JSON.stringify(
      error,
      null,
      2
    )
  );

  return;
}

alert("✅ 更新成功");

window.location.href =
  "/admin/projects";

  }

  if(!project){

    return(
      <main className="p-10 text-white">
        Loading...
      </main>
    );

  }

  return(

    <main className="pt-[140px] px-10 pb-20 max-w-[900px] mx-auto">

      <h1 className="text-3xl mb-10 text-white">
        Edit Project
      </h1>

      <input
        value={project.title_zh || ""}
        onChange={(e)=>
          setProject({
            ...project,
            title_zh:e.target.value
          })
        }
        className="
          w-full
          p-3
          mb-4
          border
          bg-white
          text-black
        "
      />

      <input
        value={project.title_en || ""}
        onChange={(e)=>
          setProject({
            ...project,
            title_en:e.target.value
          })
        }
        className="
          w-full
          p-3
          mb-4
          border
          bg-white
          text-black
        "
      />

      <textarea
        value={project.desc_zh || ""}
        onChange={(e)=>
          setProject({
            ...project,
            desc_zh:e.target.value
          })
        }
        rows="5"
        className="
          w-full
          p-3
          mb-4
          border
          bg-white
          text-black
        "
      />

      <textarea
        value={project.desc_en || ""}
        onChange={(e)=>
          setProject({
            ...project,
            desc_en:e.target.value
          })
        }
        rows="5"
        className="
          w-full
          p-3
          mb-4
          border
          bg-white
          text-black
        "
      />

      

<select
  className="w-full p-3 mb-4 border bg-white text-black"
  value={project.category || ""}
  onChange={(e)=>
    setProject({
      ...project,
      category:e.target.value
    })
  }
>
  <option value="LIGHTING_DESIGN">
    照明設計
  </option>

  <option value="INTERIOR">
    室內空間
  </option>

  <option value="COMMERCIAL">
    商業空間
  </option>

  <option value="FACADE">
    外牆照明
  </option>

  <option value="LANDSCAPE">
    景觀照明
  </option>

  <option value="ILLUMINATION">
    亮化工程
  </option>

  <option value="FESTIVAL">
    燈會活動
  </option>
</select>

<h2 className="text-xl text-white mb-6">
  圖片管理
</h2>

<div className="space-y-10">

  {/* Cover */}
  <div className="border border-white/10 p-6 rounded">

    <p className="text-white mb-3">
      Cover
    </p>

<img
src={
  newCover
    ? URL.createObjectURL(newCover)
    : project?.cover
}
  alt=""
  className="
    w-full
    h-[220px]
    object-cover
    rounded
    mb-4
  "
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>
    setNewCover(e.target.files[0])
  }
  className="
    w-full
    p-3
    border
    bg-white
    text-black
  "
/>

  </div>


  {/* Gallery 1 */}
  <div className="border border-white/10 p-6 rounded">

    <p className="text-white mb-3">
      Gallery 1
    </p>

<img
  src={
    newGallery1
      ? URL.createObjectURL(newGallery1)
      : (
          typeof project?.images?.[0] === "string"
            ? project.images[0]
            : project?.images?.[0]?.src
        )
  }
  alt=""
  className="
    w-full
    h-[220px]
    object-cover
    rounded
    mb-4
  "
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>
    setNewGallery1(e.target.files[0])
  }
  className="
    w-full
    p-3
    border
    bg-white
    text-black
  "
/>

  </div>


  {/* Gallery 2 */}
  <div className="border border-white/10 p-6 rounded">

    <p className="text-white mb-3">
      Gallery 2
    </p>

<img
  src={
    newGallery2
      ? URL.createObjectURL(newGallery2)
      : (
typeof project?.images?.[1] === "string"
  ? project.images[1]
  : project?.images?.[1]?.src
        )
  }
  alt=""
  className="
    w-full
    h-[220px]
    object-cover
    rounded
    mb-4
  "
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>
   setNewGallery2(e.target.files[0])
  }
  className="
    w-full
    p-3
    border
    bg-white
    text-black
  "
/>

  </div>


  {/* Gallery 3 */}
  <div className="border border-white/10 p-6 rounded">

    <p className="text-white mb-3">
      Gallery 3
    </p>

<img
  src={
    newGallery3
      ? URL.createObjectURL(newGallery3)
      : (
typeof project?.images?.[2] === "string"
  ? project.images[2]
  : project?.images?.[2]?.src
        )
  }
  alt=""
  className="
    w-full
    h-[220px]
    object-cover
    rounded
    mb-4
  "
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>
   setNewGallery3(e.target.files[0])
  }
  className="
    w-full
    p-3
    border
    bg-white
    text-black
  "
/>

  </div>

</div>


<input
  value={project.year || ""}
  onChange={(e)=>
    setProject({
      ...project,
      year:e.target.value
    })
  }
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>

<input
  value={project.location || ""}
  onChange={(e)=>
    setProject({
      ...project,
      location:e.target.value
    })
  }
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>

<input
  value={project.client || ""}
  onChange={(e)=>
    setProject({
      ...project,
      client:e.target.value
    })
  }
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>


{role === "ADMIN" && (
<>

<h2 className="text-xl text-white mt-10 mb-4">
  SEO
</h2>

<input
  value={project.seo_title || ""}
  onChange={(e)=>
    setProject({
      ...project,
      seo_title:e.target.value
    })
  }
  placeholder={`${project.title_zh}｜ATHENE LIGHT`}
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>

<textarea
  value={project.seo_description || ""}
  onChange={(e)=>
    setProject({
      ...project,
      seo_description:e.target.value
    })
  }
  placeholder={`${project.title_zh} ${project.category} 案例介紹`}
  rows="4"
  className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
/>

</>
)}

<label className="text-white flex gap-2 mb-4">

  <input
    type="checkbox"
    checked={project.published || false}
    onChange={(e)=>
      setProject({
        ...project,
        published:e.target.checked
      })
    }
  />

  上架

</label>
<label className="text-white flex gap-2 mb-4">

  <input
    type="checkbox"
    checked={project.featured || false}
    onChange={(e)=>
      setProject({
        ...project,
        featured:e.target.checked
      })
    }
  />

  精選案例

</label>

<button
  onClick={handleUpdate}
  className="
    mt-8
    px-6
    py-3
    bg-[#C8A46A]
    text-black
    rounded
  "
>
  儲存修改
</button>

    </main>

    

  );




}