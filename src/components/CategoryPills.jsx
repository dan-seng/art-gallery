import { useNavigate } from "react-router-dom";

export default function CategoryPills({ categories, active, basePath = "/category" }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() =>
            cat.id === "all"
              ? navigate("/")
              : navigate(`${basePath}/${cat.id}`)
          }
          className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
            active === cat.id
              ? "bg-darkroom-safelight text-darkroom-print"
              : "border border-darkroom-border bg-darkroom-surface text-darkroom-text-muted hover:border-darkroom-safelight/40 hover:text-darkroom-text"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
