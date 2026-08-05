import { Component } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loading$: Observable<boolean>;

  constructor(private global: GlobalService) {
    this.loading$ = this.global.loading$;
  }
}
