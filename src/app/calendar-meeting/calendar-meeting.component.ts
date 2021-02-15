import { Component, Input } from "@angular/core";

@Component({
  selector: "app-calendar-meeting",
  templateUrl: "./calendar-meeting.component.html",
  styleUrls: ["./calendar-meeting.component.css"],
})
export class CalendarMeetingComponent {
  @Input() meeting;
}
