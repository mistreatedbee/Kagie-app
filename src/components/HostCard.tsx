import React, { useState } from 'react';
import Modal from './Modal';

export default function HostCard({ host }: { host?: { name: string; avatar?: string; verified?: boolean; responseTime?: string } }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function send() {
    // mock send
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      alert('Message sent (mock)');
    }, 800);
  }

  return (
    <div className="rounded-2xl bg-white border border-neutral-200 p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">{host?.avatar ? <img src={host.avatar} alt={host.name} className="w-full h-full object-cover rounded-full" /> : host?.name?.[0]}</div>
      <div className="flex-1">
        <div className="font-semibold text-neutral-900">{host?.name || 'Host'}</div>
        <div className="text-xs text-neutral-500">{host?.verified ? 'Verified host' : 'Unverified'} · {host?.responseTime || 'response within 24h'}</div>
      </div>
      <div>
        <button onClick={() => setOpen(true)} className="bg-brand text-white px-3 py-2 rounded-lg">Message Host</button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} ariaLabel="Message host">
        <div>
          <h3 className="text-lg font-bold mb-2">Message {host?.name || 'Host'}</h3>
          <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-2" />
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-2 h-28" />
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border">Cancel</button>
            <button onClick={send} className="px-4 py-2 rounded-md bg-brand text-white">Send</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
