import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {width: 70%; border-radius: 5px}
    `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private location: Location
    ){ 
      
    };

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroePorId(id)))
        .subscribe(heroe => this.heroe = heroe);
  }
  regresar () {
    this.location.back();
  }

}