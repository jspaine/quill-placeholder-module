# quill-placeholder-module
Quill module for adding placeholders. [Demo](https://codepen.io/jspaine/pen/MozyNp)

## Usage
```js
import PlaceholderModule from 'quill-placeholder-module'
// es5
var PlaceholderModule = require('quill-placeholder-module').default
// umd
var PlaceholderModule = PlaceholderModule.default

Quill.register('modules/placeholder', PlaceholderModule)

var quill = new Quill('#editor', {
  modules: {
    toolbar: {container: `#toolbar`},
    placeholder: {
      delimiters: ['{', '}'],               // default
      className: 'ql-placeholder-content',  // default
      placeholders: [
        {id: 'foo', label: 'Foo'},
        {id: 'required', label: 'Required', required: true}
      ]
    }
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
```
Define the toolbar menu (a more complete example can be found in the [demo](https://codepen.io/jspaine/pen/MozyNp)):
```html
<div id="toolbar">
  <select class="ql-placeholder">
    <option value="foo">Foo</option>
    <option value="required">Required</option>
  </select>
</div>
<div id="editor"></div>
```
And include the css from `dist/toolbar.css`.

The markup will contain (with default options) `<span class="ql-placeholder-content" data-id="placeholder-id" data-label="placeholder-label">...</span>`
