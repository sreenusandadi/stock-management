import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { SORT_BY, SORT_OPTIONS } from "../constants/constants";

interface Props {
  products: Product[];
  setFilteredSortProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function FilterActionsComponent({ products, setFilteredSortProducts }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [favoriteOnly, setFavoriteOnly] = useState<boolean>(() => {
    const param = new URLSearchParams(window.location.search);
    const isFavourite = param.get("isFavourite");
    return isFavourite === "true";
  });

  useEffect(() => {
    let updatedProducts = [...products];

    if (favoriteOnly) {
      updatedProducts = updatedProducts.filter((product) => product.isFavorite);
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    switch (sortBy) {
      case SORT_BY.NAME_ASC:
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SORT_BY.NAME_DESC:
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SORT_BY.PRICE_ASC:
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case SORT_BY.PRICE_DESC:
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredSortProducts(updatedProducts);
  }, [products, searchTerm, sortBy, favoriteOnly]);

  return (
    <div className="d-flex flex-column flex-md-row gap-2 align-items-center ms-auto">
      <div className="">
        <input
          type="checkbox"
          id="favoriteOnly"
          name="favoriteOnly"
          checked={favoriteOnly}
          onChange={(e) => setFavoriteOnly(e.target.checked)}
        />
        <label htmlFor="favoriteOnly" className="ms-2">
          Show Favorite Only
        </label>
      </div>
      <div className="">
        <input
          className="p-2 border rounded"
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="">
        <select
          className="p-2 border rounded"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="">Sort by</option>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterActionsComponent;
