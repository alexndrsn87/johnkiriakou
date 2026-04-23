import { useMemo, useState } from "react";
import { Globe2, Move3D, Route } from "lucide-react";
import GlobeScene from "@/components/globe-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { locations, routePairs, sources } from "@/data/locations";

export default function App() {
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? "");
  const selected = useMemo(
    () => locations.find((location) => location.id === selectedId) ?? locations[0],
    [selectedId]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.15),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(14,116,144,0.18),transparent_42%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 gap-4 p-4 lg:grid-cols-[380px_1fr_360px]">
        <Card className="order-2 lg:order-1">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold leading-tight">
              Every location tells <span className="text-cyan-300">part of the story.</span>
            </CardTitle>
            <p className="text-sm text-zinc-400">
              Navigate a high-fidelity global route map of key moments connected to John Kiriakou&apos;s life and public record.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">{locations.length}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Sites</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">{routePairs.length}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Routes</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">6</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Regions</p>
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/45 p-4">
              <div className="flex items-center gap-2 text-zinc-200">
                <Move3D className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Drag to rotate, zoom, and tilt</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Route className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Route arcs connect each timeline event</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-200">
                <Globe2 className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Click markers to update event details</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-wide text-zinc-500">Sources</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a className="text-cyan-300 hover:text-cyan-200" href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="order-1 overflow-hidden lg:order-2">
          <div className="relative h-[58vh] min-h-[560px] w-full lg:h-[calc(100vh-2rem)]">
            <GlobeScene points={locations} selectedId={selectedId} onSelect={setSelectedId} />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-zinc-700/60 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur">
              Use mouse or touch gestures to orbit and zoom.
            </div>
          </div>
        </Card>

        <Card className="order-3">
          <CardHeader className="pb-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge>{selected.type}</Badge>
              <Badge variant="muted">{selected.year}</Badge>
            </div>
            <CardTitle>{selected.name}</CardTitle>
            <p className="text-sm text-zinc-400">{selected.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Timeline</p>
            <ScrollArea className="h-[360px] pr-2">
              <div className="space-y-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedId(location.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selectedId === location.id
                        ? "border-cyan-400/50 bg-cyan-400/10"
                        : "border-zinc-800 bg-zinc-900/45 hover:border-zinc-700 hover:bg-zinc-900/70"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500">{location.year}</p>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-xs text-zinc-400">{location.type}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>
            <Button asChild className="w-full">
              <a href={sources[0].url} target="_blank" rel="noreferrer">
                Read Primary Source Profile
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
