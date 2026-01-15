import { Link } from "react-router-dom";
import type { Product } from "../../types/product.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  product: Product;
}

function ProductComponent({ product }: Props) {
  return (
    <div className="card h-100">
      <div className="card-body position-relative">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          <div>{product.name}</div>
          {product.isFavorite && (
            <span className="badge bg-info text-dark">Favorite</span>
          )}
        </h5>
        <p className="card-text">Price: {formatCurrency(product.price)}</p>
        <p className="card-text">Stock: {product.stock}</p>
        <p className="card-text">Sales: {product.sales}</p>
        <div
          className="position-absolute"
          style={{ bottom: "1rem", right: "1rem" }}
        >
          <Link
            to={`/products/${product._id}`}
            className="btn btn-sm btn-primary me-2"
          >
            View Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
