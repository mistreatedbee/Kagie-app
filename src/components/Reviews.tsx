import React, { useMemo, useState } from 'react';

export default function Reviews({ reviews }: { reviews?: { id: string; author: string; rating: number; date: string; text: string }[] }) {
  const [filter, setFilter] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [page, setPage] = useState(1);
  const perPage = 3;

  const sorted = useMemo(() => {
    if (!reviews) return [];
    const copy = [...reviews];
    if (filter === 'recent') return copy.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    if (filter === 'highest') return copy.sort((a, b) => b.rating - a.rating);
    return copy.sort((a, b) => a.rating - b.rating);
  }, [reviews, filter]);

  const totalPages = Math.max(1, Math.ceil((sorted.length || 0) / perPage));
  const pageItems = sorted.slice((page - 1) * perPage, page * perPage);

  const avg = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-2xl font-bold">{avg} <span className="text-sm text-neutral-500">/5</span></div>
          <div className="text-xs text-neutral-500">{reviews?.length || 0} reviews</div>
        </div>
        <div className="text-sm">
          <label className="text-xs text-neutral-500 mr-2">Sort</label>
          <select value={filter} onChange={(e) => { setFilter(e.target.value as any); setPage(1); }} className="border rounded-md px-2 py-1 text-sm">
            <option value="recent">Most recent</option>
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {pageItems.map(r => (
          <div key={r.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{r.author}</div>
              <div className="text-sm text-neutral-500">{r.rating} / 5</div>
            </div>
            <div className="text-xs text-neutral-500 mb-2">{r.date}</div>
            <div className="text-sm text-neutral-700">{r.text}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-neutral-500">Page {page} / {totalPages}</div>
        <div className="flex gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">Prev</button>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
