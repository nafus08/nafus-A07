"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function ProfileUpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    if (name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setPending(true);
    const result = await authClient.updateUser({ name });
    setPending(false);
    if (result.error) {
      toast.error(result.error.message ?? "তথ্য হালনাগাদ করা যায়নি");
      return;
    }

    toast.success("আপনার নাম হালনাগাদ হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label htmlFor="name">আপনার নাম</label>
      <input id="name" name="name" defaultValue={currentName} minLength={2} required />
      <p>আপনার নামটি আপনার প্রোফাইল এবং নেভিগেশনে দেখানো হবে।</p>
      <button className="button button-primary" type="submit" disabled={pending}>
        {pending ? "হালনাগাদ হচ্ছে…" : "তথ্য হালনাগাদ করুন"}
      </button>
    </form>
  );
}
