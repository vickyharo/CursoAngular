import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../../../core/models/articulo';

@Component({
  selector: 'app-dialogoarticulo',
  standalone: false,
  templateUrl: './dialogoarticulo.component.html',
  styleUrl: './dialogoarticulo.component.css'
})
export class DialogoarticuloComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogoarticuloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Articulo) { }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }
}
