import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ToastService } from '../../core/services/toast.service';

interface Row { key1: string; key2: string; key3: string; }

@Component({
  selector: 'app-example-search',
  templateUrl: './example-search.component.html',
  styles: ['.w-100{width:100%} .pa-4{padding:1rem} .row{display:flex;gap:1rem} .col{flex:1} .table-toolbar{display:flex;align-items:center;gap:1rem} .px-3{padding:0 1rem}']
})
export class ExampleSearchComponent implements OnInit {
  displayedColumns = ['key1', 'key2', 'key3', 'toast', 'modal'];
  dataSource = new MatTableDataSource<Row>([]);
  searchControl = new FormControl('');

  constructor(private dialog: MatDialog, private toast: ToastService) {}

  get filteredData(): MatTableDataSource<Row> {
    const s = (this.searchControl.value || '').toLowerCase();
    const filtered = s ? this.dataSource.data.filter(r =>
      [r.key1, r.key2, r.key3].some(v => v.toLowerCase().includes(s))
    ) : this.dataSource.data;
    const ds = new MatTableDataSource<Row>(filtered);
    return ds;
  }

  ngOnInit(): void {
    this.dataSource.data = [
      { key1: '第一筆資料', key2: 'key2', key3: 'key3' },
      { key1: '第二筆資料', key2: 'key2', key3: 'key3' }
    ];
  }

  refresh(): void {}
  showToast(): void { this.toast.show('標題', '內容', 'info'); }
  openModal(): void { this.dialog.open(ModalComponent, { width: '400px', data: { title: '範例 modal' } }); }
}
