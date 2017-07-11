/// <reference types="quill" />
import { ModuleOptions } from './module-options';
export declare class PlaceholderModule {
    private quill;
    private placeholders;
    constructor(quill: Quill.Quill, options: ModuleOptions);
    onTextChange: (_: any, oldDelta: Quill.DeltaStatic, source: Quill.Sources) => void;
    onClick: (ev: Quill.EditorEvent) => void;
    toolbarHandler: (identifier: string) => void;
}
