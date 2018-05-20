import * as QuillTypes from 'quill'
import {default as ParchmentTypes} from 'parchment'

import getPlaceholderBlot from './placeholder-blot'
import {Placeholder} from './placeholder'
import {ModuleOptions} from './module-options'

export interface ModuleType {
  new(quill: QuillTypes.Quill, options: ModuleOptions): any
}

export default function getPlaceholderModule(Quill: QuillTypes.Quill, options?: {
  className?: string
}): ModuleType {
  const Parchment: typeof ParchmentTypes = Quill.import('parchment')

  const PlaceholderBlot = getPlaceholderBlot(Quill)
  PlaceholderBlot.className = options && options.className || 'ql-placeholder-content'

  Quill.register(PlaceholderBlot)

  class PlaceholderModule {
    private placeholders: Array<Placeholder>

    constructor(private quill: QuillTypes.Quill, options: ModuleOptions) {
      this.placeholders = options.placeholders
      PlaceholderBlot.delimiters = options.delimiters || ['{', '}']

      this.quill.getModule('toolbar').addHandler('placeholder', this.toolbarHandler)
      this.quill.root.addEventListener('click', <EventListener>this.onClick)
      this.quill.on('text-change', this.onTextChange)
    }

    onTextChange = (_: any, oldDelta: QuillTypes.DeltaStatic, source: QuillTypes.Sources) => {
      if (source === Quill.sources.USER) {
        const currrentContents = this.quill.getContents()
        const delta = currrentContents.diff(oldDelta)

        const shouldRevert = delta.ops.filter(op => op.insert &&
          op.insert.placeholder && op.insert.placeholder.required).length

        if (shouldRevert) {
          this.quill.updateContents(delta, Quill.sources.SILENT)
        }
      }
    }

    onClick = (ev: QuillTypes.EditorEvent) => {
      const blot = Parchment.find(ev.target.parentNode)

      if (blot instanceof PlaceholderBlot) {
        const index = this.quill.getIndex(blot)
        this.quill.setSelection(index, blot.length(), Quill.sources.USER)
      }
    }

    toolbarHandler = (identifier: string) => {
      const selection = this.quill.getSelection()
      const placeholder = this.placeholders.filter((pl: Placeholder) => pl.id === identifier)[0]
      if (!placeholder) throw new Error(`Missing placeholder for ${identifier}`)

      this.quill.deleteText(selection.index, selection.length)
      this.quill.insertEmbed(selection.index, 'placeholder', placeholder, Quill.sources.USER)
      this.quill.setSelection(selection.index + 1, 0)
    }
  }

  return PlaceholderModule
}


