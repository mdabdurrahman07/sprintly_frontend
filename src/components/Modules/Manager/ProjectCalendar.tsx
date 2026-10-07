"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectCalendarProps {
  deadlineDates?: Date[];
}

export default function ProjectCalendar({
  deadlineDates = [],
}: ProjectCalendarProps) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);

    // JS: Sunday = 0, Monday = 1, ..., Saturday = 6
    // Convert it so Monday = 0, ..., Sunday = 6
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7;

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const calendarDays = [];

    // Previous month's trailing days
    for (let i = startingDay - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPreviousMonth - i,
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      calendarDays.push({
        day,
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    // Next month's leading days
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

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const hasDeadline = (date: Date) => {
    return deadlineDates.some(
      (deadline) =>
        deadline.getDate() === date.getDate() &&
        deadline.getMonth() === date.getMonth() &&
        deadline.getFullYear() === date.getFullYear(),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-base font-bold text-zinc-900 dark:text-foreground">
          {monthName} {year}
        </h3>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goToPreviousMonth}
            aria-label="Previous month"
            className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 dark:border-border dark:hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="Next month"
            className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 dark:border-border dark:hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="mt-4 grid grid-cols-7 text-center text-xs font-semibold text-zinc-400">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold">
        {days.map((item) => {
          const todayDate = isToday(item.date);
          const deadline = hasDeadline(item.date);

          return (
            <div
              key={item.date.toISOString()}
              className="flex flex-col items-center justify-center py-1"
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full transition-colors ${
                  todayDate
                    ? "bg-blue-600 font-bold text-white shadow-xs dark:bg-primary"
                    : item.isCurrentMonth
                      ? "text-zinc-700 dark:text-foreground"
                      : "text-zinc-300 dark:text-muted-foreground/40"
                }`}
              >
                {item.day}
              </span>

              {/* Deadline indicator */}
              <span className="mt-0.5 h-1">
                {deadline && (
                  <span className="block size-1 rounded-full bg-blue-600 dark:bg-primary" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}