import { Link } from "react-router-dom";

export const text = {
hero:{
  bottom:{
    zh:"光。為空間留下溫度",
    en:"Light, leaving warmth in space."
  }
},
about: {
  tag: {
    zh: "關於宇碩光",
    en: "ABOUT ATHENE LIGHT"
  },

  title: {
    zh: "宇碩光簡介",
    en:"Light, leaving warmth in space."
  },

  // 🔥 主內容（唯一核心）
  content: {
zh: `宇碩光長期專注於建築照明、景觀光環境與空間亮化工程，從設計規劃、燈具配置到現場施工與調光，持續探索光與空間之間更自然的關係。

我們相信，好的照明不只是被看見，而是讓人真正感受到空間的層次、溫度與秩序。團隊結合照明設計、工程實務與智慧控制技術，在節能、美學與使用體驗之間取得平衡，為不同場域建立專屬的光環境。`,

    en: `Athene Light specializes in architectural lighting, landscape lighting, and integrated lighting environments. From planning and fixture selection to on-site installation and lighting adjustment, we continuously explore a more natural relationship between light and space.

We believe lighting is not only meant to be seen, but to shape the atmosphere, warmth, and spatial order of a place. By combining lighting design, engineering expertise, and smart control technologies, we create lighting environments tailored to each project while balancing aesthetics, energy efficiency, and user experience.`
  }
},


services:{
  tag:{
    zh:"光環境整合服務",
    en:"LIGHTING SOLUTIONS"
  },

  title:{
    zh:"光環境整合服務",
    en:"Lighting Solutions"
  },

items:[
{
  zh:"照明設計",
  en:"Lighting Design",
  descZh:"現場勘查、照度評估與照明規劃設計",
  descEn:"Site surveys, lighting analysis, and professional lighting design planning"
},

{
  zh:"燈具生產",
  en:"Luminaire Manufacturing",
  descZh:"依設計需求進行燈具開發、製造與客製化生產",
  descEn:"Custom luminaire development, manufacturing, and production based on project requirements"
},

{
  zh:"施工安裝",
  en:"Installation Engineering",
  descZh:"照明工程施工、設備安裝與現場整合執行",
  descEn:"Lighting engineering, equipment installation, and on-site project integration"
},

{
  zh:"燈光調較",
  en:"Lighting Commissioning",
  descZh:"燈光測試、調校優化與工程驗收服務",
  descEn:"Lighting testing, commissioning, optimization, and project acceptance services"
}
]
},



projects:{
  tag:{ zh:"精選案例", en:"FEATURED PROJECTS" },
  title:{ zh:"實績案例", en:"Projects" },
  items:[
    { zh:"城市光廊地標", en:"Urban Landmark" },
    { zh:"大橋光環境", en:"Bridge Lighting" },
    { zh:"豪宅會所照明", en:"Luxury Residence" },
    { zh:"商辦光環境", en:"Commercial Lighting" },
    { zh:"建築立面照明", en:"Facade Lighting" }
  ]
},






cta:{
  view:{ zh:"查看全部", en:"VIEW ALL" }
},


  desc: {
    zh: "宇碩光致力於景觀照明與建築光環境設計，提供完整的照明規劃、施工與節能方案。",
    en: "Athene Light specializes in architectural and landscape lighting design, delivering integrated solutions from planning to execution."
  },

process:{
  tag:{
    zh:"合作流程",
    en:"PROJECT WORKFLOW"
  },

  title:{
    zh:"專案合作流程",
    en:"Project Workflow"
  },

items:[

  {
    title:{ zh:"需求洽談", en:"Consultation" },

    desc:{
      zh:"了解場域需求、預算規劃與專案溝通協調",
      en:"Understanding project requirements, budget planning, and project consultation"
    }
  },

  {
    title:{ zh:"方案規劃", en:"Planning" },

    desc:{
      zh:"提出照明設計、燈具配置與整體工程規劃",
      en:"Developing lighting designs, fixture layouts, and overall project planning"
    }
  },

  {
    title:{ zh:"施工執行", en:"Execution" },

    desc:{
      zh:"進行設備安裝、工程整合與現場施工管理",
      en:"Managing installation, engineering integration, and on-site construction execution"
    }
  },

  {
    title:{ zh:"竣工驗收", en:"Commissioning" },

  desc:{
  zh:"測試與完成調光、竣工驗收與專案交付",
  en:"Final lighting commissioning, project acceptance, and project handover"
}
  }

]

},

footer:{
  desc:{
    zh:"專注於建築光環境設計與工程整合，讓光成為空間的一部分。",
    en:"Focused on architectural lighting design and integrated solutions, making light part of space."
  },

  products:{
    title:{ zh:"產品", en:"PRODUCTS" },

items:[

  {
    zh:"室內燈具",
    en:"Indoor Lighting",
    link:"/products?cat=INTERIOR_LIGHTING"
  },

  {
    zh:"戶外燈具",
    en:"Outdoor Lighting",
    link:"/products?cat=OUTDOOR"
  },

  {
    zh:"節慶燈具",
    en:"Festival Lighting",
    link:"/products?cat=FESTIVAL"
  },

  {
    zh:"施工安裝",
    en:"Installation Engineering",
    link:"/products?cat=INSTALLATION"
  },

  {
    zh:"照明設計",
    en:"Lighting Design",
    link:"/products?cat=LIGHTING_DESIGN"
  },

  {
    zh:"鏡燈產品",
    en:"Mirror Products",
    link:"/products/mirror"
  }

]

  },

company:{
  title:{ zh:"下載", en:"DOWNLOAD" },

  items:[
    { label:{ zh:"霓虹燈條型錄", en:"Linear lighting Catalog" }, link:"/pdf/neon-catalog.pdf", download:true },


  ]
},

  connect:{
    title:{ zh:"聯絡我們", en:"CONNECT" },
    items:[
      { label:"FB", link:"https://www.facebook.com/athenetech", type:"external" },
      { label:"LINE", link:"https://lin.ee/onasjh1n", type:"external" },
      { label:"MAIL", link:"/contact", type:"internal" }
    ]
  },

  privacy:{ zh:"隱私權", en:"Privacy" },
  terms:{ zh:"條款", en:"Terms" }
}


};