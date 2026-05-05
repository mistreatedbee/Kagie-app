import React from 'react';
import { accommodations } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function SimilarListings({ currentId }: { currentId?: string }) {
  const navigate = useNavigate();
  const items = accommodations.filter(a => a.id !== currentId).slice(0, 6);

  return (
    <div>
      <h3 className="text-lg font-bold mb-3">Similar listings</h3>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar">
        {items.map(i => (
          <div key={i.id} className="w-56 bg-white rounded-xl border p-3 flex-shrink-0">
            <img src={i.images[0]} alt={i.name} className="w-full h-32 object-cover rounded-md mb-2" loading="lazy" />
            <div className="font-semibold text-sm">{i.name}</div>
            <div className="text-xs text-neutral-500">R{i.price} / mo · {i.rating}★</div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => navigate(`/accommodation/${i.id}`)} className="text-xs px-2 py-1 rounded bg-neutral-100">View</button>
              <button onClick={() => navigate(`/accommodation/${i.id}/reserve`)} className="text-xs px-2 py-1 rounded bg-brand text-white">Reserve</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
