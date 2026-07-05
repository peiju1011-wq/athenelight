import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminFooter() {

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [footerId, setFooterId] = useState(null);

    const [companyZh, setCompanyZh] = useState("");
    const [companyEn, setCompanyEn] = useState("");

    const [products, setProducts] = useState([]);
    const [downloads, setDownloads] = useState([]);
    const [connects, setConnects] = useState([]);

    const [privacyZh, setPrivacyZh] = useState("");
    const [privacyEn, setPrivacyEn] = useState("");

    const [termsZh, setTermsZh] = useState("");
    const [termsEn, setTermsEn] = useState("");

    async function loadFooter() {

        setLoading(true);

      const { data, error } = await supabase
.from("footer_settings")
.select("*")
.limit(1);

console.log(data);
console.log(data?.length);


        setLoading(false);

        if (error) {

            console.log(error);
            return;

        }

if (!data || data.length === 0) return;

const row = data[0];

        setFooterId(row.id);

        setCompanyZh(
            row.company_desc_zh || ""
        );

        setCompanyEn(
            row.company_desc_en || ""
        );

        setProducts(
            row.products || []
        );

        setDownloads(
            row.downloads || []
        );

        console.log(row.downloads);

        setConnects(
            row.connects || []
        );

        setPrivacyZh(
            row.privacy_zh || ""
        );

        setPrivacyEn(
            row.privacy_en || ""
        );

        setTermsZh(
            row.terms_zh || ""
        );

        setTermsEn(
            row.terms_en || ""
        );

    }

    useEffect(() => {

        loadFooter();

    }, []);

    async function handleSave() {

        setSaving(true);

        const { error } =
            await supabase
                .from("footer_settings")
                .update({

                    company_desc_zh: companyZh,
                    company_desc_en: companyEn,

                    products,

                    downloads,

                    connects,

                    privacy_zh: privacyZh,
                    privacy_en: privacyEn,

                    terms_zh: termsZh,
                    terms_en: termsEn

                })
                .eq("id", footerId);

        setSaving(false);

        if (error) {

            alert(error.message);
            return;

        }

        alert("Footer 已更新");

    }

    if (loading) {

        return (

            <main
                className="
        pt-[140px]
        text-white
        text-center
      "
            >

                Loading...

            </main>

        );

    }

    return (

        <main
            className="
    pt-[140px]
    px-10
    pb-20
    max-w-[1200px]
    mx-auto
  "
        >

            <div
                className="
    flex
    justify-between
    items-center
    mb-10
  "
            >

                <div>

                    <h1 className="text-3xl text-white">

                        Footer 管理

                    </h1>

                    <p className="text-white/50">

                        網站 Footer 設定

                    </p>

                </div>

                <button

                    onClick={handleSave}

                    disabled={saving}

                    className="
px-6
py-3
bg-[#C8A46A]
text-black
rounded
"

                >

                    {saving
                        ? "儲存中..."
                        : "儲存"}

                </button>

            </div>

            {/* ===== 公司介紹 ===== */}

            <section className="border border-white/10 p-8 mb-10">

                <h2 className="text-xl mb-8">

                    公司介紹

                </h2>

                <p className="text-white/60 mb-2">

                    中文

                </p>

                <textarea

                    rows="6"

                    value={companyZh}

                    onChange={(e) =>
                        setCompanyZh(e.target.value)
                    }

                    className="
w-full
p-3
mb-6
bg-white
text-black
"

                />

                <p className="text-white/60 mb-2">

                    English

                </p>

                <textarea

                    rows="6"

                    value={companyEn}

                    onChange={(e) =>
                        setCompanyEn(e.target.value)
                    }

                    className="
w-full
p-3
bg-white
text-black
"

                />

            </section>

            {/* ===== Products ===== */}

            <section className="border border-white/10 p-8 mb-10">

                <div
                    className="
flex
justify-between
items-center
mb-8
"
                >

                    <h2 className="text-xl">

                        產品

                    </h2>

                    <button

                        onClick={() => {

                            setProducts([

                                ...products,

                                {

                                    zh: "",
                                    en: "",
                                    link: ""

                                }

                            ]);

                        }}

                        className="
px-4
py-2
bg-[#C8A46A]
text-black
rounded
"

                    >

                        ＋新增

                    </button>

                </div>

                {

                    products.map((item, index) => (

                        <div

                            key={index}

                            className="
border
border-white/10
rounded
p-6
mb-6
"

                        >

                            <p className="text-white/60 mb-2">

                                中文

                            </p>

                            <input

                                value={item.zh}

                                onChange={(e) => {

                                    const arr = [...products];

                                    arr[index].zh =
                                        e.target.value;

                                    setProducts(arr);

                                }}

                                className="
w-full
p-3
mb-4
bg-white
text-black
"

                            />

                            <p className="text-white/60 mb-2">

                                English

                            </p>

                            <input

                                value={item.en}

                                onChange={(e) => {

                                    const arr = [...products];

                                    arr[index].en =
                                        e.target.value;

                                    setProducts(arr);

                                }}

                                className="
w-full
p-3
mb-4
bg-white
text-black
"

                            />

                            <p className="text-white/60 mb-2">

                                Link

                            </p>

                            <input

                                value={item.link}

                                onChange={(e) => {

                                    const arr = [...products];

                                    arr[index].link =
                                        e.target.value;

                                    setProducts(arr);

                                }}

                                className="
w-full
p-3
mb-6
bg-white
text-black
"

                            />

                            <button

                                onClick={() => {

                                    setProducts(

                                        products.filter(

                                            (_, i) =>

                                                i !== index

                                        )

                                    );

                                }}

                                className="
px-4
py-2
border
border-red-500
text-red-400
rounded
"

                            >

                                刪除

                            </button>

                        </div>

                    ))

                }

            </section>

            {/* ===== Downloads ===== */}

            <section className="border border-white/10 p-8 mb-10">

                <div
                    className="
      flex
      justify-between
      items-center
      mb-8
    "
                >

                    <h2 className="text-xl">
                        下載型錄
                    </h2>

                    <button
                        onClick={() => {

                            setDownloads([
                                ...downloads,
                     {
  label:{
    zh:"",
    en:""
  },
  link:"",
  download:false
}
                            ]);

                        }}
                        className="
        px-4
        py-2
        bg-[#C8A46A]
        text-black
        rounded
      "
                    >
                        ＋新增型錄
                    </button>

                </div>

                {downloads.map((item, index) => (

                    <div
                        key={index}
                        className="
        border
        border-white/10
        rounded
        p-6
        mb-6
      "
                    >

                        <p className="text-white/60 mb-2">
                            中文名稱
                        </p>

                        <input
                           value={item.label?.zh || ""}
                            onChange={(e) => {

const arr = [...downloads];

arr[index].label = {
  ...(arr[index].label || {}),
  zh:e.target.value
};

setDownloads(arr);

                            }}
                            className="
          w-full
          p-3
          mb-4
          bg-white
          text-black
        "
                        />

                        <p className="text-white/60 mb-2">
                            English Name
                        </p>

<input

  value={item.label?.en || ""}

  onChange={(e)=>{

    const arr=[...downloads];

    arr[index].label={
      ...(arr[index].label || {}),
      en:e.target.value
    };

    setDownloads(arr);

  }}

  className="
    w-full
    p-3
    mb-4
    bg-white
    text-black
  "

/>

                        <p className="text-white/60 mb-2">
                            Link
                        </p>

                        <input
                            value={item.link}
                            onChange={(e) => {

                                const arr = [...downloads];
                                arr[index].link = e.target.value;
                                setDownloads(arr);

                            }}
                            className="
          w-full
          p-3
          mb-4
          bg-white
          text-black
        "
                        />

                        <label
                            className="
          flex
          items-center
          gap-3
          mb-6
        "
                        >

                            <input
                                type="checkbox"
                                checked={item.download}

                                onChange={(e) => {

                                   const arr=[...downloads];

arr[index].download=e.target.checked;

setDownloads(arr);

                                }}
                            />

                            下載模式(download)

                        </label>

                        <button
                            onClick={() => {

                                setDownloads(

                                    downloads.filter(
                                        (_, i) => i !== index
                                    )

                                );

                            }}
                            className="
          px-4
          py-2
          border
          border-red-500
          text-red-400
          rounded
        "
                        >
                            刪除
                        </button>

                    </div>

                ))}

            </section>
            {/* ===== Connect ===== */}

            <section className="border border-white/10 p-8 mb-10">

                <div
                    className="
flex
justify-between
items-center
mb-8
"
                >

                    <h2 className="text-xl">

                        聯絡我們

                    </h2>

                    <button

                        onClick={() => {

                            setConnects([

                                ...connects,

                                {

                                    label: "",
                                    link: "",
                                    type: "external"

                                }

                            ]);

                        }}

                        className="
px-4
py-2
bg-[#C8A46A]
text-black
rounded
"

                    >

                        ＋新增

                    </button>

                </div>

                {

                    connects.map((item, index) => (

                        <div

                            key={index}

                            className="
border
border-white/10
rounded
p-6
mb-6
"

                        >

                            <p className="text-white/60 mb-2">

                                名稱

                            </p>

                            <input

                                value={item.label}

                                onChange={(e) => {

                                    const arr = [...connects];

                                    arr[index].label = e.target.value;

                                    setConnects(arr);

                                }}

                                className="
w-full
p-3
mb-4
bg-white
text-black
"

                            />

                            <p className="text-white/60 mb-2">

                                網址

                            </p>

                            <input

                                value={item.link}

                                onChange={(e) => {

                                    const arr = [...connects];

                                    arr[index].link = e.target.value;

                                    setConnects(arr);

                                }}

                                className="
w-full
p-3
mb-4
bg-white
text-black
"
                            />



                            <select

                                value={item.type || "external"}

                                onChange={(e) => {

                                    const arr = [...connects];

                                    arr[index].type = e.target.value;

                                    setConnects(arr);

                                }}

                                className="
w-full
p-3
mb-6
bg-white
text-black
"

                            >

                                <option value="external">

                                    外部連結

                                </option>

                                <option value="internal">

                                    站內連結

                                </option>

                            </select>

                            <button

                                onClick={() => {

                                    setConnects(

                                        connects.filter((_, i) => i !== index)

                                    );

                                }}

                                className="
px-4
py-2
border
border-red-500
text-red-400
rounded
"

                            >

                                刪除

                            </button>

                        </div>

                    ))

                }

            </section>

            <section className="border border-white/10 p-8 mb-10">

                <h2 className="text-xl mb-8">

                    隱私權

                </h2>

                <p className="text-white/60 mb-2">

                    中文

                </p>

                <input

                    value={privacyZh}

                    onChange={(e) => setPrivacyZh(e.target.value)}

                    className="
w-full
p-3
mb-6
bg-white
text-black
"

                />

                <p className="text-white/60 mb-2">

                    English

                </p>

                <input

                    value={privacyEn}

                    onChange={(e) => setPrivacyEn(e.target.value)}

                    className="
w-full
p-3
bg-white
text-black
"

                />

            </section>

            <section className="border border-white/10 p-8 mb-10">

                <h2 className="text-xl mb-8">

                    條款

                </h2>

                <p className="text-white/60 mb-2">

                    中文

                </p>

                <input

                    value={termsZh}

                    onChange={(e) => setTermsZh(e.target.value)}

                    className="
w-full
p-3
mb-6
bg-white
text-black
"

                />

                <p className="text-white/60 mb-2">

                    English

                </p>

                <input

                    value={termsEn}

                    onChange={(e) => setTermsEn(e.target.value)}

                    className="
w-full
p-3
bg-white
text-black
"

                />

            </section>

        </main>

    );
}