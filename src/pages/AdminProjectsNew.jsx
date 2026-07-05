import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import imageCompression from "browser-image-compression";


export default function AdminProjectsNew() {

  useEffect(() => {

    async function loadCategories() {

      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "project")
        .eq("enabled", true)
        .order("level")
        .order("parent_key")
        .order("sort_order");

      setCategories(data || []);

    }

    loadCategories();

  }, []);


  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [descZh, setDescZh] = useState("");
  const [descEn, setDescEn] = useState("");


  const [category, setCategory] =
    useState("LIGHTING_DESIGN");

  const [subCategory, setSubCategory] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] =
    useState(false);

  const [published, setPublished] =
    useState(true);



  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");

  const [cover, setCover] = useState(null);

  const [gallery1, setGallery1] = useState(null);
  const [gallery2, setGallery2] = useState(null);
  const [gallery3, setGallery3] = useState(null);
const [saving, setSaving] = useState(false);





async function handleSave() {

  setSaving(true);

  try {
    const COMPRESS_LIMIT =
      8 * 1024 * 1024;

    if (!slug.trim()) {
      alert("請輸入 Slug");
      return;
    }

    const { data: exist } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (exist) {
      alert("❌ Slug 已存在");
      return;
    }

    let imageUrl = "";

    const galleryUrls = [];


    // Cover

    if (cover) {

      const ext =
        cover.name.split(".").pop();

      const fileName =
        `${slug}-cover.${ext}`;

      let compressedCover = cover;

      if (cover.size > COMPRESS_LIMIT) {

        compressedCover =
          await imageCompression(
            cover,
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
              upsert: true
            }
          );

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("projects")
          .getPublicUrl(fileName);

      imageUrl = data.publicUrl;

    }

    // Gallery1

    if (gallery1) {

      const ext =
        gallery1.name.split(".").pop();

      const fileName =
        `${slug}-01.${ext}`;

      let compressedGallery1 =
        gallery1;

      if (gallery1.size > COMPRESS_LIMIT) {

        compressedGallery1 =
          await imageCompression(
            gallery1,
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
            compressedGallery1
            ,
            {
              upsert: true
            }
          );

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("projects")
          .getPublicUrl(fileName);

      galleryUrls.push(data.publicUrl);

    }


    // Gallery2

    if (gallery2) {

      const ext =
        gallery2.name.split(".").pop();

      const fileName =
        `${slug}-02.${ext}`;

      let compressedGallery2 =
        gallery2;

      if (gallery2.size > COMPRESS_LIMIT) {

        compressedGallery2 =
          await imageCompression(
            gallery2,
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
            compressedGallery2
            ,
            {
              upsert: true
            }
          );

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("projects")
          .getPublicUrl(fileName);

      galleryUrls.push(data.publicUrl);

    }


    // Gallery3

    if (gallery3) {

      const ext =
        gallery3.name.split(".").pop();

      const fileName =
        `${slug}-03.${ext}`;

      let compressedGallery3 =
        gallery3;

      if (gallery3.size > COMPRESS_LIMIT) {

        compressedGallery3 =
          await imageCompression(
            gallery3,
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
            compressedGallery3
            ,
            {
              upsert: true
            }
          );

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } =
        supabase.storage
          .from("projects")
          .getPublicUrl(fileName);

      galleryUrls.push(data.publicUrl);

    }


    const { error } =
      await supabase
        .from("projects")
        .insert([
          {
            title_zh: titleZh,
            title_en: titleEn,

            slug,

            desc_zh: descZh,
            desc_en: descEn,

category,
sub_category: subCategory,

cover: imageUrl,
images: galleryUrls || [],

featured,
published,

year,
location,
client,

sort_order: -Date.now(),

          }
        ]);


    if (error) {
      alert(error.message);
      return;
    }

alert("✅ 新增成功");

window.location.href =
  "/admin/projects";

  } finally {

    setSaving(false);

  }

}

  console.log("全部分類", categories);

  console.log("目前主分類", category);

  console.log(
    "子分類",
    categories.filter(
      c => c.parent_key === category
    )
  );

  return (

    <main className="pt-[140px] px-10 pb-20 max-w-[900px] mx-auto">




      <Link
        to="/admin/projects"
        className="inline-block mb-6 text-[#C8A46A]"
      >
        ← 返回案例列表
      </Link>


      <h1 className="text-3xl mb-8 text-white">
        新增案例
      </h1>
      <label className="text-white flex gap-2 mb-4">

        <input
          type="checkbox"
          checked={published}
          onChange={(e) =>
            setPublished(e.target.checked)
          }
        />

        上架

      </label>

      <label className="text-white flex gap-2  mb-4">

        <input
          type="checkbox"
          checked={featured}
          onChange={(e) =>
            setFeatured(e.target.checked)
          }
        />

        精選產品

      </label>



      {/* DESCRIPTION */}


      <input
        placeholder="中文標題"
        value={titleZh}
        onChange={(e) => setTitleZh(e.target.value)}
        className="w-full p-3 mb-4 border bg-white text-black"
      />

      <input
        placeholder="英文標題"
        value={titleEn}
        onChange={(e) => setTitleEn(e.target.value)}
        className="w-full p-3 mb-4 border bg-white text-black"
      />

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
              onChange={(e) => setDescZh(e.target.value)}
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
              onChange={(e) => setDescEn(e.target.value)}
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




      <input
        placeholder="年份"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-full p-3 mb-4 border bg-white text-black"
      />

      <input
        placeholder="地點"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-3 mb-4 border bg-white text-black"
      />

      <input
        placeholder="客戶 / Client"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        className="w-full p-3 mb-4 border bg-white text-black"
      />


      <p className="mb-2 text-sm text-white/60">
        Slug
      </p>

      <input
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="
    border border-white/20
    bg-white
    text-black
    p-3
    w-full
    mb-6
  "
      />

      <h3 className="text-white text-xl mt-10 mb-6">
        產品圖片
      </h3>

      {/* Cover */}
      <div className="mb-8">
        <p className="text-white/60 text-sm mb-2">
          Cover
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          className="
      w-full
      p-3
      border
      bg-white
      text-black
      mb-4
    "
        />

        {cover && (
          <img
            src={URL.createObjectURL(cover)}
            alt=""
            className="
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

      {/* Gallery 1 */}
      <div className="mb-8">
        <p className="text-white/60 text-sm mb-2">
          Gallery 1
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGallery1(e.target.files[0])}
          className="
      w-full
      p-3
      border
      bg-white
      text-black
      mb-4
    "
        />

        {gallery1 && (
          <img
            src={URL.createObjectURL(gallery1)}
            alt=""
            className="
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

      {/* Gallery 2 */}
      <div className="mb-8">
        <p className="text-white/60 text-sm mb-2">
          Gallery 2
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGallery2(e.target.files[0])}
          className="
      w-full
      p-3
      border
      bg-white
      text-black
      mb-4
    "
        />

        {gallery2 && (
          <img
            src={URL.createObjectURL(gallery2)}
            alt=""
            className="
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

      {/* Gallery 3 */}
      <div className="mb-8">
        <p className="text-white/60 text-sm mb-2">
          Gallery 3
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setGallery3(e.target.files[0])}
          className="
      w-full
      p-3
      border
      bg-white
      text-black
      mb-4
    "
        />

        {gallery3 && (
          <img
            src={URL.createObjectURL(gallery3)}
            alt=""
            className="
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


      {/* 主分類 */}



      <select

      className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
        value={category}
        onChange={(e) => {

          setCategory(e.target.value);
          setSubCategory("");

        }}
      >

        <option value="">請選擇主分類</option>

        {categories
          .filter(c => !c.parent_key)
          .map(c => (

            <option
              key={c.category_key}
              value={c.category_key}
            >

              {c.zh}

            </option>

          ))}

      </select>

      {/* 子分類 */}

      <select

      className="
    w-full
    p-3
    mb-4
    border
    bg-white
    text-black
  "
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      >

        <option value="">
          請選擇子分類
        </option>


{categories
  .filter(c => c.parent_key === category)
  .flatMap(child => {

    const grandChildren =
      categories.filter(
        g => g.parent_key === child.category_key
      );

    return [

      <option
        key={child.category_key}
        value={child.category_key}
      >
        {child.zh}
      </option>,

      ...grandChildren.map(g => (

        <option
          key={g.category_key}
          value={g.category_key}
        >
          　└ {g.zh}
        </option>

      ))

    ];

  })}



      </select>

<button
  onClick={handleSave}
  disabled={saving}
        className="
          px-6
          py-3
          bg-[#C8A46A]
          text-black
          rounded
          hover:opacity-80
        "
      >
      {saving ? "儲存中..." : "儲存"}
      </button>

    </main>

  );
}