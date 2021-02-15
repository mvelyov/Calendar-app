import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarModalComponent } from "./calendar-modal/calendar-modal.component";
import { CalendarMeetingComponent } from "./calendar-meeting/calendar-meeting.component";
import { CalendarDayComponent } from "./calendar-day/calendar-day.component";
import { CalendarMonthYearComponent } from "./calendar-month-year/calendar-month-year.component";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarModalComponent,
    CalendarMeetingComponent,
    CalendarDayComponent,
    CalendarMonthYearComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
