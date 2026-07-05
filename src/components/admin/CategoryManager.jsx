import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function CategoryManager({ type }) {

  const [categories, setCategories] = useState([]);

  const mainCategories = categories.filter(
    c => !c.parent_key
  );



  const [expanded, setExpanded] = useState({});

  const [loading, setLoading] = useState(false);

  const [newMain, setNewMain] = useState({
    zh: "",
    en: "",
    category_key: ""
  });

  // ===== 新增子分類 =====

  const [newChild, setNewChild] = useState({});
  // ===== 新增孫分類 =====

  const [newGrand, setNewGrand] = useState({});

  useEffect(() => {

    loadCategories();

  }, [type]);

  async function loadCategories() {

    setLoading(true);

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("type", type)
      .order("level", { ascending: true })
      .order("parent_key", { ascending: true })
      .order("sort_order", { ascending: true });

    setLoading(false);

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data || []);

  }
  function toggle(key) {

    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

  }

  function updateField(id, field, value) {

    setCategories(prev =>

      prev.map(item =>

        item.id === id

          ? {
            ...item,
            [field]: value
          }

          : item

      )

    );

  }

  async function saveCategory(item) {

    const { error } = await supabase

      .from("categories")

      .update({

        zh: item.zh,

        en: item.en,

        category_key: item.category_key,

        enabled: item.enabled

      })

      .eq("id", item.id);

    if (error) {

      alert(error.message);

      return;

    }

    loadCategories();

  }

  async function moveUp(item, parentKey = null) {

    const list = parentKey
      ? categories.filter(c => c.parent_key === parentKey)
      : categories.filter(c => !c.parent_key);

    const index = list.findIndex(c => c.id === item.id);

    if (index === 0) return;

    const prev = list[index - 1];

    await supabase

      .from("categories")

      .update({

        sort_order: prev.sort_order

      })

      .eq("id", item.id);

    await supabase

      .from("categories")

      .update({

        sort_order: item.sort_order

      })

      .eq("id", prev.id);

    loadCategories();

  }

  async function moveDown(item, parentKey = null) {

    const list = parentKey
      ? categories.filter(c => c.parent_key === parentKey)
      : categories.filter(c => !c.parent_key);

    const index = list.findIndex(c => c.id === item.id);

    if (index === list.length - 1) return;

    const next = list[index + 1];

    await supabase

      .from("categories")

      .update({

        sort_order: next.sort_order

      })

      .eq("id", item.id);

    await supabase

      .from("categories")

      .update({

        sort_order: item.sort_order

      })

      .eq("id", next.id);

    loadCategories();

  }





  return (

    <div className="space-y-8">

      {/* ===== 標題 ===== */}

      <div className="flex justify-end mb-4">

        {loading && (

          <span className="text-white/50 text-sm">

            Loading...

          </span>

        )}

      </div>

      {/* ===== 新增主分類 ===== */}

      <div
        className="
    border
    border-white/10
    rounded
    p-5
    space-y-4
  "
      >

        <h3 className="text-white">

          新增主分類

        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            placeholder="中文名稱"
            value={newMain.zh}
            onChange={(e) => {

              setNewMain({

                ...newMain,

                zh: e.target.value

              });

            }}
            className="
        bg-black
        border
        border-white/20
        px-3
        py-2
        text-white
      "
          />

          <input
            placeholder="英文名稱"
            value={newMain.en}
            onChange={(e) => {

              setNewMain({

                ...newMain,

                en: e.target.value

              });

            }}
            className="
        bg-black
        border
        border-white/20
        px-3
        py-2
        text-white
      "
          />

          <input
            placeholder="KEY (例如 INDOOR)"
            value={newMain.category_key || ""}
            onChange={(e) => {

              setNewMain({

                ...newMain,

                category_key: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9_]/g, "")

              });

            }}
            className="
        bg-black
        border
        border-white/20
        px-3
        py-2
        text-white
      "
          />

        </div>

        <button

          onClick={async () => {




            if (!newMain.zh) {

              alert("請輸入中文名稱");

              return;

            }

            if (!newMain.category_key) {

              alert("請輸入 KEY");

              return;

            }

            const { error } = await supabase

              .from("categories")

              .insert([{

                type,

                parent_key: null,

                category_key: newMain.category_key.trim(),

                zh: newMain.zh.trim(),

                en: newMain.en.trim(),

                sort_order: Date.now(),

                enabled: true

              }]);

            if (error) {

              alert(error.message);

              return;

            }

            setNewMain({
              zh: "",
              en: "",
              category_key: ""
            });

            loadCategories();

          }}

          className="
      px-6
      py-2
      bg-[#C8A46A]
      text-black
      rounded
    "

        >

          新增主分類

        </button>

      </div>

      {/* ===== 主分類開始 ===== */}

      <div className="space-y-5">

        {mainCategories.map(main => {

          const children = categories.filter(

            item => item.parent_key === main.category_key

          );

          // ===== 孫分類 =====

          const grandChildren = (childKey) =>

            categories.filter(

              item => item.parent_key === childKey

            );

          return (

            <div

              key={main.id}

              className="
border
border-white/10
rounded
p-5
"

            >


              <div
                className="
    flex
    flex-wrap
    items-center
    gap-3
    mb-5

justify-between
  "
              >

                <button
                  onClick={() =>
                    toggle(main.category_key)
                  }
                  className="
text-[#C8A46A]
text-lg
w-6
"
                >

                  {expanded[main.category_key] ? "▾" : "▸"}

                </button>

                <button
                  onClick={() => moveUp(main)}
                  className="text-green-400"
                >

                  ↑

                </button>

                <button
                  onClick={() => moveDown(main)}
                  className="text-blue-400"
                >

                  ↓

                </button>

                <input
                  value={main.zh}
                  onChange={(e) =>
                    updateField(
                      main.id,
                      "zh",
                      e.target.value
                    )
                  }
                  className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                />

                <input
                  value={main.en || ""}
                  onChange={(e) =>
                    updateField(
                      main.id,
                      "en",
                      e.target.value
                    )
                  }
                  className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                />

                <input
                  value={main.category_key}
                  onChange={(e) =>
                    updateField(
                      main.id,
                      "category_key",
                      e.target.value.toUpperCase()
                    )
                  }
                  className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[180px]
"
                />


                <label className="flex items-center gap-2 text-white">

                  <input
                    type="checkbox"
                    checked={main.enabled}
                    onChange={(e) =>
                      updateField(
                        main.id,
                        "enabled",
                        e.target.checked
                      )
                    }
                  />

                  啟用

                </label>

                <button
                  onClick={() =>
                    saveCategory(main)
                  }
                  className="
w-full
md:w-auto

px-4
py-2

bg-green-600
rounded
text-white
"
                >

                  儲存

                </button>



                <button

                  className="
px-4
py-2
bg-red-600
rounded
text-white
"

                  onClick={async () => {

                    if (children.length) {

                      alert("請先刪除所有子分類");

                      return;

                    }

                    const ok = window.confirm(

                      "確定刪除？"

                    );

                    if (!ok) return;

                    await supabase

                      .from("categories")

                      .delete()

                      .eq("id", main.id);

                    loadCategories();

                  }}

                >

                  刪除

                </button>


                {expanded[main.category_key] && (



                  <div
                    className="
mt-6
ml-0
md:ml-10
space-y-4
"
                  >

                    {/* ===== 新增子分類 ===== */}

                    <div className="border border-white/10 rounded p-4 mb-5">

                      <div className="grid
grid-cols-1
md:grid-cols-3
gap-3">

                        <input
                          placeholder="中文"
                          value={newChild[main.id]?.zh || ""}
                          onChange={(e) => {

                            setNewChild(prev => ({

                              ...prev,

                              [main.id]: {

                                ...prev[main.id],

                                zh: e.target.value

                              }

                            }));

                          }}
                          className="bg-black border border-white/20 px-3 py-2 text-white"
                        />

                        <input
                          placeholder="English"
                          value={newChild[main.id]?.en || ""}
                          onChange={(e) => {

                            setNewChild(prev => ({

                              ...prev,

                              [main.id]: {

                                ...prev[main.id],

                                en: e.target.value

                              }

                            }));

                          }}
                          className="bg-black border border-white/20 px-3 py-2 text-white"
                        />

                        <input
                          placeholder="KEY"
                          value={newChild[main.id]?.key || ""}
                          onChange={(e) => {

                            setNewChild(prev => ({

                              ...prev,

                              [main.id]: {

                                ...prev[main.id],

                                key: e.target.value
                                  .toUpperCase()
                                  .replace(/[^A-Z0-9_]/g, "")

                              }

                            }));

                          }}
                          className="bg-black border border-white/20 px-3 py-2 text-white"
                        />

                      </div>

                      <button

                        className="
      mt-3
      px-5
      py-2
      bg-[#C8A46A]
      rounded
      text-black
    "

                        onClick={async () => {

                          const child = newChild[main.id];

                          const exists = categories.find(
                            c =>
                              c.type === type &&
                              c.category_key === child.key.trim()
                          );

                          if (exists) {
                            alert("KEY 已存在，請換一個 KEY");
                            return;
                          }

                          if (!child?.zh) {

                            alert("請輸入中文");

                            return;

                          }

                          if (!child?.key?.trim()) {

                            alert("請輸入KEY");

                            return;

                          }

                          const { error } = await supabase

                            .from("categories")

                            .insert([{

                              type,

                              parent_key: main.category_key,

                              category_key: child.key.trim(),

                              zh: child.zh.trim(),

                              en: child.en.trim(),

                              sort_order: Date.now(),

                              enabled: true

                            }]);

                          if (error) {

                            alert(error.message);

                            return;

                          }

                          setNewChild(prev => {

                            const next = { ...prev };

                            delete next[main.id];

                            return next;

                          });

                          loadCategories();

                        }}
                      >

                        ＋新增子分類

                      </button>

                    </div>


                    {children.map(child => {

                      const grand = grandChildren(
                        child.category_key
                      );

                      return (

                        <div

                          key={child.id}

                          className="
border-l
border-white/10
pl-3
md:pl-6

flex
flex-wrap
items-center
gap-3
"

                        >

                          <button
                            onClick={() => moveUp(child, main.category_key)}
                            className="text-green-400"
                          >

                            ↑

                          </button>

                          <button
                            onClick={() => moveDown(child, main.category_key)}
                            className="text-blue-400"
                          >

                            ↓

                          </button>

                          <input

                            value={child.zh}

                            onChange={(e) =>

                              updateField(

                                child.id,

                                "zh",

                                e.target.value

                              )

                            }

                            className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                          />

                          <input

                            value={child.en || ""}

                            onChange={(e) =>

                              updateField(

                                child.id,

                                "en",

                                e.target.value

                              )

                            }

                            className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                          />

                          <input

                            value={child.category_key}

                            onChange={(e) =>

                              updateField(

                                child.id,

                                "category_key",

                                e.target.value.toUpperCase()

                              )

                            }

                            className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                          />

                          <label className="flex items-center gap-2 text-white">

                            <input

                              type="checkbox"

                              checked={child.enabled}

                              onChange={(e) =>

                                updateField(

                                  child.id,

                                  "enabled",

                                  e.target.checked

                                )

                              }

                            />

                            啟用

                          </label>




                          <button

                            onClick={() => saveCategory(child)}

                            className="
w-full
md:w-auto

px-4
py-2

bg-green-600
rounded
text-white
"

                          >

                            儲存

                          </button>

                          <button

                            className="
px-4
py-2
bg-red-600
rounded
text-white
"

                            onClick={async () => {

                              const hasGrand = categories.some(

                                c => c.parent_key === child.category_key

                              );

                              if (hasGrand) {

                                alert("請先刪除所有孫分類");

                                return;

                              }

                              const ok = window.confirm(

                                "確定刪除？"

                              );

                              if (!ok) return;

                              await supabase

                                .from("categories")

                                .delete()

                                .eq("id", child.id);

                              loadCategories();

                            }}

                          >

                            刪除

                          </button>

                          {/* ===== 新增孫分類 ===== */}

                          <button

                            onClick={() => {

                              setNewGrand(prev => ({

                                ...prev,

                                [child.id]: {

                                  ...(prev[child.id] || {}),

                                  show: !prev[child.id]?.show

                                }

                              }));

                            }}

                            className="
mt-3
px-4
py-2
bg-[#C8A46A]
rounded
text-black
"

                          >

                            ＋新增孫分類

                          </button>

                          {newGrand[child.id]?.show && (

                            <>

                              <div className="mt-3 grid md:grid-cols-3 gap-3">



                                <input
                                  placeholder="中文"
                                  value={newGrand[child.id]?.zh || ""}
                                  onChange={(e) => {

                                    setNewGrand(prev => ({

                                      ...prev,

                                      [child.id]: {

                                        ...prev[child.id],

                                        zh: e.target.value

                                      }

                                    }));

                                  }}
                                  className="bg-black border border-white/20 px-3 py-2 text-white"
                                />




                                <input
                                  placeholder="English"
                                  value={newGrand[child.id]?.en || ""}
                                  onChange={(e) => {

                                    setNewGrand(prev => ({

                                      ...prev,

                                      [child.id]: {

                                        ...prev[child.id],

                                        en: e.target.value

                                      }

                                    }));

                                  }}
                                  className="bg-black border border-white/20 px-3 py-2 text-white"
                                />

                                <input
                                  placeholder="KEY"
                                  value={newGrand[child.id]?.key || ""}
                                  onChange={(e) => {

                                    setNewGrand(prev => ({

                                      ...prev,

                                      [child.id]: {

                                        ...prev[child.id],

                                        key: e.target.value
                                          .toUpperCase()
                                          .replace(/[^A-Z0-9_]/g, "")

                                      }

                                    }));

                                  }}
                                  className="bg-black border border-white/20 px-3 py-2 text-white"
                                />

                              </div>



                              <button



                                className="

mt-3

px-5

py-2

bg-[#C8A46A]

rounded

text-black

"



                                onClick={async () => {



                                  const grand = newGrand[child.id];



                                  if (!grand?.zh) {



                                    alert("請輸入中文");



                                    return;



                                  }



                                  if (!grand?.key?.trim()) {



                                    alert("請輸入KEY");



                                    return;



                                  }



                                  const exists = categories.find(

                                    c =>

                                      c.type === type &&

                                      c.category_key === grand.key.trim()

                                  );



                                  if (exists) {



                                    alert("KEY 已存在");



                                    return;



                                  }



                                  const { error } = await supabase



                                    .from("categories")



                                    .insert([{



                                      type,



                                      parent_key: child.category_key,



                                      category_key: grand.key.trim(),



                                      zh: grand.zh.trim(),



                                      en: grand.en.trim(),



                                      sort_order: Date.now(),
                                      enabled: true
                                    }]);

                                  if (error) {

                                    alert(error.message);

                                    return;

                                  }

                                  setNewGrand(prev => {

                                    const next = { ...prev };

                                    delete next[child.id];

                                    return next;
                                  });
                                  loadCategories();

                                }}

                              >

                                確認新增
                              </button>

                            </>

                          )}


                          {/* ===== 孫分類 ===== */}

                          {grand.length > 0 && (

                            <div
                              className="
ml-8
mt-6
space-y-3
border-l
border-white/10
pl-5
"
                            >

                              {grand.map(g => (

                                <div
                                  key={g.id}

                                  className="
flex
flex-wrap
items-center
gap-3
"

                                >

                                  <input

                                    value={g.zh}

                                    onChange={(e) =>

                                      updateField(

                                        g.id,

                                        "zh",

                                        e.target.value

                                      )

                                    }

                                    className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                                  />

                                  <input

                                    value={g.en || ""}

                                    onChange={(e) =>

                                      updateField(

                                        g.id,

                                        "en",

                                        e.target.value

                                      )

                                    }

                                    className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                                  />


                                  <input

                                    value={g.category_key}

                                    onChange={(e) =>

                                      updateField(

                                        g.id,

                                        "category_key",

                                        e.target.value.toUpperCase()

                                      )

                                    }

                                    className="
bg-black
border
border-white/20
px-3
py-2
text-white
w-full
md:w-[170px]
"
                                  />

                                  <label className="flex items-center gap-2 text-white">

                                    <input

                                      type="checkbox"

                                      checked={g.enabled}

                                      onChange={(e) =>

                                        updateField(

                                          g.id,

                                          "enabled",

                                          e.target.checked

                                        )

                                      }

                                    />

                                    啟用

                                  </label>


                                  <button
                                    onClick={() => moveUp(g, child.category_key)}
                                    className="text-green-400"
                                  >

                                    ↑

                                  </button>

                                  <button
                                    onClick={() => moveDown(g, child.category_key)}
                                    className="text-blue-400"
                                  >

                                    ↓

                                  </button>

                                  <button

                                    onClick={() => saveCategory(g)}

                                    className="
px-4
py-2
bg-green-600
rounded
text-white
"

                                  >

                                    儲存

                                  </button>

                                  <button

                                    className="
px-4
py-2
bg-red-600
rounded
text-white
"

                                    onClick={async () => {

                                      const hasChild = categories.some(
                                        c => c.parent_key === g.category_key
                                      );

                                      if (hasChild) {
                                        alert("請先刪除下一層分類");
                                        return;
                                      }

                                      const ok = window.confirm("確定刪除？");

                                      if (!ok) return;

                                      await supabase
                                        .from("categories")
                                        .delete()
                                        .eq("id", g.id);

                                      loadCategories();



                                    }}

                                  >

                                    刪除

                                  </button>

                                </div>

                              ))}

                            </div>

                          )}

                        </div>

                      );

                    })}

                  </div>

                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}