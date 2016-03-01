var Common
import Assign from 'object-assign';
import Config from '../config/environment.js'

Common = {
  initTinyMceContent: function(resource_class){
    tinymce.init({
      selector: `${resource_class} .editor-content`,
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
      content_css: "/assets/css/tinymce.custom.css"
    })
  },

  initTinyMceTitle:() => {
    tinymce.init({
      selector: ".editor-title",
      inline: true,
      menubar: false,
    })
  },

  removeTinyMce: (resource_class) => {
    tinyMCE.remove(`${resource_class} .editor-content`)
  },

  serializeByKey: (array, key) => {
    var collection = {};
    array.map(item => Common.update(collection, item[key || 'id'], item))
    return collection;
  },

  update: (collection, id, updates, dont_reset_status) => {
    collection = collection ? collection : {}
    collection[id] = Assign({}, collection[id], updates);
    if (!dont_reset_status) {collection[id]['status'] = ''; }
    return collection;
  },

  createPermalink: (id, title) => {
    var sanitized_string = title.replace(/[^\w\s]/gi, '')
    var max_length = 100;
    var trimmed_string = sanitized_string.substring(0, max_length);
    if (sanitized_string.length > max_length) {
      sanitized_string = sanitized_string.substring(0, trimmed_string.lastIndexOf(' '))
    }
    sanitized_string = sanitized_string.trim().replace(/\s/g, "-");
    return `${id}-${sanitized_string}`;
  },

  sanitizeString: (text) => {
    return text.replace(/<(?:.|\n)*?>/gm, '')
  },

  sendToSlack: (meta) => {
    let data = Common.slackData(meta);
    Common.pushAtMentionsToSlack(meta, data)
    data = JSON.stringify(data);
    $.ajax({url: Config.slackZhishiChannel, type: 'POST', data: data });
  },

  slackData: (meta) => {
    let permalink = `http://${window.location.host}/questions/${Common.createPermalink(meta.id || 2, meta.title)}`
    let fallback = meta.intro;
    let text = Common.sanitizeString(meta.content);
    text = text.length > 100 ? text.substring(0, 100) + "..." : text
    let pretext = fallback;
    let color = "#666";
    let fields = [{title: 'The question', value: `<${permalink}|${meta.title}>`, short: 'false'}]
    return { username: Config.slackHookName, attachments: [{
        fallback: fallback, pretext: pretext, color: color, text: text, fields: fields
    }]}
  },

  replaceAtMentionsWithLinks: (text) => {
    var link_end = "</a>", tailingLinkIndex;
    return text.replace(/@([a-z\d_]+)/ig, function(mention, contents, offset){
      tailingLinkIndex = offset + mention.length + link_end.length;
      if ((text.length < tailingLinkIndex) || (text.substring(tailingLinkIndex - link_end.length, tailingLinkIndex) != link_end) ) {
        return `<a href="https://andela.slack.com/messages/${mention}/team/${contents}" target="_blank">${mention}</a>`
      } else { return mention }
    })
  },

  pushAtMentionsToSlack: (meta, data) => {
    var mentions = meta.content.match(/@([a-z\d_]+)/ig);
    if (!$.isEmptyObject(mentions)) {
      mentions.map(function(mention){
        var data_copy = data
        data_copy.channel = mention
        data_copy = JSON.stringify(data_copy);
        $.ajax({url: Config.slackZhishiChannel, type: 'POST', data: data_copy });
      });
    }
  }
}
export default Common;
