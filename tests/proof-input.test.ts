import assert from "node:assert/strict";
import test from "node:test";
import { extractProofId } from "@/lib/validation/proof-input";

test("extracts raw proof IDs", () => {
    assert.equal(extractProofId(" ep_7F3A "), "ep_7F3A");
});

test("extracts supported verification links", () => {
    assert.equal(extractProofId("http://localhost:3000/verify?proof=ep_7F3A"), "ep_7F3A");
    assert.equal(extractProofId("https://app.example.com/verify/ep_7F3A"), "ep_7F3A");
});

test("rejects unrelated URLs and malformed input", () => {
    assert.equal(extractProofId("https://app.example.com/proofs/ep_7F3A"), null);
    assert.equal(extractProofId("https://app.example.com/verify?proof=not%20a%20proof"), null);
    assert.equal(extractProofId("javascript:alert(1)"), null);
    assert.equal(extractProofId(""), null);
});
