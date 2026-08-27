const RAW_PROOF_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/;

export function extractProofId(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) {
        return null;
    }

    if (RAW_PROOF_ID_PATTERN.test(trimmed)) {
        return trimmed;
    }

    let url: URL;
    try {
        url = new URL(trimmed, "https://earnproof.local");
    } catch {
        return null;
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return null;
    }

    const pathname = url.pathname.endsWith("/") && url.pathname !== "/"
        ? url.pathname.slice(0, -1)
        : url.pathname;
    if (pathname === "/verify") {
        const proof = url.searchParams.get("proof")?.trim() ?? "";
        return RAW_PROOF_ID_PATTERN.test(proof) ? proof : null;
    }

    const match = pathname.match(/^\/verify\/([^/]+)$/);
    if (!match) {
        return null;
    }

    let proof: string;
    try {
        proof = decodeURIComponent(match[1]).trim();
    } catch {
        return null;
    }

    return RAW_PROOF_ID_PATTERN.test(proof) ? proof : null;
}
