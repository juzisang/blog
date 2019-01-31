import { ofType } from 'vue-tsx-support';
import { TransitionPropsBase } from 'vue-tsx-support/types/builtin-components';
const { ExpandTransition, FadeTransition, SlideTopTransition, SlideBottomTransition, SlideLeftTransition, SlideRightTransition, PopoverTransiton, BottomSheetTransition, ScaleTransition } = require('muse-ui/lib/internal/transitions');

export const MuFadeTransition = ofType<TransitionPropsBase>().convert(FadeTransition);
export const MuSlideTopTransition = ofType<TransitionPropsBase>().convert(SlideTopTransition);
export const MuSlideBottomTransition = ofType<TransitionPropsBase>().convert(SlideBottomTransition);
export const MuSlideLeftTransition = ofType<TransitionPropsBase>().convert(SlideLeftTransition);
export const MuSlideRightTransition = ofType<TransitionPropsBase>().convert(SlideRightTransition);
export const MuPopoverTransiton = ofType<TransitionPropsBase>().convert(PopoverTransiton);
export const MuBottomSheetTransition = ofType<TransitionPropsBase>().convert(BottomSheetTransition);
export const MuScaleTransition = ofType<TransitionPropsBase>().convert(ScaleTransition);
export const MuExpandTransition = ofType<TransitionPropsBase>().convert(ExpandTransition);
