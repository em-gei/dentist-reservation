import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Moment } from 'moment';
import { ApiResponse } from 'src/app/shared/models/api-response-model';
import { Appointments } from 'src/app/shared/models/appointments-model';
import { Registry } from 'src/app/shared/models/registry-model';
import { Timetables } from 'src/app/shared/models/timetables-model';
import { AppointmentsService } from 'src/app/shared/services/appointments-service/appointments.service';
import { RegistryService } from 'src/app/shared/services/registry-service/registry.service';
import { ReservationService } from 'src/app/shared/services/reservation-service/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  @ViewChild('reservationForm') reservationForm;
  fiscalCode: string;
  registryList: Registry[];
  appointmentList: Appointments[];
  pickedDate: Moment;
  minDate: Date;
  interval: string[];
  timetableList: Timetables[];
  originalTimetableList: Timetables[];

  constructor(
    private registryService: RegistryService,
    private reservationService: ReservationService,
    private appointmentsService: AppointmentsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTimetables();
    this.getAppointments();
    this.getRegistries();
    // Set availables dates from today
    this.minDate = new Date();
  }

  /**
   * Get timetables list from database
   */
  getTimetables() {
    this.reservationService.getTimetables().subscribe((res) => {
      this.originalTimetableList = res;
      this.timetableList = res;
    });
  }

  /**
   * Get saved appointments
   */
  getAppointments() {
    this.appointmentsService.findAll().subscribe((res) => {
      this.appointmentList = res;
    });
  }

  /**
   * Get user list to reserve a date
   */
  getRegistries() {
    this.registryService.findAll().subscribe((res: Registry[]) => {
      this.registryList = res;
    });
  }

/**
 * Check if input field element is valid to be post
 * @param elem - form's fied
 * @returns validation's boolean value
 */
  isFieldValid(elem: any): boolean {
    return elem != null || elem != undefined;
  }

  /**
   * Shows a bottom snackbar to communicate informations to user
   * @param message - message to be displayed
   * @param style - style for the snackbak, success or error
   */
  showSnackbar(message: string, style: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
      panelClass: [style],
    });
  }

  /**
   * Save new reservation
   */
  reserveDate() {
    if (
      this.isFieldValid(this.fiscalCode) &&
      this.isFieldValid(this.pickedDate) &&
      this.isFieldValid(this.interval)
    ) {
      let date: Date = this.pickedDate.toDate();
      this.interval.forEach((time, index) => {
        this.appointmentsService.save(this.fiscalCode, date, time).subscribe(
          (res) => {
            if (res.status == HTTP_CREATED) {
              if (index == this.interval.length - 1) {
                this.showSnackbar(res.message, 'snackbar_success');
                this.resetForm();
              }
            } else {
              // Reservation not created depending on some problems
              this.showSnackbar(
                res.status + ': ' + res.message,
                'snackbar_error'
              );
            }
          },
          (err: Object) => {
            // Manage creation error
            let error: ApiResponse = err['error'];
            this.showSnackbar(
              error.status + ': ' + error.message,
              'snackbar_error'
            );
          }
        );
      });
    }
  }

  /**
   * On datepicker date change checks what times are still available for selected date
   * @param event 
   */
  onDateChange(event: MatDatepickerInputEvent<Moment>){
    let filteredList = this.originalTimetableList.filter(timetable => !this.isIntervalBusy(event.value.toDate(),timetable.interval));
    this.timetableList = filteredList;
  }

  /**
   * Check if input interval is already busy for another reservation
   * @param date - date to be checked
   * @param interval - interval to be checked
   * @returns 
   */
  private isIntervalBusy(date: Date, interval: string) {
    let busyInterval = this.appointmentList.find(appointment => appointment.date.toString() == date.toISOString() && appointment.interval == interval);
    return busyInterval != undefined;
  }

  /**
   * Clear the input form
   */
  private resetForm() : void {
    this.reservationForm.form.reset();
    Object.keys(this.reservationForm.form.controls).forEach((key) => {
      this.reservationForm.form.controls[key].setErrors(null);
    });
    this.reservationForm.form.updateValueAndValidity();
  }
}
