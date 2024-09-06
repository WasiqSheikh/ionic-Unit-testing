import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMob'
})
export class FormatMobPipe implements PipeTransform {

  transform(value: number, country?:string): string {
    let code = "+92-"
    if(country == "USA") code = "+1-"
     return code + value;
    }

}
