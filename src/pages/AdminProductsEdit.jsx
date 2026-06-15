
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

export default function AdminProductsEdit(){

  const [specs,setSpecs] = useState([]);
const [features,setFeatures] = useState([]);

const [featured,setFeatured] = useState(false);
const [published,setPublished] = useState(true);

const [titleZh,setTitleZh] = useState("");
const [titleEn,setTitleEn] = useState("");
const [descZh,setDescZh] = useState("");
const [descEn,setDescEn] = useState("");
const [cover,setCover] = useState("");
const [category,setCategory] = useState("");

const [subtitleZh,setSubtitleZh] = useState("");
const [subtitleEn,setSubtitleEn] = useState("");

const [lineLink,setLineLink] = useState("");

const [seoTitle,setSeoTitle] = useState("");
const [seoDescription,setSeoDescription] = useState("");

const [descLongZh,setDescLongZh] = useState("");
const [descLongEn,setDescLongEn] = useState("");

const [cover2,setCover2] = useState("");


const [scene1,setScene1] = useState(null);
const [scene2,setScene2] = useState(null);
const [scene3,setScene3] = useState(null);

const [detail1,setDetail1] = useState(null);
const [detail2,setDetail2] = useState(null);
const [detail3,setDetail3] = useState(null);
const [tags,setTags] = useState([
  { zh:"", en:"" },
  { zh:"", en:"" },
  { zh:"", en:"" }
]);

const { series, slug } = useParams();

console.log(series);
console.log(slug);



const navigate = useNavigate();

const [product,setProduct] = useState(null);
const [role,setRole] = useState("");
const [saved,setSaved] = useState(false);
const [productSlug,setProductSlug] = useState("");

const [cover2File,setCover2File] =
  useState(null);

const [coverFile,setCoverFile] =
  useState(null);






useEffect(() => {
  
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

  async function loadProduct(){

    const { data,error } = await supabase
      .from("products")
      .select("*")
      .eq("slug",slug)
      .single();

    if(error){
      console.log(error);
      return;
    }

    if(data){

      console.log("SPECS");
console.log(data.specs);

console.log(
  JSON.stringify(
    data.specs,
    null,
    2
  )
);

      setProduct(data);

      setTitleZh(data.title_zh || "");
      setTitleEn(data.title_en || "");
      setDescZh(data.desc_zh || "");
      setDescEn(data.desc_en || "");
setCover(data.cover || "");
setCategory(data.category || "");

setSubtitleZh(data.subtitle_zh || "");
setSubtitleEn(data.subtitle_en || "");

setLineLink(data.line_link || "");

setSeoTitle(data.seo_title || "");
setSeoDescription(data.seo_description || "");

setDescLongZh(data.desc_long_zh || "");
setDescLongEn(data.desc_long_en || "");

setCover2(data.cover2 || "");



console.log("SPECS");
console.log(data.specs);

setSpecs(data.specs || []);


console.log("FEATURES");
console.log(data.features);



console.log(
  JSON.stringify(
    data.features,
    null,
    2
  )
);


setFeatures(

  data.features?.length

    ? data.features.map(f => ({

        img: f.img || "",

        titleZh:
          f.titleZh ||
          f.title?.zh ||
          "",

        titleEn:
          f.titleEn ||
          f.title?.en ||
          "",

        descZh:
          f.descZh ||
          f.desc?.zh ||
          "",

        descEn:
          f.descEn ||
          f.desc?.en ||
          ""

      }))

    : [

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

      ]

);

setFeatured(data.featured || false);
setPublished(
  data.published !== false
);


let finalTags = [];




if(Array.isArray(data.tags)){

  finalTags = data.tags;

}else if(typeof data.tags === "string"){

  try{

    const parsed =
      JSON.parse(data.tags);

    finalTags =
      Array.isArray(parsed)
        ? parsed
        : [];

  }catch{

    finalTags = [];

  }

}



const normalizedTags =
  finalTags.map(tag => {

    if(typeof tag === "string"){
      return {
        zh: tag,
        en: ""
      };
    }

    return {
      zh: tag?.zh || "",
      en: tag?.en || ""
    };
  });

setTags(normalizedTags);


console.log(JSON.stringify(finalTags,null,2));

setProductSlug(data.slug || "");
    }

  }
 loadRole(); 
  loadProduct(
    
  );

},[slug]);



async function handleSave(){

  let finalCover = cover;
  let finalCover2 = cover2;

  let finalGallery =
    product?.gallery
      ? [...product.gallery]
      : [];

  if(coverFile){

    const ext =
      coverFile.name.split(".").pop();

    const fileName =
      `${productSlug}-cover-${Date.now()}.${ext}`;

    let compressedCover =
      coverFile;

    if(coverFile.size > 800 * 1024){

      compressedCover =
        await imageCompression(
          coverFile,
          {
            maxSizeMB: 1,
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

    finalCover = data.publicUrl;
  }
if(cover2File){

  const ext =
    cover2File.name.split(".").pop();

  const fileName =
    `${productSlug}-cover2-${Date.now()}.${ext}`;

  let compressedCover2 =
    cover2File;

  if(cover2File.size > 800 * 1024){

    compressedCover2 =
      await imageCompression(
        cover2File,
        {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920
        }
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        compressedCover2
      );

  if(uploadError){
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName);

  finalCover2 = data.publicUrl;
}

const galleryImages = [
  scene1,
  scene2,
  scene3,
  detail1,
  detail2,
  detail3
];
for(let i = 0; i < galleryImages.length; i++){

  const file = galleryImages[i];

  if(!file) continue;

  const ext =
    file.name.split(".").pop();

  const fileName =
    `${productSlug}-gallery-${i}-${Date.now()}.${ext}`;

  let compressedFile =
    file;

  if(file.size > 800 * 1024){

    compressedFile =
      await imageCompression(
        file,
        {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920
        }
      );

  }

  const { error: uploadError } =
    await supabase.storage
      .from("products")
      .upload(
        fileName,
        compressedFile
      );

  if(uploadError){
    alert(uploadError.message);
    return;
  }

  const { data } =
    supabase.storage
      .from("products")
      .getPublicUrl(fileName);

  finalGallery[i] =
    data.publicUrl;

}

console.log(tags);
console.log(typeof tags);

const { error } = await supabase
  .from("products")
.update({
  slug: productSlug,

  title_zh: titleZh,
  title_en: titleEn,

  desc_zh: descZh,
  desc_en: descEn,

  category,

  cover: finalCover,
  cover2: finalCover2,

  subtitle_zh: subtitleZh,
  subtitle_en: subtitleEn,

  line_link: lineLink,

  seo_title: seoTitle,
  seo_description: seoDescription,

  desc_long_zh: descLongZh,
  desc_long_en: descLongEn,

  gallery: finalGallery,

tags,
  specs,
  features: features.map(f => ({

  img: f.img || "",

  title: {
    zh: f.titleZh || "",
    en: f.titleEn || ""
  },

  desc: {
    zh: f.descZh || "",
    en: f.descEn || ""
  }

})),
  featured,
  published
})
  .eq("slug", slug);


  if(error){
    alert(error.message);
    return;
  }

  alert("✅ 儲存成功");

  navigate(`/admin/products/${productSlug}`);

  setSaved(true);

  setTimeout(()=>{
    setSaved(false);
  },3000);

}



if(!product){
  return (
    <div className="p-10 text-white">
      Loading...
    </div>
  );
}

return(

   <main
  className="
    pt-[140px]
    px-10
    pb-20
    min-h-screen
    bg-black
    text-white
  "
>


  

      {/* HEADER */}
      <div className="flex items-start justify-between mb-12">

        <div>

          <p className="text-sm tracking-[0.3em] text-white/40 mb-2">
            CMS
          </p>

          <h1 className="text-4xl font-light tracking-[0.08em]">
            Edit Product
          </h1>

        </div>



<div className="flex gap-4">

  <button
    onClick={handleSave}
    className="
      px-6 py-3
      bg-[#C8A46A]
      text-black
      rounded
    "
  >
    儲存
  </button>

  <button
    onClick={() => navigate("/admin/products")}
    className="
      px-6 py-3
      border border-white/20
      text-white
      rounded
    "
  >
    返回產品列表
  </button>

</div>

      </div>

      {/* SAVE MESSAGE */}
      {saved && (

        <div className="
          mb-8
          border border-green-500/30
          bg-green-500/10
          text-green-300
          px-5 py-4
        ">
          Product saved successfully.
        </div>

      )}

      {/* FORM */}
      <div className="space-y-10 max-w-[1100px]">

        {/* BASIC INFO */}
        <section className="border border-white/10 p-8">

          <h2 className="text-xl mb-8 tracking-[0.1em]">
            基本資料
          </h2>



  <div className="space-y-10">

  {/* 中文名稱 */}
  <div>
    <p className="mb-2 text-sm text-white/60">
      中文名稱
    </p>

    <input
      value={titleZh}
      onChange={(e)=>setTitleZh(e.target.value)}
      className="
        border border-white/20
        bg-white
        text-black
        p-3
        w-full
      "
    />
  </div>

  {/* 中文副標 */}
  <div>
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
      "
    />
  </div>

  {/* 英文名稱 */}
  <div>
    <p className="mb-2 text-sm text-white/60">
      英文名稱
    </p>

    <input
      value={titleEn}
      onChange={(e)=>setTitleEn(e.target.value)}
      className="
        border border-white/20
        bg-white
        text-black
        p-3
        w-full
      "
    />
  </div>

  {/* 英文副標 */}
  <div>
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
      "
    />
  </div>

  {/* Slug */}
  <div>
    <p className="mb-2 text-sm text-white/60">
      Slug
    </p>

    <input
      value={productSlug}
      onChange={(e)=>setProductSlug(e.target.value)}
      className="
        border border-white/20
        bg-white
        text-black
        p-3
        w-full
      "
    />
  </div>


            {/* CATEGORY */}
            <div>

              <p className="mb-2 text-sm text-white/60">
                產品分類
              </p>

<select
  className="w-full p-3 mb-4 border bg-white text-black"
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
>
  <option value="INDOOR">室內燈具</option>
  <option value="OUTDOOR">戶外燈具</option>
  <option value="LIGHTING_DESIGN">照明設計</option>
  <option value="FESTIVAL">節慶燈具</option>
  <option value="INSTALLATION">施工安裝</option>
  <option value="CUSTOM">訂製燈具</option>

</select>

            </div>

          </div>

        </section>

{/* PRODUCT IMAGE */}
<section className="border border-white/10 p-8">

  <h2 className="text-xl mb-8 tracking-[0.1em]">
    PRODUCT IMAGE
  </h2>

  <div className="grid md:grid-cols-2 gap-8 mb-8">

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover
    </p>

{(cover || coverFile) && (
  <>
    <img
      src={
        coverFile
          ? URL.createObjectURL(coverFile)
          : cover
      }
      alt="cover"
      className="
        w-full
        max-w-[260px]
        border
        border-white/10
        mb-2
      "
    />

    <p className="text-xs text-white/50">
      {
        coverFile
          ? coverFile.name
          : cover.split("/").pop()
      }
    </p>
  </>
)}
  </div>

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover 2
    </p>
{(cover2 || cover2File) && (
  <>
    <img
      src={
        cover2File
          ? URL.createObjectURL(cover2File)
          : cover2
      }
      alt="cover2"
      className="
        w-full
        max-w-[260px]
        border
        border-white/10
        mb-2
      "
    />

    <p className="text-xs text-white/50">
      {
        cover2File
          ? cover2File.name
          : cover2.split("/").pop()
      }
    </p>
  </>
)}
  </div>

</div>

{/* 上傳 */}
<div className="grid md:grid-cols-2 gap-6">

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover 上傳
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>
        setCoverFile(e.target.files[0])
      }
      className="
        w-full
        p-3
        bg-white
        text-black
        border
        border-white/20
      "
    />

    
  </div>

  <div>
    <p className="text-white/60 text-sm mb-2">
      Cover2 上傳
    </p>

    <input
      type="file"
      accept="image/*"
      onChange={(e)=>
        setCover2File(e.target.files[0])
      }
      className="
        w-full
        p-3
        bg-white
        text-black
        border
        border-white/20
      "
    />
  </div>

</div>

{/* LINE */}
<div className="mt-8">

  <p className="text-white/60 text-sm mb-2">
    LINE 購買連結
  </p>

  <input
    value={lineLink}
    onChange={(e)=>setLineLink(e.target.value)}
    placeholder="LINE 購買連結"
    className="
      w-full
      p-3
      bg-white
      text-black
      border
      border-white/20
    "
  />

</div>



        <div>




<h2 className="text-xl mb-8 tracking-[0.1em]">
  情境圖與細節圖
</h2>
<div className="grid md:grid-cols-2 gap-6 mb-12">

  {/* 情境圖 */}
  <div className="space-y-4">

    <h3 className="text-white text-lg mb-4">
      情境圖
    </h3>

  {[0,1,2].map((index)=>(
    <div
      key={index}
      className="
        border
        border-white/10
        bg-white/5
        p-3
        rounded
      "
    >

   {
  (
    product.gallery?.[index] ||
    (index===0 && scene1) ||
    (index===1 && scene2) ||
    (index===2 && scene3)
  ) && (
<img
  src={
    index===0 && scene1
      ? URL.createObjectURL(scene1)
      : index===1 && scene2
      ? URL.createObjectURL(scene2)
      : index===2 && scene3
      ? URL.createObjectURL(scene3)
      : product.gallery[index]
  }
          alt={`scene-${index}`}
          className="
            w-full
            max-w-[240px]
            h-[180px]
            object-cover
            border
            border-white/10
            mb-3
          "
        />
      )}

      <p className="text-white/60 text-sm mb-2">
        情境圖{index + 1}
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>{
          const file = e.target.files[0];

          if(index===0) setScene1(file);
          if(index===1) setScene2(file);
          if(index===2) setScene3(file);
        }}
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

    </div>
  ))}

</div>

{/* 細節圖 */}
<div className="space-y-4">

  <h3 className="text-white text-lg mb-4">
    細節圖
  </h3>

  {[3,4,5].map((index)=>(
    <div
      key={index}
      className="
        border
        border-white/10
        bg-white/5
        p-3
        rounded
      "
    >

    {
  (
    product.gallery?.[index] ||
    (index===3 && detail1) ||
    (index===4 && detail2) ||
    (index===5 && detail3)
  ) && (
<img
  src={
    index===3 && detail1
      ? URL.createObjectURL(detail1)
      : index===4 && detail2
      ? URL.createObjectURL(detail2)
      : index===5 && detail3
      ? URL.createObjectURL(detail3)
      : product.gallery[index]
  }
          alt={`detail-${index}`}
          className="
            w-full
            max-w-[240px]
            h-[180px]
            object-cover
            border
            border-white/10
            mb-3
          "
        />
      )}

      <p className="text-white/60 text-sm mb-2">
        細節圖{index - 2}
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e)=>{
          const file = e.target.files[0];

          if(index===3) setDetail1(file);
          if(index===4) setDetail2(file);
          if(index===5) setDetail3(file);
        }}
        className="
          w-full
          p-3
          border
          border-white/20
          bg-white
          text-black
        "
      />

    </div>
  ))}

</div>


</div>
</div>

</section>
        {/* DESCRIPTION */}
        <section className="border border-white/10 p-8">

          <h2 className="text-xl mb-8 tracking-[0.1em]">
            產品簡述
          </h2>

          <div className="space-y-6">

            {/* 中文描述 */}
            <div>

              <p className="mb-2 text-sm text-white/60">
                中文描述
              </p>

              <textarea
               value={descZh}
onChange={(e)=>setDescZh(e.target.value)}
                className="
                  border border-white/20
                  bg-white
                  text-black
                  p-3
                  w-full
                  h-[180px]
                "
              />

            </div>

            {/* 英文描述 */}
            <div>

              <p className="mb-2 text-sm text-white/60">
                English Description
              </p>

              <textarea
               value={descEn}
onChange={(e)=>setDescEn(e.target.value)}
                className="
                  border border-white/20
                  bg-white
                  text-black
                  p-3
                  w-full
                  h-[180px]
                "
              />

            </div>

          </div>

        </section>

<section className="border border-white/10 p-8">

  <h2 className="text-xl mb-8 tracking-[0.1em]">
    燈光選項
  </h2>

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



{/* 選項2 */}


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



{/* 選項3 */}


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
</section>

     {role === "ADMIN" && (

<section className="border border-white/10 p-8">

          <h2 className="text-xl mb-8 tracking-[0.1em]">
            SEO
          </h2>

          <div className="space-y-6">

            <div>

              <p className="mb-2 text-sm text-white/60">
                SEO Title
              </p>

             <input
  value={seoTitle}
  onChange={(e)=>setSeoTitle(e.target.value)}

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
                Meta Description
              </p>
<textarea
  value={seoDescription}
  onChange={(e)=>setSeoDescription(e.target.value)}
  className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    h-[120px]
  "
/>

            </div>

          </div>

   </section>

)}
<section className="border border-white/10 p-8">

  <h2 className="text-xl mb-8 tracking-[0.1em]">
   產品簡介
  </h2>



  <textarea
    value={descLongZh}
    onChange={(e)=>setDescLongZh(e.target.value)}
      placeholder="中文簡介"
     className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    h-[240px]
  "
  />

  <textarea
    value={descLongEn}
    onChange={(e)=>setDescLongEn(e.target.value)}
     placeholder="英文簡介"
     className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    h-[240px]
  "
  />

</section>

<section className="border border-white/10 p-8">

<h2 className="text-xl mb-8">
產品規格
</h2>

{specs.map((spec,index)=>{

  console.log("SPEC");
  console.log(spec);

  return(

<div
  key={index}
  className="
    border
    border-white/10
    p-4
    mb-4
    grid
    md:grid-cols-4
    gap-3
  "
>


  {/* 第一排：前台黑字 */}

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

<button
  type="button"
  onClick={()=>{
    setSpecs(
      specs.filter(
        (_,i)=>i!==index
      )
    );
  }}
>
刪除規格
</button>


</div>

  );

})}

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
        {
          ...lastSpec
        }
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

</section>

<section className="border border-white/10 p-8">

<h2 className="text-xl mb-8">
細節說明
</h2>

{features.map((item,index)=>(

  <div
    key={index}
    className="
      border
      border-white/10
      p-4
      mb-6
    "
  >

    <p className="mb-3 text-white/60">
      細節圖 {index + 1}
    </p>

    <p className="text-white/60 text-sm mb-2">
      中文標題
    </p>

    <input
      value={item.titleZh || ""}
      placeholder="中文標題"
      onChange={(e)=>{
        const newFeatures=[...features];
        newFeatures[index].titleZh=e.target.value;
        setFeatures(newFeatures);
      }}
      className="
        w-full
        p-3
        mb-3
        bg-white
        text-black
      "
    />

    <p className="text-white/60 text-sm mb-2">
      英文標題
    </p>

    <input
      value={item.titleEn || ""}
      placeholder="英文標題"
      onChange={(e)=>{
        const newFeatures=[...features];
        newFeatures[index].titleEn=e.target.value;
        setFeatures(newFeatures);
      }}
      className="
        w-full
        p-3
        mb-3
        bg-white
        text-black
      "
    />

    <p className="text-white/60 text-sm mb-2">
      中文說明
    </p>

    <textarea
      value={item.descZh || ""}
      placeholder="中文說明"
      rows="3"
      onChange={(e)=>{
        const newFeatures=[...features];
        newFeatures[index].descZh=e.target.value;
        setFeatures(newFeatures);
      }}
      className="
        w-full
        p-3
        mb-3
        bg-white
        text-black
      "
    />

    <p className="text-white/60 text-sm mb-2">
      英文說明
    </p>

    <textarea
      value={item.descEn || ""}
      placeholder="英文說明"
      rows="3"
      onChange={(e)=>{
        const newFeatures=[...features];
        newFeatures[index].descEn=e.target.value;
        setFeatures(newFeatures);
      }}
      className="
        w-full
        p-3
        bg-white
        text-black
      "
    />

  </div>

))}

<label className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={published}
    onChange={(e)=>
      setPublished(e.target.checked)
    }
  />
  Published
</label>

<label className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={featured}
    onChange={(e)=>
      setFeatured(e.target.checked)
    }
  />
  Featured
</label>

</section>


      </div>

    </main>

  );

}

