import Config from "../config/environment.js"

import https from 'http';
import querystring from 'querystring';
import AuthStore from '../stores/AuthStore.js';
// let _host = 'http://localhost:3001'

let webAPI = {
  processRequest: function (path, method, data, callback, parentElement) {
    // this._path = "/api/v1" + path;
    this._path = path;
    this._method = method;
    this._user_token = AuthStore.getCurrentUserToken();
    this._dataString = JSON.stringify(data);
    if (typeof(parentElement) !== 'undefined') {
      this.parentElement = parentElement
      this.el_html = this.parentElement.innerHTML;
    }
    this._headers = {
      accept: "application/json, text/javascript, */*",
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    };
    this._headers = {}
    if (this._method == 'GET') {
      if (this._dataString.length > 0) { this._path += '?' + encodeURIComponent(this._dataString); }
    }

    if (this._user_token){this._headers['Authorization'] = 'Token token='+this._user_token}
    let xhr = $.ajax({
      headers: this._headers,
      url: Config.host + this._path,
      // dataType: 'json',
      method: method,
      data: data,
      beforeSend: function() {
        if (typeof(this.parentElement) !== 'undefined') {
          $(this.parentElement).prop('disabled', true)
          this.parentElement.innerHTML = '<i className="notched center circle loading icon"></i>'
        }
      }.bind(this),
      success: function(data) {
        callback(data);
      }.bind(this),
      error: function(xhr, status, err) {
        callback({_error: err});
      }.bind(this),
      complete: function(){
        if (typeof(this.parentElement) !== 'undefined') {
          $(this.parentElement).prop('disabled', false)
          this.parentElement.innerHTML = this.el_html;
        }
      }.bind(this)
    });
    return xhr;
  }
};
module.exports = webAPI;
