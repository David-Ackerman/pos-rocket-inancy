import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const REDIRECT_PROMPTS = {
  login: {
    message: "Ainda não tem uma conta?",
    buttonText: "Criar conta",
    to: "/signup",
    icon: <UserPlus className="size-4" />,
  },
  signup: {
    message: "Já tem uma conta?",
    buttonText: "Fazer login",
    to: "/login",
    icon: <LogIn className="size-4" />,
  },
};

export function RedirectPrompt({ page }: { page: "login" | "signup" }) {
  const prompt = REDIRECT_PROMPTS[page];
  return (
    <>
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">{prompt.message}</p>

        {/* Signup button */}
        <Button variant="outline" size="default" className="w-full p-0">
          <Link
            to={prompt.to}
            className="flex items-center gap-2 w-full justify-center"
          >
            {prompt.icon}
            <span>{prompt.buttonText}</span>
          </Link>
        </Button>
      </div>
    </>
  );
}
