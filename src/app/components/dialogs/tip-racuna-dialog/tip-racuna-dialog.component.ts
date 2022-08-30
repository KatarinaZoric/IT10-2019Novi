import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/tip_racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';


@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {
  public flag!:number;

  constructor(public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipRacuna,
    public tipRacunaService:TipRacunaService
    
    
    ) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.tipRacunaService.addTipRacuna(this.data).subscribe(() => {
      this.snackbar.open('Uspešno dodat tip računa!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() : void {
    this.tipRacunaService.updateTipRacuna(this.data).subscribe(() => {
      this.snackbar.open('Uspešno izmenjen tip računa!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() : void {
    this.tipRacunaService.deleteTipRacuna(this.data.id).subscribe(() => {
      this.snackbar.open('Uspešno obrisan tip računa!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackbar.open('Odustali ste od izmena.', 'Zatvori', {duration:1000});
  }

}
