import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2 mat-dialog-title>Success</h2>
    <div mat-dialog-content>{{data.message}}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onAction('Register Another')">Register Another</button>
      <button mat-button (click)="onAction('Go to Home')">Go to Home</button>
    </div>
  `,
  styles: [`
    :host { display: block; padding: 20px; }
    .mat-dialog-actions { justify-content: flex-end; gap: 8px; }
  `]
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onAction(action: string): void {
    this.dialogRef.close(action);
  }
} 