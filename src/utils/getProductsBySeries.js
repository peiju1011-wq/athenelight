import manualSpecs from "../data/manualSpecs";

export function getProductsBySeries(series) {

  return Object.entries(manualSpecs)

    .map(([id, item]) => ({
      id,
      ...item
    }))

    .filter(item =>
      item.series === series
    );

}