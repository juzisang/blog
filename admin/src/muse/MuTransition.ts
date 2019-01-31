import { ofType } from 'vue-tsx-support';
import { TransitionPropsBase } from 'vue-tsx-support/types/builtin-components';
const { FadeTransition, SlideTopTransition, SlideBottomTransition, SlideLeftTransition, SlideRightTransition, PopoverTransiton, BottomSheetTransition, ScaleTransition } = require('muse-ui/lib/internal/transitions');

export const MuFadeTransition = ofType<TransitionPropsBase>().convert(FadeTransition);
export const MuSlideTopTransition = ofType<TransitionPropsBase>().convert(SlideTopTransition);
export const MuSlideBottomTransition = ofType<TransitionPropsBase>().convert(SlideBottomTransition);
export const MuSlideLeftTransition = ofType<TransitionPropsBase>().convert(SlideLeftTransition);
export const MuSSlideRightTransition = ofType<TransitionPropsBase>().convert(SlideRightTransition);
export const MuSPopoverTransiton = ofType<TransitionPropsBase>().convert(PopoverTransiton);
export const MuSBottomSheetTransition = ofType<TransitionPropsBase>().convert(BottomSheetTransition);
export const MuSScaleTransition = ofType<TransitionPropsBase>().convert(ScaleTransition);
