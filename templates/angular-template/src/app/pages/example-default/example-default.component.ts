import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ToastService } from '../../core/services/toast.service';

interface Row { key1: string; key2: string; key3: string; }

@Component({
  selector: 'app-example-default',
  templateUrl: './example-default.component.html',
  styles: ['.w-100 { width: 100%; }']
})
export class ExampleDefaultComponent implements OnInit {
  displayedColumns = ['key1', 'key2', 'key3', 'toast', 'modal'];
  dataSource = new MatTableDataSource<Row>([]);

  constructor(private dialog: MatDialog, private toast: ToastService) {}

  ngOnInit(): void {
    this.dataSource.data = [
      { key1: '第一筆資料', key2: 'key2', key3: 'key3' },
      { key1: '第二筆資料', key2: 'key2', key3: 'key3' }
    ];
  }

  showToast(): void { this.toast.show('標題', '內容', 'info'); }

  openModal(): void {
    this.dialog.open(ModalComponent, { width: '400px', data: { title: '範例 modal' } });
  }
}
