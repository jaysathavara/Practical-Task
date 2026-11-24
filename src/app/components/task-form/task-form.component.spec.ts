import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskFormComponent } from './task-form.component';
import { Task } from '../../models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [CommonModule, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enforce required fields, title length, and a non-past creation date', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(component.form.invalid).toBeTrue();

    component.form.controls.title.setValue('Four');
    component.form.controls.assignee.setValue('Alex');
    component.form.controls.dueDate.setValue(yesterdayInputValue());
    expect(component.form.controls.title.hasError('minlength')).toBeTrue();
    expect(component.form.controls.dueDate.hasError('pastDate')).toBeTrue();
  });

  it('should allow an existing task to keep a past due date while editing', () => {
    fixture.componentRef.setInput('task', {
      id: 1,
      title: 'Existing task',
      name: 'Alex',
      dueDate: yesterdayTimestamp(),
      status: 'Todo',
      priority: 'Medium'
    } satisfies Task);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(component.form.controls.dueDate.hasError('pastDate')).toBeFalse();
  });

  function yesterdayInputValue(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function yesterdayTimestamp(): number {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);
    return Math.floor(date.getTime() / 1000);
  }
});
