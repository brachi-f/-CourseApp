import { Pipe, PipeTransform } from '@angular/core';
import { LearningType } from '../Entities/Course.model';


@Pipe({
    name: 'learningIcon',
    standalone: true
})
export class LearningIconPipe implements PipeTransform {
    transform(value: LearningType): string {
        console.log("value pipe",value)
        if (value == 0) {
            return "computer";
        }
            return "groups";

    }
}
