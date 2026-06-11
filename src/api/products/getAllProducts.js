import lightsData from "../../data/lightsData";
import manualSpecs from "../../data/manualSpecs";

export default function getAllProducts(){

  const lights = lightsData.map(item => ({
    ...item,
    type:"light"
  }));

  const mirrors = Object.entries(manualSpecs).map(([key,item]) => ({
    id:key,
    ...item,
    type:"mirror"
  }));

  return [
    ...lights,
    ...mirrors
  ];
}