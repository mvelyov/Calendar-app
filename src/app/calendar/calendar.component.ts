import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarDay } from 'src/app/models/day';
import meetings from '../../../api/meetings.json';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: CalendarModalComponent;
  dayNames: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  days: CalendarDay[] = [];
  day: CalendarDay;
  currentMonth: string;
  currentMonthNumber: number;
  currentYear: number;  

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.currentMonth = this.dateService.setCurrentMonth();
    this.currentMonthNumber = this.dateService.setCurrentMonthNumber();
    this.currentYear = this.dateService.setCurrentYear();
    this.initDatesForCurrentMonth(this.dateService.getNumberOfDaysInMonth(this.currentYear, this.currentMonthNumber+1));
  }

  public onSelectDay(day: CalendarDay): void {
    this.clearDaysActiveState();
    day.isActive = true;
    this.day = day;

    if (this.day.meetingNames && this.day.meetingNames.length > 0) {
      this.openModalWindow();
    }
  }

  public onPreviousMonth(): void {
    let previousMonthNumber = this.dateService.calculatePreviousMonthNumber(this.currentMonthNumber);
    this.currentMonthNumber--;

    if (this.currentMonthNumber < 0) {
      this.currentMonthNumber += 12;
      this.currentYear--;
    }
    
    this.currentMonth = this.dateService.setCurrentMonth(this.currentYear, previousMonthNumber);
    this.initDatesForCurrentMonth(this.dateService.getNumberOfDaysInMonth(this.currentYear, this.currentMonthNumber+1));
  }

  public onNextMonth(): void {
    const nextMonthNumber = this.dateService.calculateNextMonthNumber(this.currentMonthNumber);
    this.currentMonthNumber++;

    if (this.currentMonthNumber > 11) {
      this.currentMonthNumber -= 12;
      this.currentYear++;
    }

    this.currentMonth = this.dateService.setCurrentMonth(this.currentYear, nextMonthNumber);
    this.initDatesForCurrentMonth(this.dateService.getNumberOfDaysInMonth(this.currentYear, this.currentMonthNumber+1));
  }

  private openModalWindow(): void {
    this.modal.open();
  }

  private initDatesForCurrentMonth(numberOfDaysInCurrentMonth: number): void {
    this.days = this.dateService.getDaysInCurrentMonth(numberOfDaysInCurrentMonth, this.currentMonthNumber, this.currentYear);
    this.getMeetingsForCurrentMonth();
  }

  private clearDaysActiveState(): void {
    this.days.forEach(day => day.isActive = false);
  }

  private getMeetingsForCurrentMonth() {
    this.days = this.dateService.mapMeetingsWithDates(meetings.meetings, this.days);
    this.days.forEach(day => day.meetingNames.sort(this.dateService.sortMeetingsByDate));
  }
}
