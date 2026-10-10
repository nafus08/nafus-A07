"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { Category, Product } from "@/lib/types";
import { formatPercent, formatPrice } from "@/lib/format";

interface NavbarProps {
  categories: Category[];
  products: Product[];
  user: { name: string; image?: string | null } | null;
}

const banglaDate = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Dhaka",
}).format(new Date());

export function Navbar({ categories, products, user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const topProducts = products.slice(0, 12);

  async function handleSignOut() {
    const result = await authClient.signOut();
    if (result.error) {
      toast.error(result.error.message ?? "সাইন আউট করা যায়নি");
      return;
    }
    setCurrentUser(null);
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="topbar page-container">
        <Link href="/" className="brand" aria-label="বাজার দর হোম">
          <span className="brand-mark">ব</span>
          <span className="brand-copy">
            <strong>বাজার দর</strong>
            <small>{banglaDate}</small>
          </span>
        </Link>

        <nav
          className={`category-nav ${menuOpen ? "category-nav-open" : ""}`}
          aria-label="পণ্যের বিভাগ"
        >
          <Link
            href="/#সব-পণ্য"
            onClick={() => setMenuOpen(false)}
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            সব পণ্য
          </Link>
          {categories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.slug}
              onClick={() => setMenuOpen(false)}
              className={
                pathname === `/category/${category.slug}`
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <span aria-hidden="true">{category.icon}</span> {category.nameBn}
            </Link>
          ))}
        </nav>

        <div className="account-actions">
          {currentUser ? (
            <>
              <Link className="profile-link" href="/profile">
                {currentUser.image ? (
                  <img src={currentUser.image} alt="" />
                ) : (
                  <span className="avatar-fallback">
                    {currentUser.name.slice(0, 1)}
                  </span>
                )}
                <span>আমার প্রোফাইল</span>
              </Link>
              <button className="button button-outline button-small" onClick={handleSignOut}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="login-link" href="/signin">
                সাইন ইন
              </Link>
              <Link className="button button-primary button-small" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="ticker" aria-label="পণ্যের দামের পরিবর্তন">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {topProducts.map((product) => (
                <span className="ticker-item" key={`${copy}-${product.id}`}>
                  <span>{product.image}</span>
                  <strong>{product.nameBn}</strong>
                  <span>{formatPrice(product.today)} টাকা</span>
                  <span
                    className={`ticker-change change-${product.change.dir}`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {formatPercent(product.change.pct)}%
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
