import * as Quill from 'quill'
import getPlaceholderModule from '../src/placeholder-module'

describe('the module', function() {
  let quill

  before(function() {
    fixture.setBase('test/fixtures')
    Quill.register('modules/placeholder', getPlaceholderModule(Quill))
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
  })

  afterEach(function() {
    fixture.cleanup()
  })

  it('creates the toolbar and editor', function() {
    const container = fixture.el.firstChild
    const toolbar = $(container).find('.ql-toolbar')
    const editor = $(container).find('.ql-editor')

    expect(toolbar).to.have.property('length', 1)
    expect(editor).to.have.property('length', 1)
  })

  it('adds a placeholder', function() {
    const container = fixture.el.firstChild
    const toolbar = $(container).find('.ql-toolbar')
    const editor = $(container).find('.ql-editor')

    toolbar.find('.ql-placeholder .ql-picker-item')[0].click()
    const placeholder = editor.find('.ql-placeholder-content')

    expect(placeholder).to.have.property('length', 1)
    expect(placeholder.attr('class')).to.equal('ql-placeholder-content')
    expect(placeholder.attr('data-id')).to.equal('foo')
    expect(placeholder.attr('data-label')).to.equal('Foo')
    expect(placeholder.text()).to.equal('<Foo>')
  })

  it('deletes a placeholder', function() {
    const container = fixture.el.firstChild
    const toolbar = $(container).find('.ql-toolbar')
    const editor = $(container).find('.ql-editor')

    toolbar.find('.ql-placeholder .ql-picker-item')[0].click()
    quill.deleteText(0, 1, 'user')

    expect(editor.find('.ql-placeholder-content')).to.have.property('length', 0)
  })

  it('doesn\'t delete a required placeholder', function() {
    const container = fixture.el.firstChild
    const toolbar = $(container).find('.ql-toolbar')
    const editor = $(container).find('.ql-editor')

    toolbar.find('.ql-placeholder .ql-picker-item')[1].click()
    quill.deleteText(0, 1, 'user')

    expect(editor.find('.ql-placeholder-content')).to.have.property('length', 1)
  })
})
