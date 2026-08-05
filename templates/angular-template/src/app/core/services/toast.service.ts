import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(title: string, message: string, type: ToastType = 'error'): void {
    const config: MatSnackBarConfig = {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`toast-${type}`]
    };
    this.snackBar.open(`${title}: ${message}`, '關閉', config);
  }
}
