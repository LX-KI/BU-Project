import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['custom-snackbar', 'success-snackbar'],
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['custom-snackbar', 'error-snackbar'],
    });
  }

  showWarning(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: ['custom-snackbar', 'warning-snackbar'],
    });
  }
}
