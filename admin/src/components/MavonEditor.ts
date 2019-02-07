import { ofType } from 'vue-tsx-support';
import 'mavon-editor/dist/css/index.css';

export const MavonEditor = ofType<MavonEditorProps, MavonEditorEvents>().convert(require('mavon-editor').mavonEditor);

type MavonEditorProps = {
  value?: string;
  language?: string;
  fontSize?: string;
  scrollStyle?: boolean;
  boxShadow?: boolean;
  subfield?: boolean;
  defaultOpen?: string | 'edit' | 'preview';
  placeholder?: string;
  editable?: boolean;
  codeStyle?: string;
  toolbarsFlag?: boolean;
  navigation?: boolean;
  ishljs?: boolean;
  imageFilter?: Function;
  imageClick?: Function;
  toolbars?: MavonEditorToolbars;
};

type MavonEditorToolbars = {
  bold?: boolean;
  italic?: boolean;
  header?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  mark?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  quote?: boolean;
  ol?: boolean;
  ul?: boolean;
  link?: boolean;
  imagelink?: boolean;
  code?: boolean;
  table?: boolean;
  fullscreen?: boolean;
  readmodel?: boolean;
  htmlcode?: boolean;
  help?: boolean;
  undo?: boolean;
  redo?: boolean;
  trash?: boolean;
  save?: boolean;
  navigation?: boolean;
  alignleft?: boolean;
  aligncenter?: boolean;
  alignright?: boolean;
  subfield?: boolean;
  preview?: boolean;
};

type MavonEditorEvents = {
  onChange: any;
  onSave: any;
  onFullScreen: any;
  onReadModel: any;
  onHtmlCode: any;
  onSubfieldToggle: any;
  onPreviewToggle: any;
  onHelpToggle: any;
  onNavigationToggle: any;
  onImgAdd: any;
  onImgDel: any;
};
