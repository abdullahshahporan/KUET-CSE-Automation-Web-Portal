"use client";

import React, { useState } from 'react';
import { Trash2, X, Layers } from 'lucide-react';
import { DAYS, PERIODS, BREAK_AFTER_PERIOD } from './constants';
import { DisplaySlot } from './types';
import {
  formatCombinedTeacherInitials,
  formatCombinedTeacherNames,
  getSlotColorLight,
  slotMatchesPeriod,
  getSlotSpan,
} from './helpers';

interface RoutineGridProps {
  displaySlots: DisplaySlot[];
  onDeleteSlot: (slotIds: string[]) => void;
}

export default function RoutineGrid({ displaySlots, onDeleteSlot }: RoutineGridProps) {
  const [selectedSlots, setSelectedSlots] = useState<DisplaySlot[] | null>(null);

  const getSlotsForCell = (
    dayValue: number,
    period: (typeof PERIODS)[0]
  ): DisplaySlot[] => {
    return displaySlots.filter(
      (s) => s.day_of_week === dayValue && slotMatchesPeriod(s, period)
    );
  };

  const isCellCovered = (dayValue: number, periodIndex: number): boolean => {
    for (let i = periodIndex - 1; i >= 0; i--) {
      const slots = getSlotsForCell(dayValue, PERIODS[i]);
      if (slots.length > 0) {
        const maxSpan = Math.max(...slots.map((s) => getSlotSpan(s)));
        if (i + maxSpan > periodIndex) return true;
        break;
      }
    }
    return false;
  };

  return (
    <>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full border-collapse min-w-[850px]">
          <thead>
            <tr>
              <th className="px-2 py-1.5 border border-gray-200 bg-slate-800 text-white text-[11px] font-semibold w-20 sticky left-0 z-10">
                DAY / PERIOD
              </th>
              {PERIODS.map((p) => (
                <React.Fragment key={`period-header-${p.id}`}>
                  <th className="px-1 py-1.5 border border-gray-200 bg-slate-800 text-white text-[11px] font-semibold min-w-[90px]">
                    <div>{p.id}</div>
                    <div className="text-[9px] font-normal text-gray-400 mt-0.5">
                      {p.label}
                    </div>
                  </th>
                  {BREAK_AFTER_PERIOD.includes(p.id) && (
                    <th className="px-0.5 py-1 border border-gray-200 bg-gray-50 text-gray-400 text-[9px] font-medium w-6">
                      <div className="whitespace-nowrap">
                        B<br />R<br />E<br />A<br />K
                      </div>
                    </th>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {DAYS.map((day) => (
              <tr key={day.value}>
                <td className="px-2 py-1.5 border border-gray-200 bg-gray-50 text-gray-900 font-semibold text-xs text-center sticky left-0 z-10">
                  {day.label}
                </td>

                {PERIODS.map((period, periodIndex) => {
                  if (isCellCovered(day.value, periodIndex)) {
                    return (
                      <React.Fragment key={`covered-${day.value}-${period.id}`}>
                        {BREAK_AFTER_PERIOD.includes(period.id) && (
                          <td className="border border-gray-200 bg-gray-50" />
                        )}
                      </React.Fragment>
                    );
                  }

                  const slots = getSlotsForCell(day.value, period);
                  const hasSlots = slots.length > 0;
                  const maxSpan = hasSlots
                    ? Math.max(...slots.map((s) => getSlotSpan(s)))
                    : 1;

                  return (
                    <React.Fragment key={`cell-${day.value}-${period.id}`}>
                      <td
                        colSpan={maxSpan}
                        className={`border border-gray-200 p-0.5 text-center align-top ${
                          hasSlots ? '' : 'bg-white'
                        }`}
                      >
                        {hasSlots && (
                          <>
                            {slots.length === 1 ? (
                              <CompactSlotCell
                                slot={slots[0]}
                                onDelete={() => onDeleteSlot(slots[0].slotIds)}
                              />
                            ) : (
                              <button
                                onClick={() => setSelectedSlots(slots)}
                                className="w-full"
                              >
                                <div className="rounded p-1 bg-amber-50 border border-amber-200 text-[10px] cursor-pointer">
                                  <div className="font-bold text-gray-900">
                                    {[...new Set(slots.map(s => s.course_code))].join(', ')}
                                  </div>
                                  <div className="flex items-center justify-center gap-0.5 text-gray-400 mt-0.5">
                                    <Layers className="w-2.5 h-2.5" />
                                    <span>{slots.length} slots</span>
                                  </div>
                                </div>
                              </button>
                            )}
                          </>
                        )}
                      </td>
                      {BREAK_AFTER_PERIOD.includes(period.id) && (
                        <td className="border border-gray-200 bg-gray-50" />
                      )}
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Slot Detail Modal */}
      {selectedSlots && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSlots(null)}>
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">
                Slot Details ({selectedSlots.length} entries)
              </h3>
              <button
                onClick={() => setSelectedSlots(null)}
                className="p-1 rounded text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
              {selectedSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 rounded-md border text-sm ${getSlotColorLight(slot.course_type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{slot.course_code}</p>
                      <p className="text-xs text-gray-600">{slot.course_title}</p>
                    </div>
                    {!slot.isImported && (
                      <button
                        onClick={() => {
                          onDeleteSlot(slot.slotIds);
                          setSelectedSlots((prev) =>
                            prev ? prev.filter((s) => s.id !== slot.id) : null
                          );
                        }}
                        className="p-1 text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="mt-2 space-y-0.5 text-xs text-gray-600">
                    <p>Teacher: {formatCombinedTeacherNames(slot.teachers)}</p>
                    <p>Room: {slot.room_number}</p>
                    <p>Time: {slot.start_time} – {slot.end_time}</p>
                    <p>Section: {slot.section} | Type: {slot.course_type}</p>
                  </div>
                  {slot.isCombined && (
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded">
                      Combined
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// Compact slot cell — minimal, clean
// ==========================================
interface CompactSlotCellProps {
  slot: DisplaySlot;
  onDelete: () => void;
}

function CompactSlotCell({ slot, onDelete }: CompactSlotCellProps) {
  const teacherInitials = formatCombinedTeacherInitials(slot.teachers);

  return (
    <div
      className={`relative group rounded p-1 border text-[10px] ${getSlotColorLight(
        slot.course_type
      )} ${slot.isImported ? 'ring-1 ring-amber-300' : ''}`}
    >
      <div className="font-bold text-[11px] text-gray-900">
        {slot.course_code}
      </div>
      <div className="text-[9px] text-gray-600 mt-0.5">
        ({slot.isImported && slot.teachers[0]?.full_name
          ? slot.teachers[0].full_name
          : teacherInitials})
      </div>
      <div className="text-[8px] text-gray-400">
        {slot.room_number}
      </div>
      {slot.isCombined && (
        <div className="text-[8px] text-amber-600 font-medium">Combined</div>
      )}
      {!slot.isImported && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -top-1 -right-1 p-0.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete slot"
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
}
