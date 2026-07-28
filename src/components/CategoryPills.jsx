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
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            active === cat.id
              ? "bg-gallery-gold text-gallery-black"
              : "border border-gallery-border bg-gallery-surface text-gallery-text-muted hover:border-gallery-gold/30 hover:text-gallery-text"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
