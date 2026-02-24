import { Car, ChevronRight } from "lucide-react";

export function TransactionItem() {
  return (
    <div className="flex items-center justify-between h-20">
      <div className="py-4 px6 flex items-center gap-4">
        <Car className="text-gray-500 size-5" />
        <div>
          <h3 className="text-sm font-medium">Aluguel</h3>
          <p className="text-xs text-gray-500">Moradia</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-red-base">R$ 1.500,00</span>
        <ChevronRight className="text-gray-500 size-5" />
      </div>
    </div>
  );
}
