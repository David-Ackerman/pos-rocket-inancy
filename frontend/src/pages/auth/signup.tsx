import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthTemplate } from "./components/auth-template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RedirectPrompt } from "./components/redirect-prompt";
import { useAuthStore } from "@/stores/auth";
import { useState } from "react";
import { toast } from "sonner";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = useAuthStore((state) => state.signup);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const signupMutate = await signup({
        name,
        email,
        password,
      });
      if (signupMutate) {
        toast.success("Cadastro realizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao realizar o cadastro");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthTemplate>
      <CardContent className="p-8 space-y-8 text-gray-700">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="block text-gray-800 text-xl font-bold">
            Criar conta
          </CardTitle>
          <CardDescription className="text-gray-600">
            Comece a controlar suas finanças ainda hoje
          </CardDescription>
        </CardHeader>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@examle.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-xs text-muted-foreground">
                  A senha deve ter pelo menos 8 caracteres
                </span>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || password.length < 8}
            >
              Cadastrar
            </Button>
          </form>
          <RedirectPrompt page="signup" />
        </div>
      </CardContent>
    </AuthTemplate>
  );
}
