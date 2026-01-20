import { useMemo } from "react";

import ProductsComponent from "../../components/products/ProductsComponent";
import { formatCurrency } from "../../utils/currency";
import ProductCard from "../../components/products/ProductCard";
import useRefreshToken from "../../hooks/useRefreshToken";
import useProducts from "../../hooks/useProducts";

const Dashboard = () => {
  const { refresh } = useRefreshToken();
  const products = useProducts();

  const topFavoriteProducts = useMemo(() => {
    return products.filter((product) => product.isFavorite).slice(0, 4);
  }, [products]);

  const topSellingProducts = useMemo(() => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 4);
  }, [products]);

  const totalSales = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * product.sales,
      0
    );
  }, [products]);

  const totalInventory = useMemo(() => {
    return products.reduce((total, product) => total + product.stock, 0);
  }, [products]);

  return (
    <div className="container mx-auto p-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <ProductCard
            title="Total Products"
            value={products.length}
            bgColor="bg-primary"
          />
        </div>
        {/* Add more dashboard cards or components as needed */}
        <div className="col-md-4 mb-4">
          <ProductCard
            title="Total Sales"
            value={formatCurrency(totalSales)}
            bgColor="bg-success"
          />
        </div>
        <div className="col-md-4 mb-4">
          <ProductCard
            title="Total Inventory"
            value={totalInventory}
            bgColor="bg-danger"
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <button className="text-2xl font-bold mb-4" onClick={refresh}>
            Refresh
          </button>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 mb-4 d-flex flex-column gap-4">
          <ProductsComponent
            products={products.slice(0, 4)}
            title="Products"
            showMore={true}
          />
          <ProductsComponent
            products={topFavoriteProducts}
            title="Favorite Products"
            showMore={true}
          />
          <ProductsComponent
            products={topSellingProducts}
            title="Top Selling Products"
            showMore={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
