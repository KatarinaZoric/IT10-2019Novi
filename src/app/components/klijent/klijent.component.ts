import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy{

  constructor(private klijentService: KlijentService,
              private dialog:MatDialog) { }

  displayedColumns = ['id', 'brojLk', 'ime', 'prezime', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  selektovaniKlijent: Klijent;
  subscription: Subscription;
  @ViewChild(MatSort, {static:false}) sort:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator:MatPaginator;



  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
  ngOnInit(): void {

    this.loadData();

  }

  public loadData() {

    this.subscription = this.klijentService.getAllKlijent().subscribe(
      data => {
        
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return (key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key]);
          }
          const dataStr = Object.keys(data).reduce(accumulator, '').toLocaleLowerCase();
          const transformedFilter = filter.trim().toLocaleLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        }
      }),
      
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    };
    
    ;

  }

  public openDialog(flag: number, id?: number, brojLk?: number, ime?: string, prezime?:string, kredit?:Kredit) : void {
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data:{id, brojLk, ime, prezime, kredit}});

    dialogRef.componentInstance.flag=flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res==1)
      {
        this.loadData();
      }
    })
  }
  selectRow (row: any) {
    //console.log(row);
    this.selektovaniKlijent = row;
    console.log(this.selektovaniKlijent);
  }

  applyFilter(filterValue:any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
