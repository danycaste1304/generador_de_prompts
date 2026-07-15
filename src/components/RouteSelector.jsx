export default function RouteSelector({ routeOptions, selectedRoute, onSelect }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-lg font-black text-cadir-ink">
        3. Elige una ruta
      </legend>
      <div className="grid gap-3 md:grid-cols-3">
        {routeOptions.map((route) => {
          const isSelected = route.id === selectedRoute;

          return (
            <label
              key={route.id}
              className={`cursor-pointer rounded-3xl border p-4 transition ${
                isSelected
                  ? "border-cadir-cyan bg-cadir-cyanSoft shadow-glow ring-4 ring-cadir-cyan/20"
                  : "border-cadir-purple/10 bg-white hover:border-cadir-cyan/70 hover:bg-cadir-lavender"
              }`}
            >
              <input
                type="radio"
                name="route"
                value={route.id}
                checked={isSelected}
                onChange={() => onSelect(route.id)}
                className="sr-only"
              />
              <span className="text-2xl" aria-hidden="true">
                {route.emoji}
              </span>
              <span className="mt-3 block font-bold text-cadir-ink">
                {route.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-600">
                {route.description}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
