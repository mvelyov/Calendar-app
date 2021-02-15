import { MeetingName } from "./meetingName";

export interface CalendarDay {
    number: number;
    month: number;
    year: number;
    isWeekend: boolean;
    nameShort: string;
    isActive: boolean;
    isToday: boolean;
    meetingNames: MeetingName[];
}