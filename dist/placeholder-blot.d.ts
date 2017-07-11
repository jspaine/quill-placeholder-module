import { default as ParchmentTypes } from 'parchment';
import { Placeholder } from './placeholder';
export declare const Embed: typeof ParchmentTypes.Embed;
export default class PlaceholderBlot extends Embed {
    static blotName: string;
    static tagName: string;
    static className: string;
    static delimiters: Array<string>;
    domNode: HTMLElement;
    static create(value: Placeholder): HTMLElement;
    static value(domNode: HTMLElement): DOMStringMap;
    length(): number;
    deleteAt(index: number, length: number): void;
}
