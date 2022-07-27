import Header from './plugins/header';
// import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import Underline from '@editorjs/underline';
import Hyperlink from 'editorjs-hyperlink';
import Tooltip from 'editorjs-tooltip';
import { EditorConfig, ToolConstructable } from '@editorjs/editorjs';

export const editorjsConfig: EditorConfig = {
  autofocus: true,
  placeholder: 'Start creating your workshop...',
  minHeight: 30,
  holder: 'editorjs',
  tools: {
    tooltip: {
      class: Tooltip,
      config: {
        location: 'top',
        highlightColor: '#FFEFD5',
        underline: true,
        backgroundColor: '#154360',
        textColor: '#FDFEFE',
        holder: 'editorjs',
      }
    },
    hyperLink: Hyperlink,
    underline: Underline,
    inlineCode: {
      class: InlineCode,
      shortcut: 'CMD+SHIFT+M',
    },
    embed: {
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
    marker :{
      class : Marker,
      shortcut : 'CMD+SHIFT+M'
    },
    header: {
      class: Header,
      inlineToolbar: [
        'hyperLink', 'bold', 'italic'
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
