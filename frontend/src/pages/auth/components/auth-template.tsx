import type { ComponentProps } from "react";
import logo from "@/assets/logo.svg";
import { Card } from "@/components/ui/card";
export function AuthTemplate({ children }: ComponentProps<"div">) {
  return (
    <div className="py-12 flex flex-col items-center ">
      <header>
        <img src={logo} alt="App Logo" className="h-12 mx-auto my-8" />
      </header>
      <Card className="w-full max-w-md p-0">{children}</Card>
    </div>
  );
}
