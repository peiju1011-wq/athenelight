import { useState } from "react";
import { supabase } from "../lib/supabase";
import imageCompression from "browser-image-compression";
import { Link } from "react-router-dom";


export default function AdminProductsNew(){



  const [titleZh,setTitleZh] = useState("");

  const [titleEn,setTitleEn] = useState("");
  const [slug,setSlug] = useState("");
const [descZh,setDescZh] = useState("");
const [descEn,setDescEn] = useState("");

const [category,setCategory] = useState("INDOOR");

const [file,setFile] = useState(null);

const [subtitleZh,setSubtitleZh] = useState("");
const [subtitleEn,setSubtitleEn] = useState("");

const [lineLink,setLineLink] = useState("");
const [tags,setTags] = useState([
  { zh:"", en:"" },
  { zh:"", en:"" },
  { zh:"", en:"" }
]);



const [seoTitle,setSeoTitle] = useState("");
const [seoDescription,setSeoDescription] = useState("");

const [descLongZh,setDescLongZh] = useState("");
const [descLongEn,setDescLongEn] = useState("");
const [file2,setFile2] = useState(null);

const [featured,setFeatured] =
  useState(false);

const [published,setPublished] =
  useState(true);
const [subCategory,setSubCategory] =
  useState("");


const [specs,setSpecs] = useState([
  {
    size:{
      zh:"",
      en:""
    },

    space:{
      zh:"",
      en:""
    },

    power:"",
    voltage:"",
    cri:"",

    material:{
      zh:"",
      en:""
    },

    lightColor:{
      zh:"",
      en:""
    },

    install:{
      zh:"",
      en:""
    },

    style:{
      zh:"",
      en:""
    }
  }

]);






const [scene1,setScene1] = useState(null);
const [scene2,setScene2] = useState(null);
const [scene3,setScene3] = useState(null);

const [detail1,setDetail1] = useState(null);
const [detail2,setDetail2] = useState(null);
const [detail3,setDetail3] = useState(null);

const [features,setFeatures] = useState([
{
  titleZh:"",
  titleEn:"",
  descZh:"",
  descEn:""
},
{
  titleZh:"",
  titleEn:"",
  descZh:"",
  descEn:""
},
{
  titleZh:"",
  titleEn:"",
  descZh:"",
  descEn:""
}
]);


async function handleSave(){

const COMPRESS_LIMIT =
  1024 * 1024;
  // 先檢查 slug

if(!slug.trim()){
    alert("請輸入 Slug");
    return;
  }

  const { data: exist } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

if(exist){
  alert("❌ Slug 已存在");
  return;
}

let imageUrl = "";
let imageUrl2 = "";

let galleryUrls = [];

const galleryImages = [
  scene1,
  scene2,
  scene3,
  detail1,
  detail2,
  detail3
];


// cover
if(file){

  const ext =
    file.name.split(".").pop();

  const fileName =
    `${slug}-cover-${Date.now()}.${ext}`;

  let compressedCover =
    file;

  if(file.size > COMPRESS_LIMIT){

    compressedCover =
      await imageCompression(
        file,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
        }
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        compressedCover
      );

  if(uploadError){
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName);

  imageUrl = data.publicUrl;

}


// cover2
if(file2){

  const ext =
    file2.name.split(".").pop();

  const fileName2 =
    `${slug}-cover2-${Date.now()}.${ext}`;

  let compressedCover2 =
    file2;

  if(file2.size > COMPRESS_LIMIT){

    compressedCover2 =
      await imageCompression(
        file2,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
        }
      );

  }

  const { error: uploadError2 } =
    await supabase.storage
      .from("products")
      .upload(
        fileName2,
        compressedCover2
      );

  if(uploadError2){
    alert(uploadError2.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName2);

imageUrl2 = data.publicUrl;
}

for(const img of galleryImages){

  if(!img) continue;

  const ext =
    img.name.split(".").pop();

  const fileName =
    `${slug}-gallery-${Date.now()}-${Math.random()}.${ext}`;

  let compressedImg =
    img;

  if(img.size > COMPRESS_LIMIT){

    compressedImg =
      await imageCompression(
        img,
        {
          maxSizeMB: 1,
          useWebWorker: true,
          maxWidthOrHeight: 1920
        }
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        compressedImg
      );

  if(uploadError){
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName);

  galleryUrls.push(
    data.publicUrl
  );

}



  const { error } =
    await supabase
      .from("products")
      .insert([
        {
          title_zh:titleZh,
          title_en:titleEn,

          subtitle_zh:subtitleZh,
          subtitle_en:subtitleEn,

          slug,

          desc_zh:descZh,
          desc_en:descEn,

          desc_long_zh:descLongZh,
          desc_long_en:descLongEn,

          seo_title:seoTitle,
          seo_description:seoDescription,

          line_link:lineLink,
category,
sub_category: subCategory,

cover:imageUrl,
  cover2:imageUrl2,

gallery:
  galleryUrls.length > 0
    ? galleryUrls
    : [],

specs,
features,
tags,

featured,
published,
sort_order: -Date.now()
        }
      ]);

if(error){
  alert(error.message);
  return;
}

alert("✅ 新增成功");

window.location.href =
  `/admin/products/${slug}`;

}

  return(

<main className="pt-[140px] px-10 pb-20 max-w-[900px] mx-auto">

  <div
    className="
      flex
      flex-col
      md:flex-row
      md:justify-between
      md:items-center
      gap-4
      mb-8
    "
  >

    {/* 麵包屑 */}
    <div
      className="
        text-lg
        text-white/50
        flex
        gap-3
        items-center
        flex-wrap
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

      <Link
        to="/admin/products"
        className="hover:text-[#C8A46A]"
      >
        產品管理
      </Link>

      <span className="text-[#C8A46A]">
        →
      </span>

      <span className="text-white">
        新增產品
      </span>
    </div>

    {/* 功能按鈕 */}
    <div className="flex gap-3">

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
        返回列表
      </Link>


      <button
        onClick={handleSave}
        className="
          px-6
          py-3
          bg-[#C8A46A]
          text-black
          rounded
        "
      >
        儲存
      </button>

    </div>

  </div>

      <h1 className="text-3xl mb-8 text-white">
        新增產品
      </h1>
<label className="text-white flex gap-2 mb-4">

  <input
    type="checkbox"
    checked={published}
    onChange={(e)=>
      setPublished(e.target.checked)
    }
  />

  上架

</label>

      <label className="text-white flex gap-2  mb-4">

<input
  type="checkbox"
  checked={featured}
  onChange={(e)=>
    setFeatured(e.target.checked)
  }
/>

精選產品

</label>

<p className="mb-2 text-sm text-white/60">
  中文名稱
</p>

<input
  className="w-full p-3 mb-6 border bg-white text-black"
  value={titleZh}
  onChange={(e)=>setTitleZh(e.target.value)}
/>

<p className="mb-2 text-sm text-white/60">
  中文副標
</p>

<input
  value={subtitleZh}
  onChange={(e)=>setSubtitleZh(e.target.value)}
  className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    mb-6
  "
/>

<p className="mb-2 text-sm text-white/60">
  英文名稱
</p>

<input
  className="w-full p-3 mb-6 border bg-white text-black"
  value={titleEn}
  onChange={(e)=>setTitleEn(e.target.value)}
/>

<p className="mb-2 text-sm text-white/60">
  英文副標
</p>

<input
  value={subtitleEn}
  onChange={(e)=>setSubtitleEn(e.target.value)}
  className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    mb-6
  "
/>

{/* DESCRIPTION */}

<section className="border border-white/10 p-8">

  <h2 className="text-xl mb-8 tracking-[0.1em]">
    產品簡述
  </h2>

  <div className="space-y-6">

    <div>
      <p className="mb-2 text-sm text-white/60">
        中文簡述
      </p>

      <textarea
        value={descZh}
        onChange={(e)=>setDescZh(e.target.value)}
        rows="5"
        className="
          border border-white/20
          bg-white
          text-black
          p-3
          w-full
        "
      />
    </div>

    <div>
      <p className="mb-2 text-sm text-white/60">
        英文簡述
      </p>

      <textarea
        value={descEn}
        onChange={(e)=>setDescEn(e.target.value)}
        rows="5"
        className="
          border border-white/20
          bg-white
          text-black
          p-3
          w-full
        "
      />
    </div>

  </div>

</section>





<p className="mb-2 text-sm text-white/60">
  Slug
</p>

<input
  value={slug}
  onChange={(e)=>setSlug(e.target.value)}
  className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    mb-6
  "
/>

<h3 className="text-white text-xl mt-10 mb-4">
產品圖片
</h3>

<div className="grid md:grid-cols-2 gap-6 mb-8">

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover 上傳
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>setFile(e.target.files[0])}
      className="
        w-full
        p-3
        border
        bg-white
        text-black
      "
    />

{file && (

  <img
    src={URL.createObjectURL(file)}
    alt=""
    className="
      mt-4
      w-full
      h-[260px]
      object-cover
      rounded
      border
      border-white/10
    "
  />

)}


  </div>

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover2 上傳
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>setFile2(e.target.files[0])}
      className="
        w-full
        p-3
        border
        bg-white
        text-black
      "
    />

{file2 && (

  <img
    src={URL.createObjectURL(file2)}
    alt=""
    className="
      mt-4
      w-full
      h-[260px]
      object-cover
      rounded
      border
      border-white/10
    "
  />

)}


  </div>

</div>

<div className="grid md:grid-cols-2 gap-6 mb-12">

  {/* 情境圖 */}
  <div className="space-y-4">

    <h3 className="text-white text-lg mb-4">
      情境圖
    </h3>

    <div>
      <p className="text-white/60 text-sm mb-2">
        情境圖1
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setScene1(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

{scene1 && (

  <img
    src={URL.createObjectURL(scene1)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
    "
  />

)}

    </div>

    <div>
      <p className="text-white/60 text-sm mb-2">
        情境圖2
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setScene2(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

      {scene2 && (

  <img
    src={URL.createObjectURL(scene2)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
    "
  />

)}

    </div>

    <div>
      <p className="text-white/60 text-sm mb-2">
        情境圖3
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setScene3(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

{scene3 && (

  <img
    src={URL.createObjectURL(scene3)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
    "
  />

)}

    </div>

  </div>

  {/* 細節圖 */}
  <div className="space-y-4">

    <h3 className="text-white text-lg mb-4">
      細節圖
    </h3>

    <div>
      <p className="text-white/60 text-sm mb-2">
        細節圖1
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setDetail1(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

{detail1 && (

  <img
    src={URL.createObjectURL(detail1)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
      border
      border-white/10
    "
  />

)}

    </div>

    <div>
      <p className="text-white/60 text-sm mb-2">
        細節圖2
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setDetail2(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />
      {detail2 && (

  <img
    src={URL.createObjectURL(detail2)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
      border
      border-white/10
    "
  />

)}
    </div>

    <div>
      <p className="text-white/60 text-sm mb-2">
        細節圖3
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>
          setDetail3(e.target.files[0])
        }
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

{detail3 && (

  <img
    src={URL.createObjectURL(detail3)}
    alt=""
    className="
      mt-3
      w-full
      h-[180px]
      object-cover
      rounded
      border
      border-white/10
    "
  />

)}

    </div>

  </div>

</div>


<h3 className="text-white text-xl mt-10 mb-4">
產品分類
</h3>

<select
  className="w-full p-3 mb-4 border bg-white text-black"
  value={category}
  onChange={(e)=>{
    setCategory(e.target.value);
    setSubCategory("");
  }}
>
  <option value="INDOOR">室內燈具</option>
 <option value="OUTDOOR">
  戶外系列
</option>
  <option value="LIGHTING_DESIGN">照明設計</option>
  <option value="FESTIVAL">節慶燈具</option>
  <option value="INSTALLATION">施工安裝</option>
  <option value="CUSTOM">訂製燈具</option>
</select>


{[
  "INDOOR",
  "OUTDOOR",
  "FESTIVAL"
].includes(category) && (

<select
  className="w-full p-3 mb-6 border bg-white text-black"
  value={subCategory}
  onChange={(e)=>setSubCategory(e.target.value)}
>
  <option value="">
    請選擇子分類
  </option>

{category === "INDOOR" && (
  <>
    <option value="LOBBY_PENDANT">
      大廳吊燈
    </option>

    <option value="DINING_PENDANT">
      餐廳吊燈
    </option>

    <option value="CUSTOM_PENDANT">
      訂製吊燈
    </option>

    <option value="LIGHT_FILM">
      光膜
    </option>

    <option value="CRYSTAL_FILM">
      晶膜屏
    </option>

    <option value="LINEAR">
      線條燈
    </option>

    <option value="WALL">
      壁燈
    </option>
  </>
)}

{category === "OUTDOOR" && (
  <>
    <option value="LANDSCAPE_POLE">
      景觀高燈
    </option>

    <option value="LANDSCAPE_BOLLARD">
      景觀矮燈
    </option>

    <option value="POST_TOP">
      柱頭燈
    </option>

    <option value="LANDSCAPE_INGROUND">
      景觀地埋燈
    </option>

    <option value="UNDERWATER">
      水底燈
    </option>

    <option value="LINEAR_FACADE">
      外牆線型燈
    </option>

    <option value="FLOOD">
      投光燈
    </option>

    <option value="WALL_LIGHT">
      外牆壁燈
    </option>

    <option value="RECESSED_WALL">
      崁壁燈
    </option>

    <option value="STEP">
      階梯燈
    </option>

    <option value="INGROUND">
      外牆地埋燈
    </option>
  </>
)}

{category === "FESTIVAL" && (
  <>
    <option value="NET_LIGHT">
      網燈
    </option>

    <option value="STRING">
      燈串
    </option>

    <option value="FENCE_LIGHT">
      柵欄燈
    </option>

    <option value="CURTAIN_LIGHT">
      窗簾燈
    </option>
  </>
)}
</select>

  
)}






<h3 className="text-white text-xl mt-10 mb-4">
購買資訊
</h3>

<input
  placeholder="LINE 購買連結"
  value={lineLink}
  onChange={(e)=>setLineLink(e.target.value)}
  className="w-full p-3 mb-4 border bg-white text-black"
/>


<h3 className="text-white text-xl mt-10 mb-4">
產品特徵
</h3>

{/* 選項1 */}
<div className="grid md:grid-cols-2 gap-3 mb-3">

  <input
    value={tags[0]?.zh || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[0]={
        ...newTags[0],
        zh:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="選項1中文"
    className="w-full p-3 bg-white text-black"
  />

  <input
    value={tags[0]?.en || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[0]={
        ...newTags[0],
        en:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="Option 1 English"
    className="w-full p-3 bg-white text-black"
  />

</div>

{/* 選項2 */}
<div className="grid md:grid-cols-2 gap-3 mb-3">

  <input
    value={tags[1]?.zh || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[1]={
        ...newTags[1],
        zh:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="選項2中文"
    className="w-full p-3 bg-white text-black"
  />

  <input
    value={tags[1]?.en || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[1]={
        ...newTags[1],
        en:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="Option 2 English"
    className="w-full p-3 bg-white text-black"
  />

</div>

{/* 選項3 */}
<div className="grid md:grid-cols-2 gap-3">

  <input
    value={tags[2]?.zh || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[2]={
        ...newTags[2],
        zh:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="選項3中文"
    className="w-full p-3 bg-white text-black"
  />

  <input
    value={tags[2]?.en || ""}
    onChange={(e)=>{
      const newTags=[...tags];
      newTags[2]={
        ...newTags[2],
        en:e.target.value
      };
      setTags(newTags);
    }}
    placeholder="Option 3 English"
    className="w-full p-3 bg-white text-black"
  />

</div>



<h3 className="text-white text-xl mt-10 mb-4">
SEO 設定
</h3>

<input
  placeholder="SEO Title"
  value={seoTitle}
  onChange={(e)=>setSeoTitle(e.target.value)}
 className="w-full p-3 mb-4 border bg-white text-black"
/>

<textarea
  placeholder="SEO Description"
  rows="3"
  value={seoDescription}
  onChange={(e)=>setSeoDescription(e.target.value)}
  className="w-full p-3 mb-4 border bg-white text-black"
/>


<h3 className="text-white text-xl mt-10 mb-4">
產品簡介
</h3>
<textarea
  placeholder="中文簡介"
  rows="6"
  value={descLongZh}
  onChange={(e)=>setDescLongZh(e.target.value)}
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
  placeholder="英文簡介"
  rows="6"
  value={descLongEn}
  onChange={(e)=>setDescLongEn(e.target.value)}
  className="
    w-full
    p-3
    mb-6
    border
    bg-white
    text-black
  "
/>

<h3 className="text-white text-xl mt-10 mb-4">
產品規格
</h3>

{specs.map((spec,index)=>(

<div
  key={index}
  className="border border-white/10 p-4 mb-4"
>

<button
  type="button"
  onClick={()=>{
    const newSpecs =
      specs.filter((_,i)=>i!==index);

    setSpecs(newSpecs);
  }}
  className="
    text-red-500
    text-sm
    mb-3
  "
>
  刪除此規格
</button>

<div className="grid md:grid-cols-4 gap-3">

<input
  value={spec.size?.zh || ""}
  placeholder="尺寸"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].size = {
      ...(spec.size || {}),
      zh:e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

  <input
    value={spec.power || ""}
    placeholder="瓦數"
    onChange={(e)=>{
      const newSpecs=[...specs];
      newSpecs[index].power=e.target.value;
      setSpecs(newSpecs);
    }}
    className="w-full p-3 bg-white text-black"
  />

  <input
    value={spec.voltage || ""}
    placeholder="電壓"
    onChange={(e)=>{
      const newSpecs=[...specs];
      newSpecs[index].voltage=e.target.value;
      setSpecs(newSpecs);
    }}
    className="w-full p-3 bg-white text-black"
  />
<input
  value={spec.space?.zh || ""}
  placeholder="適用空間"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].space = {
      ...(spec.space || {}),
      zh:e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

{/* 第二排 */}

<input
  value={spec.material?.zh || ""}
  placeholder="材質中文（全銅＋玻璃）"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].material = {
      ...newSpecs[index].material,
      zh: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.material?.en || ""}
  placeholder="Material English"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].material = {
      ...newSpecs[index].material,
      en: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.cri || ""}
  placeholder="CRI（RA≥97）"
  onChange={(e)=>{
    const newSpecs=[...specs];
    newSpecs[index].cri=e.target.value;
    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.lightColor?.zh || ""}
  placeholder="光色中文（無極調光）"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].lightColor = {
      ...newSpecs[index].lightColor,
      zh: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

{/* 第三排 */}

<input
  value={spec.lightColor?.en || ""}
  placeholder="Light Color English"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].lightColor = {
      ...newSpecs[index].lightColor,
      en: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.install?.zh || ""}
  placeholder="安裝方式中文"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].install = {
      ...newSpecs[index].install,
      zh: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.install?.en || ""}
  placeholder="Install English"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].install = {
      ...newSpecs[index].install,
      en: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

<input
  value={spec.style?.zh || ""}
  placeholder="風格中文（義式極簡）"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].style = {
      ...newSpecs[index].style,
      zh: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

{/* 第四排 */}

<input
  value={spec.style?.en || ""}
  placeholder="Style English"
  onChange={(e)=>{
    const newSpecs=[...specs];

    newSpecs[index].style = {
      ...newSpecs[index].style,
      en: e.target.value
    };

    setSpecs(newSpecs);
  }}
  className="w-full p-3 bg-white text-black"
/>

</div>



</div>



))}

<div className="flex gap-4 mt-4">


<button
  type="button"
  onClick={()=>
    setSpecs([
      ...specs,
{
  size:{
    zh:"",
    en:""
  },

  space:{
    zh:"",
    en:""
  },

  power:"",
  voltage:"",
  cri:"",

  material:{
    zh:"",
    en:""
  },

  lightColor:{
    zh:"",
    en:""
  },

  install:{
    zh:"",
    en:""
  },

  style:{
    zh:"",
    en:""
  }
}
    ])
  }
  className="
    px-4
    py-2
    bg-[#C8A46A]
    text-black
    rounded
  "
>
  ＋新增規格
</button>

  <button
    type="button"
    onClick={()=>{
      if(specs.length===0) return;

      const lastSpec =
        specs[specs.length - 1];

setSpecs([
  ...specs,
  JSON.parse(
    JSON.stringify(lastSpec)
  )
]);
    }}
    className="
      px-4
      py-2
      border
      border-[#C8A46A]
      text-[#C8A46A]
      rounded
    "
  >
    ＋ 複製規格
  </button>

</div>


<h3 className="text-white text-xl mt-10 mb-4">
細節說明
</h3>

{features.map((item,index)=>(

  <div
    key={index}
    className="border border-white/10 p-4 mb-4"
  >

    <p className="text-white/60 text-sm mb-2">
      中文標題
    </p>

    <input
      className="w-full p-3 mb-3 bg-white text-black"
      placeholder="中文標題"
      value={item.titleZh || ""}
      onChange={(e)=>{
        const newFeatures = [...features];
        newFeatures[index].titleZh = e.target.value;
        setFeatures(newFeatures);
      }}
    />

    <p className="text-white/60 text-sm mb-2">
      中文說明
    </p>

    <textarea
      className="
        w-full
        p-3
        mb-3
        bg-white
        text-black
      "
      rows="3"
      placeholder="中文說明"
      value={item.descZh || ""}
      onChange={(e)=>{
        const newFeatures = [...features];
        newFeatures[index].descZh = e.target.value;
        setFeatures(newFeatures);
      }}
    />

    <p className="text-white/60 text-sm mb-2">
      英文標題
    </p>

    <input
      className="w-full p-3 mb-3 bg-white text-black"
      placeholder="英文標題"
      value={item.titleEn || ""}
      onChange={(e)=>{
        const newFeatures = [...features];
        newFeatures[index].titleEn = e.target.value;
        setFeatures(newFeatures);
      }}
    />

    <p className="text-white/60 text-sm mb-2">
      英文說明
    </p>

    <textarea
      className="
        w-full
        p-3
        bg-white
        text-black
      "
      rows="3"
      placeholder="英文說明"
      value={item.descEn || ""}
      onChange={(e)=>{
        const newFeatures = [...features];
        newFeatures[index].descEn = e.target.value;
        setFeatures(newFeatures);
      }}
    />

  </div>

))}

    </main>

  );
}