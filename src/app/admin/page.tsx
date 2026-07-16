"use client";

import { useState, useEffect } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
}

interface PageView {
  path: string;
  count: number;
}

interface DailyView {
  date: string;
  count: number;
}

interface Stats {
  totalViews: number;
  uniquePaths: number;
  byPath: PageView[];
  byDate: DailyView[];
}

interface DashboardData {
  analytics: Stats;
  contacts: Contact[];
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_key");
    if (saved) {
      setApiKey(saved);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    setLoading(true);
    setError("");

    fetch("/api/analytics/stats", {
      headers: { authorization: `Bearer ${apiKey}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("No autorizado");
        return r.json();
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [authenticated, apiKey]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Eryon</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem("admin_key", apiKey);
              setAuthenticated(true);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-500 transition-colors"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => {
              localStorage.removeItem("admin_key");
              setAuthenticated(false);
            }}
            className="text-neutral-400 hover:text-white underline"
          >
            Volver a intentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Panel Eryon</h1>
          <button
            onClick={() => {
              localStorage.removeItem("admin_key");
              setAuthenticated(false);
            }}
            className="text-sm text-neutral-500 hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-2xl font-bold text-primary-400">{data.analytics.totalViews}</p>
                <p className="text-sm text-neutral-500">Vistas (30d)</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-2xl font-bold text-primary-400">{data.analytics.uniquePaths}</p>
                <p className="text-sm text-neutral-500">Páginas únicas</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-2xl font-bold text-primary-400">{data.contacts.length}</p>
                <p className="text-sm text-neutral-500">Contactos totales</p>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <p className="text-2xl font-bold text-primary-400">
                  {data.contacts.filter((c) => {
                    const d = new Date(c.createdAt);
                    return d > new Date(Date.now() - 7 * 86400000);
                  }).length}
                </p>
                <p className="text-sm text-neutral-500">Contactos (7d)</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                <h2 className="text-lg font-semibold mb-4">Vistas por Página</h2>
                <div className="space-y-2">
                  {data.analytics.byPath.slice(0, 10).map((pv) => (
                    <div key={pv.path} className="flex items-center justify-between">
                      <span className="text-sm text-neutral-400">{pv.path || "/"}</span>
                      <span className="text-sm font-medium text-primary-400">{pv.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                <h2 className="text-lg font-semibold mb-4">Vistas por Día</h2>
                <div className="space-y-2">
                  {data.analytics.byDate.slice(-14).map((dv) => (
                    <div key={dv.date} className="flex items-center justify-between">
                      <span className="text-sm text-neutral-400">
                        {new Date(dv.date).toLocaleDateString("es-MX", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-sm font-medium text-primary-400">{dv.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
              <h2 className="text-lg font-semibold mb-4">Solicitudes de Contacto</h2>
              {data.contacts.length === 0 ? (
                <p className="text-neutral-500 text-sm">Sin solicitudes aún</p>
              ) : (
                <div className="space-y-4">
                  {data.contacts
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    .slice(0, 20)
                    .map((c) => (
                      <details key={c.id} className="border border-neutral-800 rounded-lg p-4">
                        <summary className="cursor-pointer text-sm font-medium">
                          {c.name} — {c.email}
                          <span className="text-neutral-500 ml-2 font-normal">
                            {new Date(c.createdAt).toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </summary>
                        <div className="mt-3 space-y-2 text-sm text-neutral-400">
                          {c.company && <p><strong>Empresa:</strong> {c.company}</p>}
                          {c.projectType && <p><strong>Proyecto:</strong> {c.projectType}</p>}
                          {c.budget && <p><strong>Presupuesto:</strong> {c.budget}</p>}
                          {c.timeline && <p><strong>Tiempo:</strong> {c.timeline}</p>}
                          <p className="mt-2 p-3 bg-neutral-950 rounded-lg">{c.message}</p>
                        </div>
                      </details>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
