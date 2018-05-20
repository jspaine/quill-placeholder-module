import * as Quill from 'quill'
import getPlaceholderModule from '../src/placeholder-module'

describe('the module', function() {
  let quill, editor, toolbar

  describe('adding placeholders', function() {
    before(function() {
      fixture.setBase('test/fixtures')
      Quill.register('modules/placeholder', getPlaceholderModule(Quill), true)
    })

    beforeEach(function() {
      fixture.load('editor.html')

      quill = new Quill('#editor-container', {
        modules: {
          toolbar: {container: `#toolbar`},
          placeholder: {
            delimiters: ['<', '>'],
            placeholders: [
              {id: 'foo', label: 'Foo'},
              {id: 'required', label: 'Required', required: true}
            ]
          }
        },
        theme: 'snow'
      })

      const container = fixture.el.firstChild
      toolbar = $(container).find('.ql-toolbar')
      editor = $(container).find('.ql-editor')
    })

    afterEach(function() {
      fixture.cleanup()
    })

    it('creates the toolbar and editor', function() {
      expect(toolbar).to.have.property('length', 1)
      expect(editor).to.have.property('length', 1)
    })

    it('adds a placeholder', function() {
      const buttons = toolbar.find('.ql-placeholder .ql-picker-item')
      buttons[1].click()

      const placeholder = editor.find('.ql-placeholder-content')

      expect(placeholder).to.have.property('length', 1)
      expect(placeholder.attr('class')).to.equal('ql-placeholder-content')
      expect(placeholder.attr('data-id')).to.equal('foo')
      expect(placeholder.attr('data-label')).to.equal('Foo')
      expect(placeholder.text()).to.contain('<Foo>')
    })

    it('deletes a placeholder', function() {
      toolbar.find('.ql-placeholder .ql-picker-item')[1].click()
      quill.deleteText(0, 1, 'user')

      expect(editor.find('.ql-placeholder-content')).to.have.property('length', 0)
    })

    it('doesn\'t delete a required placeholder', function() {
      toolbar.find('.ql-placeholder .ql-picker-item')[2].click()
      quill.deleteText(0, 1, 'user')

      expect(editor.find('.ql-placeholder-content')).to.have.property('length', 1)
    })
  })

  describe('custom className', function() {
    before(function() {
      fixture.setBase('test/fixtures')
      Quill.register('modules/placeholder', getPlaceholderModule(Quill, {className: 'ql-placeholder-foo'}), true)
    })

    beforeEach(function() {
      fixture.load('class-names.html')

      quill = new Quill('#editor-container', {
        modules: {
          toolbar: {container: `#toolbar`},
          placeholder: {
            delimiters: ['<', '>'],
            placeholders: [
              {id: 'foo', label: 'Foo'},
              {id: 'required', label: 'Required', required: true}
            ]
          }
        },
        theme: 'snow'
      })

      const container = fixture.el.firstChild
      toolbar = $(container).find('.ql-toolbar')
      editor = $(container).find('.ql-editor')
    })

    afterEach(function() {
      fixture.cleanup()
    })

    it('doesnt interfere with existing spans', function() {
      expect(editor.prop('innerHTML')).to.eql('<p>Foo</p>')
    })

    it('allows setting custom class name', function() {
      const buttons = toolbar.find('.ql-placeholder .ql-picker-item')
      buttons[1].click()

      const placeholder = editor.find('.ql-placeholder-foo')
      expect(placeholder).to.have.length(1)
    })
  })
})
