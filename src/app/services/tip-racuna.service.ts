import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipRacuna } from '../models/tip_racuna';
import { TIPRACUNA_URL } from '../app.constants';


@Injectable({
  providedIn: 'root'
})
export class TipRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getAllTipRacuna(): Observable<any>{
    return this.httpClient.get(`${TIPRACUNA_URL}`);;
  }

  public addTipRacuna (tipRacuna:TipRacuna): Observable<any> {
    tipRacuna.id = 0;
   return this.httpClient.post(`${TIPRACUNA_URL}`, tipRacuna);
  

  }

  public updateTipRacuna (tipRacuna:TipRacuna): Observable<any> {
    return this.httpClient.put(`${TIPRACUNA_URL}`, tipRacuna);
 
   }

   public deleteTipRacuna (id:number): Observable<any> {
    return this.httpClient.delete(`${TIPRACUNA_URL}/${id}`);
 
   }
}