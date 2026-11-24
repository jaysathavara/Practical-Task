import { NgModule } from '@angular/core';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TaskcardComponent } from './components/taskcard/taskcard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { AppHighlightOverdueDirective } from './directives/app-highlight-overdue.directive';

@NgModule({
  declarations: [
    TaskDashboardComponent,
    AppComponent,
        TaskcardComponent,
        TaskFormComponent,
        AppHighlightOverdueDirective

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    
],
  bootstrap: [AppComponent]
})
export class AppModule { }
