/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

// Mock the PublicShell component
jest.mock("@/components/layout/public-shell", () => ({
  PublicShell: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the PageHeading component
jest.mock("@/components/common/page-heading", () => ({
  PageHeading: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

// Mock the production-ui components
jest.mock("@/components/common/production-ui", () => ({
  pageContainer: "mocked-container",
  StatusBadge: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

describe("AboutPage", () => {
  describe("Rendering", () => {
    it("should render the page with main landmark", () => {
      const { container } = render(<AboutPage />);
      expect(container.querySelector("main")).toBeInTheDocument();
    });

    it("should render page heading with title and description", () => {
      render(<AboutPage />);
      expect(screen.getByText("About EarnProof")).toBeInTheDocument();
      expect(
        screen.getByText("Open infrastructure for portable, privacy-preserving financial evidence.")
      ).toBeInTheDocument();
    });

    it("should render hero section with h2 heading", () => {
      render(<AboutPage />);
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      expect(h2Elements.some((el: Element) => el.textContent === "About EarnProof")).toBe(
        true
      );
    });

    it("should render all six info cards", () => {
      render(<AboutPage />);
      expect(screen.getByText("EarnProof")).toBeInTheDocument();
      expect(screen.getByText("Veridatum Labs")).toBeInTheDocument();
      expect(screen.getByText("Privacy-first proofs")).toBeInTheDocument();
      expect(screen.getByText("Built on Stellar")).toBeInTheDocument();
      expect(screen.getByText("Open source")).toBeInTheDocument();
      expect(screen.getByText("Non-custodial")).toBeInTheDocument();
    });

    it("should render CTA section with heading", () => {
      render(<AboutPage />);
      expect(
        screen.getByText("Ready to create a proof?")
      ).toBeInTheDocument();
    });

    it("should render Open protocol badge", () => {
      render(<AboutPage />);
      expect(screen.getByText("Open protocol")).toBeInTheDocument();
    });
  });

  describe("Card Content", () => {
    it("should render EarnProof card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "A portable credential that proves income eligibility without disclosing exact amounts, employer details, or transaction history."
        )
      ).toBeInTheDocument();
    });

    it("should render Veridatum Labs card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "The open-source organization maintaining the EarnProof protocol, registry, and SDK. Governed by community contributions."
        )
      ).toBeInTheDocument();
    });

    it("should render Privacy-first proofs card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "Disclose only the claims you choose. Verifiers see what the issuer attested—nothing more, no transaction history."
        )
      ).toBeInTheDocument();
    });

    it("should render Built on Stellar card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "Use Stellar references andational Soroban commitments for portable, independently verifiable evidence."
        )
      ).toBeInTheDocument();
    });

    it("should render Open source card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "Inspect the protocol, schemas, and client libraries. Ownership and implementation are transparent and auditable."
        )
      ).toBeInTheDocument();
    });

    it("should render Non-custodial card with correct description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          "Wallet keys remain with their owners. EarnProof cannot move funds, recover seed phrases, or access private keys."
        )
      ).toBeInTheDocument();
    });
  });

  describe("Links and Navigation", () => {
    it("should have Explore the protocol link to /how-it-works", () => {
      render(<AboutPage />);
      const exploreLink = screen.getByRole("link", {
        name: /Explore the protocol/i,
      });
      expect(exploreLink).toHaveAttribute("href", "/how-it-works");
    });

    it("should have Create a proof link to /proofs/create", () => {
      render(<AboutPage />);
      const createLink = screen.getByRole("link", {
        name: /Create a proof/i,
      });
      expect(createLink).toHaveAttribute("href", "/proofs/create");
    });

    it("should have Verify a proof link to /verify", () => {
      render(<AboutPage />);
      const verifyLink = screen.getByRole("link", {
        name: /Verify a proof/i,
      });
      expect(verifyLink).toHaveAttribute("href", "/verify");
    });

    it("should have exactly 3 navigation links", () => {
      render(<AboutPage />);
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(3);
    });

    it("should link only to existing routes", () => {
      render(<AboutPage />);
      const links = screen.getAllByRole("link");
      const validRoutes = ["/how-it-works", "/proofs/create", "/verify"];
      links.forEach((link: Element) => {
        expect(validRoutes).toContain(link.getAttribute("href"));
      });
    });
  });

  describe("Semantic Structure", () => {
    it("should have h1 heading via PageHeading", () => {
      render(<AboutPage />);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("should have h2 heading for hero section", () => {
      render(<AboutPage />);
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it("should have h3 headings for cards", () => {
      render(<AboutPage />);
      const h3Elements = screen.getAllByRole("heading", { level: 3 });
      expect(h3Elements.length).toBeGreaterThanOrEqual(6);
    });

    it("should have main element", () => {
      const { container } = render(<AboutPage />);
      expect(container.querySelector("main")).toBeInTheDocument();
    });

    it("should have section elements for content areas", () => {
      const { container } = render(<AboutPage />);
      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("CTA Section Content", () => {
    it("should render CTA section description", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          /Start creating portable income proofs today/i
        )
      ).toBeInTheDocument();
    });

    it("should render CTA description text", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(
          /No signup required—just connect your wallet, select qualifying payments, and share a privacy-safe credential/i
        )
      ).toBeInTheDocument();
    });

    it("should have Create a proof CTA button", () => {
      render(<AboutPage />);
      const createButton = screen.getByRole("link", {
        name: /Create a proof/i,
      });
      expect(createButton).toBeInTheDocument();
    });

    it("should have Verify a proof secondary button", () => {
      render(<AboutPage />);
      const verifyButton = screen.getByRole("link", {
        name: /Verify a proof/i,
      });
      expect(verifyButton).toBeInTheDocument();
    });
  });

  describe("Content Verification", () => {
    it("should not mention mainnet", () => {
      render(<AboutPage />);
      const text = screen.getByRole("main").textContent || "";
      expect(text).not.toMatch(/mainnet/i);
    });

    it("should emphasize testnet (Stellar)", () => {
      render(<AboutPage />);
      expect(screen.getByText(/Built on Stellar/i)).toBeInTheDocument();
    });

    it("should emphasize non-custodial nature", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/Wallet keys remain with their owners/i)
      ).toBeInTheDocument();
    });

    it("should emphasize privacy-first approach", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/Disclose only the claims you choose/i)
      ).toBeInTheDocument();
    });

    it("should not claim exact amounts are disclosed", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/without disclosing exact amounts/i)
      ).toBeInTheDocument();
    });

    it("should not claim full financial history is disclosed", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/no transaction history/i)
      ).toBeInTheDocument();
    });

    it("should mention portable credential", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/portable credential/i)
      ).toBeInTheDocument();
    });

    it("should mention open source and transparent", () => {
      render(<AboutPage />);
      expect(
        screen.getByText(/transparent and auditable/i)
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have visible text for all links", () => {
      render(<AboutPage />);
      const links = screen.getAllByRole("link");
      links.forEach((link: Element) => {
        expect(link.textContent).toBeTruthy();
      });
    });

    it("should have proper heading hierarchy (h1 > h2 > h3)", () => {
      render(<AboutPage />);
      const h1 = screen.getByRole("heading", { level: 1 });
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      const h3Elements = screen.getAllByRole("heading", { level: 3 });

      expect(h1).toBeInTheDocument();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it("should have semantic article elements for cards", () => {
      const { container } = render(<AboutPage />);
      const articles = container.querySelectorAll("article");
      expect(articles.length).toBeGreaterThanOrEqual(6);
    });

    it("should use semantic button elements for links", () => {
      render(<AboutPage />);
      const links = screen.getAllByRole("link");
      links.forEach((link: Element) => {
        expect(link.tagName).toBe("A");
      });
    });

    it("should have descriptive button text", () => {
      render(<AboutPage />);
      expect(screen.getByText("Explore the protocol")).toBeInTheDocument();
      expect(screen.getByText("Create a proof")).toBeInTheDocument();
      expect(screen.getByText("Verify a proof")).toBeInTheDocument();
    });
  });

  describe("Responsive Layout", () => {
    it("should have responsive grid classes for cards", () => {
      const { container } = render(<AboutPage />);
      const html = container.innerHTML;
      expect(html).toContain("md:grid-cols-3");
    });

    it("should have responsive padding classes", () => {
      const { container } = render(<AboutPage />);
      const html = container.innerHTML;
      expect(html).toContain("sm:");
    });

    it("should have responsive gap classes", () => {
      const { container } = render(<AboutPage />);
      const html = container.innerHTML;
      expect(html).toContain("gap-");
    });

    it("should have responsive text size classes", () => {
      const { container } = render(<AboutPage />);
      const html = container.innerHTML;
      expect(html).toContain("sm:text-");
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot", () => {
      const { container } = render(<AboutPage />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("No External Links", () => {
    it("should not have any external links", () => {
      render(<AboutPage />);
      const links = screen.getAllByRole("link");
      links.forEach((link: Element) => {
        const href = link.getAttribute("href");
        expect(href).not.toMatch(/^http/i);
        expect(href).not.toMatch(/^www/i);
      });
    });
  });

  describe("Card Grid Layout", () => {
    it("should render cards in grid layout", () => {
      const { container } = render(<AboutPage />);
      const html = container.innerHTML;
      expect(html).toContain("md:grid-cols-3");
    });

    it("should have article elements for each card", () => {
      const { container } = render(<AboutPage />);
      const articles = container.querySelectorAll("article");
      expect(articles.length).toBeGreaterThanOrEqual(6);
    });

    it("should render cards with consistent styling", () => {
      const { container } = render(<AboutPage />);
      const articles = container.querySelectorAll("article");
      articles.forEach((article: Element) => {
        expect(article.className).toContain("rounded-lg");
        expect(article.className).toContain("border");
        expect(article.className).toContain("bg-white");
      });
    });
  });
});
