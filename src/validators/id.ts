import { FormControl } from '@angular/forms';

export class idvalidator {

	static isValid(control: FormControl): any {
		if (control.value >= 12100000 && control.value < 18210000){ return null; }
return {"notOldEnough": true};
	}
}