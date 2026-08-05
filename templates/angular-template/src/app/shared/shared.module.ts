import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * SharedModule
 * 匯出所有 feature module 共用的 Angular 模組與元件
 */
@NgModule({
  declarations: [
    // 共用元件、directive、pipe 放此
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    // 共用元件、directive、pipe 一併 export
  ]
})
export class SharedModule { }
