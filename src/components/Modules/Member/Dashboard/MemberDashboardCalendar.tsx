import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCalendarProps {
  deadlineDates?: Date[];
}

export function MemberDashboardCalendar({ deadlineDates = [] }: ProjectCalendarProps) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    const calendarDays = [];

    for (let i = startingDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPreviousMonth - i,
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  }, [year, month]);

  const isToday = (date: Date) => 
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

  const hasDeadline = (date: Date) =>
    deadlineDates.some(
      (deadline) => deadline.getDate() === date.getDate() && deadline.getMonth() === date.getMonth() && deadline.getFullYear() === date.getFullYear()
    );

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm min-h-112.5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[15px] font-bold text-foreground">
          {monthName} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="size-4" />
          </button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="flex size-7 items-center justify-center text-muted-foreground hover:text-foreground">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {daysOfWeek.map((day) => <div key={day} className="py-2">{day}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold flex-1 content-start">
        {days.map((item) => (
          <div key={item.date.toISOString()} className="flex flex-col items-center justify-center py-1">
            <span className={`flex size-7 items-center justify-center rounded-full transition-colors ${isToday(item.date) ? "bg-primary font-bold text-primary-foreground shadow-sm" : item.isCurrentMonth ? "text-foreground hover:bg-muted" : "text-muted-foreground/40"}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border">
        <span className="m-auto">Sprintly </span>
      </div>
    </div>
  );
}