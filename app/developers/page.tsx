import { FeatureGrid, MarketingHero, pageContainer } from "@/components/common/production-ui";
import { PageHeading } from "@/components/common/page-heading";
import { PublicShell } from "@/components/layout/public-shell";

const features = [
  { title: "Verification API", description: "Verify proof IDs or credentials with stable schemas, privacy-safe errors, and auditable results." },
  { title: "TypeScript SDK", description: "Integrate authentication, verification requests, and typed responses with the supported SDK." },
  { title: "Signed webhooks", description: "Receive verification events with replay protection, signature checks, and delivery diagnostics." },
];

export default function DevelopersPage() {
  return (
    <PublicShell>
      <div className={pageContainer}>
        <PageHeading title="Build with EarnProof" description="APIs, SDKs, schemas, and webhooks for private income verification." />
        <MarketingHero title="Build with EarnProof" description="APIs, SDKs, schemas, and webhooks for private income verification." action="Read the quick start" href="/verify" />
        <FeatureGrid items={features} />
      </div>
    </PublicShell>
  );
}
