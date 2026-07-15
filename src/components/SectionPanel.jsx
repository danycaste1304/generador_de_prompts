export default function SectionPanel({
  number,
  title,
  description,
  children,
  defaultOpen = false,
  tone = "light",
}) {
  const toneClasses =
    tone === "soft"
      ? "border-cadir-cyan/25 bg-cadir-cyanSoft/80"
      : "border-cadir-purple/10 bg-white/95";

  return (
    <details
      open={defaultOpen}
      className={`group overflow-hidden rounded-[1.75rem] border ${toneClasses} shadow-sm transition hover:shadow-soft`}
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-5 marker:hidden">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cadir-purple text-sm font-black text-white shadow-glow">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-black text-cadir-ink">
            {title}
          </span>
          {description && (
            <span className="mt-1 block text-sm leading-6 text-slate-600">
              {description}
            </span>
          )}
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-cadir-purple transition group-open:rotate-180">
          ↓
        </span>
      </summary>
      <div className="border-t border-cadir-purple/10 px-5 pb-5 pt-4">
        {children}
      </div>
    </details>
  );
}
