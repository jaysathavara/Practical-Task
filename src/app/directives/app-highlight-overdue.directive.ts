import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightOverdue]',
})
export class AppHighlightOverdueDirective implements OnChanges {

  @Input() appHighlightOverdue!: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    const dueDate = new Date(this.appHighlightOverdue.dueDate * 1000);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (
      !Number.isNaN(dueDate.getTime()) &&
      dueDate < today &&
      this.appHighlightOverdue.status !== 'Done'
    ) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        '#fff1ee'
      );
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    }
  }
}