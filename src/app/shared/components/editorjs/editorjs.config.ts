import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';
import { EditorConfig } from '@editorjs/editorjs';

export const editorjsConfig: EditorConfig = {
  autofocus: true,
  placeholder: 'Start creating your workshop...',
  minHeight: 30,
  holder: 'editorjs',
  tools: {
    underline: Underline,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+M',
    },
    Embed : {
      class : Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          gfycat: true,
          twitter: true,
          codepen: true
        }
      }
    },
    Marker :{
      class : Marker,
      shortcut : 'CMD+SHIFT+M'
    },
    header: {
      class: Header,
      inlineToolbar: [
        'link', 'bold', 'italic'
      ]
    },
    list: {
      class: List,
      inlineToolbar: [
        'link','bold'
      ]
    }
  }
}
