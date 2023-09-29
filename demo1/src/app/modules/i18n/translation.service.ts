import { LangUtil } from './../../core/utils/lang.util';
// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppFacade } from 'src/app/core/store/app.facade';

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Private properties
  private langIds: any = [];

  constructor(private translate: TranslateService, private appFacade: AppFacade) {
    // add new langIds to the list
    this.translate.addLangs(['en']);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  setLanguage(lang: string) {
    // if (lang) {
    this.translate.use(this.translate.getDefaultLang());
    this.translate.use(lang);
    const needToChangeLayout = LangUtil.isRtlLang(this.getSelectedLanguage()) != LangUtil.isRtlLang(lang);
    localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    // make layout rtl or ltr

    this.appFacade.setLayoutDirection(LangUtil.isRtlLang(lang));
    console.log("what")
    // }
  }

  /**
   * Returns selected language
   *
   * @return string as **lang**
   */
  getSelectedLanguage(): string {
    return (
      localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) ||
      this.translate.getDefaultLang()
    );
  }
  isCurrentLanguageRtl(){
    return LangUtil.isRtlLang(this.getSelectedLanguage());
  }
}
