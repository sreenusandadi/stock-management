import { useContext, useState } from "react";
import ProductsComponent from "../../components/products/ProductsComponent";
import type { Product } from "../../types/product.types";
import FilterActionsComponent from "../../components/FilterActionsComponent";
import ProductModalComponent from "../../components/products/ProductModalComponent";
import useProducts from "../../hooks/useProducts";
import AuthContext from "../../context/AuthProvider";

function ProductList() {
  const [reloadFlag, setReloadFlag] = useState(0);
  const { products, loading, error } = useProducts(reloadFlag);
  const [filteredSortProducts, setFilteredSortProducts] = useState<Product[]>(
    [],
  );
  const [showModal, setShowModal] = useState(false);

  const { auth } = useContext(AuthContext);
  const isadmin = auth?.user?.role === "ADMIN";

  return (
    <div className="container my-4">
      {loading ? (
        <p className="fw-bold">Loading...</p>
      ) : error ? (
        <p className="fw-bold text-danger">{error}</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            {isadmin && (
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Add New Product
              </button>
            )}
            <FilterActionsComponent
              products={products}
              setFilteredSortProducts={setFilteredSortProducts}
            />
          </div>
          <ProductsComponent
            products={filteredSortProducts}
            title="Product List"
          />
          {/* Modal */}
          {showModal && (
            <ProductModalComponent
              setShowModal={setShowModal}
              // increment reloadFlag to force useProducts to refetch
              setReloadFlag={setReloadFlag}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
