import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: true
})
export class ImagenPipe implements PipeTransform {  

  transform(heroe: Heroe): string {
    let imagenFinal: string = '';
    if (!heroe.id && !heroe.alt_img)  {
      imagenFinal = `assets/no-image.png`;
    }
    else if (heroe.alt_img)
      imagenFinal = heroe.alt_img;
    else
    {
      imagenFinal = `assets/heroes/${heroe.id}.jpg`;
    }

    return imagenFinal;
  }

}
