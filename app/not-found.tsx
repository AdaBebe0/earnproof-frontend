import Link from "next/link";
import { PageHeading } from "@/components/common/page-heading";
import { pageContainer } from "@/components/common/production-ui";
import { PublicShell } from "@/components/layout/public-shell";

export default function NotFound() {
  return (
    <PublicShell>
      <section className={pageContainer}>
        <PageHeading
          description="The page you're looking for doesn't exist or may have moved."
          eyebrow="404"
          title="Page not found"
        />
        <Link
          className="inline-flex h-11 w-fit items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300 px-6 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:h-10"
          href="/"
        >
          Return home
        </Link>
      </section>
    </PublicShell>
  );
}
