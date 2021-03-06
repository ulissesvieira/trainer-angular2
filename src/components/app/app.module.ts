import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { TrainerAppComponent } from './app.component';
import { WorkoutRunnerModule } from '../workout-runner/workout-runner.module';
import { StartModule } from '../start/start.module';
import { FinishModule } from '../finish/finish.module';
import { routing } from './app.routes';
import { ServicesModule } from '../../services/service.module';
import { HeaderComponent } from './header.component';
import { WorkoutHistoryModule } from '../workout-history/workout-history.module';

@NgModule({
    imports: [ BrowserModule, WorkoutRunnerModule, StartModule,
               FinishModule, routing, ServicesModule, WorkoutHistoryModule,
               ModalModule.forRoot(), BootstrapModalModule ],
    declarations: [ TrainerAppComponent, HeaderComponent ],
    bootstrap: [ TrainerAppComponent ]
})

export class AppModule { }