import { ElementRef, Renderer2 } from '@angular/core';
import { AppHighlightOverdueDirective } from './app-highlight-overdue.directive';
import { Task } from '../models/task.model';

describe('AppHighlightOverdueDirective', () => {
  let element: HTMLElement;
  let renderer: jasmine.SpyObj<Renderer2>;
  let directive: AppHighlightOverdueDirective;

  beforeEach(() => {
    element = document.createElement('div');
    renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle', 'removeStyle']);
    directive = new AppHighlightOverdueDirective(new ElementRef(element), renderer);
  });

  it('should highlight overdue tasks using Unix-second due dates', () => {
    directive.appHighlightOverdue = taskWithDueDate(yesterdayTimestamp(), 'Todo');
    directive.ngOnChanges();

    expect(renderer.setStyle).toHaveBeenCalledWith(element, 'background-color', '#fff1ee');
  });

  it('should remove the overdue highlight when the task is completed', () => {
    directive.appHighlightOverdue = taskWithDueDate(yesterdayTimestamp(), 'Done');
    directive.ngOnChanges();

    expect(renderer.removeStyle).toHaveBeenCalledWith(element, 'background-color');
  });

  function taskWithDueDate(dueDate: number, status: Task['status']): Task {
    return {
      id: 1,
      title: 'Task title',
      name: 'Alex',
      dueDate,
      status,
      priority: 'Medium'
    };
  }

  function yesterdayTimestamp(): number {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0, 0, 0, 0);
    return Math.floor(date.getTime() / 1000);
  }
});
