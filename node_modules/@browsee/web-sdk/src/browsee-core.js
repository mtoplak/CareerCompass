/**
 * Browsee JS Library
 *
 * Copyright 2020, Heroteck, Inc. All Rights Reserved
 * https://browsee.io/
*/

/**
 * Browsee Library Object
 * @constructor
 */
var BrowseeLib = function() {};

// Utility function to get browsee object.
const _br = (win) => win._browsee;

// For universal rendering
const getWindow = () => (typeof window === 'undefined' ? undefined : window);

// browsee.init(options:object)
// 
// This function sets up the instance of Browsee library.
// This library can only be used after calling this function
// with a valid apiKey, provided in your account during signup.

BrowseeLib.prototype.init = function(options) {
  var win = getWindow();
  if (!win) {
    return null;
  }

  // In case this library is invoked after snippet is already initialized.
  if (_br(win) && _br(win).initialied) {
    console.warn('Browsee already initialized. Init ignored.');
    return;
  }

  // Check for apiKey
  if (!options || !options.apiKey) {
    throw Error('Browsee intialized without valid apiKey.');
    return;
  }
  
  // Initialize snippet.
  this._loadScript(win, options);
};

// Private method
// Loads Browsee javscript into the window.
BrowseeLib.prototype._loadScript = function(win, options) {
  win._browsee = win._browsee || function () { (_browsee.q = _browsee.q || []).push(arguments) };
  win._browsee('init', options.apiKey);  

  var script = win.document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdn.browsee.io/js/browsee.min.js';
  var s = win.document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
};

// Utility function to ensure Browsee has been intiialized before other API
// calls are invoked.
const _isLoaded = function(win) {
  if (!_br(win)) {
    throw Error('Browsee is not loaded, please ensure the init function is called before calling Browsee API functions');
  }
};

// Function that wraps all API calls before init check
// and use queueing in case snippet has not already loaded.
const _reflect = (name) => (...args) => {
  var win = getWindow();
  if (!win) {
    return null;
  }

  _isLoaded(win);
  if (_br(win)[name]) {
    return _br(win)[name](...args);
  } else {
    return _br(win)(name, ...args);
  }
};

// Browsee's api to load custom events.
BrowseeLib.prototype.logEvent = _reflect('logEvent');

// Browsee's api to load identify users.
BrowseeLib.prototype.identify = _reflect('identify');

// Browsee's api to get the URL of the current session.
BrowseeLib.prototype.getSessionUrl = _reflect('getSessionUrl');

const init_as_module = () => {
  var browsee = new BrowseeLib();
  return browsee;
}

module.exports = init_as_module;
