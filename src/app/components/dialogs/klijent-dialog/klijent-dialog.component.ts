import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';


@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit {
  public flag!:number;
  krediti: Kredit[]; 
  kreditSubscription: Subscription;

  constructor(public snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<KlijentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Klijent,
    public klijentService:KlijentService, 
    public kreditService: KreditService) { }


  ngOnInit(): void {
    this.kreditSubscription=this.kreditService.getAllKredit().subscribe(
      data=> {
        this.krediti=data;
      }
    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  ngOnDestroy(): void {
    this.kreditSubscription.unsubscribe();
  }
  
  compareTo(a: { id: any; },b: { id: any; }) {
    return a.id==b.id;
  }

  public add() : void {
    this.klijentService.addKlijent(this.data).subscribe(() => {
      this.snackbar.open('Uspešno dodat klijent!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() : void {
    this.klijentService.updateKlijent(this.data).subscribe(() => {
      this.snackbar.open('Uspešno izmenjen klijent!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackbar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() : void {
    this.klijentService.deleteKlijent(this.data.id).subscribe(() => {
      this.snackbar.open('Uspešno obrisan klijent!','OK', {duration: 2500} );
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
