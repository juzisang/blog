import { ofType } from 'vue-tsx-support';
import 'vue-img-inputer/dist/index.css';

export const ImgInputer = ofType<ImgInputerProps>().convert(require('vue-img-inputer').default);

type ImgInputerProps = {
  // upload
  autoUpload?: boolean;
  action?: string;
  uploadKey?: string;
  extraData?: object;
  headers?: object;
  withCookie?: boolean;
  onStart?: Function;
  onProgress?: Function;
  onSuccess?: Function;
  onError?: Function;
  // input tag
  accept?: string;
  placeholder?: string;
  id?: string;
  readonly?: boolean;
  capture?: boolean;
  maxSize?: number;
  name?: boolean;
  // view
  imgSrc?: string;
  theme?: string;
  size?: string;
  icon?: string;
  aliIcon?: string;
  noMask?: boolean;
  noHoverEffect?: boolean;
  bottomText?: string;
  readonlyTipText?: string;
  // event
  onChange?: Function;
};
