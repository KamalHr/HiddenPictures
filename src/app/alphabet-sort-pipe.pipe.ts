import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetSortPipe'
})
export class AlphabetSortPipePipe implements PipeTransform {
  	transform(array: Array<{name:string}>, args: string): Array<{name:string}> {
	    array.sort((a: {name:string}, b: {name:string}) => {
	      	if (a.name.toUpperCase() < b.name.toUpperCase()) {
	        	return -1;
	      	} else if (a.name.toUpperCase() > b.name.toUpperCase()) {
	        	return 1;
	      	} else {
	        	return 0;
	      	}
	    });
	    return array;
    }
}
