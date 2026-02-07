import Button from "../button/Button";

export default function Pagination({ handleNextPage, handlePreviousPage, itemsPerPage, offset, totalResults }) {

    return (
        <div data-testid="pagination" className="flex justify-between mt-4">

            <Button
                onButtonClick={handlePreviousPage}
                classes={`px-4 py-2 rounded ${offset === 0? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={offset === 0}
            >
                PREV
            </Button>
            <span className="text-lg font-bold">Page {Math.floor(offset / itemsPerPage) + 1}</span>

            <Button
                onButtonClick={handleNextPage}
                classes={`px-4 py-2 min-w-16 rounded ${offset + itemsPerPage >= totalResults ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                disabled={offset + itemsPerPage >= totalResults}
            >
                NEXT
            </Button>
        </div>
    );
}