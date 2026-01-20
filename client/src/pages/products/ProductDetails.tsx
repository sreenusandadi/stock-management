import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

import type { Product } from "../../types/product.types";
import { formatCurrency } from "../../utils/currency";
import useProductService from "../../services/product.service";
import ProductModalComponent from "../../components/products/ProductModalComponent";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthProvider";

function ProductDetails() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { getProductById, deleteProduct } = useProductService();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isadmin = auth?.user?.role === "ADMIN";

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

  const handleDelete = (product: Product) => {
    Swal.fire({
      title: `Do you really want to Delete ${product.name}`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonAriaLabel: "Yes, please delete",
    }).then(async (results) => {
      if (results?.isConfirmed) {
        if (product?._id) {
          try {
            await deleteProduct(product._id);
            navigate("/products");
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${product.name} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (err) {
            const message =
              err instanceof Error
                ? err.message
                : "Failed to delete product, try again!";
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto p-5 border rounded shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 border rounded shadow">
      <div className="d-flex justify-content-between align-content-center">
        <div className="d-flex gap-2 mb-4 py-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {product.isFavorite ? (
            <FaHeart className="inline text-primary" />
          ) : (
            <FaRegHeart className="inline" />
          )}
        </div>
        {isadmin && (
          <div className="d-flex gap-2">
            <MdEdit
              size={25}
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            />
            <MdDeleteOutline
              onClick={() => handleDelete(product)}
              size={25}
              className="text-danger"
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
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
      {/* Modal */}
      {showModal && (
        <ProductModalComponent setShowModal={setShowModal} product={product} />
      )}
    </div>
  );
}

export default ProductDetails;
