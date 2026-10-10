import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProducts } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { formatPercent, formatPrice, formatUnit } from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  return { title: product ? `${product.nameBn} দাম` : "পণ্য খুঁজে পাওয়া যায়নি" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const user = await getCurrentUser();

  if (!user) {
    redirect(
      `/signin?reason=protected&callbackURL=${encodeURIComponent(`/product/${slug}`)}`,
    );
  }

  const prices = product.markets.flatMap((market) => [market.min, market.max]);
  const minimum = Math.min(...prices);
  const maximum = Math.max(...prices);
  const average = Math.round(
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length,
  );

  return (
    <article className="page-container detail-page">
      <div className="breadcrumb">
        <Link href="/">হোম</Link><span>/</span>
        <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
        <span>/</span><span>{product.nameBn}</span>
      </div>
      <section className="detail-summary">
        <div className="detail-product-icon" aria-hidden="true">{product.image}</div>
        <div className="detail-product-copy">
          <div className="detail-tags">
            <span className="category-pill">{product.categoryIcon} {product.categoryNameBn}</span>
            <span className="category-pill">{formatUnit(product.unit)}</span>
          </div>
          <h1>{product.nameBn}</h1>
          <p>বাংলাদেশের বিভিন্ন বাজারে {product.nameBn}-এর আজকের দর ও বাজারভিত্তিক দামের তুলনা।</p>
        </div>
        <div className="detail-current-price">
          <span>আজকের গড় দাম</span>
          <strong>{formatPrice(product.today)} <small>টাকা</small></strong>
          <span className={`change-badge change-${product.change.dir}`}>
            {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}
            {" "}{formatPercent(product.change.pct)}%
          </span>
        </div>
      </section>

      <section className="price-summary-section">
        <div className="section-heading">
          <div><span className="section-kicker">আজকের দামের সারসংক্ষেপ</span><h2>দামের পরিসর</h2></div>
          <span className="price-unit">{formatUnit(product.unit)}</span>
        </div>
        <div className="price-summary-grid">
          <div className="summary-price min-price"><span>সর্বনিম্ন দাম</span><strong>{formatPrice(minimum)} <small>টাকা</small></strong><span>বাজারের সর্বনিম্ন দর</span></div>
          <div className="summary-price avg-price"><span>গড় দাম</span><strong>{formatPrice(average)} <small>টাকা</small></strong><span>সব বাজারের গড় হিসাব</span></div>
          <div className="summary-price max-price"><span>সর্বোচ্চ দাম</span><strong>{formatPrice(maximum)} <small>টাকা</small></strong><span>বাজারের সর্বোচ্চ দর</span></div>
        </div>
      </section>

      <section className="market-prices-section">
        <div className="section-heading">
          <div><span className="section-kicker">বাংলাদেশের বিভিন্ন বাজার</span><h2>বাজারভিত্তিক আজকের দাম</h2></div>
          <span className="market-count">{formatPrice(product.markets.length)}টি বাজার</span>
        </div>
        <div className="market-table-wrap">
          <table className="market-table">
            <thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বোচ্চ</th><th>গড় দাম</th></tr></thead>
            <tbody>
              {product.markets.map((market) => (
                <tr key={`${market.market}-${market.division}`}>
                  <td><span className="market-pin">⌖</span>{market.market}</td>
                  <td>{market.division}</td>
                  <td>{formatPrice(market.min)} টাকা</td>
                  <td>{formatPrice(market.max)} টাকা</td>
                  <td><strong>{formatPrice(Math.round((market.min + market.max) / 2))} টাকা</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="price-disclaimer">বাজারের দাম সময় ও স্থানভেদে পরিবর্তিত হতে পারে। কেনাকাটার আগে স্থানীয় বাজারে যাচাই করুন।</p>
    </article>
  );
}
