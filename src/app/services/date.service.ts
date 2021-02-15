import { Injectable } from "@angular/core";
import { CalendarDay } from "../models/day";

@Injectable({
  providedIn: "root",
})
export class DateService {
  public setCurrentMonth(currentYear?: number, monthNumber?: number): string {
    if (currentYear != null && monthNumber != null) {
      return new Date(
        Date.UTC(currentYear, monthNumber)
      ).toLocaleString("default", { month: "long" });
    }

    return new Date().toLocaleString("default", { month: "long" });
  }

  public setCurrentMonthNumber(): number {
    return new Date().getMonth();
  }

  public setCurrentYear(): number {
    return new Date().getFullYear();
  }

  public getNumberOfDaysInMonth(year, month): number {
    return new Date(year, month, 0).getDate();
  }

  public getDaysInCurrentMonth(
    numberOfDaysInCurrentMonth: number,
    currentMonthNumber: number,
    currentYear: number
  ) {
    const days = [];

    for (let number = 1; number <= numberOfDaysInCurrentMonth; number++) {
      const isWeekend = this.isWeekend(number);
      let nameShort = null;
      let isActive = false;
      let isToday =
        new Date().getDate() === number &&
        new Date().getMonth() === currentMonthNumber &&
        new Date().getFullYear() === currentYear;
      const month = new Date(
        Date.UTC(currentYear, currentMonthNumber)
      ).getMonth();
      const year = new Date(
        Date.UTC(currentYear, currentMonthNumber)
      ).getFullYear();
      const meetingNames = [];

      nameShort = this.getDayName(number);

      const day = {
        number,
        month,
        year,
        isWeekend,
        nameShort,
        isActive,
        isToday,
        meetingNames,
      };

      days.push(day);
    }

    return days;
  }

  public sortMeetingsByDate = (a, b) => {
    if (new Date(a.start) > new Date(b.start)) {
      return 1;
    }

    return -1;
  };

  public mapMeetingsWithDates(meetings, days: CalendarDay[]): CalendarDay[] {
    meetings.forEach((meeting) => {
      const meetingDateNumber = new Date(meeting.start).getDate();
      const meetingDateMonth = new Date(meeting.start).getMonth();
      const meetingDateYear = new Date(meeting.start).getFullYear();

      const meetingDate = days.find(
        (day) =>
          day.number === meetingDateNumber &&
          day.month === meetingDateMonth &&
          day.year === meetingDateYear
      );

      if (meetingDate) {
        if (meetingDate.meetingNames) {
          meetingDate.meetingNames.push({
            start: meeting.start,
            startTime: this.parseDateHours(meeting.start),
            end: meeting.end,
            endTime: this.parseDateHours(meeting.end),
            name: meeting.name,
            room: meeting.meetingRoom,
          });
        } else {
          meetingDate.meetingNames = [];
          meetingDate.meetingNames.push({
            start: meeting.start,
            startTime: this.parseDateHours(meeting.start),
            end: meeting.end,
            endTime: this.parseDateHours(meeting.end),
            name: meeting.name,
            room: meeting.meetingRoom,
          });
        }
      }
    });

    return days;
  }

  public calculatePreviousMonthNumber(currentMonthNumber: number): number {
    return (currentMonthNumber - 1) % 12;
  }

  public calculateNextMonthNumber(currentMonthNumber: number): number {
    return (currentMonthNumber + 1) % 12;
  }

  private isWeekend(day: number): boolean {
    return day % 7 === 0 || day % 7 === 6;
  }

  private getDayName(dayNumber: number): string {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date(Date.UTC(year, month, dayNumber));

    const options = { weekday: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  private parseDateHours(meetingHours: string) {
    const hours = new Date(meetingHours).getUTCHours().toLocaleString();
    let minutes = new Date(meetingHours).getUTCMinutes().toLocaleString();

    return `${hours}:${this.addLeadingZeroToMinutes(minutes)}`;
  }

  private addLeadingZeroToMinutes(minutes) {
    if (minutes < 10) {
      return `0${minutes}`;
    }

    return minutes;
  }
}
