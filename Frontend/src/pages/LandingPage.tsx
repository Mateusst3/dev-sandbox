import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { LandingReveal } from "../components/LandingReveal";

const features = [
  {
    title: "Conversa organizada",
    description:
      "Separe cada assunto em uma conversa. Encontre tudo rapido com o menu lateral.",
  },
  {
    title: "IA objetiva",
    description:
      "Respostas diretas e claras, com simulacao fluida para testes e demos.",
  },
  {
    title: "Perfil editavel",
    description:
      "Atualize nome e email em segundos, sem perder o historico de conversas.",
  },
];

const steps = [
  {
    title: "Crie sua conta",
    description: "Cadastro simples e rapido para comecar agora.",
  },
  {
    title: "Abra uma conversa",
    description: "Escreva sua pergunta e acompanhe a resposta da IA.",
  },
  {
    title: "Ajuste seu perfil",
    description: "Personalize sua experiencia com facilidade.",
  },
];

export function LandingPage() {
  const { session } = useAuth();

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[32px] border border-app-border bg-app-card bg-landing-hero px-6 py-14 shadow-panel dark:border-slate-800 dark:bg-slate-900 md:px-12">
        <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-app-accent/20 blur-3xl" />
        <div className="absolute -bottom-24 left-4 h-64 w-64 rounded-full bg-slate-200/70 blur-3xl dark:bg-slate-700/60" />
        <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-7">
            <LandingReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400">
                Assistente conversacional
              </p>
            </LandingReveal>
            <LandingReveal delay={100}>
              <h1 className="font-display text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                O hub de conversas que parece feito para o seu fluxo.
              </h1>
            </LandingReveal>
            <LandingReveal delay={200}>
              <p className="text-base text-slate-600 dark:text-slate-300">
                ChatDesk organiza conversas, respostas simuladas e historico em um
                painel bonito e rapido. Tudo pronto para testes, demos e suporte
                interno.
              </p>
            </LandingReveal>
            <LandingReveal delay={300}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="bg-slate-900 px-6 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  <Link to={session ? "/chat" : "/auth"}>
                    {session ? "Ir para o chat" : "Comecar agora"}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  <a href="#features">Ver recursos</a>
                </Button>
              </div>
            </LandingReveal>
            <LandingReveal delay={300}>
              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Organizado</span>
                <span>Simulado</span>
                <span>Rapido</span>
              </div>
            </LandingReveal>
          </div>
          <LandingReveal delay={200}>
            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-200 p-6 shadow-panel dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-800">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Nova conversa
                  </p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    Preciso de um resumo das tarefas do dia.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white shadow-sm dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300 dark:text-slate-500">
                    IA
                  </p>
                  <p className="mt-2 text-sm">
                    Claro! Voce tem 3 prioridades: alinhar demandas do time,
                    revisar backlog e responder feedbacks importantes.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 text-sm text-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
                  Respostas rapidas, sem perder o contexto.
                </div>
              </div>
            </div>
          </LandingReveal>
        </div>
      </section>

      <section id="features" className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Recursos
          </p>
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Tudo que voce precisa para conversas melhores.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Desenvolvido para times que querem velocidade com organizacao.
          </p>
        </div>
        <div className="grid gap-4 rounded-[28px] border border-app-border bg-white/80 bg-landing-grid bg-[length:24px_24px] p-6 dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-app-border bg-app-card p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Como funciona
          </p>
          <h2 className="font-display text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Do cadastro ao chat em poucos passos.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Uma jornada curta para voce comecar a testar seu fluxo de IA.
          </p>
        </div>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex items-start gap-4 rounded-2xl border border-app-border bg-app-card p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white sm:h-12 sm:w-12 sm:text-base dark:bg-slate-100 dark:text-slate-900">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-app-border bg-slate-900 px-6 py-12 text-white shadow-panel dark:border-slate-800 dark:bg-slate-100 dark:text-slate-900 md:px-12">
        <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold">
              Pronto para transformar suas conversas em produtividade?
            </h2>
            <p className="text-base text-slate-200 dark:text-slate-700">
              Experimente o ChatDesk e veja como e simples organizar e simular
              chats com IA.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button
              asChild
              className="bg-white text-slate-900 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <Link to={session ? "/chat" : "/auth"}>
                {session ? "Abrir painel" : "Criar conta"}
              </Link>
            </Button>
            <Button
              asChild
              className="border border-white/40 bg-white/10 text-white hover:bg-white/20 dark:border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <a href="#features">Conhecer recursos</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
