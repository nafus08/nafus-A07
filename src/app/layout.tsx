import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ToastProvider } from "@/components/toast-provider";
import { getCategories, getProducts } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — নিত্যপণ্যের আজকের দাম",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক দর এবং দৈনিক ওঠানামা জানুন।",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [categories, products, user] = await Promise.all([
    getCategories(),
    getProducts(),
    getCurrentUser(),
  ]);

  return (
    <html lang="bn">
      <body>
        <Navbar
          categories={categories}
          products={products}
          user={user ? { name: user.name, image: user.image } : null}
        />
        <main>{children}</main>
        <SiteFooter />
        <ToastProvider />
      </body>
    </html>
  );
}
