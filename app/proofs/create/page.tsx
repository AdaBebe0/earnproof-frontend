import { PageHeading } from "@/components/common/page-heading";
import { CreateProofFlow } from "@/components/proofs/create-proof-flow";
import { PublicShell } from "@/components/layout/public-shell";

export default function CreateProofPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <PageHeading
          description="Connect a Stellar testnet wallet, sync incoming payments, select qualifying income, and create a signed minimum-income credential."
          eyebrow="Worker flow"
          title="Create an income proof"
        />
        <CreateProofFlow />
      </section>
    </PublicShell>
  );
}
