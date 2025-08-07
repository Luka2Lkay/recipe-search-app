import Button from "../button/Button";

export default function Pagination({ nextPageUrl, handleNextPage, handlePreviousPage, hasPreviousPage, page }) {

    return (
        <div data-testid="pagination" className="flex justify-between mt-4">

            <Button
                onButtonClick={handlePreviousPage}
                classes={`px-4 py-2 rounded ${!hasPreviousPage ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={!hasPreviousPage}
            >
                Previous
            </Button>
            <span className="text-lg font-bold">Page {page}</span>

            <Button
                onButtonClick={handleNextPage}
                classes={`p-2 rounded ${!nextPageUrl ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={!nextPageUrl}
            >
                Next
            </Button>
        </div>
    );
}