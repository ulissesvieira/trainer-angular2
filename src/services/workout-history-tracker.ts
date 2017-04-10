import { Injectable } from '@angular/core'
import { ExercisePlan } from '../components/workout-runner/model';
import { LocalStorage } from './local-storage';

@Injectable()
export class WorkoutHistoryTracker {
    private maxHistoryTracker : number = 20; // tracking last 20 exercises
    private currentWorkoutLog : WorkoutLogEntry = null;
    private workoutHistory : Array<WorkoutLogEntry> = [];
    private workoutTracker : boolean;
    private storageKey : string = "workouts";

    constructor (private storage : LocalStorage) {
        this.workoutHistory = (storage.getItem<Array<WorkoutLogEntry>>(this.storageKey) || [])
            .map((item : WorkoutLogEntry) => {
                item.startedOn = new Date(item.startedOn.toString());
                item.endedOn = item.endedOn == null ? null : new Date(item.endedOn.toString());

                return item;
            });
    }

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
        this.storage.setItem(this.storageKey, this.workoutHistory);
    }

    exerciseComplete (exercise : ExercisePlan) {
        this.currentWorkoutLog.lastExercise = exercise.exercise.title;
        ++this.currentWorkoutLog.exercisesDone;

        this.storage.setItem(this.storageKey, this.workoutHistory)
    }

    endTracking (completed : boolean) {
        this.currentWorkoutLog.completed = completed;
        this.currentWorkoutLog.endedOn = new Date();
        
        // clean the pointer
        this.currentWorkoutLog = null;
        this.workoutTracker = false;

        this.storage.setItem(this.storageKey, this.workoutHistory)
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