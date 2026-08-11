"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api/client";

type VerificationResult =
  | "VALID"
  | "EXPIRED"
  | "REVOKED"
  | "INVALID_SIGNATURE"
  | "UNKNOWN_PROOF"
  | "UNVERIFIED_ISSUER";

type VerifyProofResponse = {
  result: VerificationResult;
  status: "valid" | "expired" | "revoked" | "unknown" | "invalid";
  credential?: {
    id: string;
    schemaVersion: string;
    subject: {
      walletHash: string;
    };
    claim: {
      operator: "gte";
      thresholdAmount: string;
      assetCode: string;
      assetIssuer: string | null;
      periodStart: string;
      periodEnd: string;
      qualifyingPaymentCount: number;
    };
    privacy: {
      exactIncomeHidden: boolean;
      sourceTransactionsHidden: boolean;
    };
    issuedAt: string;
    expiresAt: string;
    proof: {
      type: string;
      credentialHash: string;
      signature: string;
    };
  };
  proof?: {
    id: string;
    type: string;
    schemaVersion: string;
    network: string;
    issuedAt: string;
    expiresAt: string;
    revokedAt: string | null;
  };
};

const statusStyles: Record<VerifyProofResponse["status"], string> = {
  valid: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
  expired: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  revoked: "border-rose-300/30 bg-rose-300/10 text-rose-100",
  unknown: "border-slate-300/20 bg-slate-300/10 text-slate-100",
  invalid: "border-rose-300/30 bg-rose-300/10 text-rose-100",
};

export function VerifyProofForm() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState(() => searchParams.get("proof") ?? "");
  const [result, setResult] = useState<VerifyProofResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const proofId = useMemo(() => extractProofId(input), [input]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);

    if (!proofId) {
      setError("Enter a proof ID or verification URL.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient<VerifyProofResponse>({
        path: `/proofs/${encodeURIComponent(proofId)}/verify`,
      });
      setResult(response);
    } catch {
      setError("Verification request failed. Check the proof ID and API URL.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
      <form
        className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5"
        onSubmit={onSubmit}
      >
        <label className="text-sm font-medium text-slate-200" htmlFor="proof">
          Proof ID or verification URL
        </label>
        <input
          className="rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500"
          id="proof"
          onChange={(event) => setInput(event.target.value)}
          placeholder="proof ID or https://api.example.com/api/v1/proofs/.../verify"
          type="text"
          value={input}
        />
        {error ? <p className="text-sm text-rose-200">{error}</p> : null}
        <button
          className="w-fit rounded-md bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Checking..." : "Verify proof"}
        </button>
      </form>

      <VerificationPanel result={result} />
    </div>
  );
}

function VerificationPanel({ result }: { result: VerifyProofResponse | null }) {
  if (!result) {
    return (
      <div className="rounded-lg border border-white/10 bg-slate-950 p-5 text-sm leading-6 text-slate-300">
        Verification results will appear here. Public verification does not show
        exact hidden income, source transaction hashes, or full wallet history.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/10 bg-slate-950 p-5">
      <div
        className={`inline-flex rounded-md border px-3 py-1 text-sm font-semibold uppercase ${statusStyles[result.status]}`}
      >
        {result.status}
      </div>

      {result.credential && result.proof ? (
        <dl className="mt-5 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
          <ResultItem label="Proof ID" value={result.proof.id} />
          <ResultItem label="Network" value={result.proof.network} />
          <ResultItem
            label="Claim"
            value={`Income ${result.credential.claim.operator} ${result.credential.claim.thresholdAmount} ${result.credential.claim.assetCode}`}
          />
          <ResultItem
            label="Qualifying payments"
            value={String(result.credential.claim.qualifyingPaymentCount)}
          />
          <ResultItem
            label="Period"
            value={`${formatDate(result.credential.claim.periodStart)} to ${formatDate(
              result.credential.claim.periodEnd,
            )}`}
          />
          <ResultItem label="Expires" value={formatDate(result.proof.expiresAt)} />
          <ResultItem
            label="Wallet hash"
            value={result.credential.subject.walletHash}
          />
          <ResultItem
            label="Credential hash"
            value={result.credential.proof.credentialHash}
          />
        </dl>
      ) : (
        <p className="mt-5 text-sm leading-6 text-slate-300">
          No matching EarnProof credential was found for this identifier.
        </p>
      )}
    </div>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 break-words text-slate-100">{value}</dd>
    </div>
  );
}

function extractProofId(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    const match = url.pathname.match(/\/proofs\/([^/]+)(?:\/verify)?$/);
    return match?.[1] ?? null;
  } catch {
    return trimmed;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
