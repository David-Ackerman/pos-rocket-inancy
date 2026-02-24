import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  // if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between border-t px-4 py-3 w-full">
      {/* Left side */}
      <span className="text-sm text-gray-700">
        {totalItems === 0
          ? "0 resultados"
          : `${startItem} a ${endItem} | ${totalItems} resultados`}
      </span>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "default" : "ghost"}
              className="w-8 h-8 p-0"
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          );
        })}

        <Button
          size="icon"
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
