# বাজার দর (Bazar Dor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, বাজারভিত্তিক দর এবং দামের ওঠানামা এক জায়গায় জানার জন্য একটি responsive price-tracking application।

## মূল ফিচার

- API থেকে পণ্য ও category data এনে homepage-এ দাম বাড়া/কমার তালিকা এবং সব পণ্য দেখা।
- চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার category page; numeric price sorting।
- লগইন-সুরক্ষিত product detail page-এ সর্বনিম্ন, সর্বোচ্চ, গড় ও বাজারভিত্তিক দাম।
- BetterAuth email/password authentication এবং ঐচ্ছিক Google ও GitHub sign-in।
- Protected profile, profile-name update, auth/protected-route toast notification।
- Bengali সংখ্যা, loading skeleton, custom not-found page এবং mobile-first responsive layout।

## ব্যবহৃত প্রযুক্তি

- Next.js App Router, React ও TypeScript
- Tailwind CSS 4 এবং custom responsive CSS
- BetterAuth, PostgreSQL ও Drizzle ORM
- `react-hot-toast`
- [Bazar Dor API](https://api.api-store.workers.dev/api/bazardor)

## লোকাল সেটআপ

Node.js 20.9+ এবং PostgreSQL database প্রয়োজন।

```bash
npm install
Copy-Item .env.example .env.local
```

`.env.local`-এ database URL এবং BetterAuth secret দিন। OAuth ব্যবহার করতে Google ও/অথবা GitHub OAuth application-এর credentials-ও যোগ করুন। তারপর schema migration প্রয়োগ করুন:

```bash
npm run db:migrate
npm run dev
```

অ্যাপটি `http://localhost:3000`-এ চালু হবে। Google ও GitHub OAuth application-এ callback URL হিসেবে `http://localhost:3000/api/auth/callback/google` এবং `http://localhost:3000/api/auth/callback/github` যোগ করুন।

## Environment variables

| Variable | বিবরণ |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string; BetterAuth-এর user/session/account সংরক্ষণ করে |
| `BETTER_AUTH_SECRET` | কমপক্ষে ৩২ অক্ষরের গোপন session-signing secret |
| `BETTER_AUTH_URL` | অ্যাপের public origin, যেমন `https://example.com` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | ঐচ্ছিক Google OAuth credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | ঐচ্ছিক GitHub OAuth credentials |
| `BAZAR_DOR_API_URL` | ঐচ্ছিক API base URL; default `https://api.api-store.workers.dev/api/bazardor` |

Production deployment-এ PostgreSQL, auth secret এবং public `BETTER_AUTH_URL` deployment platform-এর secret/environment settings-এ যোগ করুন। OAuth provider ব্যবহার করলে Google/GitHub console-এ production callback URL-ও নিবন্ধন করুন। Google বা GitHub sign-in button দেখাতে provider-এর client ID ও secret—দুটিই দিতে হবে।

## যাচাই

```bash
npm run lint
npm run typecheck
npm run build
```

`/`, `/category/chal`, `/product/sorno-machi-chal`, `/signin`, `/signup`, `/profile` এবং `/profile/update` route-গুলো browser-এ যাচাই করুন। Product detail ও profile route-এর জন্য আগে sign in করা প্রয়োজন। Database/Auth environment variables না থাকলে public product listing চলে, তবে authentication endpoint `503` দিয়ে প্রয়োজনীয় configuration জানায়।
