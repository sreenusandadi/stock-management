import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.types";
import ProductComponent from "./ProductComponent";
import { useContext } from "react";
import NavItemsContext from "../../context/NavItemsProvider";

interface Props {
  products: Product[];
  title: string;
  showMore?: boolean;
}

function ProductsComponent({ products, title, showMore }: Props) {
  const navigate = useNavigate();
  const { setNavItem } = useContext(NavItemsContext);
  const handleShowMore = () => {
    setNavItem("/products");
    if (title === "Favorite Products") {
      navigate("/products?isFavourite=true");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="row border rounded p-4 bg-white shadow">
      <div className="col-12">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        {products ? (
          <div className="row">
            {products?.map((product) => (
              <div className="col-md-6 col-xl-3 mb-4" key={product._id}>
                <ProductComponent product={product} />
              </div>
            ))}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="btn btn-link mx-auto text-decoration-none fw-bold"
              >
                Load more...
              </button>
            )}
          </div>
        ) : (
          <div className="col-12">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsComponent;
