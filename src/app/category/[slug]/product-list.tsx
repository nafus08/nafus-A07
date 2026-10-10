"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import type { Product } from "@/lib/types";

type SortOrder = "default" | "ascending" | "descending";

export function CategoryProductList({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOrder>("default");
  const sortedProducts = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((left, right) =>
      sort === "ascending"
        ? left.today - right.today
        : right.today - left.today,
    );
  }, [products, sort]);

  return (
    <div className="listing-results">
      <div className="sort-row">
        <span>{products.length}টি পণ্য পাওয়া গেছে</span>
        <label className="sort-control">
          <span>সাজান</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOrder)}
          >
            <option value="default">ডিফল্ট</option>
            <option value="ascending">দাম: কম থেকে বেশি</option>
            <option value="descending">দাম: বেশি থেকে কম</option>
          </select>
          <span className="select-chevron" aria-hidden="true">⌄</span>
        </label>
      </div>
      <ProductGrid products={sortedProducts} />
    </div>
  );
}
