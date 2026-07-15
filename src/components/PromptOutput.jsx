const aiTools = [
  {
    name: "ChatGPT",
    url: "https://chat.openai.com/",
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/",
  },
  {
    name: "Claude",
    url: "https://claude.ai/",
  },
];

export default function PromptOutput({ prompt, copied, onCopy }) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-cadir-purple text-white shadow-soft">
      <div className="bg-[radial-gradient(circle_at_top_right,_rgba(114,196,218,0.35),_transparent_16rem)] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cadir-cyan">
            Prompt generado
          </p>
          <h2 className="mt-2 text-2xl font-bold">Listo para copiar</h2>
        </div>
        <button
          type="button"
          onClick={onCopy}
          disabled={!prompt}
          className="rounded-full bg-white px-5 py-3 font-bold text-cadir-purple transition hover:bg-cadir-cyan hover:text-cadir-ink focus:outline-none focus:ring-4 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Copiar prompt
        </button>
      </div>

      {copied && (
        <p
          className="mt-4 rounded-2xl bg-cadir-cyan px-4 py-3 text-sm font-semibold text-cadir-ink"
          role="status"
        >
          ✅ Prompt copiado al portapapeles.
        </p>
      )}

      {!prompt && (
        <div className="mt-5 rounded-3xl border border-white/15 bg-white/10 p-5">
          <p className="font-black text-cadir-cyan">
            Aquí aparecerá el prompt personalizado
          </p>
          <p className="mt-2 text-sm leading-6 text-white/85">
            Cuando completes la ficha y elijas una ruta, este panel generará el
            texto listo para pegar en ChatGPT, Gemini o Claude.
          </p>
          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            <span className="rounded-2xl bg-white/10 px-3 py-2">
              Estructura exacta
            </span>
            <span className="rounded-2xl bg-white/10 px-3 py-2">
              Sin inventar datos
            </span>
            <span className="rounded-2xl bg-white/10 px-3 py-2">
              Listo para copiar
            </span>
          </div>
        </div>
      )}

      <textarea
        value={prompt}
        readOnly
        rows={prompt ? 18 : 10}
        aria-label="Prompt personalizado generado"
        className="mt-5 w-full resize-y rounded-3xl border border-white/10 bg-white/95 p-4 font-mono text-sm leading-6 text-cadir-ink outline-none focus:ring-4 focus:ring-white/30"
        placeholder="Completa la información y pulsa “Generar prompt”."
      />

      {prompt && (
        <div className="mt-5 rounded-3xl border border-white/15 bg-white/10 p-4">
          <p className="text-sm font-bold text-cadir-cyan">
            Después de copiarlo, abre una herramienta de IA:
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {aiTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-4 py-3 text-center text-sm font-black text-cadir-purple transition hover:bg-cadir-cyan hover:text-cadir-ink focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Abrir {tool.name}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs leading-5 text-white/75">
            Por privacidad, el prompt no se envía automáticamente. Cópialo y
            pégalo manualmente en la herramienta elegida.
          </p>
        </div>
      )}
      </div>
    </section>
  );
}
