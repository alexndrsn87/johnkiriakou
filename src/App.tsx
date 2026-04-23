import { useEffect, useMemo, useState } from "react";
import { Globe2, Move3D, RotateCcw, Route, Search, Sparkles, X } from "lucide-react";
import GlobeScene from "@/components/globe-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { locations, routePairs, sources, storyCategories } from "@/data/locations";

export default function App() {
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? "");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);

  const filteredLocations = useMemo(() => {
    const term = search.trim().toLowerCase();
    return locations
      .filter((location) => {
      const categoryMatch = activeCategory === "All" || location.category === activeCategory;
      const searchMatch =
        term.length === 0 ||
        location.name.toLowerCase().includes(term) ||
        location.type.toLowerCase().includes(term) ||
          location.story.toLowerCase().includes(term) ||
          location.year.toLowerCase().includes(term);
      return categoryMatch && searchMatch;
      })
      .sort((a, b) => a.order - b.order);
  }, [activeCategory, search]);

  const filteredIds = useMemo(() => new Set(filteredLocations.map((location) => location.id)), [filteredLocations]);

  const filteredRoutes = useMemo(
    () =>
      showRoutes
        ? routePairs.filter((route) => filteredIds.has(route.start.id) && filteredIds.has(route.end.id))
        : [],
    [filteredIds, showRoutes]
  );

  useEffect(() => {
    if (!filteredLocations.find((location) => location.id === selectedId) && filteredLocations[0]) {
      setSelectedId(filteredLocations[0].id);
    }
  }, [filteredLocations, selectedId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInputFocused =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (isInputFocused) {
        return;
      }

      if (event.key === "Escape") {
        setIsStoryOpen(false);
        return;
      }
      if (event.key.toLowerCase() === "n" || event.key === "ArrowRight") {
        event.preventDefault();
        selectNext();
      }
      if (event.key.toLowerCase() === "p" || event.key === "ArrowLeft") {
        event.preventDefault();
        selectPrevious();
      }
      if (event.key === "Enter" && selected) {
        event.preventDefault();
        setIsStoryOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const selected = useMemo(() => {
    return filteredLocations.find((location) => location.id === selectedId) ?? filteredLocations[0] ?? locations[0];
  }, [filteredLocations, selectedId]);

  const selectedIndex = useMemo(
    () => filteredLocations.findIndex((location) => location.id === selected?.id),
    [filteredLocations, selected?.id]
  );

  const selectNext = () => {
    if (filteredLocations.length === 0) return;
    const nextIndex = selectedIndex < filteredLocations.length - 1 ? selectedIndex + 1 : 0;
    setSelectedId(filteredLocations[nextIndex].id);
    setIsStoryOpen(true);
  };

  const selectPrevious = () => {
    if (filteredLocations.length === 0) return;
    const previousIndex = selectedIndex > 0 ? selectedIndex - 1 : filteredLocations.length - 1;
    setSelectedId(filteredLocations[previousIndex].id);
    setIsStoryOpen(true);
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

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
              Navigate an interactive global timeline with filters, keyboard shortcuts, and full-screen story mode.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">{filteredLocations.length}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Sites</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">{filteredRoutes.length}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Routes</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                <p className="text-2xl font-semibold text-cyan-300">{storyCategories.length}</p>
                <p className="text-xs uppercase tracking-wide text-zinc-400">Tracks</p>
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
              <div className="flex items-center gap-2 text-zinc-200">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                <span className="text-sm">Shortcuts: N next, P previous, Enter open, Esc close</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-zinc-500">Filter and search</p>
                <Button size="sm" variant="ghost" onClick={clearFilters}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by place, event, or story text"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 py-2 pl-9 pr-3 text-sm text-zinc-100 outline-none transition focus:border-cyan-400/40"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={activeCategory === "All" ? "default" : "outline"}
                  onClick={() => setActiveCategory("All")}
                >
                  All
                </Button>
                {storyCategories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={showRoutes ? "default" : "outline"}
                  onClick={() => setShowRoutes((current) => !current)}
                >
                  {showRoutes ? "Hide arcs" : "Show arcs"}
                </Button>
                <Button
                  size="sm"
                  variant={autoRotate ? "default" : "outline"}
                  onClick={() => setAutoRotate((current) => !current)}
                >
                  {autoRotate ? "Pause spin" : "Auto-spin"}
                </Button>
              </div>
              <p className="text-xs text-zinc-500">
                Showing {filteredLocations.length} of {locations.length} stories
              </p>
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
            <GlobeScene
              points={filteredLocations}
              routes={filteredRoutes}
              selectedId={selected?.id ?? selectedId}
              autoRotate={autoRotate}
              onSelect={(id) => {
                setSelectedId(id);
                setIsStoryOpen(true);
              }}
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-zinc-700/60 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur">
              Use mouse or touch gestures to orbit and zoom.
            </div>
          </div>
        </Card>

        <Card className="order-3">
          <CardHeader className="pb-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge>{selected?.type}</Badge>
              <Badge variant="muted">{selected?.year}</Badge>
              <Badge variant="muted">{selected?.category}</Badge>
            </div>
            <CardTitle>{selected?.name}</CardTitle>
            <p className="text-sm text-zinc-400">{selected?.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-zinc-500">Timeline</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={selectPrevious}>
                  Previous
                </Button>
                <Button size="sm" variant="outline" onClick={selectNext}>
                  Next
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[360px] pr-2">
              <div className="space-y-2">
                {filteredLocations.length === 0 ? (
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-4 text-sm text-zinc-400">
                    No stories match this filter. Clear search or choose another track.
                  </div>
                ) : null}
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => {
                      setSelectedId(location.id);
                      setIsStoryOpen(true);
                    }}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selected?.id === location.id
                        ? "border-cyan-400/50 bg-cyan-400/10"
                        : "border-zinc-800 bg-zinc-900/45 hover:border-zinc-700 hover:bg-zinc-900/70"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500">{location.year}</p>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-xs text-zinc-400">
                      {location.type} - {location.category}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
            <Button className="w-full" onClick={() => setIsStoryOpen(true)} disabled={!selected}>
              Open Selected Story
            </Button>
          </CardContent>
        </Card>
      </div>

      {isStoryOpen && selected ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-zinc-950/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-2xl border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(2,6,23,0.96),rgba(12,20,36,0.95))] p-6 shadow-[0_30px_120px_rgba(34,211,238,0.2)] [transform:perspective(1200px)_rotateX(3deg)]">
            <button
              onClick={() => setIsStoryOpen(false)}
              className="absolute right-4 top-4 rounded-md border border-zinc-700 bg-zinc-900/70 p-1 text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100"
              aria-label="Close story popup"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge>{selected.type}</Badge>
              <Badge variant="muted">{selected.year}</Badge>
              <Badge variant="muted">{selected.category}</Badge>
            </div>
            <h2 className="text-2xl font-semibold leading-tight text-zinc-100">{selected.name}</h2>
            <p className="mt-3 text-sm text-cyan-200">{selected.description}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">Timeline Position {selected.order}</p>
            <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/55 p-4">
              <p className="text-base leading-relaxed text-zinc-200">{selected.story}</p>
            </div>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={selectPrevious}>
                Previous story
              </Button>
              <Button variant="outline" onClick={selectNext}>
                Next story
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
