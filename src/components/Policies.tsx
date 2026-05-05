import React from 'react';

export default function Policies() {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4">
      <h3 className="text-lg font-bold mb-3">Policies & House Rules</h3>
      <ul className="text-sm space-y-2 text-neutral-700">
        <li><strong>Cancellation:</strong> Flexible - full refund 7 days before move-in.</li>
        <li><strong>Check-in/out:</strong> Check-in 14:00, Check-out 10:00.</li>
        <li><strong>Pets:</strong> No pets allowed unless agreed with host.</li>
        <li><strong>Noise:</strong> Quiet hours 22:00–07:00.</li>
        <li><strong>Visitors:</strong> Visitors allowed during day hours; overnight guests need host approval.</li>
        <li><strong>Safety:</strong> Emergency contact provided upon booking; photos verified.</li>
      </ul>
    </div>
  );
}
