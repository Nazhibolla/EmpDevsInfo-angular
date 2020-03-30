import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Material from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatChipsModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ],
  exports: [
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatChipsModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatDialogModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ]
})
export class MaterialModule {}
