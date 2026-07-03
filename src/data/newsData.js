import { supabase } from "../lib/supabase";

const newsData = [
  {
    slug: "ribbon-light",

    title: {
      zh: "飄帶燈",
      en: "Ribbon Light"
    },

desc: {

  zh: "飄帶燈，流動而優雅，<br>以流暢曲線詮釋空間美學。<br>我們始終堅持提供創新、<br>柔和且舒適的光源，<br>讓光融入空間，勾勒流暢線條，<br>成就更具質感的照明體驗。<br>飄帶燈，點亮空間美學，<br>邀您細細品味。",

  en: "Ribbon Light, flowing with elegance.<br>Inspired by the beauty of seamless light.<br>We are committed to delivering innovative,<br>soft and comfortable lighting solutions,<br>bringing light naturally into every space<br>to create refined lighting experiences.<br>Ribbon Light, illuminating spatial elegance,<br>inviting you to experience its beauty."

},

  

    video: "/images/news/ribbon-light.mp4",

    gallery: [
      "/images/news/ribbon-light-1.jpg",
      "/images/news/ribbon-light-2.jpg",
      "/images/news/ribbon-light-3.jpg"
    ],

    hero: true,

    type: "horizontal"
  },

  {
    slug: "commercial-lighting",

    title: {
      zh: "商業空間照明案例",
      en: "Commercial Lighting Case"
    },

  desc: {
  zh: "線性光環境設計，打造高質感商業空間。",
  en: "Architectural linear lighting solutions for premium commercial spaces."
},

    img: "/images/news/n6.png",

    gallery: [
      "/images/news/commercial-1.jpg",
      "/images/news/commercial-2.jpg",
      "/images/news/commercial-3.jpg"
    ],

    link:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F3838848486249301%2F&show_text=false",

    type: "horizontal"
  },

  {
    slug: "light-membrane",

    title: {
      zh: "室內照明設計－光膜製作安裝",
      en: "Light Membrane Installation"
    },

    desc: {
      zh: "結合室內環境與科技的光膜藝術。",
      en: "A fusion of interior environment, technology and light membrane art."
    },

    img: "/images/news/n4.jpg",

    gallery: [
      "/images/news/light-membrane-1.jpg",
      "/images/news/light-membrane-2.jpg",
      "/images/news/light-membrane-3.jpg"
    ],

    link:
      "https://www.facebook.com/reel/1619570192550757/",

    blocked: true,

    type: "vertical"
  },

  {
    slug: "led-linear-lighting",

title: {
  zh: "光膜應用",
  en: "Light Membrane Solutions"
},

  desc: {
  zh: "打造均勻柔和、無眩光的現代光膜照明空間。",
  en: "Seamless illuminated ceilings for modern architectural spaces."
},

    img: "/images/news/n7.jpg",

    gallery: [
      "/images/news/linear-1.jpg",
      "/images/news/linear-2.jpg",
      "/images/news/linear-3.jpg"
    ],

    link:
      "https://www.facebook.com/reel/3699474863518468/",

    blocked: true,

    type: "horizontal"
  }
];

export default newsData;
