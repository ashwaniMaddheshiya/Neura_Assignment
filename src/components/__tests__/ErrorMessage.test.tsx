import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

vi.mock("../../assets/icons", () => ({
  ErrorCircleIcon: (props: any) => <svg data-testid="error-icon" {...props} />,
}));

describe("ErrorMessage", () => {
  it("renders the error message", () => {
    render(<ErrorMessage message="Test error" />);

    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(
      screen.getByText("Please try again or check your connection.")
    ).toBeInTheDocument();
  });

  it("renders the error icon", () => {
    render(<ErrorMessage message="Test error" />);
    const icon = screen.getByTestId("error-icon");
    expect(icon).toBeInTheDocument();
  });

  it('does not render "Try Again" button if onRetry is not provided', () => {
    render(<ErrorMessage message="Test error" />);
    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });

  it('renders "Try Again" button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={onRetry} />);

    const button = screen.getByText("Try Again");
    expect(button).toBeInTheDocument();
  });

  it('calls onRetry when "Try Again" button is clicked', () => {
    const onRetry = vi.fn();
    render(<ErrorMessage message="Test error" onRetry={onRetry} />);

    const button = screen.getByText("Try Again");
    fireEvent.click(button);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
