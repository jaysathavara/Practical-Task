import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { TaskDashboardComponent } from './task-dashboard.component';
import { TaskServiceService } from '../../services/task-service.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskcardComponent } from '../taskcard/taskcard.component';
import { AppHighlightOverdueDirective } from '../../directives/app-highlight-overdue.directive';

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;
  let taskService: jasmine.SpyObj<TaskServiceService>;

  beforeEach(async () => {
    taskService = jasmine.createSpyObj<TaskServiceService>('TaskServiceService', [
      'getTasks',
      'getTaskByFilter',
      'updateTaskStatus',
      'deleteTask',
      'createTask',
      'updateTask'
    ]);
    taskService.getTasks.and.returnValue(of([]));
    taskService.getTaskByFilter.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [
        TaskDashboardComponent,
        TaskFormComponent,
        TaskcardComponent,
        AppHighlightOverdueDirective
      ],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: TaskServiceService, useValue: taskService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the reusable form in add mode', () => {
    component.openAddTask();

    expect(component.isTaskFormOpen).toBeTrue();
    expect(component.selectedTask).toBeNull();
  });
});
