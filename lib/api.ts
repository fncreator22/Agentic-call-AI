const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export async function api<T>(path: string, init?: RequestInit, fallback?: T): Promise<T> {
  try { const token = typeof window !== 'undefined' ? localStorage.getItem('svara_token') : null; const r = await fetch(`${base}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init?.headers } }); if (!r.ok) throw new Error(); return r.json(); } catch { return fallback as T; }
}
export const employees = [{id:'anaya',name:'Anaya',role:'Sales specialist',language:'Hindi · English',callsToday:36,status:'Calling'}, {id:'tara',name:'Tara',role:'Support guide',language:'Telugu · English',callsToday:24,status:'Available'}, {id:'rohan',name:'Rohan',role:'Follow-up expert',language:'Hindi · Marathi',callsToday:19,status:'Paused'}];
