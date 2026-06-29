import { useParams, useNavigate } from "react-router-dom";
import useLang from "../hooks/useLang";
import newsData from "../data/newsData";

export default function NewsDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();
  const lang = useLang();

  const news = newsData.find(item => item.slug === slug);

  if (!news) {
    return (
      <main className="pt-[180px] pb-32 text-center">

        <h1 className="text-3xl mb-6">
          404
        </h1>

        <p className="text-gray-500 mb-8">
          {lang === "en"
            ? "News not found."
            : "找不到此文章"}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border"
        >
          {lang === "en"
            ? "Back"
            : "返回"}
        </button>

      </main>
    );
  }

  return (

    <main className="bg-black min-h-screen pt-[140px] pb-28">

      <div className="max-w-[900px] mx-auto px-6">

        {/* 返回 */}

<button
  onClick={() => navigate(-1)}
  className="
    inline-flex
    items-center
    gap-3

    mb-10

    text-white
    text-[11px]
    tracking-[0.35em]

    px-6
    py-3

    rounded-full

    bg-[#3A3A3A]

    hover:bg-[#4A4A4A]

    transition-all
    duration-300
  "
>
  <span className="text-lg leading-none">←</span>

  <span>BACK</span>
</button>

        {/* 影片 / 圖片 */}

        {news.link && !news.blocked ? (

          <div
            className={
              news.type === "vertical"
                ? "max-w-[420px] mx-auto mb-10"
                : "mb-10"
            }
          >
            <iframe
              src={news.link}
              className={
                news.type === "vertical"
                  ? "w-full aspect-[9/16] rounded-xl"
                  : "w-full aspect-video rounded-xl"
              }
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>

        ) : news.video ? (

          <video
            src={news.video}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full rounded-xl mb-10"
          />

        ) : (

          <img
            src={news.img}
            alt={news.title?.[lang]}
            className="w-full rounded-xl mb-10"
          />

        )}

        {/* 標題 */}

        <h1
          className="
            text-white
            text-center
            text-[22px]
            md:text-[32px]
            tracking-[0.08em]
            mb-8
          "
        >
          {news.title?.[lang]}
        </h1>

        {/* 內文 */}

        <div
          className="
            text-white/70
            text-center
            text-[15px]
            leading-9
            max-w-[760px]
            mx-auto
            mb-12
          "
          dangerouslySetInnerHTML={{
            __html: news.desc?.[lang]
          }}
        />





        {/* Facebook 外連 */}

        {news.link && news.blocked && (

          <a
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              block
              text-center
              text-[#C8A46A]
              tracking-[0.18em]
              hover:opacity-70
              transition
            "
          >
            {lang === "en"
              ? "VIEW FULL VIDEO"
              : "觀看完整影片"}
          </a>

        )}

      </div>

    </main>

  );
}