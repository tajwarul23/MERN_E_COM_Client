import React, { useContext } from "react";
import AppContext from "../../Context/AppContext.jsx";

import ProductGrid from "./ProductGrid.jsx";

const ShowProduct = () => {
  const { products, filteredData } = useContext(AppContext);

  return (
    <div className="bg-linear-to-br from-blue-50 to-indigo-100 min-h-screen p-6">
      <div className="container mx-auto">
        <ProductGrid
          products={filteredData}
          emptyMessage="No Products Available"
        />
      </div>
    </div>
  );
};

export default ShowProduct;
