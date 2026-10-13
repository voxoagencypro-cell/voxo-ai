import { redirect } from "next/navigation";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const code = typeof params.code === "string" ? params.code : undefined;

  if (code) {
    const query = new URLSearchParams();
    query.set("code", code);
    const type =
      typeof params.type === "string" ? params.type : "recovery";
    query.set("type", type);
    redirect(`/auth/callback?${query.toString()}`);
  }

  redirect("/fr");
}
