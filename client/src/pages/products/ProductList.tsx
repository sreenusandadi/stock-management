import { useEffect, useState } from "react";
import ProductsComponent from "../../components/products/ProductsComponent";
import type { Product } from "../../types/product.types";
import FilterActionsComponent from "../../components/FilterActionsComponent";
import { getProducts } from "../../services/product.service";
import ProductModalComponent from "../../components/products/ProductModalComponent";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredSortProducts, setFilteredSortProducts] =
    useState<Product[]>(products);
  const [showModal, setShowModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

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
          fetchProducts={fetchProducts}
        />
      )}
    </>
  );
}

export default ProductList;
