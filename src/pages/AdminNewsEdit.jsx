import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminNewsEdit(){

  const { slug } = useParams();

  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const [titleZh,setTitleZh] = useState("");
  const [titleEn,setTitleEn] = useState("");

  const [descZh,setDescZh] = useState("");
  const [descEn,setDescEn] = useState("");

  const [contentZh,setContentZh] = useState("");
  const [contentEn,setContentEn] = useState("");

  const [cover,setCover] = useState("");
  const [coverFile,setCoverFile] = useState(null);
  const [video,setVideo] = useState("");

  const [hero,setHero] = useState(false);
  const [published,setPublished] = useState(true);
  const [featured,setFeatured] = useState(false);

  const [sortOrder,setSortOrder] = useState(0);

  const [seoTitle,setSeoTitle] = useState("");
  const [seoDescription,setSeoDescription] = useState("");

  async function loadNews(){

    const { data,error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    if(error){
      alert(error.message);
      setLoading(false);
      return;
    }

    if(data){
      setTitleZh(data.title_zh || "");
      setTitleEn(data.title_en || "");

      setDescZh(data.desc_zh || "");
      setDescEn(data.desc_en || "");

      setContentZh(data.content_zh || "");
      setContentEn(data.content_en || "");

      setCover(data.cover || "");
      setVideo(data.video || "");

      setHero(data.hero || false);
      setPublished(data.published ?? true);
      setFeatured(data.featured || false);

      setSortOrder(data.sort_order || 0);

      setSeoTitle(data.seo_title || "");
      setSeoDescription(data.seo_description || "");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadNews();
  }, [slug]);

async function handleSave(){

  setSaving(true);

  let finalCover = cover;

// ⭐ 上傳封面圖片
if (coverFile) {

const ext =
  coverFile.name
    .split(".")
    .pop()
    .toLowerCase();

const fileName =
  `news/${slug}-cover.${ext}`;

  const { error: uploadError } =
await supabase.storage
  .from("projects")
      .upload(
        fileName,
        coverFile,
        {
          upsert: true
        }
      );

  if(uploadError){
    alert(uploadError.message);
    setSaving(false);
    return;
  }

const { data } =
  supabase.storage
    .from("projects")
    .getPublicUrl(fileName);

  finalCover =
    `${data.publicUrl}?v=${Date.now()}`;
}

    const { error } = await supabase
      .from("news")
      .update({
        title_zh:titleZh,
        title_en:titleEn,

        desc_zh:descZh,
        desc_en:descEn,

        content_zh:contentZh,
        content_en:contentEn,

        cover: finalCover,
        video,

        hero,
        published,
        featured,

        sort_order:Number(sortOrder) || 0,

        seo_title:seoTitle,
        seo_description:seoDescription
      })
      .eq("slug", slug);

    setSaving(false);

    if(error){
      alert(error.message);
      return;
    }

    alert("✅ 儲存成功");

window.location.href="/admin/news";
  }

  if(loading){
    return(
      <main className="pt-[140px] px-10 pb-20 text-white">
        Loading...
      </main>
    );
  }

  return(

    <main className="pt-[140px] px-10 pb-20 max-w-[900px] mx-auto">

      <h1 className="text-3xl mb-8 text-white">
        News Edit
      </h1>

      <div className="flex gap-6 mb-8 text-white">

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={published}
            onChange={(e)=>setPublished(e.target.checked)}
          />
          上架
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={hero}
            onChange={(e)=>setHero(e.target.checked)}
          />
          Hero 主打
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e)=>setFeatured(e.target.checked)}
          />
          精選
        </label>

      </div>

      <p className="mb-2 text-sm text-white/60">
        中文標題
      </p>

      <input
        value={titleZh}
        onChange={(e)=>setTitleZh(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        英文標題
      </p>

      <input
        value={titleEn}
        onChange={(e)=>setTitleEn(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        中文摘要
      </p>

      <textarea
        rows="5"
        value={descZh}
        onChange={(e)=>setDescZh(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        英文摘要
      </p>

      <textarea
        rows="5"
        value={descEn}
        onChange={(e)=>setDescEn(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        中文完整內容
      </p>

      <textarea
        rows="8"
        value={contentZh}
        onChange={(e)=>setContentZh(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

<p className="mb-2 text-sm text-white/60">
  英文完整內容
</p>

<textarea
  rows="8"
  value={contentEn}
  onChange={(e)=>setContentEn(e.target.value)}
  className="w-full p-3 mb-6 border bg-white text-black"
/>



 <p className="mb-2 text-sm text-white/60">
  封面圖片
</p>

{(cover || coverFile) && (
  <>
    <img
      src={
        coverFile
          ? URL.createObjectURL(coverFile)
          : cover
      }
      alt=""
      className="
        w-full
        max-h-[300px]
        object-cover
        rounded
        mb-3
      "
    />

    <p className="text-xs text-white/50 mb-4">
      {coverFile
        ? coverFile.name
        : cover.split("/").pop()}
    </p>
  </>
)}

<input
  type="file"
  accept="image/*"
  onChange={(e)=>
    setCoverFile(e.target.files[0])
  }
  className="
    w-full
    p-3
    mb-6
    border
    bg-white
    text-black
  "
/>

      <p className="mb-2 text-sm text-white/60">
        影片網址 video
      </p>

      <input
        value={video}
        onChange={(e)=>setVideo(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        排序 sort_order
      </p>

      <input
        type="number"
        value={sortOrder}
        onChange={(e)=>setSortOrder(e.target.value)}
        className="w-full p-3 mb-10 border bg-white text-black"
      />

      <h2 className="text-xl text-white mb-4">
        SEO
      </h2>

      <p className="mb-2 text-sm text-white/60">
        SEO Title
      </p>

      <input
        value={seoTitle}
        onChange={(e)=>setSeoTitle(e.target.value)}
        className="w-full p-3 mb-6 border bg-white text-black"
      />

      <p className="mb-2 text-sm text-white/60">
        SEO Description
      </p>

      <textarea
        rows="3"
        value={seoDescription}
        onChange={(e)=>setSeoDescription(e.target.value)}
        className="w-full p-3 mb-10 border bg-white text-black"
      />

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
          disabled:opacity-50
        "
      >
        {saving ? "儲存中..." : "儲存"}
      </button>

    </main>

  );

}