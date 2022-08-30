import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';


@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {
  public flag!:number;

  constructor(public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<KreditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Kredit,
    public kreditService:KreditService
    
    
    ) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.kreditService.addKredit(this.data).subscribe(() => {
      this.snackbar.open('Uspešno dodat kredit!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() : void {
    this.kreditService.updateKredit(this.data).subscribe(() => {
      this.snackbar.open('Uspešno izmenjen kredit!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() : void {
    this.kreditService.deleteKredit(this.data.id).subscribe(() => {
      this.snackbar.open('Uspešno obrisan kredit!','OK', {duration: 2500} );
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
