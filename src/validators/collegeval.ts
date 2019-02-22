import { FormControl } from '@angular/forms';

export class collegeval {

	static isValid(control: FormControl): any {
		if (control.value != ""){ return null; }
return {"notOldEnough": true};
	}
}
