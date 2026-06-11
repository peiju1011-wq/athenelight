import manualSpecs from "../data/manualSpecs";

export function getProductsByCategory(category) {

  return Object.entries(manualSpecs)

    .map(([id, item]) => ({
      id,
      ...item
    }))

    .filter(item =>
      item.category === category
    );

}