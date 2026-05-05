import React from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePicker({
  mode = 'range',
  selected,
  onSelect,
  disabledDates
}: {
  mode?: 'single' | 'range';
  selected?: DateRange | Date | undefined;
  onSelect: (d: any) => void;
  disabledDates?: Date[];
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-2 bg-white">
      <DayPicker
        mode={mode as any}
        selected={selected as any}
        onSelect={onSelect}
        numberOfMonths={1}
        disabled={disabledDates}
      />
    </div>
  );
}
