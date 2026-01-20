import { useState, useEffect } from "react";
import ProductsComponent from "../../components/products/ProductsComponent";
import type { Product } from "../../types/product.types";
import FilterActionsComponent from "../../components/FilterActionsComponent";
import ProductModalComponent from "../../components/products/ProductModalComponent";
import useProducts from "../../hooks/useProducts";

function ProductList() {
  const [reloadFlag, setReloadFlag] = useState(0);
  const products: Product[] = useProducts(reloadFlag);
  const [filteredSortProducts, setFilteredSortProducts] = useState<Product[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  console.log("Rendered ProductList");

  // Keep filtered/sorted products in sync when products change
  useEffect(() => {
    setFilteredSortProducts(products);
  }, [products]);

  return (
    <>
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-primary mb-4"
            onClick={() => setShowModal(true)}
          >
            Add New Product
          </button>
          <FilterActionsComponent
            products={products}
            setFilteredSortProducts={setFilteredSortProducts}
          />
        </div>
        <ProductsComponent
          products={filteredSortProducts}
          title="Product List"
        />
      </div>
      {/* Modal */}
      {showModal && (
        <ProductModalComponent
          setShowModal={setShowModal}
          // increment reloadFlag to force useProducts to refetch
          setReloadFlag={setReloadFlag}
        />
      )}
    </>
  );
}

export default ProductList;
