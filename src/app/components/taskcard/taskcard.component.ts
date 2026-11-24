import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-taskcard',
  templateUrl: './taskcard.component.html',
  styleUrl: './taskcard.component.scss'
})
export class TaskcardComponent {
  @Input({ required: true }) task!: any;
  @Output() edit = new EventEmitter<any>();
  @Output() statusChange = new EventEmitter<{ id: any; status: any }>();
  @Output() delete = new EventEmitter<any>();


  readonly statuses: any[] = ['Todo', 'In Progress', 'Done'];


  onStatusChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value;
    this.statusChange.emit({ id: this.task.id, status: status as any });
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(id: any): void {
    this.delete.emit(id);
  }
}
