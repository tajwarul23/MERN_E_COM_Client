import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "./ProductGrid";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const { term } = useParams();
  const [SearchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    if (!term) {
      setSearchProducts([]);
      return;
    }
    const searchTerm = term.toLowerCase().replace(/\s+/g, "");
    console.log(searchTerm);

    const filtered = products.filter((pr) => {
      let tit = pr?.title?.toLowerCase();
      tit = tit.replace(/\s+/g, "");
      console.log(tit);

      return tit.includes(searchTerm);
    });
    setSearchProducts(filtered);
  }, [term, products]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {term && (
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Search Results for "{term}"
          </h2>
        )}
        <ProductGrid
          products={SearchProducts}
          emptyMessage="Search Result Empty"
        />
      </div>
    </div>
  );
};

export default SearchProduct;
