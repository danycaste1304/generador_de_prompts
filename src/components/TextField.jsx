export default function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  multiline = true,
}) {
  const sharedClasses =
    "mt-2 w-full rounded-2xl border border-cadir-purple/10 bg-white px-4 py-3 text-base text-cadir-ink outline-none transition placeholder:text-slate-400 hover:border-cadir-cyan/70 focus:border-cadir-cyan focus:ring-4 focus:ring-cadir-cyan/20";

  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-semibold text-cadir-ink">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${sharedClasses} resize-y`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={sharedClasses}
        />
      )}
    </label>
  );
}
