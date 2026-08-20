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
    <div className="grid gap-4">
      <form
        className="grid gap-[18px] rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:p-6"
        onSubmit={onSubmit}
      >
        <div>
          <h2 className="text-2xl font-semibold leading-8">Verify a proof</h2>
          <p className="mt-2 text-sm leading-5 text-slate-300">Complete the information below. Sensitive details remain private unless explicitly disclosed.</p>
        </div>
        <label className="grid gap-[7px] text-xs font-semibold text-slate-300" htmlFor="proof">
          Proof ID
          <input
            className="h-[46px] rounded-lg border border-white/15 bg-transparent px-3 text-sm font-normal text-white placeholder:text-slate-500"
            id="proof"
            onChange={(event) => setInput(event.target.value)}
            placeholder="EP-8A42-91DC"
            type="text"
            value={input}
          />
        </label>
        <label className="grid gap-[7px] text-xs font-semibold text-slate-300">
          Verification method
          <input className="h-[46px] rounded-lg border border-white/15 bg-transparent px-3 text-sm font-normal text-slate-500" disabled value="Public proof link" />
        </label>
        <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm leading-5">
          <p className="font-medium text-cyan-200">Privacy protected</p>
          <p className="mt-1.5 text-slate-300">Only the fields shown in the disclosure summary can be shared.</p>
        </div>
        {error ? <p className="text-sm text-rose-200">{error}</p> : null}
        <button
          className="h-11 w-fit rounded-lg bg-cyan-300 px-6 text-sm font-medium text-slate-950 disabled:cursor-not-allowed disabled:opacity-60 sm:h-10"
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
    return null;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
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
