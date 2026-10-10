import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?reason=protected&callbackURL=%2Fprofile");

  return (
    <section className="page-container profile-page">
      <span className="section-kicker">আপনার ব্যক্তিগত তথ্য</span>
      <h1>আমার প্রোফাইল</h1>
      <div className="profile-card">
        {user.image ? (
          <img className="profile-avatar" src={user.image} alt="" />
        ) : (
          <span className="profile-avatar profile-avatar-fallback">{user.name.slice(0, 1)}</span>
        )}
        <div className="profile-info">
          <span>নাম</span><strong>{user.name}</strong>
          <span>ইমেইল</span><strong>{user.email}</strong>
        </div>
        <Link className="button button-outline" href="/profile/update">তথ্য পরিবর্তন করুন <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
