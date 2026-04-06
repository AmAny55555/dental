import { PatientDetailsPage } from '@/components/patients/patient-details-page';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'https://dental.hatly.shop/backend/public/api';

/**
 * `output: "export"` creates one HTML file per returned param. There is no server to
 * render arbitrary `/patients/:id` on demand, so missing ids return 404 from the host.
 *
 * The patients API is protected, so build-time `fetch(/patients)` is usually 401; we
 * still merge IDs when the request succeeds. Numeric slots 1..MAX cover the rest.
 * Raise NEXT_STATIC_PATIENT_ID_MAX if you need higher ids without rebuilding.
 */
export async function generateStaticParams() {
  const cap = Math.min(
    50_000,
    Math.max(
      1,
      Number(process.env.NEXT_STATIC_PATIENT_ID_MAX ?? '2000'),
    ),
  );

  const ids = new Set<string>();
  for (let i = 1; i <= cap; i += 1) {
    ids.add(String(i));
  }

  try {
    const res = await fetch(`${API_BASE}/patients`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      const result = await res.json();
      const list = Array.isArray(result) ? result : result?.data ?? [];
      if (Array.isArray(list)) {
        for (const p of list) {
          if (p && typeof p === 'object' && 'id' in p) {
            ids.add(String((p as { id: number | string }).id));
          }
        }
      }
    }
  } catch {
    // keep numeric range only
  }

  return Array.from(ids, (id) => ({ id }));
}

export default function Page() {
  return <PatientDetailsPage />;
}
