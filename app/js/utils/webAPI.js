import Config from '../config/environment.js';

import https from 'http';
import AuthStore from '../stores/AuthStore.js';

import $ from 'jquery';

let webAPI = {
  processRequest: function(path, method, data, callback, parentElement) {
    // this.path = '/api/v1' + path;
    this.path = path;
    this.method = method;
    this.userToken = AuthStore.getCurrentUserToken();
    this._dataString = JSON.stringify(data);
    if (typeof (parentElement) !== 'undefined') {
      this.parentElement = parentElement;
      this.elHtml = this.parentElement.innerHTML;
    }
    this.headers = {
      'accept': 'application/json, text/javascript, */*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    this.headers = {};
    if (this.method === 'GET') {
      if (this._dataString.length > 0) {
        this.path += '?' + encodeURIComponent(this._dataString);
      }
    }

    if (this.userToken) {
      this.headers['Authorization'] = 'Token token=' + this.userToken;
    }
    let xhr = $.ajax({
      headers: this.headers,
      url: Config.host + this.path,
      // dataType: 'json',
      method: method,
      data: data,
      beforeSend: function() {
        if (typeof (this.parentElement) !== 'undefined') {
          $(this.parentElement).prop('disabled', true);
          this.parentElement.innerHTML =
            '<i className="notched center circle loading icon"></i>';
        }
      }.bind(this),
      success: function(data) {
        callback(data);
      }.bind(this),
      error: function(xhr, status, err) {
        callback({_error: err});
      }.bind(this),
      complete: function() {
        if (typeof (this.parentElement) !== 'undefined') {
          $(this.parentElement).prop('disabled', false);
          this.parentElement.innerHTML = this.elHtml;
        }
      }.bind(this)
    });
    return xhr;
  }
};
module.exports = webAPI;
