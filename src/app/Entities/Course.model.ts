

export class Course {
    id!: number;
    name?: string;
    categoryId?: number;
    lessonsAmount?: number;
    startLearning?: Date;
    syllabus?: string[];
    learningType?: LearningType;
    lecturerId?: number;
    imgLink?: string;
} 

export enum LearningType {
    "zoom" = 0,
    "frontal" = 1
}