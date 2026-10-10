import Link from "next/link";
import { formatPercent, formatPrice, formatUnit } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const changeClass =
    product.change.dir === "up"
      ? "change-up"
      : product.change.dir === "down"
        ? "change-down"
        : "change-flat";
  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <Link
      className="product-card"
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn}, ${formatPrice(product.today)} টাকা`}
    >
      <div className="product-card-top">
        <span className="product-emoji" aria-hidden="true">
          {product.image}
        </span>
        <span className={`change-badge ${changeClass}`}>
          {changeIcon} {formatPercent(product.change.pct)}%
        </span>
      </div>
      <div className="product-card-copy">
        <span className="product-category">
          {product.categoryIcon} {product.categoryNameBn}
        </span>
        <h3>{product.nameBn}</h3>
        <p>{formatUnit(product.unit)}</p>
      </div>
      <div className="product-price-row">
        <span>আজকের দাম</span>
        <strong>{formatPrice(product.today)} টাকা</strong>
      </div>
    </Link>
  );
}
