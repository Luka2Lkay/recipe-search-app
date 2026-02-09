import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";
import { vi } from "vitest";

describe("Pagination component", () => {
  let handlePreviousPageMock, handleNextPageMock, hasPreviousPageMock, rerender;

  beforeEach(() => {
    handlePreviousPageMock = vi.fn();
    handleNextPageMock = vi.fn();
    hasPreviousPageMock = true;

    const { rerender: newRerender } = render(
      <Pagination
        offset={3}
        itemsPerPage={10}
        handleNextPage={handleNextPageMock}
        totalResults={100}
        handlePreviousPage={handlePreviousPageMock}
      />
    );
    rerender = newRerender;
  });

  it("should render Previous and Next buttons", () => {
    expect(screen.getByText("PREV")).toBeInTheDocument();
    expect(screen.getByText("NEXT")).toBeInTheDocument();
  });
  it("should call handleNextPage when Next button is clicked", async () => {
    const nextButton = screen.getByText("NEXT");
    await userEvent.click(nextButton);

    expect(handleNextPageMock).toHaveBeenCalled();
  });

  it("should call handlePreviousPage when Previous button is clicked", async () => {
    const previousButton = screen.getByText("PREV");
    await userEvent.click(previousButton);
    expect(handlePreviousPageMock).toHaveBeenCalled();
  });
});
