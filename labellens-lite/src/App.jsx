import { useEffect, useMemo, useState } from "react";
import ProductCard from "./components/ProductCard.jsx";
import { searchProducts, mapProduct } from "./lib/offApi.js";
import { getSafeList, toggleSafe } from "./lib/storage.js";

export default function App() {
  const [q, setQ] = useState("");
  const [raw, setRaw] = useState([]);
  const [loading, setLoading] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [nutFree, setNutFree] = useState(false);
  const [safe, setSafe] = useState(getSafeList());

  // naive debounce search
  useEffect(() => {
    const id = setTimeout(async () => {
      if (!q.trim()) { setRaw([]); return; }
      setLoading(true);
      try {
        const products = await searchProducts(q.trim(), 20);
        setRaw(products.map(mapProduct));
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(id);
  }, [q]);

  const results = useMemo(() => {
    return raw.filter(p => {
      const veganPass = veganOnly ? p.dietTags?.includes("en:vegan") : true;
      const nutPass = nutFree ? !(p.allergens || []).includes("en:nuts") : true;
      return veganPass && nutPass;
    });
  }, [raw, veganOnly, nutFree]);

  const isSaved = (id) => safe.some(x => x.id === id);
  const onToggle = (prod) => setSafe(toggleSafe(prod));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold">LabelLens Lite</h1>
        <p className="text-gray-600">Quick allergen & diet check using Open Food Facts.</p>

        <div className="mt-4 flex items-center gap-2">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search a product (e.g., corn flakes, snack bar, milk)…"
            className="w-full px-4 py-2 rounded-xl border bg-white"
          />
        </div>

        <div className="mt-3 flex gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={veganOnly} onChange={e => setVeganOnly(e.target.checked)} />
            Vegan only
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={nutFree} onChange={e => setNutFree(e.target.checked)} />
            Nut-free
          </label>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24">
        {loading && <div className="text-gray-500 mb-3">Searching…</div>}

        {(!loading && results.length === 0 && q.trim()) && (
          <div className="text-gray-500">No matches yet. Try another keyword.</div>
        )}

        <div className="grid gap-3">
          {results.map(p => (
            <ProductCard key={p.id} p={p} onToggle={onToggle} saved={isSaved(p.id)} />
          ))}
        </div>

        <section className="mt-10">
          <h2 className="font-semibold mb-2">My Safe List</h2>
          {safe.length === 0 ? (
            <div className="text-gray-500 text-sm">No saved products.</div>
          ) : (
            <div className="grid gap-3">
              {safe.map(p => (
                <ProductCard key={`safe-${p.id}`} p={p} onToggle={onToggle} saved />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        Data © Open Food Facts — Nutri-Score & NOVA are educational aids, not medical advice.
      </footer>
    </div>
  );
}
