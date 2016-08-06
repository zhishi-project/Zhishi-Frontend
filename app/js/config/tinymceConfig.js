export default {
  forContent: selector => {
    return {
      selector: `#${selector}`,
      menubar: 'edit insert view format table tools',
      // menubar: false,
      toolbar: 'bold italic blockquote | ' +
      'codesample link | bullist numlist | ' +
      'forecolor backcolor | undo redo | emoticons ',
      plugins: ['link image wordcount spellchecker ' +
      'insertdatetime codesample code textpattern ' +
      'autosave autolink textcolor colorpicker emoticons'],
      textpattern_patterns: [
        {start: '_', end: '_', format: 'italic'},
        {start: '*', end: '*', format: 'bold'},
        {start: '#', format: 'h1'},
        {start: '##', format: 'h2'},
        {start: '###', format: 'h3'},
        {start: '####', format: 'h4'},
        {start: '#####', format: 'h5'},
        {start: '######', format: 'h6'},
        {start: '`', end: '`', format: 'code'},
        {start: '```', end: '```', format: 'blockquote'},
        {start: '1. ', cmd: 'InsertOrderedList'},
        {start: '* ', cmd: 'InsertUnorderedList'},
        {start: '- ', cmd: 'InsertUnorderedList'}
      ],
      content_css: '../css/main.css',
      min_height: 200
    };

  },

  forTitle: selector => {
    return {
      selector: selector,
      inline: true,
      toolbar: 'undo redo',
      plugins: [],
      menubar: false,
      custom_shortcuts: false
    };
  }

};
