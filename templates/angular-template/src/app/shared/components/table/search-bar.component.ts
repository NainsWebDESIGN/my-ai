import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: ['.search-field { width: 100%; }']
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder = '搜尋...';
  @Input() control = new FormControl('');
  ngOnInit() {}
}
