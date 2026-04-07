"use client";

import SpotlightCard from '@/components/ui/SpotlightCard';
import { DisplaySlot } from '@/modules/ClassRoutine/types';
import { formatCombinedTeacherInitials, slotMatchesPeriod } from '@/modules/ClassRoutine/helpers';
import { PERIODS } from '@/modules/ClassRoutine/constants';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const DAY_MAP: Record<number, string> = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday' };

function getTermFromCode(code: string): string {
  const digits = code.replace(/\D/g, '');
  return digits.length >= 2 ? `${digits[0]}-${digits[1]}` : '';
}

interface Props {
  slots: DisplaySlot[];
}

export default function ScheduleGridView({ slots }: Props) {
  const getScheduleForCell = (dayName: string, period: typeof PERIODS[number]): DisplaySlot[] => {
    const dayIndex = Object.entries(DAY_MAP).find(([, v]) => v === dayName)?.[0];
    if (dayIndex === undefined) return [];
    return slots.filter(s => s.day_of_week === Number(dayIndex) && slotMatchesPeriod(s, period));
  };

  return (
    <SpotlightCard
      className="rounded-xl border border-gray-200 dark:border-gray-300 overflow-hidden bg-white dark:bg-transparent"
      spotlightColor="rgba(217, 162, 153, 0.2)"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50 dark:bg-white/5">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700 dark:text-white/60 uppercase w-28">Time</th>
              {DAY_NAMES.map(day => (
                <th key={day} className="px-3 py-3 text-center text-xs font-semibold text-gray-700 dark:text-white/60 uppercase">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCC5B2] dark:divide-[#392e4e]">
            {PERIODS.map(period => (
              <tr key={period.id}>
                <td className="px-3 py-2 text-xs font-medium text-gray-400 dark:text-white/60 border-r border-gray-200 dark:border-gray-300 whitespace-nowrap">
                  {period.label}
                </td>
                {DAY_NAMES.map(day => {
                  const cellSlots = getScheduleForCell(day, period);
                  return (
                    <td key={`${day}-${period.id}`} className="px-2 py-2 border-r border-gray-200 dark:border-gray-300 align-top min-w-[140px]">
                      {cellSlots.map(s => (
                        <div
                          key={s.id}
                          className="bg-indigo-100/20 dark:bg-[#8400ff]/20 text-gray-700 dark:text-white rounded p-2 text-xs mb-1 last:mb-0 border border-[#D9A299]/30 dark:border-[#8400ff]/30"
                        >
                          <p className="font-semibold">{s.course_code}</p>
                          <p className="text-[10px] text-gray-400 dark:text-white/50">
                            ({formatCombinedTeacherInitials(s.teachers)})
                          </p>
                          <p className="text-indigo-500 dark:text-[#00e5ff]">{s.room_number}</p>
                          {s.section && <p className="text-gray-400 dark:text-white/50">Sec {s.section}</p>}
                          <p className="text-[10px] text-gray-400/70 dark:text-white/30 mt-0.5">T {getTermFromCode(s.course_code)}</p>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpotlightCard>
  );
}
