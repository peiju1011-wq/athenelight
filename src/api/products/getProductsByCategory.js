import lightsData from "../../data/lightsData";

export default function getProductsByCategory(cat){

  return lightsData.filter(
    item => item.category === cat
  );

}