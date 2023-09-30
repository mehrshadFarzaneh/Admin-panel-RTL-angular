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
    this.appFacade.setLayoutDirection(LangUtil.isRtlLang(this.translateService.getSelectedLanguage()));
  }
  ngAfterViewInit() {

    this.appFacade.isLayoutDirectionRtl$.subscribe((rtl: boolean) => {
      this.itsRtl = rtl;
      this.updateMenuPlacementBasedOnRTL(rtl);
      this.replaceBodyAttributeFor(rtl);
      this.replaceMainStyleFileFor(rtl);

    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Your code to execute on every route change
        this.placementElementMustChange(this.itsRtl);
      }
    });
  }


/**
   * @doc This method change the attributes of body for RTL or LRT
   */
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
   * @doc This method change the styles.css **lazily** with styles-rtl.css
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

  //#region Replace all popover positions
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
  //#endymion
}
