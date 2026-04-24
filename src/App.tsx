import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Move3D, RotateCcw, Route, Search, Sparkles, X } from "lucide-react";
import GlobeScene from "@/components/globe-scene";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { locations, routePairs, sources, storyCategories, type LocationPoint } from "@/data/locations";

type InteractionMode = "idle" | "selected" | "reading";
type TimelineDensity = "all" | "major" | "filtered";
type DecoratedLocation = LocationPoint & {
  yearValue: number;
  era: string;
  importance: number;
  isMajor: boolean;
};

export default function App() {
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? "");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyExpanded, setStoryExpanded] = useState(false);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("idle");
  const [autoSpinEnabled, setAutoSpinEnabled] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [hoveredTimelineId, setHoveredTimelineId] = useState<string | null>(null);
  const [timelineDensity, setTimelineDensity] = useState<TimelineDensity>("all");
  const [activeEra, setActiveEra] = useState<string>("All");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const enrichedLocations = useMemo<DecoratedLocation[]>(
    () =>
      locations
        .map((location) => {
          const parsedYear = location.year.match(/(19|20)\d{2}/)?.[0];
          const yearValue = parsedYear ? Number(parsedYear) : 1980 + Math.round(location.order);
          const decade = Math.floor(yearValue / 10) * 10;
          return {
            ...location,
            yearValue,
            era: location.era ?? `${decade}s`,
            importance: location.importance ?? (location.order % 1 === 0 ? 4 : 2),
            isMajor: location.isMajor ?? (location.importance ?? (location.order % 1 === 0 ? 4 : 2)) >= 4,
          };
        })
        .sort((a, b) => a.order - b.order),
    []
  );

  const eras = useMemo(
    () => ["All", ...Array.from(new Set(enrichedLocations.map((location) => location.era)))],
    [enrichedLocations]
  );

  const filteredLocations = useMemo(() => {
    const term = search.trim().toLowerCase();
    return enrichedLocations.filter((location) => {
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(location.category);
      const eraMatch = activeEra === "All" || location.era === activeEra;
      const searchMatch =
        !term ||
        [location.name, location.type, location.story, location.year, location.category, location.description]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return categoryMatch && eraMatch && searchMatch;
    });
  }, [activeCategories, activeEra, enrichedLocations, search]);

  const timelineLocations = useMemo(() => {
    if (timelineDensity === "major") {
      const major = filteredLocations.filter((location) => location.isMajor);
      return major.length ? major : filteredLocations;
    }
    return filteredLocations;
  }, [filteredLocations, timelineDensity]);

  const filteredIds = useMemo(() => new Set(timelineLocations.map((location) => location.id)), [timelineLocations]);
  const filteredRoutes = useMemo(
    () => (showRoutes ? routePairs.filter((route) => filteredIds.has(route.start.id) && filteredIds.has(route.end.id)) : []),
    [filteredIds, showRoutes]
  );

  const selected = useMemo(
    () => timelineLocations.find((location) => location.id === selectedId) ?? timelineLocations[0] ?? enrichedLocations[0],
    [enrichedLocations, selectedId, timelineLocations]
  );

  useEffect(() => {
    if (timelineLocations.length === 0) return;
    if (!timelineLocations.some((location) => location.id === selectedId)) {
      setSelectedId(timelineLocations[0].id);
      setInteractionMode("selected");
    }
  }, [timelineLocations, selectedId]);

  const selectedIndex = useMemo(
    () => timelineLocations.findIndex((location) => location.id === selected?.id),
    [selected?.id, timelineLocations]
  );

  const selectLocation = (id: string, mode: InteractionMode = "selected") => {
    setSelectedId(id);
    setIsStoryOpen(true);
    setInteractionMode(mode);
  };

  const selectNext = () => {
    if (timelineLocations.length === 0) return;
    const nextIndex = selectedIndex < timelineLocations.length - 1 ? selectedIndex + 1 : 0;
    selectLocation(timelineLocations[nextIndex].id, "reading");
  };

  const selectPrevious = () => {
    if (timelineLocations.length === 0) return;
    const previousIndex = selectedIndex > 0 ? selectedIndex - 1 : timelineLocations.length - 1;
    selectLocation(timelineLocations[previousIndex].id, "reading");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isInputFocused = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if (isInputFocused) return;
      if (event.key === "Escape") {
        setIsStoryOpen(false);
        setStoryExpanded(false);
        if (selected) setInteractionMode("selected");
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
        setInteractionMode("reading");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const clearFilters = () => {
    setSearch("");
    setActiveCategories([]);
    setActiveEra("All");
    setTimelineDensity("all");
  };

  const toggleCategory = (category: string) => {
    setActiveCategories((current) =>
      current.includes(category) ? current.filter((entry) => entry !== category) : [...current, category]
    );
  };

  const jumpToEra = (era: string) => {
    setActiveEra(era);
    const target = (era === "All" ? filteredLocations : filteredLocations.filter((location) => location.era === era))[0];
    if (target) {
      selectLocation(target.id, "selected");
    }
  };

  const highlightText = (text: string) => {
    const query = search.trim();
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "ig");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={`${part}-${index}`} className="rounded-sm bg-cyan-300/25 px-0.5 text-zinc-100">
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      )
    );
  };

  const timelineDots = useMemo(() => {
    if (timelineLocations.length === 0) return [];
    const minYear = Math.min(...timelineLocations.map((item) => item.yearValue));
    const maxYear = Math.max(...timelineLocations.map((item) => item.yearValue));
    const range = Math.max(1, maxYear - minYear);
    const minGap = 1.75;
    const raw = timelineLocations.map((item) => ({
      ...item,
      position: ((item.yearValue - minYear) / range) * 100,
    }));
    for (let index = 1; index < raw.length; index += 1) {
      raw[index].position = Math.max(raw[index].position, raw[index - 1].position + minGap);
    }
    for (let index = raw.length - 2; index >= 0; index -= 1) {
      raw[index].position = Math.min(raw[index].position, raw[index + 1].position - minGap);
    }
    const start = raw[0]?.position ?? 0;
    const end = raw[raw.length - 1]?.position ?? 100;
    const spread = Math.max(1, end - start);
    return raw.map((item) => ({
      ...item,
      normalizedPosition: ((item.position - start) / spread) * 100,
    }));
  }, [timelineLocations]);

  const hoveredTimelineItem = useMemo(
    () => timelineDots.find((item) => item.id === hoveredTimelineId) ?? null,
    [hoveredTimelineId, timelineDots]
  );

  const shouldRotate = autoSpinEnabled && interactionMode === "idle" && !reduceMotion;
  const resultsCount = filteredLocations.length;
  const activeRouteId =
    selectedIndex > 0 && timelineLocations[selectedIndex - 1]
      ? `${timelineLocations[selectedIndex - 1].id}->${selected?.id}`
      : null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="app-aurora pointer-events-none absolute inset-0" />

      <div className="relative mx-auto grid min-h-screen max-w-[1520px] grid-cols-1 gap-4 px-4 pb-28 pt-4 xl:grid-cols-[350px_1fr_360px]">
        <Card className="order-2 xl:order-1 xl:sticky xl:top-4 xl:h-[calc(100vh-7.75rem)]">
          <CardHeader className="sticky top-0 z-10 bg-surface/95 pb-4 backdrop-blur">
            <CardTitle className="text-3xl leading-tight">
              Every location tells <span className="text-primary">part of the story.</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Explore by map, timeline, or filters. Motion pauses while reading so details stay legible.
            </p>
          </CardHeader>
          <CardContent className="space-y-5 pt-0">
            <div className="grid grid-cols-3 gap-3">
              <div className="stat-tile">
                <p className="text-2xl font-semibold text-primary">{resultsCount}</p>
                <p className="stat-label">Visible</p>
              </div>
              <div className="stat-tile">
                <p className="text-2xl font-semibold text-primary">{filteredRoutes.length}</p>
                <p className="stat-label">Routes</p>
              </div>
              <div className="stat-tile">
                <p className="text-2xl font-semibold text-primary">{storyCategories.length}</p>
                <p className="stat-label">Tracks</p>
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-border/70 bg-surface-muted p-4">
              <div className="hint-row">
                <Move3D className="h-4 w-4 text-primary" />
                <span>Drag to rotate and zoom</span>
              </div>
              <div className="hint-row">
                <Route className="h-4 w-4 text-primary" />
                <span>Click timeline dots to focus globe</span>
              </div>
              <div className="hint-row">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Shortcuts: N/P next-prev, Enter open, Esc close</span>
              </div>
            </div>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="section-kicker">Filter and Search</p>
                <Button size="sm" variant="ghost" onClick={clearFilters}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search place, year, event type, or story text"
                  className="input-surface w-full py-2 pl-9 pr-3"
                  aria-label="Search timeline stories"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {storyCategories.map((category) => {
                  const active = activeCategories.includes(category);
                  return (
                    <Button key={category} size="sm" variant={active ? "default" : "outline"} onClick={() => toggleCategory(category)}>
                      {category}
                    </Button>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {eras.map((era) => (
                  <Button key={era} size="sm" variant={activeEra === era ? "default" : "outline"} onClick={() => jumpToEra(era)}>
                    {era}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={showRoutes ? "default" : "outline"} onClick={() => setShowRoutes((current) => !current)}>
                  {showRoutes ? "Hide arcs" : "Show arcs"}
                </Button>
                <Button
                  size="sm"
                  variant={autoSpinEnabled ? "default" : "outline"}
                  onClick={() => setAutoSpinEnabled((current) => !current)}
                >
                  {autoSpinEnabled ? "Auto-spin on" : "Auto-spin off"}
                </Button>
                <Button
                  size="sm"
                  variant={interactionMode === "idle" ? "default" : "outline"}
                  onClick={() => {
                    setInteractionMode("idle");
                    setIsStoryOpen(false);
                  }}
                >
                  Resume motion
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant={timelineDensity === "all" ? "default" : "outline"} onClick={() => setTimelineDensity("all")}>
                  All events
                </Button>
                <Button size="sm" variant={timelineDensity === "major" ? "default" : "outline"} onClick={() => setTimelineDensity("major")}>
                  Major only
                </Button>
                <Button
                  size="sm"
                  variant={timelineDensity === "filtered" ? "default" : "outline"}
                  onClick={() => setTimelineDensity("filtered")}
                >
                  Current filter
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Showing {resultsCount} of {locations.length} stories.</p>
            </section>

            <section>
              <p className="section-kicker">Sources</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {sources.map((source) => (
                  <li key={source.url}>
                    <a className="text-primary hover:text-primary/80" href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </CardContent>
        </Card>

        <Card className="order-1 overflow-hidden xl:order-2">
          <div className="relative h-[58vh] min-h-[560px] w-full xl:h-[calc(100vh-7.75rem)]">
            <GlobeScene
              points={timelineLocations}
              routes={filteredRoutes}
              selectedId={selected?.id ?? selectedId}
              autoRotate={shouldRotate}
              interactionMode={interactionMode}
              activeRouteId={activeRouteId}
              onSelect={(id) => selectLocation(id, "selected")}
            />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
              {interactionMode === "reading" ? "Reading mode: globe motion paused." : "Drag, zoom, and click markers for details."}
            </div>
          </div>
        </Card>

        <Card className="order-3 xl:order-3 xl:sticky xl:top-4 xl:h-[calc(100vh-7.75rem)]">
          <CardHeader className="pb-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge>{selected?.type}</Badge>
              <Badge variant="muted">{selected?.year}</Badge>
              <Badge variant="muted">{selected?.category}</Badge>
            </div>
            <CardTitle>{selected?.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{selected?.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="section-kicker">Timeline List</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={selectPrevious}>
                  Previous
                </Button>
                <Button size="sm" variant="outline" onClick={selectNext}>
                  Next
                </Button>
              </div>
            </div>
            <ScrollArea className="h-[290px] pr-2 xl:h-[340px]">
              <div className="space-y-2">
                {timelineLocations.length === 0 ? (
                  <div className="rounded-lg border border-border bg-surface-muted p-4 text-sm text-muted-foreground">
                    No stories match this filter.
                  </div>
                ) : null}
                {timelineLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => selectLocation(location.id, "reading")}
                    className={`w-full rounded-lg border p-3 text-left transition active:scale-[0.99] ${
                      selected?.id === location.id
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-surface-muted hover:border-border-strong hover:bg-surface"
                    }`}
                    aria-label={`Open story ${location.name}`}
                  >
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{highlightText(location.year)}</p>
                    <p className="font-medium">{highlightText(location.name)}</p>
                    <p className="text-xs text-muted-foreground">
                      {highlightText(location.type)} - {location.category}
                    </p>
                  </button>
                ))}
              </div>
            </ScrollArea>
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  const opening = !isStoryOpen;
                  setIsStoryOpen(opening);
                  setInteractionMode(opening ? "reading" : "selected");
                }}
                disabled={!selected}
              >
                {isStoryOpen ? (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    Collapse Story
                  </>
                ) : (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Open Story
                  </>
                )}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  if (timelineLocations[0]) selectLocation(timelineLocations[0].id, "selected");
                }}
              >
                Jump to Start
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {selected ? (
        <aside
          className={`fixed z-30 transition-all duration-300 ${
            isStoryOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"
          } right-3 top-3 w-[min(560px,calc(100vw-1.5rem))] xl:right-6 xl:top-6 max-xl:bottom-[5.7rem] max-xl:top-auto max-xl:w-[calc(100vw-1.5rem)]`}
          aria-live="polite"
        >
          <div className={`story-panel ${storyExpanded ? "max-h-[72vh]" : "max-h-[40vh]"}`}>
            <button
              onClick={() => {
                setIsStoryOpen(false);
                setStoryExpanded(false);
                setInteractionMode("selected");
              }}
              className="absolute right-3 top-3 rounded-md border border-border bg-surface px-1.5 py-1 text-muted-foreground transition hover:text-foreground"
              aria-label="Close story panel"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-3 flex flex-wrap items-center gap-2 pr-8">
              <Badge>{selected.type}</Badge>
              <Badge variant="muted">{selected.year}</Badge>
              <Badge variant="muted">{selected.category}</Badge>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{selected.name}</h2>
            <p className="mt-1 text-sm text-primary/90">{selected.description}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
              Timeline position {selectedIndex + 1} of {timelineLocations.length}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="metadata-tile">
                <span className="text-muted-foreground/80">Mode:</span> {interactionMode}
              </div>
              <div className="metadata-tile">
                <span className="text-muted-foreground/80">Era:</span> {selected.era}
              </div>
              <div className="metadata-tile col-span-2">
                <span className="text-muted-foreground/80">Coordinates:</span> {selected.lat.toFixed(2)}, {selected.lng.toFixed(2)}
              </div>
            </div>
            <div className="mt-3 overflow-y-auto rounded-xl border border-border bg-surface-muted p-4 text-sm leading-relaxed text-foreground/95">
              {highlightText(selected.story)}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Button variant="outline" onClick={selectPrevious}>
                Prev
              </Button>
              <Button variant="outline" onClick={selectNext}>
                Next
              </Button>
              <Button variant={storyExpanded ? "default" : "outline"} onClick={() => setStoryExpanded((current) => !current)}>
                {storyExpanded ? "Compact" : "Expand"}
              </Button>
            </div>
          </div>
        </aside>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-surface/95 px-4 pb-3 pt-2 backdrop-blur">
        <div className="mx-auto max-w-[1520px]">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Timeline Navigator</span>
            <span>
              {selectedIndex + 1}/{timelineLocations.length}
            </span>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-strong" />
            <div className="relative h-8 overflow-x-auto pb-1">
              <div className="relative h-full min-w-[860px]">
                {timelineDots.map((location) => {
                  const isSelected = selected?.id === location.id;
                  return (
                    <button
                      key={location.id}
                      onClick={() => selectLocation(location.id, "reading")}
                      onMouseEnter={() => setHoveredTimelineId(location.id)}
                      onMouseLeave={() => setHoveredTimelineId((current) => (current === location.id ? null : current))}
                      onFocus={() => setHoveredTimelineId(location.id)}
                      onBlur={() => setHoveredTimelineId((current) => (current === location.id ? null : current))}
                      className={`timeline-dot group absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        isSelected ? "timeline-dot-active" : ""
                      }`}
                      style={{ left: `${location.normalizedPosition}%` }}
                      aria-label={`Select timeline item ${location.name}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {hoveredTimelineItem ? (
            <div className="pointer-events-none absolute -top-[6.2rem] left-0 right-0 mx-auto w-fit max-w-[680px] rounded-lg border border-border bg-surface px-3 py-2 text-xs shadow-xl">
              <p className="font-medium text-foreground">
                {hoveredTimelineItem.year} - {hoveredTimelineItem.name}
              </p>
              <p className="mt-1 text-muted-foreground">{hoveredTimelineItem.type}</p>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
