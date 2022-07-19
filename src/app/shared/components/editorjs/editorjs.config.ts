import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import { EditorConfig, LogLevels } from '@editorjs/editorjs';

export const editorjsConfig: EditorConfig = {
  autofocus: true,
  placeholder: 'Start creating your workshop...',
  minHeight: 30,
  holder: 'editorjs',
  tools: {
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
