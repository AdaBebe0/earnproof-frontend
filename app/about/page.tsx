import Link from "next/link";
import { pageContainer, StatusBadge } from "@/components/common/production-ui";
import { PageHeading } from "@/components/common/page-heading";
import { PublicShell } from "@/components/layout/public-shell";

export default function AboutPage() {
  return (
    <PublicShell>
      <main className={pageContainer}>
        {/* Hero Section */}
        <PageHeading
          title="About EarnProof"
          description="Open infrastructure for portable, privacy-preserving financial evidence."
        />

        {/* Hero Card */}
        <section className="flex min-h-[250px] flex-col items-start gap-3.5 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:min-h-[300px] sm:gap-[18px] sm:p-7">
          <StatusBadge>Open protocol</StatusBadge>
          <h2 className="text-2xl font-semibold leading-8 sm:text-4xl sm:font-bold sm:leading-10">
            About EarnProof
          </h2>
          <p className="max-w-5xl text-lg leading-8 text-slate-300">
            Open infrastructure for portable, privacy-preserving financial evidence.
          </p>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300 px-6 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 sm:h-10"
            href="/how-it-works"
          >
            Explore the protocol
          </Link>
        </section>

        {/* About Cards Grid */}
        <section className="grid gap-3 md:grid-cols-3">
          {/* EarnProof Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              EarnProof
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              A portable credential that proves income eligibility without disclosing exact amounts, employer details, or transaction history.
            </p>
          </article>

          {/* Veridatum Labs Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              Veridatum Labs
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              The open-source organization maintaining the EarnProof protocol, registry, and SDK. Governed by community contributions.
            </p>
          </article>

          {/* Privacy-first Proofs Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              Privacy-first proofs
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              Disclose only the claims you choose. Verifiers see what the issuer attested—nothing more, no transaction history.
            </p>
          </article>

          {/* Stellar Testnet Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              Built on Stellar
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              Use Stellar references andational Soroban commitments for portable, independently verifiable evidence.
            </p>
          </article>

          {/* Open Source Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              Open source
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              Inspect the protocol, schemas, and client libraries. Ownership and implementation are transparent and auditable.
            </p>
          </article>

          {/* Non-custodial Card */}
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h3 className="text-xl font-semibold leading-7 text-white">
              Non-custodial
            </h3>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              Wallet keys remain with their owners. EarnProof cannot move funds, recover seed phrases, or access private keys.
            </p>
          </article>
        </section>

        {/* CTA Section */}
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <h2 className="text-2xl font-semibold leading-8 text-white sm:text-3xl sm:leading-9">
            Ready to create a proof?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:mt-4 sm:text-base">
            Start creating portable income proofs today. No signup required—just connect your wallet, select qualifying payments, and share a privacy-safe credential.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              className="inline-flex h-11 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300 px-6 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 sm:h-10"
              href="/proofs/create"
            >
              Create a proof
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 px-6 text-sm font-medium transition hover:bg-white/[0.05] sm:h-10"
              href="/verify"
            >
              Verify a proof
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
