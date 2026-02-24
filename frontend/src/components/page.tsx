import { Header } from "./header";

type PageProps = {
  children: React.ReactNode;
  page: string;
};

export function Page({ children, page }: PageProps) {
  return (
    <>
      <Header currentPage={page} />
      <div className="p-12">{children}</div>
    </>
  );
}
