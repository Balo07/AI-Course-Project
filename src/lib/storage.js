const KEY = "labellens:safe";

export function getSafeList() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
export function saveSafeList(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export function toggleSafe(prod) {
  const list = getSafeList();
  const exists = list.find(x => x.id === prod.id);
  const next = exists ? list.filter(x => x.id !== prod.id) : [...list, prod];
  saveSafeList(next);
  return next;
}
