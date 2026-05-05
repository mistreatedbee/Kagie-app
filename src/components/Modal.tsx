import React, { useEffect, useRef } from 'react';

export default function Modal({ children, open, onClose, ariaLabel }: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;
    // prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // focus first focusable element inside modal
    const focusable = containerRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        // simple focus trap
        const elements = containerRef.current?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!elements || elements.length === 0) return;
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || 'modal'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div ref={containerRef} className="relative z-10 max-w-3xl w-full bg-white rounded-xl shadow-soft p-4">
        <button
          className="absolute top-3 right-3 text-neutral-600"
          onClick={onClose}
          aria-label="Close modal">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
