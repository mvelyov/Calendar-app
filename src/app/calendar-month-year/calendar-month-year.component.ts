import { Component, Input } from "@angular/core";

@Component({
  selector: "app-calendar-month-year",
  templateUrl: "./calendar-month-year.component.html"
})
export class CalendarMonthYearComponent {
  @Input() month: string;
  @Input() year: number;
}
