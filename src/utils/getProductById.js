import manualSpecs from "../data/manualSpecs";

export function getProductById(id) {
  return manualSpecs?.[id];
}