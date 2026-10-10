import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileUpdateForm } from "@/components/profile-update-form";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "প্রোফাইল হালনাগাদ" };

export default async function UpdateProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin?reason=protected&callbackURL=%2Fprofile%2Fupdate");

  return (
    <section className="page-container profile-page">
      <div className="breadcrumb"><Link href="/profile">আমার প্রোফাইল</Link><span>/</span><span>তথ্য হালনাগাদ</span></div>
      <span className="section-kicker">অ্যাকাউন্ট সেটিংস</span>
      <h1>আপনার তথ্য হালনাগাদ করুন</h1>
      <div className="profile-edit-card">
        <span className="edit-icon">✎</span>
        <div><h2>ব্যক্তিগত তথ্য</h2><p>আপনার প্রোফাইলের নামটি এখানে পরিবর্তন করুন।</p></div>
        <ProfileUpdateForm currentName={user.name} />
      </div>
    </section>
  );
}
