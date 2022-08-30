import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tip_racuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit, OnDestroy{

  constructor(private tipRacunaService : TipRacunaService,
              private dialog:MatDialog) { }

  displayedColumns = ['id', 'opis', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<TipRacuna>;
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

    this.subscription = this.tipRacunaService.getAllTipRacuna().subscribe(
      data => {
        
        this.dataSource= new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;

      }

    ),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    };
    
    ;

  }

  public openDialog(flag: number, id?: number, opis?: string, naziv?: string, oznaka?:string) : void {
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data:{id, opis, naziv, oznaka}});

    dialogRef.componentInstance.flag=flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res==1)
      {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue:any) {
    filterValue = filterValue.target.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
