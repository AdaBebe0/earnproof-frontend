import Link from "next/link";
import { PageHeading } from "@/components/common/page-heading";
import { pageContainer } from "@/components/common/production-ui";
import { PublicShell } from "@/components/layout/public-shell";

export default function NotFound() {
  return (
    <PublicShell>
      <section className={pageContainer}>
        <PageHeading
          eyebrow="Error 404"
          title="Page not found"
          description="The page you're looking for doesn't exist or has been moved. Navigate below to get back on track."
        />

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:mt-8 sm:p-7">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold leading-7 text-white sm:text-2xl sm:font-bold sm:leading-8">
                Where to next?
              </h2>
              <p className="text-sm leading-5 text-slate-300 sm:text-base sm:leading-6">
                Choose one of these options to continue exploring EarnProof.
              </p>
            </div>

            <nav className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300 px-6 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300 sm:h-10"
              >
                Back to home
              </Link>
              <Link
                href="/verify"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 bg-transparent px-6 text-sm font-medium text-white transition hover:bg-white/[0.08] focus:outline-2 focus:outline-offset-2 focus:outline-cyan-300 sm:h-10"
              >
                Verify a proof
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:mt-8 sm:p-7">
          <h2 className="text-lg font-semibold leading-7 text-white sm:text-xl sm:font-bold sm:leading-8">
            Need help?
          </h2>
          <p className="mt-2 text-sm leading-5 text-slate-300 sm:text-base sm:leading-6">
            If you believe this is an error or need assistance, please reach out through our support channels or check the documentation.
          </p>
        </div>
      </section>
    </PublicShell>
  );
}
