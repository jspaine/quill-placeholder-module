declare namespace Quill {
  export interface Quill {
    version: string
    sources: {
      [source: string]: Sources
    };
    events: {
      [event: string]: string
    };
    getIndex(blot: any): number;
    root: HTMLElement;
  }
  export interface EditorEventTarget extends EventTarget {
    parentNode: HTMLElement;
  }
  export interface EditorEvent extends Event {
    target: EditorEventTarget;
  }
}
