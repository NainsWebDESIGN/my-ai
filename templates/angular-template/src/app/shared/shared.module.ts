import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";

// Layouts
import { DefaultLayoutComponent } from "../layouts/default-layout/default-layout.component";
import { SearchOptionLayoutComponent } from "../layouts/search-option-layout/search-option-layout.component";

// Shared components
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { ModalComponent } from "./components/modal/modal.component";
import { RefreshBtnComponent } from "./components/table/refresh-btn.component";
import { SearchBarComponent } from "./components/table/search-bar.component";

const MATERIAL_MODULES = [
  MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
  MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatSnackBarModule,
  MatProgressSpinnerModule, MatTooltipModule
];

const COMPONENTS = [
  DefaultLayoutComponent, SearchOptionLayoutComponent,
  SidebarComponent, LoadingComponent, ModalComponent,
  RefreshBtnComponent, SearchBarComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ...MATERIAL_MODULES],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...MATERIAL_MODULES, ...COMPONENTS]
})
export class SharedModule {}