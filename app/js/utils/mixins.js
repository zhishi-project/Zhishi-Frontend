var Mixins

Mixins = {
  initTinyMce: function(){
    tinymce.init({
      selector: ".editor-instance",
      menubar: false,
      toolbar: "bold italic | bullist numlist | link image | codesample | undo redo | tools",
      plugins: ["link image wordcount spellchecker insertdatetime codesample code textpattern autosave autolink"],
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
      content_css: "assets/css/main.css"
    })
  }
}
export default Mixins;
