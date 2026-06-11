import lightsData from "../../data/lightsData";

export default function getProductBySlug(slug){

  return lightsData.find(
    item => item.slug === slug
  );

}