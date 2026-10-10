import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { CategoryProductList } from "./product-list";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  return { title: category ? `${category.nameBn} পণ্য` : "বিভাগ খুঁজে পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();

  return (
    <section className="page-container listing-page">
      <div className="breadcrumb">
        <Link href="/">হোম</Link><span>/</span><span>{category.nameBn}</span>
      </div>
      <header className="listing-heading">
        <div className="listing-icon" aria-hidden="true">{category.icon}</div>
        <div>
          <span className="section-kicker">বিভাগ অনুযায়ী বাজারদর</span>
          <h1>{category.nameBn} পণ্য</h1>
          <p>আজকের {category.nameBn} বাজারের দাম ও পরিবর্তন দেখুন।</p>
        </div>
      </header>
      {products.length ? (
        <CategoryProductList products={products} />
      ) : (
        <div className="empty-state">
          <span>🧺</span>
          <h2>এই বিভাগে এখনো পণ্য নেই</h2>
          <p>অন্য পণ্যের দাম দেখতে হোম পেজে ফিরে যান।</p>
          <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
        </div>
      )}
    </section>
  );
}
