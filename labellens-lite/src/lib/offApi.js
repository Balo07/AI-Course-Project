const BASE = "https://world.openfoodfacts.org/cgi/search.pl";

// Simple text search using v1 (free text, no key)
export async function searchProducts(q, pageSize = 20) {
  if (!q?.trim()) return [];
  const url = `${BASE}?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.products) ? data.products : [];
}

// Map to fields the UI cares about, with safe fallbacks
export function mapProduct(p) {
  return {
    id: p.code ?? (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random())),
    name: p.product_name || "Unnamed product",
    brand: p.brands || "—",
    image: p.image_front_small_url || p.image_small_url || p.image_url || "",
    nutriscore: (p.nutriscore_grade || p.nutrition_grades)?.toUpperCase?.() || "—",
    nova: p.nova_group || p.nova_groups || "—",
    allergens: p.allergens_tags || [],
    dietTags: p.ingredients_analysis_tags || [], // e.g., ["en:vegan","en:vegetarian","en:palm-oil-free"]
    raw: p,
  };
}
