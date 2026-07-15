import { useMemo, useState } from "react";
import RouteSelector from "./components/RouteSelector.jsx";
import TextField from "./components/TextField.jsx";
import PromptOutput from "./components/PromptOutput.jsx";
import SectionPanel from "./components/SectionPanel.jsx";
import FlowSteps from "./components/FlowSteps.jsx";
import { routes } from "./data/routes.js";
import { buildPrompt, getAllRouteFields } from "./utils/promptBuilder.js";
import { buildPrefillFromUrl } from "./utils/prefill.js";

const initialBaseData = {
  name: "",
  age: "",
  formDate: "",
  supportProfessional: "",
  skills: "",
  interests: "",
  experience: "",
  supports: "",
  currentGoal: "",
  finalAudience: "",
  finalUse: "",
  desiredTone: "",
  desiredLength: "",
  mustInclude: "",
  mustAvoid: "",
  internalContext: "",
};

const baseFields = [
  {
    name: "name",
    label: "Nombre",
    placeholder: "Ejemplo: Ana",
    multiline: false,
  },
  {
    name: "age",
    label: "Edad",
    placeholder: "Ejemplo: 28",
    multiline: false,
  },
  {
    name: "formDate",
    label: "Fecha de la ficha",
    placeholder: "Ejemplo: 15/07/2026",
    multiline: false,
  },
  {
    name: "supportProfessional",
    label: "Persona de apoyo o profesional, si aplica",
    placeholder: "Ejemplo: orientadora laboral, tutor/a, profesional CADIR...",
    multiline: false,
  },
  {
    name: "skills",
    label: "Habilidades principales",
    placeholder: "Ejemplo: trato amable, puntualidad, orden, trabajo en equipo...",
  },
  {
    name: "interests",
    label: "Intereses",
    placeholder: "Ejemplo: cocina, animales, informática, atención al público...",
  },
  {
    name: "experience",
    label: "Experiencia previa",
    placeholder: "Ejemplo: prácticas, voluntariado, trabajos anteriores, tareas en casa...",
  },
  {
    name: "supports",
    label: "Forma de trabajar o condiciones que ayudan, si aplica",
    placeholder: "Ejemplo: instrucciones claras, organización, ambiente tranquilo, horarios definidos...",
  },
  {
    name: "currentGoal",
    label: "Objetivo actual",
    placeholder: "Ejemplo: encontrar un primer empleo, mejorar mi presentación, iniciar una idea...",
  },
];

const personalizationFields = [
  {
    name: "finalAudience",
    label: "Quién leerá o escuchará el resultado",
    placeholder: "Ejemplo: empresa, compañeros de taller, clientes, redes sociales...",
  },
  {
    name: "finalUse",
    label: "Uso final del material",
    placeholder: "Ejemplo: CV, entrevista, taller, cartel, Facebook, presentación oral...",
  },
  {
    name: "desiredTone",
    label: "Tono deseado",
    placeholder: "Ejemplo: profesional, cercano, tranquilo, motivador, directo...",
  },
  {
    name: "desiredLength",
    label: "Extensión preferida",
    placeholder: "Ejemplo: muy breve, 1 minuto, media página, 3 publicaciones...",
  },
  {
    name: "mustInclude",
    label: "Datos o ideas que sí deben aparecer",
    placeholder: "Ejemplo: disponibilidad de mañanas, precio de 10 €, interés por cocina...",
  },
  {
    name: "mustAvoid",
    label: "Datos, palabras o enfoques que debe evitar",
    placeholder: "Ejemplo: no mencionar diagnóstico, no sonar infantil, no hablar de CADIR...",
  },
  {
    name: "internalContext",
    label: "Contexto interno para orientar el tono, sin mencionarlo",
    placeholder: "Ejemplo: situación de exclusión social, baja confianza, necesita practicar seguridad...",
  },
];

const createRouteData = () =>
  Object.values(routes).reduce((accumulator, route) => {
    getAllRouteFields(route).forEach((field) => {
      accumulator[field.name] = "";
    });
    return accumulator;
  }, {});

export default function App() {
  const prefill = useMemo(
    () =>
      buildPrefillFromUrl(
        typeof window === "undefined" ? "" : window.location.search,
      ),
    [],
  );
  const [baseData, setBaseData] = useState(() => ({
    ...initialBaseData,
    ...prefill.baseData,
  }));
  const [selectedRoute, setSelectedRoute] = useState(
    prefill.selectedRoute || "empleo",
  );
  const [routeData, setRouteData] = useState(() => ({
    ...createRouteData(),
    ...prefill.routeData,
  }));
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const activeRoute = routes[selectedRoute];

  const completedFields = useMemo(() => {
    const baseCompleted = Object.values(baseData).filter(
      (value) => value.trim().length > 0,
    ).length;
    const routeCompleted = activeRoute.additionalFields.filter(
      (field) => routeData[field.name]?.trim().length > 0,
    ).length;
    const supportCompleted = (activeRoute.supportFields || []).filter(
      (field) => routeData[field.name]?.trim().length > 0,
    ).length;

    return {
      completed: baseCompleted + routeCompleted + supportCompleted,
    };
  }, [activeRoute, baseData, routeData]);

  const updateBaseField = (name, value) => {
    setBaseData((current) => ({ ...current, [name]: value }));
    setCopied(false);
  };

  const updateRouteField = (name, value) => {
    setRouteData((current) => ({ ...current, [name]: value }));
    setCopied(false);
  };

  const handleGeneratePrompt = () => {
    const nextPrompt = buildPrompt({ baseData, selectedRoute, routeData });
    setPrompt(nextPrompt);
    setCopied(false);
  };

  const handleCopyPrompt = async () => {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(114,196,218,0.35),_transparent_28rem),linear-gradient(135deg,_#583D82_0%,_#422A66_42%,_#ffffff_42%,_#ffffff_100%)] px-4 py-8 text-cadir-ink sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-[2.25rem] bg-white shadow-soft">
          <div className="grid gap-8 p-6 md:grid-cols-[1.35fr_0.65fr] md:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cadir-purple text-3xl font-black text-cadir-cyan shadow-glow"
                  aria-hidden="true"
                >
                  C
                </div>
                <p className="inline-flex items-center rounded-full bg-cadir-lavender px-4 py-2 text-sm font-black text-cadir-purple">
                  🌉 Puente Laboral CADIR
                </p>
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-tight text-cadir-purple sm:text-5xl">
                Generador guiado de prompts con IA
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                Completa la información esencial, abre solo las secciones que
                necesites y genera un prompt personalizado para materiales
                laborales, personales o de emprendimiento.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-cadir-cyanSoft px-4 py-2 text-sm font-bold text-cadir-purple">
                  Sin API de IA
                </span>
                <span className="rounded-full bg-cadir-cyanSoft px-4 py-2 text-sm font-bold text-cadir-purple">
                  Listo para copiar
                </span>
                <span className="rounded-full bg-cadir-cyanSoft px-4 py-2 text-sm font-bold text-cadir-purple">
                  Revisado por CADIR
                </span>
              </div>
            </div>
            <aside className="rounded-[2rem] bg-cadir-purple p-6 text-white shadow-glow">
              <p className="text-4xl" aria-hidden="true">
                ✨
              </p>
              <p className="mt-4 text-lg font-black">Uso responsable</p>
              <p className="mt-2 leading-7 text-white/90">
                El resultado generado por IA siempre debe ser revisado con apoyo
                de CADIR antes de utilizarse.
              </p>
            </aside>
          </div>
        </header>

        <FlowSteps />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2.25rem] bg-white/95 p-4 shadow-soft backdrop-blur sm:p-6">
            <div className="mb-6 flex flex-col gap-3 border-b border-cadir-purple/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cadir-cyan">
                  Formulario guiado
                </p>
                <h2 className="mt-2 text-2xl font-black text-cadir-purple">
                  Información para personalizar
                </h2>
              </div>
              <p className="rounded-full bg-cadir-lavender px-4 py-2 text-sm font-black text-cadir-purple">
                {completedFields.completed} campos con datos
              </p>
            </div>

            {prefill.hasPrefill && (
              <div className="mb-5 rounded-[1.5rem] border border-cadir-cyan/30 bg-cadir-cyanSoft p-4 text-sm leading-6 text-cadir-ink">
                <p className="font-black text-cadir-purple">
                  Ficha inicial cargada automáticamente
                </p>
                <p className="mt-1">
                  Revisa los datos, completa solo lo que falte y genera el
                  prompt de la ruta seleccionada.
                </p>
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                handleGeneratePrompt();
              }}
            >
              <SectionPanel
                number="1"
                title="Información básica"
                description="Lo mínimo para que el prompt tenga contexto real sobre la persona."
                defaultOpen
              >
                <fieldset>
                  <legend className="sr-only">Información básica</legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    {baseFields.map((field) => (
                      <TextField
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        value={baseData[field.name]}
                        onChange={(value) => updateBaseField(field.name, value)}
                        placeholder={field.placeholder}
                        multiline={field.multiline}
                      />
                    ))}
                  </div>
                </fieldset>
              </SectionPanel>

              <SectionPanel
                number="2"
                title="Personalización del resultado"
                description="Opcional: tono, público, uso final y límites para que la IA no se vaya por libre."
                tone="soft"
              >
                <fieldset>
                  <legend className="sr-only">
                    Personalización del resultado
                  </legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    {personalizationFields.map((field) => (
                      <TextField
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        value={baseData[field.name]}
                        onChange={(value) => updateBaseField(field.name, value)}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>
                </fieldset>
              </SectionPanel>

              <div className="rounded-[1.75rem] border border-cadir-purple/10 bg-white p-5 shadow-sm">
                <RouteSelector
                  selectedRoute={selectedRoute}
                  onSelect={(routeId) => {
                    setSelectedRoute(routeId);
                    setCopied(false);
                  }}
                />
              </div>

              <SectionPanel
                number="4"
                title={`Detalles para “${activeRoute.title}”`}
                description="Campos principales de la ruta seleccionada."
                defaultOpen
              >
                <fieldset>
                  <legend className="sr-only">
                    Detalles para {activeRoute.title}
                  </legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeRoute.additionalFields.map((field) => (
                      <TextField
                        key={field.name}
                        id={field.name}
                        label={field.label}
                        value={routeData[field.name]}
                        onChange={(value) => updateRouteField(field.name, value)}
                        placeholder={field.placeholder}
                      />
                    ))}
                  </div>
                </fieldset>
              </SectionPanel>

              {activeRoute.supportFields?.length > 0 && (
                <SectionPanel
                  number="5"
                  title={activeRoute.supportFieldsTitle}
                  description="Opcional: ayuda a evitar huecos como teléfono, ciudad, fechas, lugar o modo de contacto."
                >
                  <fieldset>
                    <legend className="sr-only">
                      {activeRoute.supportFieldsTitle}
                    </legend>
                    <div className="grid gap-4 md:grid-cols-2">
                      {activeRoute.supportFields.map((field) => (
                        <TextField
                          key={field.name}
                          id={field.name}
                          label={field.label}
                          value={routeData[field.name]}
                          onChange={(value) =>
                            updateRouteField(field.name, value)
                          }
                          placeholder={field.placeholder}
                          multiline={field.multiline}
                        />
                      ))}
                    </div>
                  </fieldset>
                </SectionPanel>
              )}

              <div className="rounded-[1.75rem] bg-cadir-lavender p-5">
                <p className="font-black text-cadir-purple">
                  Nota visible para CADIR
                </p>
                <p className="mt-2 leading-7 text-slate-700">
                  El texto final que genere ChatGPT, Gemini o Claude debe
                  revisarse con una persona de CADIR antes de usarse en un CV,
                  entrevista, red social, presentación o material comercial.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-cadir-cyan px-6 py-4 text-lg font-black text-cadir-ink shadow-glow transition hover:bg-cadir-purple hover:text-white focus:outline-none focus:ring-4 focus:ring-cadir-cyan/30"
              >
                Generar prompt ✨
              </button>
            </form>
          </section>

          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <PromptOutput
              prompt={prompt}
              copied={copied}
              onCopy={handleCopyPrompt}
            />

            <section className="rounded-[2rem] bg-white p-5 shadow-soft">
              <h2 className="text-xl font-black text-cadir-purple">
                ¿Cómo usarlo?
              </h2>
              <ol className="mt-4 space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="font-black text-cadir-cyan">1.</span>
                  Completa primero la información básica.
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-cadir-cyan">2.</span>
                  Abre las secciones opcionales solo si quieres afinar más.
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-cadir-cyan">3.</span>
                  Genera y copia el prompt.
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-cadir-cyan">4.</span>
                  Pégalo en ChatGPT, Gemini o Claude y revisa el resultado con
                  CADIR.
                </li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
