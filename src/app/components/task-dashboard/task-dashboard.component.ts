import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../../services/task-service.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.scss'
})
export class TaskDashboardComponent implements OnInit {
  tasks: any[] = [];
  searchBox: any = new FormControl('');
  selectedStatus: string | '' = '';
  selectedPriority: string | '' = '';
  isTaskFormOpen = false;
  selectedTask: any | null = null;
  taskSaveError: string | null = null;

  constructor(
    private taskService: TaskServiceService
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.searchBox.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => this.taskService.getTaskByFilter(searchTerm, 'title'))
    ).subscribe({
      next: (tasks:any) => {
        this.tasks = tasks;
      },
      error: (err: any) => {
        console.error('Error searching tasks:', err);
      }
    });
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  onStatusChange(event: any): void {
    this.taskService.updateTaskStatus(event.id, { status: event.status }).subscribe({
      next: () => this.getTasks(),
      error: (error) => console.error('Error updating task status:', error)
    });
  }

  onFilterStatus(): void {
    if (!this.selectedStatus) {
      this.getTasks();
      return;
    }
    this.taskService.getTaskByFilter(this.selectedStatus, 'status').subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error('Error filtering tasks by status:', error)
    });
  }

  onFilterPriority(): void {
    if (!this.selectedPriority) {
      this.getTasks();
      return;
    }
    this.taskService.getTaskByFilter(this.selectedPriority, 'priority').subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error('Error filtering tasks by priority:', error)
    });
  }

  openAddTask(): void {
    this.selectedTask = null;
    this.taskSaveError = null;
    this.isTaskFormOpen = true;
  }

  openEditTask(task: any): void {
    this.selectedTask = task;
    this.taskSaveError = null;
    this.isTaskFormOpen = true;
  }

  closeTaskForm(): void {
    this.isTaskFormOpen = false;
    this.selectedTask = null;
    this.taskSaveError = null;
  }

  saveTask(formValue: any): void {
    const taskData: Omit<any, 'id'> = {
      title: formValue.title.trim(),
      name: formValue.assignee.trim(),
      dueDate: Math.floor(new Date(`${formValue.dueDate}T00:00:00`).getTime() / 1000),
      status: this.selectedTask?.status ?? 'Todo',
      priority: this.selectedTask?.priority ?? 'Medium'
    };
    const request = this.selectedTask
      ? this.taskService.updateTask(this.selectedTask.id, taskData)
      : this.taskService.createTask(taskData);

    this.taskSaveError = null;
    request.subscribe({
      next: () => {
        this.closeTaskForm();
        this.getTasks();
      },
      error: (error) => {
        console.error('Error saving task:', error);
        this.taskSaveError = 'Unable to save the task. Please try again.';
      }
    });
  }

  onDelete(id: any): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.getTasks(),
      error: (error) => console.error('Error deleting task:', error)
    });
  }
}
