import { FullWrapper } from "@/shared/libs/__tests__";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PostHeader } from "../post-header";

// Mock Next.js router
const mockBack = vi.fn();
const mockPush = vi.fn();
const mockReplace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
    replace: mockReplace,
    pathname: "/post/123",
    query: { postId: "123" },
    asPath: "/post/123",
  }),
}));

/**
 * PostHeader Widget Tests
 * Verify core PostHeader functionality using Given-When-Then pattern
 */
describe("PostHeader Widget", () => {
  beforeEach(() => {
    // Given: Reset all mocks before each test
    vi.clearAllMocks();
  });

  describe("Core Functionality", () => {
    it("should render PostHeader with essential elements when component is mounted", () => {
      // Given: PostHeader component is ready to render
      // When: Render PostHeader component
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      // Then: All essential elements should be rendered
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Post")).toBeInTheDocument();
    });

    it("should have proper semantic structure when rendered", () => {
      // Given: PostHeader component is ready to render
      // When: Render PostHeader component
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      // Then: Component should have proper semantic structure
      const header = screen.getByRole("banner");
      const backButton = screen.getByRole("button");
      const title = screen.getByRole("heading", { level: 1 });

      expect(header.tagName).toBe("HEADER");
      expect(backButton.tagName).toBe("BUTTON");
      expect(title.tagName).toBe("H1");
      expect(title).toHaveTextContent("Post");
    });
  });

  describe("Navigation Functionality", () => {
    it("should call router.back when back button is clicked", () => {
      // Given: PostHeader component is rendered
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");

      // When: Back button is clicked
      fireEvent.click(backButton);

      // Then: Router back function should be called
      expect(mockBack).toHaveBeenCalledTimes(1);
    });

    it("should not call other router methods when back button is clicked", () => {
      // Given: PostHeader component is rendered
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");

      // When: Back button is clicked
      fireEvent.click(backButton);

      // Then: Only back method should be called, not push or replace
      expect(mockBack).toHaveBeenCalledTimes(1);
      expect(mockPush).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it("should handle multiple back button clicks when user clicks repeatedly", () => {
      // Given: PostHeader component is rendered
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");

      // When: Back button is clicked multiple times
      fireEvent.click(backButton);
      fireEvent.click(backButton);
      fireEvent.click(backButton);

      // Then: Router back function should be called for each click
      expect(mockBack).toHaveBeenCalledTimes(3);
    });
  });

  describe("Accessibility", () => {
    it("should provide keyboard accessibility for back button when rendered", () => {
      // Given: PostHeader component is rendered
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");

      // When: Back button is focused
      backButton.focus();

      // Then: Button should be focusable
      expect(document.activeElement).toBe(backButton);
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid successive clicks on back button when user clicks quickly", () => {
      // Given: PostHeader component is rendered
      render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");

      // When: Back button is clicked rapidly
      fireEvent.click(backButton);
      fireEvent.click(backButton);
      fireEvent.click(backButton);
      fireEvent.click(backButton);
      fireEvent.click(backButton);

      // Then: All clicks should be handled
      expect(mockBack).toHaveBeenCalledTimes(5);
    });

    it("should maintain functionality after re-renders when component updates", () => {
      // Given: PostHeader component is rendered
      const { rerender } = render(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      // When: Component is re-rendered and back button is clicked
      rerender(
        <FullWrapper>
          <PostHeader />
        </FullWrapper>
      );

      const backButton = screen.getByRole("button");
      fireEvent.click(backButton);

      // Then: Router back function should still work after re-render
      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });
});
