import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReplaceKtMenuPlacementDirective]'
})
export class ReplaceKtMenuPlacementDirectiveDirective {
  @Input() appReplaceKtMenuPlacement: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const attributesToReplace: { [key: string]: string } = {
      'data-kt-menu-placement="bottom-start"': 'data-kt-menu-placement="bottom-end"',
      'data-kt-menu-placement="right-start"': 'data-kt-menu-placement="left-start"'
    };

    const element = this.el.nativeElement;

    // Get the original attribute
    const originalAttribute = `data-kt-menu-placement="${this.appReplaceKtMenuPlacement}"`;

    // Check if it needs replacement
    if (attributesToReplace[originalAttribute]) {
      // Get the replacement attribute
      const replacementAttribute = attributesToReplace[originalAttribute];

      // Replace the attribute
      this.renderer.setAttribute(element, 'data-kt-menu-placement', replacementAttribute);
    }
  }
}
