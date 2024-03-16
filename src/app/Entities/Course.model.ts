

export class Course {
    id: number =0;
    name?: string;
    categoryId?: number;
    lessonsAmount?: number;
    startLearning?: Date;
    syllabus?: string;
    learningType!: LearningType;
    lecturerId!: number;
    imgLink?: string;

    getSyllabus(): string[] {
        return this.syllabus?.split('|') || [];
      }
} 

export enum LearningType {
    "zoom" = 0,
    "frontal" = 1
}