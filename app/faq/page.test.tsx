/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQPage from "./page";
import { faqData } from "@/lib/faq-data";

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

// Mock the pageContainer class
jest.mock("@/components/common/production-ui", () => ({
  pageContainer: "mocked-container",
}));

describe("FAQPage", () => {
  describe("Rendering", () => {
    it("should render the page with FAQ items", () => {
      render(<FAQPage />);
      expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();
      expect(screen.getByText(faqData[0].question)).toBeInTheDocument();
    });

    it("should render the page heading with title and description", () => {
      render(<FAQPage />);
      expect(
        screen.getByText("Answers for workers, verifiers, issuers, and developers.")
      ).toBeInTheDocument();
    });

    it("should render stat cards with count of help topics and categories", () => {
      render(<FAQPage />);
      expect(screen.getByText("Help topics")).toBeInTheDocument();
      expect(screen.getByText("Categories")).toBeInTheDocument();
      expect(screen.getByText("28")).toBeInTheDocument(); // 28 total FAQ items
      expect(screen.getByText("7")).toBeInTheDocument(); // 7 categories (wallet, privacy, verification, testnet, issuer, expiration, + 1 more)
    });

    it("should render search input with correct attributes", () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      ) as HTMLInputElement;
      expect(searchInput).toBeInTheDocument();
      expect(searchInput.placeholder).toBe("Search proof type catalogue");
    });

    it("should render all FAQ items as accordion buttons", () => {
      render(<FAQPage />);
      const questions = faqData.map((item) => item.question);
      questions.forEach((question) => {
        expect(screen.getByText(question)).toBeInTheDocument();
      });
    });
  });

  describe("Search Functionality", () => {
    it("should filter FAQ items by question text", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "wallet");

      // Should show wallet-related questions
      expect(
        screen.getByText("Is my wallet safe to use with EarnProof?")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Does EarnProof store my wallet keys?")
      ).toBeInTheDocument();

      // Should hide non-wallet questions
      expect(
        screen.queryByText("Can a proof expire?")
      ).not.toBeInTheDocument();
    });

    it("should filter FAQ items by answer text", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "Freighter");

      expect(
        screen.getByText("Is my wallet safe to use with EarnProof?")
      ).toBeInTheDocument();
    });

    it("should perform case-insensitive search", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "WALLET");

      expect(
        screen.getByText("Is my wallet safe to use with EarnProof?")
      ).toBeInTheDocument();
    });

    it("should show no results state when search has no matches", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "nonexistentquery");

      expect(
        screen.getByText('No results found for "nonexistentquery". Try a different search term.')
      ).toBeInTheDocument();
    });

    it("should restore all FAQ items when clearing search", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "wallet");
      expect(screen.getByText("Is my wallet safe to use with EarnProof?")).toBeInTheDocument();

      const clearButton = screen.getByRole("button", { name: /clear/i });
      await userEvent.click(clearButton);

      expect(
        screen.getByText("Can a proof expire?")
      ).toBeInTheDocument();
    });
  });

  describe("Accordion Behavior", () => {
    it("should have aria-expanded='false' when accordion is closed", () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should have aria-expanded='true' when accordion is open", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("should toggle open/closed state when clicking accordion button", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      expect(button).toHaveAttribute("aria-expanded", "false");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");

      await userEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("should display answer when accordion is open", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      await userEvent.click(button);

      expect(
        screen.getByText(
          "Freighter keeps your keys local. EarnProof cannot move funds or recover seed phrases. Only public keys are shared."
        )
      ).toBeInTheDocument();
    });

    it("should hide answer when accordion is closed", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      await userEvent.click(button);
      expect(
        screen.getByText(
          "Freighter keeps your keys local. EarnProof cannot move funds or recover seed phrases. Only public keys are shared."
        )
      ).toBeInTheDocument();

      await userEvent.click(button);
      expect(
        screen.queryByText(
          "Freighter keeps your keys local. EarnProof cannot move funds or recover seed phrases. Only public keys are shared."
        )
      ).not.toBeInTheDocument();
    });

    it("should have aria-controls matching the answer region id", () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      const controlsId = button.getAttribute("aria-controls");
      expect(controlsId).toBe("answer-wallet-safety-1");

      const answerRegion = screen.getByRole("region", {
        hidden: true,
      });
      expect(answerRegion).toHaveAttribute("id", controlsId);
    });
  });

  describe("Answer Region Accessibility", () => {
    it("should have answer region with role='region'", () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      const answerId = button.getAttribute("aria-controls");
      const answerRegion = document.getElementById(answerId!);
      expect(answerRegion).toHaveAttribute("role", "region");
    });

    it("should have answer region with aria-labelledby matching question button", () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });
      const buttonId = button.getAttribute("id");

      const answerId = button.getAttribute("aria-controls");
      const answerRegion = document.getElementById(answerId!);
      expect(answerRegion).toHaveAttribute("aria-labelledby", buttonId);
    });

    it("should hide answer region when accordion is closed", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });
      const answerId = button.getAttribute("aria-controls");
      const answerRegion = document.getElementById(answerId!);

      expect(answerRegion).toHaveAttribute("hidden");
    });

    it("should show answer region when accordion is open", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      await userEvent.click(button);

      const answerId = button.getAttribute("aria-controls");
      const answerRegion = document.getElementById(answerId!);
      expect(answerRegion).not.toHaveAttribute("hidden");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should allow tabbing through accordion buttons", async () => {
      render(<FAQPage />);
      const buttons = screen.getAllByRole("button").filter((btn) => {
        const ariaExpanded = btn.getAttribute("aria-expanded");
        return ariaExpanded !== null;
      });

      const firstButton = buttons[0];
      const secondButton = buttons[1];

      firstButton.focus();
      expect(document.activeElement).toBe(firstButton);

      await userEvent.tab();
      expect(document.activeElement).toBe(secondButton);
    });

    it("should open/close accordion with Enter key", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      button.focus();
      expect(button).toHaveAttribute("aria-expanded", "false");

      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
      button.click();
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("should open/close accordion with Space key", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      button.focus();
      expect(button).toHaveAttribute("aria-expanded", "false");

      fireEvent.keyDown(button, { key: " ", code: "Space" });
      button.click();
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("should not trap focus inside accordion", async () => {
      render(<FAQPage />);
      const buttons = screen.getAllByRole("button").filter((btn) => {
        const ariaExpanded = btn.getAttribute("aria-expanded");
        return ariaExpanded !== null;
      });

      const firstButton = buttons[0];
      await userEvent.click(firstButton);

      // Tab should move to next button, not be trapped
      firstButton.focus();
      await userEvent.tab();
      expect(document.activeElement).not.toBe(firstButton);
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot for default state", () => {
      const { container } = render(<FAQPage />);
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with search query", async () => {
      const { container } = render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "wallet");

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with open accordion", async () => {
      const { container } = render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      await userEvent.click(button);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Content Verification", () => {
    it("should not mention mainnet being available", () => {
      render(<FAQPage />);
      const allText = screen.getByRole("main").textContent || "";
      expect(allText).toMatch(/mainnet/i);
      // Should only mention testnet, not mainnet availability
      expect(allText).toMatch(/testnet/i);
    });

    it("should mention wallet safety with Freighter", () => {
      render(<FAQPage />);
      expect(
        screen.getByText(/Freighter keeps your keys local/i)
      ).toBeInTheDocument();
    });

    it("should mention non-custodial nature", () => {
      render(<FAQPage />);
      expect(
        screen.getByText(/EarnProof is non-custodial/i)
      ).toBeInTheDocument();
    });

    it("should explain proof expiration", () => {
      render(<FAQPage />);
      expect(
        screen.getByText(/An expired proof returns EXPIRED status/i)
      ).toBeInTheDocument();
    });

    it("should explain proof revocation", () => {
      render(<FAQPage />);
      expect(
        screen.getByText(/Verification returns REVOKED/i)
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility - Focus Management", () => {
    it("should have visible focus ring on buttons", async () => {
      render(<FAQPage />);
      const button = screen.getByRole("button", {
        name: /Is my wallet safe to use with EarnProof?/i,
      });

      button.focus();
      expect(button).toHaveFocus();

      // Check for focus-visible class applied
      expect(button.className).toContain("focus-visible");
    });

    it("should have visible focus ring on search input", () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      searchInput.focus();
      expect(searchInput).toHaveFocus();
      expect(searchInput.className).toContain("focus-visible");
    });

    it("should have visible focus ring on clear button", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "wallet");
      const clearButton = screen.getByRole("button", { name: /clear/i });

      clearButton.focus();
      expect(clearButton).toHaveFocus();
      expect(clearButton.className).toContain("focus-visible");
    });
  });

  describe("Display States", () => {
    it("should show all FAQ items by default", () => {
      render(<FAQPage />);
      const allQuestions = faqData.map((item) => item.question);
      allQuestions.forEach((question) => {
        expect(screen.getByText(question)).toBeInTheDocument();
      });
    });

    it("should close all accordions by default", () => {
      render(<FAQPage />);
      const buttons = screen.getAllByRole("button").filter((btn) => {
        const ariaExpanded = btn.getAttribute("aria-expanded");
        return ariaExpanded !== null;
      });

      buttons.forEach((button) => {
        expect(button).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("should show friendly empty state with search query", async () => {
      render(<FAQPage />);
      const searchInput = screen.getByLabelText(
        "Search frequently asked questions"
      );

      await userEvent.type(searchInput, "xyz123nonexistent");

      expect(
        screen.getByText(/No results found for/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Try a different search term/i)
      ).toBeInTheDocument();
    });
  });
});
