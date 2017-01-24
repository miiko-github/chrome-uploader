/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

/* global chrome */

require('./styles/main.less');

var _ = require('lodash');
var React = require('react');
var ReactDOM = require('react-dom');
window.React = React;
var config = require('./lib/config');
window.DEBUG = config.DEBUG;
// Important: need to require App after setting `window.DEBUG` to enable logging
var Root = require('./lib/redux/containers/Root');
var os = require('os');

var hostMap = {
  'darwin': 'mac',
  'win32' : 'win',
  'linux': 'linux',
};

var archMap = {
  'arm': 'arm',
  'arm64': 'arm',
  'x86': 'x86-32',
  'x32': 'x86-32', // ??
  'x64': 'x86-64',
};

var platformInfo = {
  os: hostMap[os.platform()],
  arch: archMap[os.arch()],
  nacl_arch: archMap[os.arch()],
};

//chrome.runtime.getPlatformInfo(function (platformInfo) {
  if (!_.isEmpty(platformInfo.os)) {
    ReactDOM.render(
      React.createElement(Root, {os: platformInfo.os}), document.getElementById('app')
    );
  }
//});
