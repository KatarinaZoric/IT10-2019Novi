import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip_racuna';
import { KlijentService } from 'src/app/services/klijent.service';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';


@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  public flag!:number;
  tipovi_racuna: TipRacuna[];
  


  constructor(public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Racun,
    public racunService:RacunService,
    public tipRacunaService: TipRacunaService
    ) { }

    ngOnInit(): void {
      this.tipRacunaService.getAllTipRacuna().subscribe(
        data=> {
          this.tipovi_racuna=data;
        }
      ),
      (error:Error) => {
        console.log(error.name + ' ' + error.message);
      }
    }

    public compareTo(a:any, b:any){
      return a.id == b.id
    }
   
  
  public add() : void {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackbar.open('Uspešno dodat račun!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() : void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackbar.open('Uspešno izmenjen račun!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() : void {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackbar.open('Uspešno obrisan klijent!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackbar.open('Odustali ste od izmena.', 'Zatvori', {duration:1000});
  }

}
