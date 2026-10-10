import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getCurrentUser } from "@/lib/auth";

interface SignInPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const [user, query] = await Promise.all([getCurrentUser(), searchParams]);
  if (user) redirect("/");

  return (
    <AuthForm
      mode="signin"
      callbackURL={typeof query.callbackURL === "string" ? query.callbackURL : undefined}
      reason={typeof query.reason === "string" ? query.reason : undefined}
      registered={query.registered === "1"}
      googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)}
      githubEnabled={Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)}
    />
  );
}
