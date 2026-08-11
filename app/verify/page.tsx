import { Suspense } from "react";
import { PageHeading } from "@/components/common/page-heading";
import { PublicShell } from "@/components/layout/public-shell";
import { VerifyProofForm } from "@/components/verification/verify-proof-form";

export default function VerifyPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <PageHeading
          description="Check the public status and disclosed claim for a signed EarnProof credential without revealing source transactions or exact hidden income."
          eyebrow="Verification"
          title="Check an EarnProof credential"
        />
        <Suspense
          fallback={
            <div className="mt-10 rounded-lg border border-white/10 bg-slate-950 p-5 text-sm text-slate-300">
              Loading verification form...
            </div>
          }
        >
          <VerifyProofForm />
        </Suspense>
      </section>
    </PublicShell>
  );
}
