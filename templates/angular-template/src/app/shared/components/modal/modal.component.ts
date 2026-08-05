import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: ['.w-100 { width: 100%; }']
})
export class ModalComponent {
  inputText = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string },
    private toast: ToastService
  ) {}

  close(): void { this.dialogRef.close(); }

  confirm(): void {
    this.toast.show('範例 modal', this.inputText ? `輸入：${this.inputText}` : '已送出（示意）', 'success');
    this.dialogRef.close({ input: this.inputText });
  }
}
