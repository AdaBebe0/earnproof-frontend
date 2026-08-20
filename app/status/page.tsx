import { DataPanel, MetricGrid, pageContainer } from "@/components/common/production-ui";
import { PageHeading } from "@/components/common/page-heading";
import { PublicShell } from "@/components/layout/public-shell";

const rows = [
  { primary: "EarnProof API", secondary: "Global", tertiary: "Just now", status: "Active" },
  { primary: "Stellar indexer", secondary: "Testnet", tertiary: "Just now", status: "Active" },
  { primary: "Proof registry", secondary: "Testnet", tertiary: "1 min ago", status: "Active" },
  { primary: "Webhook delivery", secondary: "Global", tertiary: "1 min ago", status: "Active" },
];

export default function StatusPage() {
  return (
    <PublicShell>
      <div className={pageContainer}>
        <PageHeading title="System status" description="Live health for the EarnProof API, indexer, Stellar providers, contracts, and webhooks." />
        <MetricGrid items={[{ value: "6/6", label: "Services online" }, { value: "0", label: "Open incidents" }, { value: "99.99%", label: "Uptime" }]} />
        <DataPanel headers={["Service", "Region", "Checked", "Status"]} rows={rows} searchPlaceholder="Search services" />
      </div>
    </PublicShell>
  );
}
