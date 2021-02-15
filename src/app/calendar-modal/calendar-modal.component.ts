import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: "app-calendar-modal",
  templateUrl: "./calendar-modal.component.html",
  styleUrls: ["./calendar-modal.component.css"],
})
export class CalendarModalComponent {
  @ViewChild("modal", { static: false }) modal: ElementRef;
  @Input() day;

  open() {
    this.modal.nativeElement.style.display = "block";
  }

  close() {
    this.modal.nativeElement.style.display = "none";
  }
}
