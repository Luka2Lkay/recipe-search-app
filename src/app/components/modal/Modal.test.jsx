import { render, screen } from "@testing-library/react"
import Modal from "./Modal"
import { vi } from "vitest"

describe("Modal component", () => {
    let onClose;
    
    beforeEach(() => {
        onClose = vi.fn();
    })

    it("should render the Modal component when open", () => {

        render(<Modal isOpen={true} onClose={() => vi.fn()}>Clear Ingredients</Modal>)

        expect(screen.getByText("Clear Ingredients")).toBeInTheDocument()
    })

    it("should not render the Modal component when closed", () => {
        render(<Modal isOpen={false} onClose={() => vi.fn()}>Clear Ingredients</Modal>)
        expect(screen.queryByText("Clear Ingredients")).not.toBeInTheDocument();
    })

    it("should call onClose when clicking the overlay", () => {
        render(<Modal isOpen={true} onClose={onClose}>Modal content</Modal>)
    })
})