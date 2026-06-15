const lightsData = [

{
  id:1,

  slug:"linear-light",

  sku:"ATH-LIGHT-001",

  category:"PENDANT",

  featured:true,

  published:true,

  title:{
    zh:"線性吊燈",
    en:"LINEAR PENDANT LIGHT"
  },

  /* 🔥 先保留 name（避免舊 component 壞掉） */
  name:{
    zh:"線性吊燈",
    en:"LINEAR PENDANT LIGHT"
  },

  subtitle:{
    zh:"極簡線性吊燈",
    en:"Minimal Linear Pendant Light"
  },

  desc:{
    zh:`極簡線性設計
讓光回到最純粹的狀態`,
    en:`Minimal linear design
bringing light back to its purest form`
  },

  descLong:{
    zh:`書房、客廳、餐桌
一盞燈，輕鬆融入各種空間`,
    en:`Study, living room, or dining table,
one light blends seamlessly into any space`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/athene-minimal-chandelier-1.png",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/athene-minimal-chandelier-1.png",
      alt:"線性吊燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/athene-minimal-chandelier-2.png",
      alt:"線性吊燈情境圖",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-minimal-chandelier-3.png",
      alt:"極簡吊燈細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-minimal-chandelier-4.png",
      alt:"線性照明空間應用",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/athene-minimal-chandelier-2.png",
    "/images/lights/athene-minimal-chandelier-3.png",
    "/images/lights/athene-minimal-chandelier-4.png"
  ],

  tags:[
    "線性吊燈",
    "極簡吊燈",
    "餐桌燈",
    "室內照明"
  ],

  seo:{
    title:"線性吊燈｜宇碩光 ATHENE LIGHT",
    description:"極簡線性吊燈設計，適合客廳、餐桌與商業空間，打造純粹且安靜的光環境。"
  },

  specs:[
    {
      size:{ zh:"60CM", en:"60CM" },
      power:"24W",
      space:{ zh:"4–6坪", en:"4–6 m²" }
    },
    {
      size:{ zh:"80CM", en:"80CM" },
      power:"38W",
      space:{ zh:"6–10坪", en:"6–10 m²" }
    },
    {
      size:{ zh:"100CM", en:"100CM" },
      power:"46W",
      space:{ zh:"10–15坪", en:"10–15 m²" }
    },
    {
      size:{ zh:"120CM", en:"120CM" },
      power:"52W",
      space:{ zh:"12–18坪", en:"12–18 m²" }
    },
    {
      size:{ zh:"150CM", en:"150CM" },
      power:"65W",
      space:{ zh:"15–20坪", en:"15–20 m²" }
    }
  ],

  features:[
    {
      title:{ zh:"鋁合金燈體", en:"Aluminum Body" },

      desc:{
        zh:"高品質鋁材製作，散熱佳且耐用。",
        en:"High-quality aluminum body with excellent heat dissipation."
      },

      img:"/images/lights/athene-minimal-chandelier-5.png"
    },

    {
      title:{ zh:"均勻導光", en:"Even Light Diffusion" },

      desc:{
        zh:"導光設計讓光線柔和不刺眼。",
        en:"Smooth light diffusion for comfortable illumination."
      },

      img:"/images/lights/athene-minimal-chandelier-6.png"
    },

    {
      title:{ zh:"可調吊線", en:"Adjustable Suspension" },

      desc:{
        zh:"可依空間高度自由調整吊線長度。",
        en:"Adjustable cable length for different ceiling heights."
      },

      img:"/images/lights/athene-minimal-chandelier-7.png"
    }
  ]
},


{
  id:2,

  slug:"double-ring-light",

  sku:"ATH-LIGHT-002",

  category:"PENDANT",

  featured:true,

  published:true,

  title:{
    zh:"雙環吊燈",
    en:"DOUBLE RING PENDANT LIGHT"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"雙環吊燈",
    en:"DOUBLE RING PENDANT LIGHT"
  },

  subtitle:{
    zh:"現代圓環 LED 吊燈",
    en:"Modern Circular LED Pendant Light"
  },

  desc:{
    zh:`俐落雙環造型
讓空間更有現代光感層次`,
    en:`Minimal double-ring design
brings a refined modern lighting atmosphere`
  },

  descLong:{
    zh:`適合客廳、餐廳、書房

黑框燈體搭配白光與暖光效果，
兼具設計感與實用照明。`,
    en:`Perfect for living rooms, dining areas, and study rooms

Black frame with both cool and warm lighting effects,
balancing modern aesthetics and practical illumination.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/pd2-2.jpg",
  cover2:"/images/lights/pd2-3.jpg",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/pd2-2.jpg",
      alt:"雙環吊燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/pd2-3.jpg",
      alt:"雙環吊燈情境照",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/pd2-4.png",
      alt:"現代圓環吊燈空間應用",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd2-5.png",
      alt:"雙環 LED 吊燈細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd2-6.png",
      alt:"雙環吊燈燈光效果",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/pd2-4.png",
    "/images/lights/pd2-5.png",
    "/images/lights/pd2-6.png"
  ],

  tags:[
    "雙環吊燈",
    "圓環燈",
    "LED吊燈",
    "現代照明"
  ],

  seo:{
    title:"雙環吊燈｜宇碩光 ATHENE LIGHT",
    description:"現代雙環 LED 吊燈設計，結合俐落圓環造型與柔和光線，適合客廳、餐廳與商業空間照明。"
  },

  specs:[
    {
      size:{ zh:"直徑 60CM", en:"Diameter 60CM" },
      power:"72W",
      space:{ zh:"12–18㎡", en:"12–18㎡" }
    },
    {
      size:{ zh:"直徑 80CM", en:"Diameter 80CM" },
      power:"96W",
      space:{ zh:"15–25㎡", en:"15–25㎡" }
    },
    {
      size:{ zh:"直徑 100CM", en:"Diameter 100CM" },
      power:"144W",
      space:{ zh:"20–30㎡", en:"20–30㎡" }
    }
  ],

  features:[
    {
      title:{
        zh:"矽膠導光條",
        en:"Silicone Light Guide"
      },

      desc:{
        zh:"優質矽膠材質，表面光滑細膩，透光更佳，出光均勻柔和。",
        en:"High-quality silicone diffuser with smoother and more even lighting."
      },

      img:"/images/lights/pd2-7.png"
    },

    {
      title:{
        zh:"五金底盤",
        en:"Metal Ceiling Base"
      },

      desc:{
        zh:"穩固耐用結構，簡約俐落。",
        en:"Durable metal ceiling base with minimalist design."
      },

      img:"/images/lights/pd2-8.png"
    },

    {
      title:{
        zh:"優質鋁材",
        en:"Premium Aluminum Body"
      },

      desc:{
        zh:"鋁材打磨拋光，提升整體質感。",
        en:"Premium aluminum body with refined finishing."
      },

      img:"/images/lights/pd2-9.png"
    }
  ]
},
{
  id:4,

  slug:"stone-wall-light",

  sku:"ATH-WALL-004",

  category:"WALL_LIGHT",

  featured:true,

  published:true,

  title:{
    zh:"石材壁燈",
    en:"STONE WALL LIGHT"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"石材壁燈",
    en:"STONE WALL LIGHT"
  },

  subtitle:{
    zh:"黃洞石藝術壁燈",
    en:"Travertine Artistic Wall Light"
  },

  desc:{
    zh:`天然石材紋理
讓牆面展現溫潤而安靜的光影層次`,
    en:`Natural stone texture
creates a warm and refined lighting atmosphere`
  },

  descLong:{
    zh:`以黃洞石材質結合上下投光設計，
在牆面形成柔和而立體的光束效果。

適合玄關、走道、立面牆面與室外門廊，
兼具裝飾性與實用照明。`,
    en:`Crafted with travertine stone and an up-and-down lighting design,
this wall lamp creates soft yet sculptural light patterns on the surface.

Suitable for entryways, corridors, facades, and outdoor porches,
balancing decorative presence with functional illumination.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/pd3-1.png",
  cover2:"/images/lights/pd3-2.png",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/pd3-1.png",
      alt:"石材壁燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/pd3-2.png",
      alt:"黃洞石壁燈情境照",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/d3-2.png",
      alt:"石材壁燈空間應用",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/d3-3.png",
      alt:"上下投光效果展示",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/d3-4.png",
      alt:"黃洞石燈具細節",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/d3-2.png",
    "/images/lights/d3-3.png",
    "/images/lights/d3-4.png"
  ],

  tags:[
    "石材壁燈",
    "黃洞石",
    "上下投光",
    "外牆照明"
  ],

  seo:{
    title:"石材壁燈｜宇碩光 ATHENE LIGHT",
    description:"天然黃洞石結合上下投光設計，打造溫潤且具有立體光影層次的現代石材壁燈，適合室內與外牆空間照明。"
  },

  specs:[
    {
      size:{ zh:"80 × 320 mm", en:"80 × 320 mm" },

      power:"LED",

      space:{
        zh:"玄關 / 走道 / 外牆",
        en:"Entryway / Corridor / Facade"
      }
    },

    {
      size:{
        zh:"離牆厚度 60 mm",
        en:"Projection 60 mm"
      },

      power:"AC 110-220V",

      space:{
        zh:"室內 / 室外",
        en:"Indoor / Outdoor"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"天然黃洞石",
        en:"Natural Travertine"
      },

      desc:{
        zh:"石材在自然環境中形成，每一件紋理、孔洞與色澤皆不同，呈現獨一無二的自然表情。",
        en:"Each piece of travertine has unique pores, textures, and tonal variations, giving every lamp a one-of-a-kind natural character."
      },

      img:"/images/lights/d3-5.png"
    },

    {
      title:{
        zh:"石材原塊工藝",
        en:"Stone Block Craftsmanship"
      },

      desc:{
        zh:"從石材原料切割、修整到表面處理，保留自然肌理，同時塑造俐落的幾何輪廓。",
        en:"Cut and refined from raw stone blocks, preserving the organic surface texture while shaping a clean geometric silhouette."
      },

      img:"/images/lights/d3-6.png"
    },

    {
      title:{
        zh:"上下投光效果",
        en:"Up & Down Beam Effect"
      },

      desc:{
        zh:"透過上下雙向出光，牆面形成俐落對稱的光束，適合營造安靜、現代且有質感的空間氛圍。",
        en:"The dual up-and-down beam creates a sharp and symmetrical light pattern, ideal for calm, modern, and refined spaces."
      },

      img:"/images/lights/d3-1.png"
    }
  ]
},
{
  id:5,

  slug:"stone-wall-light2",

  sku:"ATH-WALL-005",

  category:"WALL_LIGHT",

  featured:true,

  published:true,

  title:{
    zh:"石材壁燈 II",
    en:"STONE WALL LIGHT II"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"石材壁燈 II",
    en:"STONE WALL LIGHT II"
  },

  subtitle:{
    zh:"黃洞石多規格壁燈",
    en:"Travertine Multi-Variant Wall Light"
  },

  desc:{
    zh:`天然石材 × 多種光效
滿足不同空間需求`,
    en:`Natural stone with multiple lighting options`
  },

  descLong:{
    zh:`此款石材壁燈提供正方形與長方形兩種造型，
並可選擇暖光或三色光版本，同時支援室內與戶外環境。

透過不同尺寸與光色搭配，
靈活應用於建築立面、玄關與庭院空間。`,
    en:`Available in square and rectangular forms,
with warm light or 3-color lighting options,
suitable for both indoor and outdoor use.

Flexible combinations allow seamless integration
into architectural and landscape lighting design.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/p4-4.jpg",
  cover2:"/images/lights/p4-5.jpg",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/p4-4.jpg",
      alt:"石材壁燈 II 主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/p4-5.jpg",
      alt:"黃洞石壁燈情境照",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/p4-2.jpg",
      alt:"石材壁燈戶外應用",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/p4-3.jpg",
      alt:"多規格石材壁燈",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/p4-10.jpg",
      alt:"建築立面石材照明",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/p4-2.jpg",
    "/images/lights/p4-3.jpg",
    "/images/lights/p4-10.jpg"
  ],

  tags:[
    "石材壁燈",
    "黃洞石",
    "戶外壁燈",
    "建築照明"
  ],

  seo:{
    title:"石材壁燈 II｜宇碩光 ATHENE LIGHT",
    description:"多規格黃洞石壁燈，支援暖光與三色光，適用室內外空間與建築景觀照明設計。"
  },

  /* 🔥 多變體結構很好，保留 */
  variants:[
    {
      shape:"square",
      light:"warm",
      use:"indoor",

      label:{
        zh:"正方形-暖光【室內】",
        en:"Square Warm Light (Indoor)"
      }
    },

    {
      shape:"square",
      light:"3color",
      use:"indoor",

      label:{
        zh:"正方形-三色光【室內】",
        en:"Square 3-Color (Indoor)"
      }
    },

    {
      shape:"square",
      light:"warm",
      use:"outdoor",

      label:{
        zh:"正方形-暖光【戶外】",
        en:"Square Warm Light (Outdoor)"
      }
    },

    {
      shape:"square",
      light:"3color",
      use:"outdoor",

      label:{
        zh:"正方形-三色光【戶外】",
        en:"Square 3-Color (Outdoor)"
      }
    },

    {
      shape:"rectangle",
      light:"warm",
      use:"indoor",

      label:{
        zh:"長方形-暖光【室內】",
        en:"Rectangle Warm Light (Indoor)"
      }
    },

    {
      shape:"rectangle",
      light:"3color",
      use:"indoor",

      label:{
        zh:"長方形-三色光【室內】",
        en:"Rectangle 3-Color (Indoor)"
      }
    },

    {
      shape:"rectangle",
      light:"warm",
      use:"outdoor",

      label:{
        zh:"長方形-暖光【戶外】",
        en:"Rectangle Warm Light (Outdoor)"
      }
    },

    {
      shape:"rectangle",
      light:"3color",
      use:"outdoor",

      label:{
        zh:"長方形-三色光【戶外】",
        en:"Rectangle 3-Color (Outdoor)"
      }
    }
  ],

  specs:[
    {
      size:{
        zh:"120 × 120 mm / 80 × 320 mm",
        en:"120 × 120 / 80 × 320 mm"
      },

      power:"LED",

      space:{
        zh:"室內 / 戶外",
        en:"Indoor / Outdoor"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"天然黃洞石",
        en:"Natural Travertine"
      },

      desc:{
        zh:"每件石材紋理皆不同，展現自然獨特性。",
        en:"Each stone piece is unique in texture and tone."
      },

      img:"/images/lights/p4-8.jpg"
    },

    {
      title:{
        zh:"多光效選擇",
        en:"Multiple Lighting Modes"
      },

      desc:{
        zh:"暖光與三色光可選，滿足不同情境需求。",
        en:"Warm and 3-color lighting options available."
      },

      img:"/images/lights/p4-9.jpg"
    },

    {
      title:{
        zh:"室內戶外適用",
        en:"Indoor & Outdoor Use"
      },

      desc:{
        zh:"適合各種建築與景觀場域。",
        en:"Suitable for architectural and outdoor spaces."
      },

      img:"/images/lights/p4-2.jpg"
    }
  ]
},
{
  id:6,

  slug:"stone-wall-light-bed",

  sku:"ATH-WALL-006",

  category:"BEDSIDE_LIGHT",

  featured:true,

  published:true,

  title:{
    zh:"石材床頭壁燈",
    en:"STONE WALL BED LIGHT"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"石材床頭壁燈",
    en:"STONE WALL BED LIGHT"
  },

  subtitle:{
    zh:"木質結合石材的溫潤光感",
    en:"Wood & Stone Warm Ambient Light"
  },

  desc:{
    zh:`木質底座結合天然石材
打造柔和且有溫度的床邊光源`,
    en:`Wood and natural stone combined
to create a soft and warm bedside lighting`
  },

  descLong:{
    zh:`以木質結構搭配天然石材燈罩，
光線透過石材紋理自然散射，
營造安靜、放鬆的臥室氛圍。

適合床頭、閱讀角落與居家空間，
兼具裝飾與實用照明。`,
    en:`Featuring a wooden base with a natural stone shade,
light diffuses gently through the stone texture,
creating a calm and relaxing atmosphere.

Ideal for bedside, reading corners, and cozy interiors,
balancing decoration and functionality.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/pd5-1.jpg",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/pd5-1.jpg",
      alt:"石材床頭壁燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/pd5-10.jpg",
      alt:"床頭石材壁燈情境照",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd5-4.jpg",
      alt:"木質石材燈具細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd5-3.jpg",
      alt:"臥室床頭閱讀燈",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/pd5-10.jpg",
    "/images/lights/pd5-4.jpg",
    "/images/lights/pd5-3.jpg"
  ],

  tags:[
    "床頭壁燈",
    "石材燈具",
    "木質燈具",
    "臥室照明"
  ],

  seo:{
    title:"石材床頭壁燈｜宇碩光 ATHENE LIGHT",
    description:"木質結合天然石材的床頭壁燈設計，透過柔和光影與自然材質，打造安靜放鬆的臥室氛圍。"
  },

  specs:[
    {
      size:{
        zh:"寬 11cm",
        en:"Width 11cm"
      },

      power:"LED",

      space:{
        zh:"臥室 / 床頭",
        en:"Bedroom / Bedside"
      }
    },

    {
      size:{
        zh:"高 15cm",
        en:"Height 15cm"
      },

      power:"AC 110-220V",

      space:{
        zh:"室內使用",
        en:"Indoor use"
      }
    }
  ],

  /* 🔥 variants 結構保留 */
  variants:[
    {
      label:{
        zh:"暖光（室內）",
        en:"Warm Light (Indoor)"
      }
    },

    {
      label:{
        zh:"三色光（室內）",
        en:"3 Color (Indoor)"
      }
    },

    {
      label:{
        zh:"暖光（戶外）",
        en:"Warm Light (Outdoor)"
      }
    },

    {
      label:{
        zh:"三色光（戶外）",
        en:"3 Color (Outdoor)"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"天然石材燈罩",
        en:"Natural Stone Shade"
      },

      desc:{
        zh:"石材紋理自然形成，透光後呈現柔和且具有層次的光影效果。",
        en:"Natural stone texture creates a soft and layered lighting effect."
      },

      img:"/images/lights/pd5-6.jpg"
    },

    {
      title:{
        zh:"木質結構設計",
        en:"Wood Structure Design"
      },

      desc:{
        zh:"溫潤木質搭配石材，讓空間更具生活感與質感。",
        en:"Warm wooden elements combined with stone enhance the living atmosphere."
      },

      img:"/images/lights/pd5-7.jpg"
    },

    {
      title:{
        zh:"柔和閱讀光源",
        en:"Soft Reading Light"
      },

      desc:{
        zh:"適合作為床頭閱讀燈，提供舒適不刺眼的照明。",
        en:"Perfect for bedside reading with soft, non-glare lighting."
      },

      img:"/images/lights/pd5-8.jpg"
    }
  ]
},
{
  id:7,

  slug:"square-light",

  sku:"ATH-LIGHT-007",

  category:"PENDANT",

  featured:true,

  published:true,

  lineLink:
    "https://oashop.line.me/products/322513167?productName=義式簡約方塊吊燈",

  title:{
    zh:"義式簡約方塊吊燈",
    en:"ITALIAN MINIMAL SQUARE PENDANT LIGHT"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"義式簡約方塊吊燈",
    en:"ITALIAN MINIMAL SQUARE PENDANT LIGHT"
  },

  subtitle:{
    zh:"現代幾何玻璃吊燈",
    en:"Modern Geometric Glass Pendant Light"
  },

  desc:{
    zh:`俐落幾何線條
結合玻璃與金屬光影層次`,
    en:`Clean geometric lines
blending glass and metal lighting aesthetics`
  },

  descLong:{
    zh:`以極簡幾何結構搭配玻璃燈罩，
打造現代且安靜的空間氛圍。

適合餐廳、吧台、客廳與商業空間，
呈現義式簡約的精緻光感。`,
    en:`Featuring a minimalist geometric structure with glass shades,
creating a calm and refined modern atmosphere.

Perfect for dining rooms, bars, living spaces,
and commercial interiors with elegant Italian minimalism.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/athene-italian-minimal-square-pendant-light-1.png",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/athene-italian-minimal-square-pendant-light-1.png",
      alt:"義式簡約方塊吊燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/athene-italian-minimal-square-pendant-light-2.png",
      alt:"幾何玻璃吊燈情境照",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-italian-minimal-square-pendant-light-3.png",
      alt:"義式極簡吊燈細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-italian-minimal-square-pendant-light-4.png",
      alt:"餐桌空間吊燈應用",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/athene-italian-minimal-square-pendant-light-2.png",
    "/images/lights/athene-italian-minimal-square-pendant-light-3.png",
    "/images/lights/athene-italian-minimal-square-pendant-light-4.png"
  ],

  tags:[
    "義式吊燈",
    "幾何吊燈",
    "玻璃吊燈",
    "餐桌燈"
  ],

  seo:{
    title:"義式簡約方塊吊燈｜宇碩光 ATHENE LIGHT",
    description:"義式極簡幾何吊燈設計，結合煙燻玻璃與金屬光影層次，打造高質感現代空間照明。"
  },

  specs:[
    {
      size:{
        zh:"Φ102.5CM",
        en:"Φ102.5CM"
      },

      material:{
        zh:"全銅＋玻璃",
        en:"Copper + Glass"
      },

      style:{
        zh:"義式極簡",
        en:"Italian Minimal"
      },

      power:"LED 22W",

      voltage:"90–240V AC",

      cri:"RA≥97",

      lightColor:{
        zh:"無極調光",
        en:"Stepless Dimming"
      },

      install:{
        zh:"吸吊兩用",
        en:"Ceiling / Pendant"
      },

      space:{
        zh:"10–15㎡",
        en:"10–15㎡"
      }
    },

    {
      size:{
        zh:"Φ130CM",
        en:"Φ130CM"
      },

      material:{
        zh:"全銅＋玻璃",
        en:"Copper + Glass"
      },

      style:{
        zh:"義式極簡",
        en:"Italian Minimal"
      },

      power:"LED 26W",

      voltage:"90–240V AC",

      cri:"RA≥97",

      lightColor:{
        zh:"無極調光",
        en:"Stepless Dimming"
      },

      install:{
        zh:"吸吊兩用",
        en:"Ceiling / Pendant"
      },

      space:{
        zh:"12–18㎡",
        en:"12–18㎡"
      }
    },

    {
      size:{
        zh:"Φ168CM",
        en:"Φ168CM"
      },

      material:{
        zh:"全銅＋玻璃",
        en:"Copper + Glass"
      },

      style:{
        zh:"義式極簡",
        en:"Italian Minimal"
      },

      power:"LED 30W",

      voltage:"90–240V AC",

      cri:"RA≥97",

      lightColor:{
        zh:"無極調光",
        en:"Stepless Dimming"
      },

      install:{
        zh:"吸吊兩用",
        en:"Ceiling / Pendant"
      },

      space:{
        zh:"15–20㎡",
        en:"15–20㎡"
      }
    }
  ],

  variants:[
    {
      label:{
        zh:"全光譜護眼光",
        en:"Full Spectrum Eye-Care Light"
      }
    },

    {
      label:{
        zh:"無極調光",
        en:"Stepless Dimming"
      }
    },

    {
      label:{
        zh:"啞黑＋煙燻玻璃",
        en:"Matte Black + Smoked Glass"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"全光譜健康光源",
        en:"Full Spectrum Healthy Lighting"
      },

      desc:{
        zh:"高顯色 RA≥97，光線自然柔和，降低藍光與頻閃影響。",
        en:"High CRI RA≥97 with soft natural lighting and reduced blue light flicker."
      },

      img:"/images/lights/athene-italian-minimal-square-pendant-light-6.png"
    },

    {
      title:{
        zh:"玻璃幾何燈罩",
        en:"Geometric Glass Shade"
      },

      desc:{
        zh:"煙灰玻璃結合極簡幾何比例，展現現代義式質感。",
        en:"Smoked glass combined with minimalist geometry creates a refined Italian aesthetic."
      },

      img:"/images/lights/athene-italian-minimal-square-pendant-light-5.png"
    },

    {
      title:{
        zh:"可調吊線設計",
        en:"Adjustable Suspension Cable"
      },

      desc:{
        zh:"可依空間高度自由調整吊線長度，適合不同場域配置。",
        en:"Adjustable suspension cables fit various ceiling heights and spaces."
      },

      img:"/images/lights/athene-italian-minimal-square-pendant-light-7.png"
    }
  ]
},
{
  id:8,

  slug:"italian-light",

  sku:"ATH-LIGHT-008",

  category:"PENDANT",

  featured:true,

  published:true,

  lineLink:
    "https://oashop.line.me/products/322512839?productName=義式輕奢簡約吊燈",

  title:{
    zh:"義式輕奢簡約吊燈",
    en:"ITALIAN LIGHT LUXURY PENDANT LIGHT"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"義式輕奢簡約吊燈",
    en:"ITALIAN LIGHT LUXURY PENDANT LIGHT"
  },

  subtitle:{
    zh:"現代一字長條餐吊燈",
    en:"Modern Linear Dining Pendant Light"
  },

  desc:{
    zh:`極簡線性結構
融合金屬與柔和光影層次`,
    en:`Minimal linear structure
blending metal texture with soft illumination`
  },

  descLong:{
    zh:`以義式輕奢風格為靈感，
透過俐落線條與金屬燈體，
打造安靜且具有高級感的空間氛圍。

適合餐桌、吧台、客廳與商業空間，
展現現代簡約與精緻光感的平衡。`,
    en:`Inspired by Italian light luxury aesthetics,
the clean linear form and refined metal body
create a calm and sophisticated atmosphere.

Perfect for dining tables, bars, living spaces,
and modern commercial interiors.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/athene-italian-light-luxury-pendant-1.png",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/athene-italian-light-luxury-pendant-1.png",
      alt:"義式輕奢簡約吊燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/athene-italian-light-luxury-pendant-2.png",
      alt:"現代餐桌線性吊燈",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-italian-light-luxury-pendant-3.png",
      alt:"義式輕奢吊燈細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/athene-italian-light-luxury-pendant-4.png",
      alt:"商業空間吊燈情境照",
      position:"center",
      type:"gallery"
    }
  ],

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/athene-italian-light-luxury-pendant-2.png",
    "/images/lights/athene-italian-light-luxury-pendant-3.png",
    "/images/lights/athene-italian-light-luxury-pendant-4.png"
  ],

  tags:[
    "義式吊燈",
    "線性吊燈",
    "餐吊燈",
    "輕奢照明"
  ],

  seo:{
    title:"義式輕奢簡約吊燈｜宇碩光 ATHENE LIGHT",
    description:"義式輕奢線性吊燈設計，結合金屬燈體與柔和光影，打造現代餐桌與商業空間的高級氛圍。"
  },

  specs:[
    {
      size:{
        zh:"120CM",
        en:"120CM"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"義式輕奢",
        en:"Italian Light Luxury"
      },

      power:"LED + E27 × 5",

      voltage:"110-220V",

      lightColor:{
        zh:"三色變光",
        en:"3 Color Lighting"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"10–15㎡",
        en:"10–15㎡"
      }
    },

    {
      size:{
        zh:"150CM",
        en:"150CM"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"義式輕奢",
        en:"Italian Light Luxury"
      },

      power:"LED + E27 × 5",

      voltage:"110-220V",

      lightColor:{
        zh:"三色變光",
        en:"3 Color Lighting"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"12–18㎡",
        en:"12–18㎡"
      }
    },

    {
      size:{
        zh:"180CM",
        en:"180CM"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"義式輕奢",
        en:"Italian Light Luxury"
      },

      power:"LED + E27 × 5",

      voltage:"110-220V",

      lightColor:{
        zh:"三色變光",
        en:"3 Color Lighting"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"15–20㎡",
        en:"15–20㎡"
      }
    }
  ],

  variants:[
    {
      label:{
        zh:"黑+金｜黑二色可選",
        en:"Black & Gold / Black Available"
      }
    },

    {
      label:{
        zh:"三色變光",
        en:"3 Color Lighting"
      }
    },

    {
      label:{
        zh:"現代極簡風格",
        en:"Modern Minimal Style"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"奈米電鍍五金燈體",
        en:"Nano Electroplated Metal Body"
      },

      desc:{
        zh:"防腐防鏽處理，燈體質感細膩，兼具耐用與現代設計感。",
        en:"Anti-corrosion electroplated metal finish with refined modern aesthetics."
      },

      img:"/images/lights/athene-italian-light-luxury-pendant-5.png"
    },

    {
      title:{
        zh:"線性均勻發光",
        en:"Linear Uniform Illumination"
      },

      desc:{
        zh:"LED 光源均勻柔和，適合餐桌與空間氛圍照明。",
        en:"Soft and even LED illumination ideal for dining and ambient lighting."
      },

      img:"/images/lights/athene-italian-light-luxury-pendant-6.png"
    },

    {
      title:{
        zh:"義式輕奢比例設計",
        en:"Italian Luxury Proportion Design"
      },

      desc:{
        zh:"俐落長條比例搭配金屬細節，展現現代空間中的精緻感。",
        en:"Elegant linear proportions combined with refined metallic details."
      },

      img:"/images/lights/athene-italian-light-luxury-pendant-7.png"
    }
  ]
},


{
  id:9,

  slug:"ginkgo-light",

  sku:"ATH-LIGHT-009",

  category:"PENDANT",

  featured:true,

  published:true,

  lineLink:
    "https://athenelight.com/lights/ginkgo-light",

  title:{
    zh:"銀杏吊燈",
    en:"GINKGO LEAF CHANDELIER"
  },

  /* 🔥 舊系統保留 */
  name:{
    zh:"銀杏吊燈",
    en:"GINKGO LEAF CHANDELIER"
  },

  subtitle:{
    zh:"花草系溫暖風格吊燈",
    en:"Botanical Warm Pendant Light"
  },

  desc:{
    zh:`以銀杏葉為靈感，
打造自然流動的光影層次`,
    en:`Inspired by ginkgo leaves,
creating a flowing lighting form`
  },

  descLong:{
    zh:`以銀杏葉優雅輪廓為設計靈感，

透過柔和曲線與層次光影，
營造自然溫潤且富有溫馨的空間氛圍。

適合餐廳、客廳、臥室與商業空間，
展現自然美學與現代照明設計的和諧融合。`,

    en:`Inspired by the graceful form of ginkgo leaves,

this pendant light combines gentle curves with layered lighting effects
to create a warm, refined, and welcoming ambiance.

Perfect for dining areas, living rooms, bedrooms, and commercial spaces,
it embodies the harmonious balance between nature-inspired beauty and contemporary lighting design.`
  },

  /* 🔥 舊系統保留 */
  cover:"/images/lights/pd6-2.png",

  /* 🔥 新 schema */
  images:[
    {
      src:"/images/lights/pd6-2.png",
      alt:"銀杏吊燈主視覺",
      position:"center",
      type:"cover"
    },
    {
      src:"/images/lights/pd6-3.jpg",
      alt:"銀杏葉造型吊燈情境照",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd6-4.png",
      alt:"銀杏吊燈光影細節",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd6-5.png",
      alt:"花草系溫暖吊燈空間照",
      position:"center",
      type:"gallery"
    },
    {
      src:"/images/lights/pd6-6.png",
      alt:"自然風格金屬吊燈細節",
      position:"center",
      type:"gallery"
    }
  ],

  cover2:"/images/lights/pd6-3.jpg",

  /* 🔥 舊 gallery 保留 */
  gallery:[
    "/images/lights/pd6-4.png",
    "/images/lights/pd6-5.png",
    "/images/lights/pd6-6.png"
  ],

  tags:[
    "銀杏吊燈",
    "花草系吊燈",
    "自然風格照明",
    "客廳吊燈"
  ],

  seo:{
    title:"銀杏吊燈｜宇碩光 ATHENE LIGHT",
    description:"銀杏葉造型吊燈設計，結合金屬工藝與柔和光影層次，打造自然溫潤且富有藝術感的空間氛圍。"
  },

  specs:[
    {
      size:{
        zh:"Φ60 × H40cm",
        en:"Φ60 × H40cm"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"自然花草系",
        en:"Botanical Style"
      },

      power:"36W",

      voltage:"110-220V",

      lightColor:{
        zh:"暖光",
        en:"Warm Light"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"8–15㎡",
        en:"8–15㎡"
      }
    },

    {
      size:{
        zh:"Φ80 × H40cm",
        en:"Φ80 × H40cm"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"自然花草系",
        en:"Botanical Style"
      },

      power:"54W",

      voltage:"110-220V",

      lightColor:{
        zh:"暖光",
        en:"Warm Light"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"12–20㎡",
        en:"12–20㎡"
      }
    },

    {
      size:{
        zh:"Φ100 × H40cm",
        en:"Φ100 × H40cm"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"自然花草系",
        en:"Botanical Style"
      },

      power:"72W",

      voltage:"110-220V",

      lightColor:{
        zh:"暖光",
        en:"Warm Light"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"18–28㎡",
        en:"18–28㎡"
      }
    },

    {
      size:{
        zh:"Φ120 × H40cm",
        en:"Φ120 × H40cm"
      },

      material:{
        zh:"五金燈體",
        en:"Metal Hardware Body"
      },

      style:{
        zh:"自然花草系",
        en:"Botanical Style"
      },

      power:"90W",

      voltage:"110-220V",

      lightColor:{
        zh:"暖光",
        en:"Warm Light"
      },

      install:{
        zh:"吊線型",
        en:"Pendant Type"
      },

      space:{
        zh:"20–35㎡",
        en:"20–35㎡"
      }
    }
  ],

  variants:[
    {
      label:{
        zh:"銀杏葉造型",
        en:"Ginkgo Leaf Design"
      }
    },

    {
      label:{
        zh:"暖光氛圍",
        en:"Warm Ambient Lighting"
      }
    },

    {
      label:{
        zh:"自然花草系風格",
        en:"Botanical Natural Style"
      }
    }
  ],

  features:[
    {
      title:{
        zh:"銀杏葉造型設計",
        en:"Ginkgo-Inspired Design"
      },

      desc:{
        zh:"以銀杏葉優雅輪廓為靈感，營造自然且富有藝術感的空間氛圍。",
        en:"Inspired by the elegant form of ginkgo leaves, creating a natural and artistic spatial atmosphere."
      },

      img:"/images/lights/pd6-9.jpg"
    },

    {
      title:{
        zh:"柔和氛圍照明",
        en:"Soft Ambient Illumination"
      },

      desc:{
        zh:"光線均勻柔和，提升空間舒適度與氛圍質感。",
        en:"Soft and evenly distributed illumination enhances comfort and ambient lighting quality."
      },

      img:"/images/lights/pd6-10.jpg"
    },

    {
      title:{
        zh:"高溫鍛造金屬燈體",
        en:"Premium Forged Metal Body"
      },

      desc:{
        zh:"高溫鍛造金屬燈體，工藝細膩且兼具耐用性。",
        en:"Premium forged metal construction with refined craftsmanship and lasting durability."
      },

      img:"/images/lights/pd6-11.jpg"
    }
  ]
}



];

export default lightsData;