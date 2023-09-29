import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appAutoTranslate]',
})
export class AutoTranslateDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translateService: TranslateService
  ) {}

  ngAfterViewInit() {
    this.translateElements(this.el.nativeElement);
  }

  private translateElements(element: HTMLElement) {
    const childNodes = element.childNodes;
    childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;

        // Translate text content
        if (elementNode.textContent) {
          const translatedText = this.translateService.instant(elementNode.textContent.trim());
          this.renderer.setProperty(elementNode, 'textContent', translatedText);
        }

        // Translate attributes
        const attributesToTranslate = ['title', 'placeholder', 'alt']; // Add more attributes as needed
        attributesToTranslate.forEach((attribute) => {
          const attrValue = elementNode.getAttribute(attribute);
          if (attrValue) {
            const translatedValue = this.translateService.instant(attrValue);
            this.renderer.setAttribute(elementNode, attribute, translatedValue);
          }
        });

        // Recursively translate child elements
        this.translateElements(elementNode);
      }
    });
  }
}
