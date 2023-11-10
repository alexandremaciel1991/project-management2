import { Component, Inject, Input, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  message!: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: { message: string }) {}
  snackBarRef = inject(MatSnackBarRef);
  ngOnInit(): void {
    this.message = this.data.message;
  }
}
