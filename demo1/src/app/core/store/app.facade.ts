import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppActions from './app.actions';
import * as AppReducers from './app.reducers';
import { AppState } from './app.sate.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  private readonly store = inject(Store);

  isLayoutDirectionRtl$ = this.store.pipe(select(AppReducers.selectIsLayoutDirectionRtl));

  setLayoutDirection(isRtl: boolean) {
    this.store.dispatch(AppActions.changeLayoutDirectionToRtl({ isLayoutDirectionRtl: isRtl }));
  }
}
