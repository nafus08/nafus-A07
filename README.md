# Bazar Dor (বাজার দর)

Bazar Dor helps you check the latest prices of everyday essentials in Bangladesh. Browse products by category, compare prices across markets, and see which prices are going up or down.

## Features

- Browse the product library and daily price changes on the home page.
- Explore products by category, then sort prices from low to high or high to low.
- Compare minimum, maximum, and average prices across local markets.
- Sign up and sign in with email and password using BetterAuth.
- Optionally enable Google and GitHub sign-in.
- View protected product details and manage your profile.
- Update your profile name.
- Get helpful loading states, responsive layouts, Bengali-formatted prices, and notifications.

## Technology

- Next.js App Router, React, and TypeScript
- Tailwind CSS and responsive CSS
- BetterAuth for authentication
- PostgreSQL and Drizzle ORM for authentication data
- `react-hot-toast` for notifications
- [Bazar Dor product and category API](https://api.api-store.workers.dev/api/bazardor)

## Getting started

You will need Node.js 20.9 or later, npm, and a PostgreSQL database for authentication.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   On macOS or Linux, run:

   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` and set `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`. To enable social sign-in, add the corresponding Google or GitHub OAuth credentials as well. See [Environment variables](#environment-variables) below.

4. Create the authentication tables and start the development server:

   ```bash
   npm run db:migrate
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

### Google and GitHub sign-in

Create an OAuth application with your provider and add its callback URL:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

For deployment, add the matching callback URL using your deployed app's domain.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes for authentication | PostgreSQL connection string used to store user accounts, sessions, and authentication data. |
| `BETTER_AUTH_SECRET` | Yes for authentication | A private signing secret. Use a randomly generated value of at least 32 characters. |
| `BETTER_AUTH_URL` | Yes for authentication | The app's base URL, for example `http://localhost:3000` during development. |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret. Provide this with the Google client ID to enable Google sign-in. |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth client ID. |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth client secret. Provide this with the GitHub client ID to enable GitHub sign-in. |
| `BAZAR_DOR_API_URL` | No | API base URL. Defaults to `https://api.api-store.workers.dev/api/bazardor`. |

The assignment provides the product and category API; it does not provide a PostgreSQL database. You need to supply your own database connection for the PostgreSQL-backed authentication used by this project.

Without `DATABASE_URL` and `BETTER_AUTH_SECRET`, public product pages can still use the product API, but sign-up, sign-in, and protected pages will not work. Configure these values in your deployment provider's environment settings before using authentication in production.

## Useful commands

```bash
npm run dev        # Start the local development server
npm run db:migrate # Create or update the authentication tables
npm run lint       # Check code style and common mistakes
npm run typecheck  # Check TypeScript types
npm run build      # Create a production build
npm run start      # Run the production build locally
```

## Routes

| Route | What you can do |
| --- | --- |
| `/` | Browse daily price changes and all products. |
| `/category/chal` | Browse and sort products in a category; replace `chal` with another category slug. |
| `/product/sorno-machi-chal` | View a protected product's market-by-market price details. |
| `/signin` | Sign in with an email and password, or an enabled social provider. |
| `/signup` | Create an account. |
| `/profile` | View your account details. |
| `/profile/update` | Update your profile name. |

## Deployment checklist

1. Deploy the app to Vercel or another platform that supports Next.js.
2. Add `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` to the deployment environment.
3. Run `npm run db:migrate` against the production PostgreSQL database.
4. Add your production OAuth callback URLs if Google or GitHub sign-in is enabled.
5. Test the home page, categories, direct product-page reloads, sign-up, sign-in, protected redirects, profile updates, and mobile layout.

## Verify before deployment

```bash
npm run lint
npm run typecheck
npm run build
```
