# Contributing to EarnProof Frontend

Thanks for improving EarnProof. This repository contains the public web app and frontend flows for wallet authentication, payment review, proof creation, and public verification.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Default local URL: `http://localhost:3000`.

## Validation

Run these before opening a pull request:

```bash
npm run lint
npm run build
```

## Contribution Expectations

- Keep changes scoped to the issue you are solving.
- Do not put secret keys, private wallet material, or signing data in client code.
- Make Stellar network state visible when a workflow depends on testnet.
- Keep verification pages limited to intentionally disclosed proof data.
- Add tests or fixtures when changing behavior that can regress.
- Update documentation when user-facing behavior changes.

## Definition of Done

- The feature or fix satisfies the issue acceptance criteria.
- Lint and build pass.
- User-facing text is accurate about implemented behavior.
- Sensitive data is not exposed in logs, URLs, screenshots, or public verification payloads.
- The pull request explains validation performed.

