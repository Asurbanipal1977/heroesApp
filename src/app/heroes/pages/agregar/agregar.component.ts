import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img { width: 50%; border-radius: 5px}
    `
  ]
})
export class AgregarComponent implements OnInit {

  publisher = [
    {
        id: 'DC Comics',
        desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }; 

  constructor(private heroesService: HeroesService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.activateRoute.params
    .pipe( switchMap (({id}) => this.heroesService.getHeroePorId(id)))
    .subscribe(heroe => this.heroe=heroe);
  }

  guardar(){
    if ( this.heroe.superhero.trim().length === 0)
      return;

     if( this.heroe.id ) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe(heroe => 
        {
          this.mostrarSnackBar('Registro actualizado');
          this.router.navigate([`/heroes/listado`]);
        }
      );
     }
     else
     {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => 
        {
          this.mostrarSnackBar('Registro creado');
          this.router.navigate([`/heroes/editar`,heroe.id]);
        });
     }
  }

  borrar(){
      const dialog = this.dialog.open(ConfirmarComponent, {
        width: '250px',
        data: {...this.heroe}
      });

      dialog.afterClosed().subscribe(result => {
          if (result)
          {
            this.heroesService.borrarHeroe(this.heroe).subscribe(heroe => 
              {
                this.mostrarSnackBar('Registro eliminado');
                this.router.navigate([`/heroes/listado`]);
              });
          }
        }
      );
   }

   mostrarSnackBar ( mensaje: string){
     this.snackBar.open (mensaje, 'ok!', 
      {
        duration: 2500,
      })
   }
}
