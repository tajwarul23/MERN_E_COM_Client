import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const { id } = useParams();
  const [matchProducts, setMatchProducts] = useState([]);

  useEffect(() => {
    // Filter products and exclude the current product
    const filtered =
      products?.filter(
        (pr) =>
          pr?.category?.toLowerCase() === category?.toLowerCase() &&
          pr._id !== id,
      ) || [];
    setMatchProducts(filtered);
  }, [category, id]); // Add 'id' as dependency

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-5xl font-bold text-gray-800 mt-5 mb-6 text-center">
        Related Products
      </h2>

      <ProductGrid products={matchProducts} />
    </div>
  );
};

export default RelatedProduct;
