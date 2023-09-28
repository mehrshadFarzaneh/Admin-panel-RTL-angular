import { createAction, props } from "@ngrx/store";

const actionKey = '[App]';
export const changeLayoutDirectionToRtl = createAction(
  `${actionKey} Change`,
  props<{ isLayoutDirectionRtl: boolean }>()
);
