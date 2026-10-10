import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

function MarketSection({
  title,
  subtitle,
  products,
  tone,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  tone: "up" | "down";
}) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <span className={`section-mark mark-${tone}`} />
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const averagePrice = Math.round(
    products.reduce((total, product) => total + product.today, 0) /
      products.length,
  );

  return (
    <div className="home-page">
      <section className="hero-section page-container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> আপনার প্রতিদিনের বাজার সহায়ক
          </span>
          <h1>
            বাজারের সঠিক দাম,
            <br />
            <span>সিদ্ধান্ত আপনার।</span>
          </h1>
          <p className="hero-description">
            চাল, ডাল, মাছ, সবজি থেকে নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এক
            জায়গায়। প্রতিদিনের বাজার হোক আরও সচেতন।
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#সব-পণ্য">
              আজকের দাম দেখুন <span aria-hidden="true">↘</span>
            </a>
            <span className="hero-updated">
              <span className="live-dot" /> আজকের বাজারদর হালনাগাদ
            </span>
          </div>
          <div className="hero-stats" aria-label="বাজারের সারসংক্ষেপ">
            <div>
              <strong>{formatPrice(products.length)}+</strong>
              <span>নিত্যপণ্য</span>
            </div>
            <div>
              <strong>{formatPrice(8)}</strong>
              <span>পণ্যের বিভাগ</span>
            </div>
            <div>
              <strong>{formatPrice(averagePrice)}</strong>
              <span>গড় দাম (টাকা)</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-image-wrap">
            <Image
              src="/bazar-hero.png"
              alt="তাজা বাজারের সবজি"
              width={298}
              height={254}
              priority
            />
          </div>
          <div className="floating-price">
            <span className="floating-icon">🥬</span>
            <span>
              <small>আজকের সবজি</small>
              <strong>দাম এক নজরে</strong>
            </span>
            <span className="floating-arrow">↗</span>
          </div>
          <div className="hero-sticker">সতেজ বাজার<br />সচেতন সিদ্ধান্ত</div>
          <span className="hero-spark spark-one">✳</span>
          <span className="hero-spark spark-two">✦</span>
        </div>
      </section>

      <div className="page-container home-content">
        <div className="market-note">
          <span className="note-icon">৳</span>
          <span>
            <strong>বাজারের হালচাল</strong>
            <small>আজ কোন পণ্যের দাম বাড়ছে, কোনটির কমছে—জেনে নিন।</small>
          </span>
          <Link href="/#সব-পণ্য">সব পণ্য <span aria-hidden="true">→</span></Link>
        </div>

        <MarketSection
          title="আজ দাম বেড়েছে ▲"
          subtitle="যেসব পণ্যের দাম গতকালের তুলনায় বেড়েছে"
          products={risers}
          tone="up"
        />
        <MarketSection
          title="আজ দাম কমেছে ▼"
          subtitle="যেসব পণ্যের দাম গতকালের তুলনায় কমেছে"
          products={fallers}
          tone="down"
        />
        <section className="section-block all-products" id="সব-পণ্য">
          <div className="section-heading all-products-heading">
            <div>
              <span className="section-kicker">আজকের সম্পূর্ণ তালিকা</span>
              <h2>সব পণ্য</h2>
              <p>আপনার প্রতিদিনের বাজারের প্রয়োজনীয় দাম এক জায়গায়।</p>
            </div>
            <span className="product-count">{formatPrice(products.length)}টি পণ্য</span>
          </div>
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
