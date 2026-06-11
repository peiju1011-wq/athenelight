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

  useEffect(()=>{

    async function loadProject(){

      const { data,error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug",slug)
        .single();

      if(error){
        console.log(error);
        return;
      }

      setProject(data);

    }

    loadProject();

  },[slug]);






async function handleUpdate(){

  const COMPRESS_LIMIT =
  1024 * 1024;

  let coverUrl = project.cover;

let imageUrls = [
  ...(project.images || [])
];



if(newCover){

  const ext =
    newCover.name.split(".").pop();

  const fileName =
    `${project.slug}-cover-${Date.now()}.${ext}`;

let compressedCover =
  newCover;

if(newCover.size > COMPRESS_LIMIT){

  compressedCover =
    await imageCompression(
      newCover,
      {
        maxSizeMB: 1,
        useWebWorker: true,
        maxWidthOrHeight: 1920
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
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

  coverUrl = data.publicUrl;
}

if(newGallery1){

  const ext =
    newGallery1.name.split(".").pop();

  const fileName =
    `${project.slug}-g1-${Date.now()}.${ext}`;

  let compressedGallery1 =
    newGallery1;

  if(newGallery1.size > COMPRESS_LIMIT){

    compressedGallery1 =
      await imageCompression(
        newGallery1,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
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
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

imageUrls[0] = {
  ...imageUrls[0],
  src: data.publicUrl
};
}



if(newGallery2){

  const ext =
    newGallery2.name.split(".").pop();

  const fileName =
    `${project.slug}-g2-${Date.now()}.${ext}`;

  let compressedGallery2 =
    newGallery2;

  if(newGallery2.size > COMPRESS_LIMIT){

    compressedGallery2 =
      await imageCompression(
        newGallery2,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
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
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

imageUrls[1] = {
  ...imageUrls[1],
  src: data.publicUrl
};
}



if(newGallery3){

  const ext =
    newGallery3.name.split(".").pop();

  const fileName =
    `${project.slug}-g3-${Date.now()}.${ext}`;

  let compressedGallery3 =
    newGallery3;

  if(newGallery3.size > COMPRESS_LIMIT){

    compressedGallery3 =
      await imageCompression(
        newGallery3,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
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
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("projects")
      .getPublicUrl(fileName);


imageUrls[2] = {
  ...imageUrls[2],
  src: data.publicUrl
};
}


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

    // ★新增
    cover: coverUrl,

  images: imageUrls,

  featured: project.featured,
  published: project.published

  })
  .eq("id", project.id);

  if(error){
    alert(error.message);
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
  value={project.category || ""}
  onChange={(e)=>
    setProject({
      ...project,
      category:e.target.value
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
>
  <option value="LIGHTING DESIGN">照明設計</option>
  <option value="FACADE">外牆</option>
  <option value="LANDSCAPE">景觀</option>
  <option value="COMMERCIAL">商業空間</option>
  <option value="INTERIOR">室內空間</option>
  <option value="ILLUMINATION">亮化工程</option>
  <option value="FESTIVAL">燈會</option>
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
      : project.cover
  }
  alt=""
  className="
    w-full
    h-[280px]
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
      : project.images?.[0]?.src
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
      : project.images?.[1]?.src
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
      : project.images?.[2]?.src
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