var Common;
import assign from 'object-assign';
import Config from '../config/environment.js';
import $ from 'jquery';

Common = {
  initTinyMceContent: function(resource_class) {
    tinymce.init({
      selector: `${resource_class}.editor-content`,
      menubar: 'edit insert view format table tools',
      // menubar: false,
      toolbar: 'bold italic blockquote | codesample link | bullist numlist | forecolor backcolor | undo redo | emoticons ',
      plugins: ['link image wordcount spellchecker insertdatetime codesample code textpattern autosave autolink textcolor colorpicker emoticons'],
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
      content_css: '/assets/css/tinymce.custom.css'
    });
  },

  initTinyMceTitle: () => {
    tinymce.init({
      selector: '.editor-title',
      inline: true,
      toolbar: 'undo redo',
      plugins: [],
      menubar: false,
      custom_shortcuts : false
    });
  },

  removeTinyMce: resourceClass => {
    tinyMCE.remove(`${resourceClass}[class*='editor-']`);
  },

  serializeByKey: (array, key) => {
    var collection = {};
    if (array) {
      array.map(item => Common.update(collection, item[key || 'id'], item));
    }
    return collection;
  },

  update: (collection, id, updates, dontResetStatus) => {
    collection = collection ? collection : {};
    collection[id] = assign({}, collection[id], updates);
    if (!dontResetStatus) {
      collection[id]['status'] = '';
    }
    return collection;
  },

  createPermalink: (id, title) => {
    var sanitizedString = title ? title.replace(/[^\w\s]/gi, '') : '';
    var maxLength = 100;
    var trimmedString = sanitizedString.substring(0, maxLength);
    if (sanitizedString.length > maxLength) {
      sanitizedString = sanitizedString.substring(
        0, trimmedString.lastIndexOf(' ')
      );
    }
    sanitizedString = sanitizedString.trim().replace(/\s/g, '-');
    return `${id}-${sanitizedString}`;
  },

  sanitizeString: text => {
    return text.replace(/<(?:.|\n)*?>|&nbsp;/gm, '');
  },

  sendToSlack: meta => {
    let generalData = Common.slackData(meta, meta.intro.general);
    let personalDdata = Common.slackData(meta, meta.intro.personal);
    Common.pushAtMentionsToSlack(meta, generalData, personalDdata);
    generalData = JSON.stringify(generalData);
    $.ajax({
      url: Config.slackZhishiChannel,
      type: 'POST', data: generalData
    });
  },

  slackData: (meta, fallback) => {
    let permalink = Common.createPermalink(meta.id || 2, meta.title);
    permalink = `http://${window.location.host}/questions/${permalink}`;
    let text = Common.sanitizeString(meta.content);
    text = Common.elipsize(text, 100);
    let pretext = fallback;
    let color = '#666';
    let fields = [{
      title: 'The question',
      value: `<${permalink}|${meta.title}>`,
      short: 'false'
    }];
    return {
      username: Config.slackHookName,
      attachments: [{
        fallback: fallback,
        pretext: pretext,
        color: color,
        text: text,
        fields: fields
      }]
    };
  },

  elipsize: (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  },

  replaceAtMentionsWithLinks: text => {
    return text ? text.replace(
      Common.mentionsRegex(),
      Common.replaceMentions
    ) : '';
  },

  replaceMentions: (mention, contents, offset, str) => {
    let linkEnd = '</a>';
    let mentionIndex = offset + mention.length;
    let tailingLinkIndex = mentionIndex + linkEnd.length;
    let shouldReplaceLink = Common.shouldReplaceLink(str,
                            mentionIndex, tailingLinkIndex, linkEnd);
    if (shouldReplaceLink) {
      return `<a href='https://andela.slack.com/messages/${mention}/team/${contents}' target='_blank'>${mention}</a>`;
    } else {
      return mention;
    }
  },

  shouldReplaceLink: (str, mentionIndex, tailingLinkIndex, linkEnd) => {
    return (
      Common.mentionDoesntPrecedeSemiColon(str, mentionIndex) &&
      (
        Common.notEndOfText(str, tailingLinkIndex) ||
        Common.notAlreadyALink(str, tailingLinkIndex, linkEnd)
      )
    );
  },

  notEndOfText: (text, tailingLinkIndex) => {
    return (text.length < tailingLinkIndex);
  },

  mentionDoesntPrecedeSemiColon: (str, mentionIndex) => {
    return ((str[mentionIndex] || '').match(/[;<]/g) || []).length === 0;
  },

  notAlreadyALink: (text, tailingLinkIndex, linkEnd) => {
    return text.substring(
      tailingLinkIndex - linkEnd.length,
      tailingLinkIndex
    ) !== linkEnd;
  },

  mentionsRegex: () => {
    return /\s[@|#]([a-z\d_.-]+)/ig;
  },

  pushAtMentionsToSlack: (meta, general, personal) => {
    // meta.content += ' #zhishi_feedback';
    var mentions = meta.content.match(Common.mentionsRegex());
    if (!$.isEmptyObject(mentions)) {
      mentions.map(function(mention) {
        var dataCopy = (mention[0] === '@') ? personal : general;
        dataCopy.channel = mention;
        dataCopy = JSON.stringify(dataCopy);
        $.ajax({
          url: Config.slackZhishiChannel,
          type: 'POST',
          data: dataCopy
        });
      });
    }
  }
};
export default Common;
