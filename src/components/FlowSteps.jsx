const steps = [
  {
    number: "1",
    title: "Ficha",
    text: "Carga o revisa los datos base.",
  },
  {
    number: "2",
    title: "Ruta",
    text: "Elige empleo, presentación o emprendimiento.",
  },
  {
    number: "3",
    title: "Prompt",
    text: "Genera el texto listo para copiar.",
  },
  {
    number: "4",
    title: "Plantilla",
    text: "Pega, revisa y completa el material.",
  },
];

export default function FlowSteps() {
  return (
    <section
      aria-label="Flujo de trabajo"
      className="mt-6 rounded-[2rem] border border-white/60 bg-white/90 p-4 shadow-soft backdrop-blur"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-3 rounded-[1.5rem] bg-cadir-lavender/70 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-cadir-purple text-sm font-black text-white">
              {step.number}
            </span>
            <span>
              <span className="block font-black text-cadir-purple">
                {step.title}
              </span>
              <span className="mt-1 block text-sm leading-5 text-slate-600">
                {step.text}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
