import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tip_racuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnChanges, OnInit {

  constructor(private racunService: RacunService,
    private dialog: MatDialog) { }

  displayedColumns = ['id', 'opis', 'naziv', 'oznaka', 'tipRacuna', 'actions'];
  dataSource: MatTableDataSource<Racun>;

  @Input() selektovaniKlijent: Klijent;
  subscription: Subscription;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;



  ngOnChanges(): void {
    if (this.selektovaniKlijent.id) {
      this.loadData();
    }
  }

  ngOnInit(): void {
    this.loadData()
  }


  public loadData() {
    this.racunService.getRacuniZaKlijenta(this.selektovaniKlijent.id).subscribe
      (data => {
        this.dataSource = new MatTableDataSource(data)

        //pretraga po nazivu ugnjezdenog objekta
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return (key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key]);
          }
          const dataStr = Object.keys(data).reduce(accumulator, '').toLocaleLowerCase();
          const transformedFilter = filter.trim().toLocaleLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        }
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }


  public openDialog(flag: number, id?: number, opis?: string, naziv?: string, oznaka?: string, tipRacuna?: TipRacuna, klijent?: Klijent) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {
      data: { id, opis, naziv, oznaka, tipRacuna, klijent }
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.klijent = this.selektovaniKlijent;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    }
    )
  }

  applyFilter(filterValue:any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
