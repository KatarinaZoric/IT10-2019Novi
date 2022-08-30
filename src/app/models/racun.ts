import { Klijent } from "./klijent";
import { TipRacuna } from "./tip_racuna";

export class Racun {
    id!: number;
    opis!: string;
    naziv!: string;
    oznaka!: string;
    tipRacuna!: TipRacuna;
    klijent!: Klijent;
}