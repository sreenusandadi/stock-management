import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import type { Product } from "../../types/product.types";
import { getProductById } from "../../services/product.service";
import { formatCurrency } from "../../utils/currency";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  console.log("Product ID from params:", id, product);

  useEffect(() => {
    // Fetch product details by ID
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto p-5 border rounded shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 border rounded shadow">
      <div className="d-flex align-items-center justify-content-between mb-4 py-2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div>
          {product.isFavorite ? (
            <FaHeart className="inline text-primary" />
          ) : (
            <FaRegHeart className="inline" />
          )}
        </div>
      </div>
      <p className="mb-2">
        <span className="fw-bold">Price:</span> {formatCurrency(product.price)}
      </p>
      <p className="mb-2">
        <span className="fw-bold">Description:</span> {product.description}
      </p>
      <p className="mb-2">
        <span className="fw-bold">Stock:</span> {product.stock}
      </p>
      <p className="mb-2">
        <span className="fw-bold">Sales:</span> {product.sales}
      </p>
      <Link to="/products" className="btn btn-primary mt-4">
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetails;
