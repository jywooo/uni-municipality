import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useAppData } from '../context/AppDataContext.jsx';
import { EventCard } from '../components/EventCard.jsx';

export function EventsCatalog() {
  const { events, categories, venues } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => event.status === 'Published')
      .filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || event.category === selectedCategory;
        const matchesVenue = !selectedVenue || event.venue === selectedVenue;
        return matchesSearch && matchesCategory && matchesVenue;
      });
  }, [events, searchTerm, selectedCategory, selectedVenue]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Public events catalog</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Browse municipal events</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
          Search and filter published municipality events by category and venue.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search events"
                className="w-full rounded-xl border border-white/10 bg-black px-11 py-3 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={selectedVenue}
            onChange={(event) => setSelectedVenue(event.target.value)}
            className="rounded-xl border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
          >
            <option value="">All venues</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.name}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-6 text-sm uppercase tracking-[0.16em] text-zinc-500">
        {filteredEvents.length} published event{filteredEvents.length === 1 ? '' : 's'} found
      </p>

      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-10 text-center text-zinc-400">
          No events match your search criteria.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
