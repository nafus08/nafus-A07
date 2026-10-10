"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AuthFormProps {
  mode: "signin" | "signup";
  callbackURL?: string;
  reason?: string;
  registered?: boolean;
  googleEnabled: boolean;
  githubEnabled: boolean;
}

export function AuthForm({
  mode,
  callbackURL,
  reason,
  registered,
  googleEnabled,
  githubEnabled,
}: AuthFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const isSignUp = mode === "signup";
  const safeCallback =
    callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
      ? callbackURL
      : "/";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const name = String(formData.get("name") ?? "").trim();

    if (isSignUp && name.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের দিন");
      return;
    }

    setPending(true);
    const result = isSignUp
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({
          email,
          password,
          callbackURL: safeCallback,
        });
    setPending(false);

    if (result.error) {
      toast.error(result.error.message ?? "অনুরোধটি সম্পন্ন করা যায়নি");
      return;
    }

    if (isSignUp) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
      router.push("/signin?registered=1");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(safeCallback);
    router.refresh();
  }

  async function handleSocialSignIn(provider: "google" | "github") {
    setPending(true);
    const result = await authClient.signIn.social({
      provider,
      callbackURL: safeCallback,
    });
    if (result.error) {
      toast.error(result.error.message ?? "সামাজিক সাইন ইন করা যায়নি");
      setPending(false);
    }
  }

  return (
    <div className="auth-page page-container">
      <aside className="auth-aside">
        <Link href="/" className="auth-brand"><span className="brand-mark">ব</span> বাজার দর</Link>
        <div>
          <span className="section-kicker">আপনার বাজার, আপনার নিয়ন্ত্রণে</span>
          <h1>প্রতিদিনের দামের খবর থাকুক হাতের মুঠোয়।</h1>
          <p>সাইন ইন করে পণ্যের বিস্তারিত বাজারদর ও স্থানভেদে দামের তুলনা দেখুন।</p>
        </div>
        <div className="auth-aside-note"><span>🌱</span> সচেতন বাজার, সুন্দর আগামী</div>
      </aside>
      <section className="auth-card">
        <span className="auth-card-icon">{isSignUp ? "🌾" : "👋"}</span>
        <span className="section-kicker">{isSignUp ? "নতুন পথচলা শুরু হোক" : "আবার স্বাগতম"}</span>
        <h2>{isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে সাইন ইন করুন"}</h2>
        <p className="auth-description">
          {isSignUp ? "বাজারদরের বিস্তারিত জানতে আপনার তথ্য দিন।" : "আপনার বাজারদর দেখতে ইমেইল ও পাসওয়ার্ড দিন।"}
        </p>
        {reason === "protected" && (
          <div className="auth-notice">পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।</div>
        )}
        {registered && (
          <div className="auth-notice">অ্যাকাউন্ট তৈরি হয়েছে—এখন সাইন ইন করুন।</div>
        )}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <label>আপনার নাম<input name="name" type="text" autoComplete="name" placeholder="যেমন: নুসরাত জাহান" minLength={2} required /></label>
          )}
          <label>ইমেইল ঠিকানা<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>পাসওয়ার্ড<input name="password" type="password" autoComplete={isSignUp ? "new-password" : "current-password"} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required /></label>
          <button className="button button-primary auth-submit" type="submit" disabled={pending}>
            {pending ? <><span className="button-spinner" /> যাচাই হচ্ছে…</> : isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
            {!pending && <span aria-hidden="true">→</span>}
          </button>
        </form>
        {(googleEnabled || githubEnabled) && (
          <>
            <div className="auth-divider"><span>অথবা</span></div>
            <div className="social-buttons">
              {googleEnabled && <button className="social-button" onClick={() => handleSocialSignIn("google")} disabled={pending}><span className="google-mark">G</span> Google দিয়ে চালিয়ে যান</button>}
              {githubEnabled && <button className="social-button" onClick={() => handleSocialSignIn("github")} disabled={pending}><span>⌘</span> GitHub দিয়ে চালিয়ে যান</button>}
            </div>
          </>
        )}
        <p className="auth-switch">
          {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
          <Link href={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}</Link>
        </p>
      </section>
    </div>
  );
}
