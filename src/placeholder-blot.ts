import {Quill} from 'quill'
import {default as ParchmentTypes} from 'parchment'

import {Placeholder} from './placeholder'

export const Embed: typeof ParchmentTypes.Embed = Quill.import('blots/embed')

export default class PlaceholderBlot extends Embed {
  static blotName = 'placeholder'
  static tagName = 'span'
  static className: string
  static delimiters: Array<string>
  public domNode: HTMLElement

  static create(value: Placeholder) {
    let node: HTMLElement = <HTMLElement>super.create(value)

    if (value.required) node.setAttribute('data-required', 'true')
    node.setAttribute('data-id', value.id)
    node.setAttribute('data-label', value.label)
    node.setAttribute('spellcheck', 'false')

    const {delimiters} = PlaceholderBlot
    const label = typeof delimiters === 'string' ?
      `${delimiters}${value.label}${delimiters}` :
      `${delimiters[0]}${value.label}${delimiters[1] || delimiters[0]}`

    const labelNode = document.createTextNode(label)

    const wrapper = document.createElement('span')
    wrapper.setAttribute('contenteditable', 'false')
    wrapper.appendChild(labelNode)

    node.appendChild(wrapper)

    return node
  }

  static value(domNode: HTMLElement): DOMStringMap {
    return domNode.dataset
  }

  length(): number {
    return 1
  }

  deleteAt(index: number, length: number): void {
    if (!this.domNode.dataset.required)
      super.deleteAt(index, length)
  }
}
