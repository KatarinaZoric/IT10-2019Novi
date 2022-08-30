import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';
import { KreditDialogComponent } from '../dialogs/kredit-dialog/kredit-dialog.component';

@Component({
  selector: 'app-kredit',
  templateUrl: './kredit.component.html',
  styleUrls: ['./kredit.component.css']
})
export class KreditComponent implements OnInit, OnDestroy{

  constructor(private kreditService: KreditService, 
              private dialog:MatDialog) { }

  displayedColumns = ['id', 'opis', 'naziv', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<Kredit>;
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

    this.subscription = this.kreditService.getAllKredit().subscribe(
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
    const dialogRef = this.dialog.open(KreditDialogComponent, {data:{id, opis, naziv, oznaka}});

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
