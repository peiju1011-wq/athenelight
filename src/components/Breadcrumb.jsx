import { Link, useParams } from "react-router-dom";
import { categories } from "../data/products";

export default function Breadcrumb() {
  const { category, series, productId } = useParams();

  const currentCategory = categories.find(c => c.slug === category);
  const currentSeries =
    currentCategory?.series.find(s => s.slug === series);
  const currentProduct =
    currentSeries?.products.find(p => p.id === productId);

  return (
    <div className="mb-8 text-sm text-gray-400 space-x-2">
      <Link to="/" className="hover:text-white">
        首頁
      </Link>

      {currentCategory && (
        <>
          <span>/</span>
          <Link
            to={`/products/${currentCategory.slug}`}
            className="hover:text-white"
          >
            {currentCategory.name}
          </Link>
        </>
      )}

      {currentSeries && (
        <>
          <span>/</span>
          <Link
            to={`/products/${currentCategory.slug}/${currentSeries.slug}`}
            className="hover:text-white"
          >
            {currentSeries.name}
          </Link>
        </>
      )}

      {currentProduct && (
        <>
          <span>/</span>
          <span className="text-white">
            {currentProduct.name}
          </span>
        </>
      )}
    </div>
  );
}