import Button from "../button/Button";

export default function Pagination({ handleNextPage, handlePreviousPage, hasPreviousPage, page, totalPages }) {

    return (
        <div data-testid="pagination" className="flex justify-between mt-4">

            <Button
                onButtonClick={handlePreviousPage}
                classes={`px-4 py-2 rounded ${!hasPreviousPage ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={!hasPreviousPage}
            >
                PREV
            </Button>
            <span className="text-lg font-bold">Page {page}</span>

            <Button
                onButtonClick={handleNextPage}
                classes={`px-4 py-2 min-w-16 rounded ${page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={page >= totalPages}
            >
                NEXT
            </Button>
        </div>
    );
}