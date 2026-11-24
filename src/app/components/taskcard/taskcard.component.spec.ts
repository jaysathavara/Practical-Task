import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskcardComponent } from './taskcard.component';
import { AppHighlightOverdueDirective } from '../../directives/app-highlight-overdue.directive';
import { Task } from '../../models/task.model';

describe('TaskcardComponent', () => {
  let component: TaskcardComponent;
  let fixture: ComponentFixture<TaskcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskcardComponent, AppHighlightOverdueDirective],
      imports: [CommonModule, FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskcardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Task title',
      name: 'Alex',
      dueDate: Math.floor(Date.now() / 1000) + 86400,
      status: 'Todo',
      priority: 'Medium'
    } satisfies Task);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
