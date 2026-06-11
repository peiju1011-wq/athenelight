import manualSpecs from "../data/manualSpecs";


export function getRelatedProducts(series, currentId) {

  return Object.entries(manualSpecs)

    .map(([id, item]) => ({
      id,
      ...item
    }))

    .filter(item =>
      item.series === series &&
      item.id !== currentId
    )

    .slice(0, 4);
}

