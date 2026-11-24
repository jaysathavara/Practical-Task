import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() task: any | null = null;
  @Input() saveError: string | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    assignee: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    dueDate: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });
  submitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ((!changes['task'] && !changes['isOpen']) || !this.isOpen) {
      return;
    }

    const dueDateValidators: ValidatorFn[] = [Validators.required];
    if (!this.task) {
      dueDateValidators.push(notPastDateValidator);
    }
    this.form.controls.dueDate.setValidators(dueDateValidators);
    this.form.reset({
      title: this.task?.title ?? '',
      assignee: this.task?.name ?? '',
      dueDate: this.task ? this.toDateInputValue(this.task.dueDate) : ''
    });
    this.submitted = false;
  }

  get minimumDate(): string {
    return this.toDateInputValue(Date.now() / 1000);
  }

  shouldShowError(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty || this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.save.emit(this.form.getRawValue());
  }

  private toDateInputValue(timestampSeconds: number): string {
    const date = new Date(timestampSeconds * 1000);
    if (Number.isNaN(date.getTime())) {
      return '';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  get f() {
  return this.form.controls;
}
}

const notPastDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string;
  if (!value) {
    return null;
  }

  const selectedDate = new Date(`${value}T00:00:00`);
  if (Number.isNaN(selectedDate.getTime())) {
    return { invalidDate: true };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate < today ? { pastDate: true } : null;
};

