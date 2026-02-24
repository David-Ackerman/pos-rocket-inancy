import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

type HeaderProps = {
  currentPage: string;
};

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="bg-white text-gray-600 py-4 px-12 flex items-center justify-between border-b border-b-gray-200">
      <Link to="/">
        <img src={logo} alt="Financy" className="h-6" />
      </Link>
      <nav>
        <ul className="flex items-center gap-5">
          <li>
            <Link
              to="/"
              data-current={currentPage === "dashboard" ? "true" : undefined}
              className="data-[current=true]:text-primary data-[current=true]:font-semibold hover:text-primary"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              data-current={currentPage === "transactions" ? "true" : undefined}
              className="data-[current=true]:text-primary data-[current=true]:font-semibold hover:text-primary"
            >
              Transações
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              data-current={currentPage === "categories" ? "true" : undefined}
              className="data-[current=true]:text-primary data-[current=true]:font-semibold hover:text-primary"
            >
              Categorias
            </Link>
          </li>
        </ul>
      </nav>
      <div className="size-9 bg-gray-300 flex items-center justify-center rounded-full">
        CT
      </div>
    </header>
  );
}
