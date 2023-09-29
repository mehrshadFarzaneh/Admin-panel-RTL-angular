import { TranslationService } from 'src/app/modules/i18n';
import { AppFacade } from './../../core/store/app.facade';
import { Directive, ElementRef, Renderer2, OnInit, AfterViewInit, Inject } from '@angular/core';
import { LangUtil } from 'src/app/core/utils/lang.util';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[appMenuPlacement]'
})
export class MenuPlacementDirective implements AfterViewInit {
  private itsRtl = false;
  constructor(private el: ElementRef, private renderer: Renderer2, private appFacade: AppFacade,
  private translateService: TranslationService, @Inject(DOCUMENT) private document: Document,private router: Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appFacade.setLayoutDirection(LangUtil.isRtlLang(this.translateService.getSelectedLanguage()));
    // this.translateService.getSelectedLanguage();
  }
  ngAfterViewInit() {

    this.appFacade.isLayoutDirectionRtl$.subscribe((rtl: boolean) => {

      // this.initialPlacementAttributeByLocalStorage(rtl);
      // setTimeout(() => {
      // Call the function to fetch and update elements
      // this.updateElementsWithPlacement(rtl);
      this.itsRtl = rtl;
      this.updateMenuPlacementBasedOnRTL(rtl);
      this.replaceBodyAttributeFor(rtl);
      this.replaceMainStyleFileFor(rtl);
      // }, 3000);

    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Your code to execute on every route change
        this.placementElementMustChange(this.itsRtl);
      }
    });
  }

  private initialPlacementAttributeByLocalStorage(rtl: boolean): void {
    if (true) {
      this.document.querySelectorAll('[data-kt-menu-placement="bottom-start"]').forEach(item => {
        const existingAttributes = item.attributes;
        for (let i = 0; i < existingAttributes.length; i++) {
          const attr = existingAttributes[i];
          if (attr.name === 'data-kt-menu-placement') {
            // Change the value of the data-kt-menu-placement attribute
            item.setAttribute('data-kt-menu-placement', 'bottom-end');
          }
        }
      });
      this.document.querySelectorAll('[data-kt-menu-placement="right-start"]').forEach(item => {
        // const existingAttributes = item.attributes;
        // for (let i = 0; i < existingAttributes.length; i++) {
        //   const attr = existingAttributes[i];
        //   if (attr.name === 'data-kt-menu-placement') {
        //     // Change the value of the data-kt-menu-placement attribute
        item.setAttribute('data-kt-menu-placement', 'left-start');
        //   }
        // }
      });

    } else {
      this.document.querySelectorAll('[data-kt-menu-placement="bottom-end"]').forEach(item => {
        // const existingAttributes = item.attributes;
        // for (let i = 0; i < existingAttributes.length; i++) {
        //   const attr = existingAttributes[i];
        //   if (attr.name === 'data-kt-menu-placement') {
        //     // Change the value of the data-kt-menu-placement attribute
        item.setAttribute('data-kt-menu-placement', 'bottom-right');
        //   }
        // }
      });
      this.document.querySelectorAll('[data-kt-menu-placement="left-start"]').forEach(item => {
        const existingAttributes = item.attributes;
        for (let i = 0; i < existingAttributes.length; i++) {
          const attr = existingAttributes[i];
          if (attr.name === 'data-kt-menu-placement') {
            // Change the value of the data-kt-menu-placement attribute
            item.setAttribute('data-kt-menu-placement', 'start-start');
          }
        }
      });
    }
    // setTimeout(() => {
    //
    //   const isRtl = LangUtil.isRtlLang(this.translateService.getSelectedLanguage());
    //   const elementsWithPlacement = this.document.querySelectorAll('[data-kt-menu-placement]');

    //   Array.from(elementsWithPlacement).forEach((element) => {
    //     const placementAttribute = element.getAttribute('data-kt-menu-placement');
    //     console.log('placementAttribute', placementAttribute);
    //     let newPlacementAttribute = placementAttribute;
    //     if (placementAttribute && newPlacementAttribute) {
    //       console.log(placementAttribute);
    //       if (!isRtl) {
    //         newPlacementAttribute = this.reversePlacementAttribute(placementAttribute);
    //       } else {
    //         newPlacementAttribute = this.reversePlacementAttributeForRtl(placementAttribute);
    //       }

    //       // Update the placement attribute
    //       // this.renderer.setAttribute(element, 'data-kt-menu-placement', newPlacementAttribute);
    //       element.setAttribute('data-kt-menu-placement', newPlacementAttribute);
    //     } else {
    //       alert("Error");
    //     }

    //   });
    // }, 3000);

  }

  private reversePlacementAttribute(placement: string): string {
    // Define a mapping for attribute reversal
    const placementMapping: { [key: string]: string } = {
      'bottom-start': 'bottom-end',
      'bottom-end': 'bottom-start',
      'right-start': 'left-start',
      'left-start': 'right-start',
      // Add more mappings as needed
    };

    return placementMapping[placement];
  }

  private reversePlacementAttributeForRtl(placement: string): string {
    // Define a mapping for attribute reversal
    const placementMapping: { [key: string]: string } = {
      'bottom-end': 'bottom-start',
      'bottom-start': 'bottom-end',
      'left-start': 'right-start',
      'right-start': 'left-start',
      // Add more mappings as needed
    };

    return placementMapping[placement];
  }

  private replaceBodyAttributeFor(rtl: boolean): void {
    const bodyElement = this.document.body;

    if (rtl) {
      // Add the attributes if 'isRTL' is true
      bodyElement.setAttribute('direction', 'rtl');
      bodyElement.setAttribute('dir', 'rtl');
      bodyElement.setAttribute('style', 'direction: rtl');
    } else {
      // Remove the attributes if 'isRTL' is false
      bodyElement.setAttribute('direction', 'ltr');
      bodyElement.setAttribute('dir', 'ltr');
      bodyElement.setAttribute('style', 'direction: ltr');
    }
  }

  /**
   * @doc This method change the style.css **lazily**
   */
  private replaceMainStyleFileFor(rtl: boolean) {
    const head = this.document.getElementsByTagName('head')[0];
    let style = this.document.querySelector<HTMLAnchorElement>("head > link[href='styles.css']") || this.document.querySelector<HTMLAnchorElement>("head > link[href='styles-rtl.css']");
    if (style) {
      if (!rtl) {
        style.href = 'styles.css';
      } else {
        style.id = 'client-theme';
        style.rel = 'stylesheet';
        style.href = 'styles-rtl.css';

        head.appendChild(style);
      }
    }

  }


  elementsWithPlacement: NodeListOf<Element> | [] = [];

  // Function to fetch and update the elements
  updateElementsWithPlacement(rtl: boolean) {

    if (this.elementsWithPlacement.length === 0) {
      this.elementsWithPlacement = document.querySelectorAll('[data-kt-menu-placement]');
    }
    if (this.elementsWithPlacement)
      this.elementsWithPlacement.forEach((element) => {
        const currentPlacement = element.getAttribute('data-kt-menu-placement');
        // if (rtl) {
        if (currentPlacement === 'bottom-start') {
          element.setAttribute('data-kt-menu-placement', 'bottom-end');
        } else if (currentPlacement === 'right-start') {
          element.setAttribute('data-kt-menu-placement', 'left-start');
        }
        // }
        // else {
        //   if (currentPlacement === 'bottom-end') {
        //     element.setAttribute('data-kt-menu-placement', 'bottom-start');
        //   } else if (currentPlacement === 'right-start') {
        //     element.setAttribute('data-kt-menu-placement', 'left-end');
        //   }
        // }

      });
  }


  // updateMenuPlacementBasedOnRTL(isRtl: boolean) {
  //
  //   // Find and modify the placement attributes
  //   const elementsToModify = document.querySelectorAll('[data-kt-menu-placement]');

  //   elementsToModify.forEach((element) => {
  //     const currentPlacement = element.getAttribute('data-kt-menu-placement');

  //     // Define the new placement attributes based on RTL condition
  //     let newPlacement;
  //     if (isRtl) {
  //       // RTL mode is enabled
  //       if (currentPlacement === 'bottom-start') {
  //         newPlacement = 'bottom-end';
  //       } else if (currentPlacement === 'right-start') {
  //         newPlacement = 'left-start';
  //       } else {
  //         newPlacement = currentPlacement; // Keep the existing placement
  //       }
  //     } else {
  //       // RTL mode is not enabled, keep the existing placement
  //       newPlacement = currentPlacement;
  //     }

  //     // Set the new placement attribute
  //     if (newPlacement)
  //       element.setAttribute('data-kt-menu-placement', newPlacement);
  //   });
  // }

  rtlInitialized = false;
  updateMenuPlacementBasedOnRTL(isRtl: boolean) {


    if (isRtl && !this.rtlInitialized) {
      setTimeout(() => {
        this.rtlInitialized = true;
        this.updateMenuPlacementBasedOnRTL(true);
      }, 4000);
      return;
    }

    // Find and modify the placement attributes
    const elementsToModify = document.querySelectorAll('[data-kt-menu-placement]');

    elementsToModify.forEach((element) => {
      const currentPlacement = element.getAttribute('data-kt-menu-placement');
      const originalPlacement = element.getAttribute('data-original-placement');

      if (!originalPlacement) {
        // If originalPlacement is not set, it means it's the first time
        // we are encountering this element, so we store the original placement.
        if (currentPlacement)
          element.setAttribute('data-original-placement', currentPlacement);
      }

      // Define the new placement attributes based on RTL condition
      let newPlacement;
      if (isRtl) {
        // RTL mode is enabled
        if (currentPlacement === 'bottom-start') {
          newPlacement = 'bottom-end';
        } else if (currentPlacement === 'right-start') {
          newPlacement = 'left-start';
        } else {
          newPlacement = currentPlacement; // Keep the existing placement
        }
      } else {
        // RTL mode is not enabled, restore the original placement
        newPlacement = originalPlacement || currentPlacement;
      }

      // Set the new placement attribute
      if (newPlacement) {
        element.setAttribute('data-kt-menu-placement', newPlacement);
      }
    });

    this.placementElementMustChange(isRtl);
  }
  placementElementMustChange(isRtl:boolean){
    const button = document.getElementById("more-menu__btn");
    const headerSearchInput = document.getElementById("kt_header_search");
    const notificationsInput = document.getElementById("notifications-btn__navbar");
    const quickLinkInput = document.getElementById("quick-link");
    const changeThemInput = document.querySelector('app-theme-mode-switcher > div');
    const userMenuInput = document.getElementById('user-menu__input');
    // Check if the button element exists
    try{
      if (isRtl) {
        // Update the data-kt-menu-placement attribute
        button?.setAttribute("data-kt-menu-placement", "bottom-start");
        headerSearchInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        notificationsInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        quickLinkInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        changeThemInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        userMenuInput?.setAttribute("data-kt-menu-placement", "bottom-start")
      }else {
        button?.setAttribute("data-kt-menu-placement", "bottom-end");
        headerSearchInput?.setAttribute("data-kt-menu-placement", "bottom-end")
        notificationsInput?.setAttribute("data-kt-menu-placement", "bottom-end")
        quickLinkInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        changeThemInput?.setAttribute("data-kt-menu-placement", "bottom-start")
        userMenuInput?.setAttribute("data-kt-menu-placement", "bottom-start")
      }
    }catch{
      // some element not found because we get them AOT :)
    }

  }

  // document.select
}
