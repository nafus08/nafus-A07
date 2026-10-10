import Link from "next/link";

export default function NotFound() {
  return (
    <section className="message-page page-container">
      <span className="message-icon">🔎</span>
      <span className="section-kicker">পৃষ্ঠা খুঁজে পাওয়া যায়নি</span>
      <h1>এই বাজারের পথটি নেই</h1>
      <p>ঠিকানা যাচাই করে আবার চেষ্টা করুন, অথবা সব পণ্যের পাতায় ফিরে যান।</p>
      <Link className="button button-primary" href="/">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
