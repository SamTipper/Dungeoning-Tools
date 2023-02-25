import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const splitString: string[] = value.split(" ");
    let newWord: string = "";

    splitString.forEach(word => {
      if (word.length > 3){
        newWord += `${word.charAt(0).toUpperCase() + word.substring(1)} `;
      } else {
        newWord += `${word} `;
      }
    });
    return newWord.trimEnd();
  }

}
