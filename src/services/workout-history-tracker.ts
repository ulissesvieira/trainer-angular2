import { ExercisePlan } from '../components/workout-runner/model';

export class WorkoutHistoryTracker {
    private maxHistoryTracker : number = 20; // tracking last 20 exercises
    private currentWorkoutLog : WorkoutLogEntry = null;
    private workoutHistory : Array<WorkoutLogEntry> = [];
    private workoutTracker : boolean;

    constructor () {}

    get tracking () : boolean {
        return this.workoutTracker;
    }

    startTracking () {
        this.workoutTracker = true;
        this.currentWorkoutLog = new WorkoutLogEntry(new Date());

        if (this.workoutHistory.length >= this.maxHistoryTracker) {
            this.workoutHistory.shift();
        }

        this.workoutHistory.push(this.currentWorkoutLog);
    }

    exerciseComplete (exercise : ExercisePlan) {
        this.currentWorkoutLog.lastExercise = exercise.exercise.title;
        ++this.currentWorkoutLog.exercisesDone;
    }

    endTracking (completed : boolean) {
        this.currentWorkoutLog.completed = completed;
        this.currentWorkoutLog.endedOn = new Date();
        
        // clean the pointer
        this.currentWorkoutLog = null;
        this.workoutTracker = false;
    }

    get history () : Array<WorkoutLogEntry> {
        return this.workoutHistory;
    }
}

export class WorkoutLogEntry {
    constructor (
        public startedOn : Date,
        public completed : boolean = false,
        public exercisesDone : number = 0,
        public lastExercise? : string,
        public endedOn? : Date
    ) {}
}