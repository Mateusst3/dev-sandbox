import { useEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const profileSchema = z.object({
  name: z.string().min(2, "Informe o nome"),
  email: z.string().email("Email invalido"),
});

export function ProfilePage() {
  const { session, refreshProfile, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      setForm({ name: session.user.name, email: session.user.email });
    }
  }, [session]);

  useEffect(() => {
    refreshProfile().catch(() => undefined);
  }, [refreshProfile]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const result = profileSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Dados invalidos");
      return;
    }
    setLoading(true);
    try {
      await updateProfile(result.data);
      setMessage("Dados atualizados com sucesso.");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Atualize seu nome e email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="profile-name">Nome</Label>
            <Input
              id="profile-name"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-email">Email</Label>
            <Input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {message ? (
            <p className="text-sm text-emerald-600">{message}</p>
          ) : null}
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar alteracoes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
