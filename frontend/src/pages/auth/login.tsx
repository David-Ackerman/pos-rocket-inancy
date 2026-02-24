import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthTemplate } from "./components/auth-template";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RedirectPrompt } from "./components/redirect-prompt";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const loginMutate = await login({
        email,
        password,
      });
      if (loginMutate) {
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      console.error(error);
      toast.success("Falha ao realizar o login!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthTemplate>
      <CardContent className="p-8 space-y-8 text-gray-700">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="block text-gray-800 text-xl font-bold">
            Fazer login
          </CardTitle>
          <CardDescription className="text-gray-600">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  // type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mail@examle.com"
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label htmlFor="remember-me">Lembrar-me</Label>
                </div>
                <Button variant="link" className="" asChild>
                  <Link to="/forgot-password" className="text-sm">
                    Recuperar senha
                  </Link>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Entrar
            </Button>
          </form>
          <RedirectPrompt page="login" />
        </div>
      </CardContent>
    </AuthTemplate>
  );
}
