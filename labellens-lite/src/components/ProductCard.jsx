export default function ProductCard({ p, onToggle, saved }) {
  const vegan = p.dietTags?.includes("en:vegan");
  const vegetarian = p.dietTags?.includes("en:vegetarian");
  const palmFree = p.dietTags?.includes("en:palm-oil-free");
  const hasNuts = p.allergens?.includes("en:nuts");

  return (
    <div className="rounded-2xl border p-4 flex gap-4 shadow-sm bg-white">
      {p.image ? (
        <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-xl" />
      ) : (
        <div className="w-20 h-20 rounded-xl bg-gray-100" />
      )}

      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{p.name}</div>
        <div className="text-sm text-gray-500 truncate">{p.brand}</div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="badge">Nutri-Score: {p.nutriscore}</span>
          <span className="badge">NOVA: {p.nova}</span>
          {vegan && <span className="badge border-green-500">Vegan</span>}
          {vegetarian && <span className="badge border-emerald-500">Vegetarian</span>}
          {palmFree && <span className="badge border-amber-500">Palm-oil-free</span>}
          {hasNuts && <span className="badge border-red-500">Contains nuts</span>}
        </div>

        {p.allergens?.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            Allergens: {p.allergens.map(a => a.replace("en:", "")).join(", ")}
          </div>
        )}

        <div className="mt-3">
          <button
            onClick={() => onToggle(p)}
            className={\`px-3 py-1.5 rounded-xl text-sm \${saved ? "bg-gray-900 text-white" : "bg-gray-100 hover:bg-gray-200"}\`}
          >
            {saved ? "Remove from Safe List" : "Save to Safe List"}
          </button>
        </div>
      </div>
    </div>
  );
}
