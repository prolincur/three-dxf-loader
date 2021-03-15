/*!
 * Copyright (c) 2021 Prolincur Technologies LLP.
 * Copyright (c) 2015 GDS Storefront Estimating
 * All Rights Reserved.
 * 
 * Please check the provided LICENSE file for licensing details.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["THREE"],t):"object"==typeof exports?exports.ThreeDxfLoader=t(require("three")):e.ThreeDxfLoader=t(e.THREE)}("undefined"==typeof self?this:self,(function(e){var t=Math.PI,a=Math.abs;return function(e){function t(n){if(a[n])return a[n].exports;var r=a[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var a={};return t.m=e,t.c=a,t.d=function(e,a,n){t.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,a){if(1&a&&(e=t(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)t.d(n,r,function(t){return e[t]}.bind(null,r));return n},t.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(a,"a",a),a},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(t){t.exports=e},function(e,t,a){var n,r;!function(o,i){"use strict";n=function(){function e(e,t){var a=e[t];if("function"==typeof a.bind)return a.bind(e);try{return Function.prototype.bind.call(a,e)}catch(t){return function(){return Function.prototype.apply.apply(a,[e,arguments])}}}function t(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function a(a){return"debug"===a&&(a="log"),typeof console!==c&&("trace"===a&&u?t:void 0===console[a]?void 0===console.log?s:e(console,"log"):e(console,a))}function n(e,t){for(var a,n=0;n<l.length;n++)this[a=l[n]]=n<e?s:this.methodFactory(a,e,t);this.log=this.debug}function r(e,t,a){return function(){typeof console!==c&&(n.call(this,t,a),this[e].apply(this,arguments))}}function o(e){return a(e)||r.apply(this,arguments)}function i(e,t,a){function r(){var e;if(typeof window!==c){try{e=window.localStorage[u]}catch(e){}if(typeof e===c)try{var t=window.document.cookie,a=t.indexOf(encodeURIComponent(u)+"=");-1!==a&&(e=/^([^;]+)/.exec(t.slice(a))[1])}catch(e){}return void 0===s.levels[e]&&(e=void 0),e}}var i,s=this,u="loglevel";e&&(u+=":"+e),s.name=e,s.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},s.methodFactory=a||o,s.getLevel=function(){return i},s.setLevel=function(t,a){if("string"==typeof t&&void 0!==s.levels[t.toUpperCase()]&&(t=s.levels[t.toUpperCase()]),!("number"==typeof t&&0<=t&&t<=s.levels.SILENT))throw"log.setLevel() called with invalid level: "+t;if(i=t,!1!==a&&function(e){var t=(l[e]||"silent").toUpperCase();if(typeof window!==c){try{return void(window.localStorage[u]=t)}catch(e){}try{window.document.cookie=encodeURIComponent(u)+"="+t+";"}catch(e){}}}(t),n.call(s,t,e),typeof console===c&&t<s.levels.SILENT)return"No console available for logging"},s.setDefaultLevel=function(e){r()||s.setLevel(e,!1)},s.enableAll=function(e){s.setLevel(s.levels.TRACE,e)},s.disableAll=function(e){s.setLevel(s.levels.SILENT,e)};var p=r();null==p&&(p=null==t?"WARN":t),s.setLevel(p,!1)}var s=function(){},c="undefined",u=typeof window!==c&&typeof window.navigator!==c&&/Trident\/|MSIE /.test(window.navigator.userAgent),l=["trace","debug","info","warn","error"],p=new i,f={};p.getLogger=function(e){if("string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=f[e];return t||(t=f[e]=new i(e,p.getLevel(),p.methodFactory)),t};var d=typeof window==c?void 0:window.log;return p.noConflict=function(){return typeof window!=c&&window.log===p&&(window.log=d),p},p.getLoggers=function(){return f},p},void 0===(r="function"==typeof n?n.call(t,a,t,e):n)||(e.exports=r)}()},function(e,t,a){(function(a){var n;!function(t,a){e.exports=a(t)}("undefined"==typeof self?"undefined"==typeof window?void 0===a?this:a:window:self,(function(a){"use strict";var r,o=(a=a||{}).Base64,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(e){for(var t={},a=0,n=e.length;a<n;a++)t[e.charAt(a)]=a;return t}(i),c=String.fromCharCode,u=function(e){if(2>e.length)return 128>(t=e.charCodeAt(0))?e:2048>t?c(192|t>>>6)+c(128|63&t):c(224|15&t>>>12)+c(128|63&t>>>6)+c(128|63&t);var t=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return c(240|7&t>>>18)+c(128|63&t>>>12)+c(128|63&t>>>6)+c(128|63&t)},l=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,p=function(e){return e.replace(l,u)},f=function(e){var t=[0,2,1][e.length%3],a=e.charCodeAt(0)<<16|(1<e.length?e.charCodeAt(1):0)<<8|(2<e.length?e.charCodeAt(2):0);return[i.charAt(a>>>18),i.charAt(63&a>>>12),2<=t?"=":i.charAt(63&a>>>6),1<=t?"=":i.charAt(63&a)].join("")},d=a.btoa&&"function"==typeof a.btoa?function(e){return a.btoa(e)}:function(e){if(e.match(/[^\x00-\xFF]/))throw new RangeError("The string contains invalid characters.");return e.replace(/[\s\S]{1,3}/g,f)},v=function(e){return d(p(e+""))},b=function(e){return e.replace(/[+\/]/g,(function(e){return"+"==e?"-":"_"})).replace(/=/g,"")},h=function(e,t){return t?b(v(e)):v(e)};a.Uint8Array&&(r=function(e,t){for(var a="",n=0,r=e.length;n<r;n+=3){var o=e[n],s=e[n+1],c=e[n+2],u=o<<16|s<<8|c;a+=i.charAt(u>>>18)+i.charAt(63&u>>>12)+(void 0===s?"=":i.charAt(63&u>>>6))+(void 0===c?"=":i.charAt(63&u))}return t?b(a):a});var y,x=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,g=function(e){switch(e.length){case 4:var t=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return c(55296+(t>>>10))+c(56320+(1023&t));case 3:return c((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return c((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},k=function(e){return e.replace(x,g)},E=function(e){var t=e.length,a=(0<t?s[e.charAt(0)]<<18:0)|(1<t?s[e.charAt(1)]<<12:0)|(2<t?s[e.charAt(2)]<<6:0)|(3<t?s[e.charAt(3)]:0),n=[c(a>>>16),c(255&a>>>8),c(255&a)];return n.length-=[0,0,2,1][t%4],n.join("")},w=a.atob&&"function"==typeof a.atob?function(e){return a.atob(e)}:function(e){return e.replace(/\S{1,4}/g,E)},m=function(e){return w((e+"").replace(/[^A-Za-z0-9\+\/]/g,""))},F=function(e){return function(e){return k(w(e))}((e+"").replace(/[-_]/g,(function(e){return"-"==e?"+":"/"})).replace(/[^A-Za-z0-9\+\/]/g,""))};a.Uint8Array&&(y=function(e){return Uint8Array.from(m(e),(function(e){return e.charCodeAt(0)}))});if(a.Base64={VERSION:"2.6.2",atob:m,btoa:d,fromBase64:F,toBase64:h,utob:p,encode:h,encodeURI:function(e){return h(e,!0)},btou:k,decode:F,noConflict:function(){var e=a.Base64;return a.Base64=o,e},fromUint8Array:r,toUint8Array:y},"function"==typeof Object.defineProperty){var A=function(e){return{value:e,enumerable:!1,writable:!0,configurable:!0}};a.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",A((function(){return F(this)}))),Object.defineProperty(String.prototype,"toBase64",A((function(e){return h(this,e)}))),Object.defineProperty(String.prototype,"toBase64URI",A((function(){return h(this,!0)})))}}return a.Meteor&&(Base64=a.Base64),e.exports?e.exports.Base64=a.Base64:void 0!==(n=function(){return a.Base64}.apply(t,[]))&&(e.exports=n),{Base64:a.Base64}}))}).call(this,a(4))},function(e,n,r){"use strict";function o(e){this._pointer=0,this._data=e,this._eof=!1}function i(e,t){return 9>=e?t:10<=e&&59>=e?parseFloat(t):60<=e&&99>=e?parseInt(t):100<=e&&109>=e?t:110<=e&&149>=e?parseFloat(t):160<=e&&179>=e?parseInt(t):210<=e&&239>=e?parseFloat(t):270<=e&&289>=e?parseInt(t):290<=e&&299>=e?function(e){if("0"===e)return!1;if("1"===e)return!0;throw TypeError("String '"+e+"' cannot be cast to Boolean type")}(t):300<=e&&369>=e?t:370<=e&&389>=e?parseInt(t):390<=e&&399>=e?t:400<=e&&409>=e?parseInt(t):410<=e&&419>=e?t:420<=e&&429>=e?parseInt(t):430<=e&&439>=e?t:440<=e&&459>=e?parseInt(t):460<=e&&469>=e?parseFloat(t):470<=e&&481>=e||999===e||1e3<=e&&1009>=e?t:1010<=e&&1059>=e?parseFloat(t):1060<=e&&1071>=e?parseInt(t):(console.log("WARNING: Group code does not have a defined type: %j",{code:e,value:t}),t)}function s(e){var t={};e.rewind();var a=e.next(),n=a.code;if(t.x=a.value,n+=10,(a=e.next()).code!=n)throw new Error("Expected code for point value to be "+n+" but got "+a.code+".");return t.y=a.value,n+=10,(a=e.next()).code!=n?(e.rewind(),t):(t.z=a.value,t)}function c(e,t){switch(t.code){case 0:e.type=t.value;break;case 5:e.handle=t.value;break;case 6:e.lineType=t.value;break;case 8:e.layer=t.value;break;case 48:e.lineTypeScale=t.value;break;case 60:e.visible=0===t.value;break;case 62:e.colorIndex=t.value,e.color=function(e){return N[e]}(a(t.value));break;case 67:e.inPaperSpace=0!==t.value;break;case 100:break;case 330:e.ownerHandle=t.value;break;case 347:e.materialObjectHandle=t.value;break;case 370:e.lineweight=t.value;break;case 420:e.color=t.value;break;case 1e3:e.extendedData=e.extendedData||{},e.extendedData.customStrings=e.extendedData.customStrings||[],e.extendedData.customStrings.push(t.value);break;case 1001:e.extendedData=e.extendedData||{},e.extendedData.applicationName=t.value;break;default:return!1}return!0}function u(){}function l(e,t){var a,n=[],r=!1,o=!1;for(a=0;a<=4;a++){for(var i={};"EOF"!==t&&0!==t.code&&!o;){switch(t.code){case 10:case 11:case 12:case 13:if(r){o=!0;continue}i.x=t.value,r=!0;break;case 20:case 21:case 22:case 23:i.y=t.value;break;case 30:case 31:case 32:case 33:i.z=t.value;break;default:return n}t=e.next()}n.push(i),r=!1,o=!1}return e.rewind(),n}function p(){}function f(){}function d(){}function v(){}function b(){}function h(){}function y(){}function x(){}function g(e,t){if(!e||0>=e)throw Error("n must be greater than 0 verticies");var a,n=[],r=!1,o=!1,i=t.lastReadGroup;for(a=0;a<e;a++){for(var s={};"EOF"!==i&&0!==i.code&&!o;){switch(i.code){case 10:if(r){o=!0;continue}s.x=i.value,r=!0;break;case 20:s.y=i.value;break;case 30:s.z=i.value;break;case 40:s.startWidth=i.value;break;case 41:s.endWidth=i.value;break;case 42:0!=i.value&&(s.bulge=i.value);break;default:return r&&n.push(s),t.rewind(),n}i=t.next()}n.push(s),r=!1,o=!1}return t.rewind(),n}function k(){}function E(){}function w(){}function m(){}function F(e,t){var a={type:t.value};for(t=e.next();"EOF"!=t&&0!=t.code;)c(a,t),t=e.next();return a}function A(){}function S(){}function L(){}function P(){this._entityHandlers={},function(e){e.registerEntityHandler(u),e.registerEntityHandler(p),e.registerEntityHandler(f),e.registerEntityHandler(d),e.registerEntityHandler(v),e.registerEntityHandler(b),e.registerEntityHandler(h),e.registerEntityHandler(y),e.registerEntityHandler(x),e.registerEntityHandler(k),e.registerEntityHandler(E),e.registerEntityHandler(m),e.registerEntityHandler(A),e.registerEntityHandler(S),e.registerEntityHandler(L)}(this)}function T(e){B.a.debug("unhandled group "+C(e))}function C(e){return e.code+":"+e.value}function O(e){return N[e]}o.prototype.next=function(){var e;if(!this.hasNext())throw this._eof?new Error("Cannot call 'next' after EOF group has been read"):new Error("Unexpected end of input: EOF group not read before end of file. Ended on code "+this._data[this._pointer]);return e={code:parseInt(this._data[this._pointer])},this._pointer++,e.value=i(e.code,this._data[this._pointer].trim()),this._pointer++,0===e.code&&"EOF"===e.value&&(this._eof=!0),this.lastReadGroup=e,e},o.prototype.peek=function(){if(!this.hasNext())throw this._eof?new Error("Cannot call 'next' after EOF group has been read"):new Error("Unexpected end of input: EOF group not read before end of file. Ended on code "+this._data[this._pointer]);var e={code:parseInt(this._data[this._pointer])};return e.value=i(e.code,this._data[this._pointer+1].trim()),e},o.prototype.rewind=function(e){e=e||1,this._pointer-=2*e},o.prototype.hasNext=function(){return!(this._eof||this._pointer>this._data.length-2)},o.prototype.isEOF=function(){return this._eof};var N=[0,16711680,16776960,65280,65535,255,16711935,16777215,8421504,12632256,16711680,16744319,13369344,13395558,10027008,10046540,8323072,8339263,4980736,4990502,16727808,16752511,13382400,13401958,10036736,10051404,8331008,8343359,4985600,4992806,16744192,16760703,13395456,13408614,10046464,10056268,8339200,8347455,4990464,4995366,16760576,16768895,13408512,13415014,10056192,10061132,8347392,8351551,4995328,4997670,16776960,16777087,13421568,13421670,10000384,10000460,8355584,8355647,5000192,5000230,12582656,14679935,10079232,11717734,7510016,8755276,6258432,7307071,3755008,4344870,8388352,12582783,6736896,10079334,5019648,7510092,4161280,6258495,2509824,3755046,4194048,10485631,3394560,8375398,2529280,6264908,2064128,5209919,1264640,3099686,65280,8388479,52224,6736998,38912,5019724,32512,4161343,19456,2509862,65343,8388511,52275,6737023,38950,5019743,32543,4161359,19475,2509871,65407,8388543,52326,6737049,38988,5019762,32575,4161375,19494,2509881,65471,8388575,52377,6737074,39026,5019781,32607,4161391,19513,2509890,65535,8388607,52428,6737100,39064,5019800,32639,4161407,19532,2509900,49151,8380415,39372,6730444,29336,5014936,24447,4157311,14668,2507340,32767,8372223,26316,6724044,19608,5010072,16255,4153215,9804,2505036,16383,8364031,13260,6717388,9880,5005208,8063,4149119,4940,2502476,255,8355839,204,6710988,152,5000344,127,4145023,76,2500172,4129023,10452991,3342540,8349388,2490520,6245528,2031743,5193599,1245260,3089996,8323327,12550143,6684876,10053324,4980888,7490712,4128895,6242175,2490444,3745356,12517631,14647295,10027212,11691724,7471256,8735896,6226047,7290751,3735628,4335180,16711935,16744447,13369548,13395660,9961624,9981080,8323199,8339327,4980812,4990540,16711871,16744415,13369497,13395634,9961586,9981061,8323167,8339311,4980793,4990530,16711807,16744383,13369446,13395609,9961548,9981042,8323135,8339295,4980774,4990521,16711743,16744351,13369395,13395583,9961510,9981023,8323103,8339279,4980755,4990511,3355443,5987163,8684676,11382189,14079702,16777215];u.ForEntityName="3DFACE",u.prototype.parseEntity=function(e,t){var a={type:t.value,vertices:[]};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 70:a.shape=1==(1&t.value),a.hasContinuousLinetypePattern=128==(128&t.value);break;case 10:a.vertices=l(e,t),t=e.lastReadGroup;break;default:c(a,t)}t=e.next()}return a},p.ForEntityName="ARC",p.prototype.parseEntity=function(e,a){var n;for(n={type:a.value},a=e.next();"EOF"!==a&&0!==a.code;){switch(a.code){case 10:n.center=s(e);break;case 40:n.radius=a.value;break;case 50:n.startAngle=t/180*a.value;break;case 51:n.endAngle=t/180*a.value,n.angleLength=n.endAngle-n.startAngle;break;default:c(n,a)}a=e.next()}return n},f.ForEntityName="ATTDEF",f.prototype.parseEntity=function(e,t){var a={type:t.value,scale:1,textStyle:"STANDARD"};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 1:a.text=t.value;break;case 2:a.tag=t.value;break;case 3:a.prompt=t.value;break;case 7:a.textStyle=t.value;break;case 10:a.startPoint=s(e);break;case 11:a.endPoint=s(e);break;case 39:a.thickness=t.value;break;case 40:a.textHeight=t.value;break;case 41:a.scale=t.value;break;case 50:a.rotation=t.value;break;case 51:a.obliqueAngle=t.value;break;case 70:a.invisible=!!(1&t.value),a.constant=!!(2&t.value),a.verificationRequired=!!(4&t.value),a.preset=!!(8&t.value);break;case 71:a.backwards=!!(2&t.value),a.mirrored=!!(4&t.value);break;case 72:a.horizontalJustification=t.value;break;case 73:a.fieldLength=t.value;break;case 74:a.verticalJustification=t.value;break;case 100:break;case 210:a.extrusionDirectionX=t.value;break;case 220:a.extrusionDirectionY=t.value;break;case 230:a.extrusionDirectionZ=t.value;break;default:c(a,t)}t=e.next()}return a},d.ForEntityName="CIRCLE",d.prototype.parseEntity=function(e,a){var n,r;for(n={type:a.value},a=e.next();"EOF"!==a&&0!==a.code;){switch(a.code){case 10:n.center=s(e);break;case 40:n.radius=a.value;break;case 50:n.startAngle=t/180*a.value;break;case 51:r=t/180*a.value,n.angleLength=r<n.startAngle?r+2*t-n.startAngle:r-n.startAngle,n.endAngle=r;break;default:c(n,a)}a=e.next()}return n},v.ForEntityName="DIMENSION",v.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 2:a.block=t.value;break;case 10:a.anchorPoint=s(e);break;case 11:a.middleOfText=s(e);break;case 12:a.insertionPoint=s(e);break;case 13:a.linearOrAngularPoint1=s(e);break;case 14:a.linearOrAngularPoint2=s(e);break;case 15:a.diameterOrRadiusPoint=s(e);break;case 16:a.arcPoint=s(e);break;case 70:a.dimensionType=t.value;break;case 71:a.attachmentPoint=t.value;break;case 42:a.actualMeasurement=t.value;break;case 1:a.text=t.value;break;case 50:a.angle=t.value;break;default:c(a,t)}t=e.next()}return a},b.ForEntityName="ELLIPSE",b.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.center=s(e);break;case 11:a.majorAxisEndPoint=s(e);break;case 40:a.axisRatio=t.value;break;case 41:a.startAngle=t.value;break;case 42:a.endAngle=t.value;break;case 2:a.name=t.value;break;default:c(a,t)}t=e.next()}return a},h.ForEntityName="INSERT",h.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 2:a.name=t.value;break;case 41:a.xScale=t.value;break;case 42:a.yScale=t.value;break;case 43:a.zScale=t.value;break;case 10:a.position=s(e);break;case 50:a.rotation=t.value;break;case 70:a.columnCount=t.value;break;case 71:a.rowCount=t.value;break;case 44:a.columnSpacing=t.value;break;case 45:a.rowSpacing=t.value;break;case 210:a.extrusionDirection=s(e);break;default:c(a,t)}t=e.next()}return a},y.ForEntityName="LINE",y.prototype.parseEntity=function(e,t){var a={type:t.value,vertices:[]};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.vertices.unshift(s(e));break;case 11:a.vertices.push(s(e));break;case 210:a.extrusionDirection=s(e);break;case 100:break;default:c(a,t)}t=e.next()}return a},x.ForEntityName="LWPOLYLINE",x.prototype.parseEntity=function(e,t){var a={type:t.value,vertices:[]},n=0;for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 38:a.elevation=t.value;break;case 39:a.depth=t.value;break;case 70:a.shape=1==(1&t.value),a.hasContinuousLinetypePattern=128==(128&t.value);break;case 90:n=t.value;break;case 10:a.vertices=g(n,e);break;case 43:0!==t.value&&(a.width=t.value);break;case 210:a.extrusionDirectionX=t.value;break;case 220:a.extrusionDirectionY=t.value;break;case 230:a.extrusionDirectionZ=t.value;break;default:c(a,t)}t=e.next()}return a},k.ForEntityName="MTEXT",k.prototype.parseEntity=function(e,t){var a={type:t.value};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 3:case 1:a.text?a.text+=t.value:a.text=t.value;break;case 10:a.position=s(e);break;case 40:a.height=t.value;break;case 41:a.width=t.value;break;case 50:a.rotation=t.value;break;case 71:a.attachmentPoint=t.value;break;case 72:a.drawingDirection=t.value;break;default:c(a,t)}t=e.next()}return a},E.ForEntityName="POINT",E.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.position=s(e);break;case 39:a.thickness=t.value;break;case 210:a.extrusionDirection=s(e);break;case 100:break;default:c(a,t)}t=e.next()}return a},w.ForEntityName="VERTEX",w.prototype.parseEntity=function(e,t){var a={type:t.value};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.x=t.value;break;case 20:a.y=t.value;break;case 30:a.z=t.value;break;case 40:case 41:break;case 42:0!=t.value&&(a.bulge=t.value);break;case 70:a.curveFittingVertex=0!=(1&t.value),a.curveFitTangent=0!=(2&t.value),a.splineVertex=0!=(8&t.value),a.splineControlPoint=0!=(16&t.value),a.threeDPolylineVertex=0!=(32&t.value),a.threeDPolylineMesh=0!=(64&t.value),a.polyfaceMeshVertex=0!=(128&t.value);break;case 50:break;case 71:a.faceA=t.value;break;case 72:a.faceB=t.value;break;case 73:a.faceC=t.value;break;case 74:a.faceD=t.value;break;default:c(a,t)}t=e.next()}return a},m.ForEntityName="POLYLINE",m.prototype.parseEntity=function(e,t){var a={type:t.value,vertices:[]};for(t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:case 20:case 30:break;case 39:a.thickness=t.value;break;case 40:case 41:break;case 70:a.shape=0!=(1&t.value),a.includesCurveFitVertices=0!=(2&t.value),a.includesSplineFitVertices=0!=(4&t.value),a.is3dPolyline=0!=(8&t.value),a.is3dPolygonMesh=0!=(16&t.value),a.is3dPolygonMeshClosed=0!=(32&t.value),a.isPolyfaceMesh=0!=(64&t.value),a.hasContinuousLinetypePattern=0!=(128&t.value);break;case 71:case 72:case 73:case 74:case 75:break;case 210:a.extrusionDirection=s(e);break;default:c(a,t)}t=e.next()}return a.vertices=function(e,t){for(var a=new w,n=[];!e.isEOF();)if(0===t.code)if("VERTEX"===t.value)n.push(a.parseEntity(e,t)),t=e.lastReadGroup;else if("SEQEND"===t.value){F(e,t);break}return n}(e,t),a},A.ForEntityName="SOLID",A.prototype.parseEntity=function(e,t){var a;for((a={type:t.value}).points=[],t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.points[0]=s(e);break;case 11:a.points[1]=s(e);break;case 12:a.points[2]=s(e);break;case 13:a.points[3]=s(e);break;case 210:a.extrusionDirection=s(e);break;default:c(a,t)}t=e.next()}return a},S.ForEntityName="SPLINE",S.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.controlPoints||(a.controlPoints=[]),a.controlPoints.push(s(e));break;case 11:a.fitPoints||(a.fitPoints=[]),a.fitPoints.push(s(e));break;case 12:a.startTangent=s(e);break;case 13:a.endTangent=s(e);break;case 40:a.knotValues||(a.knotValues=[]),a.knotValues.push(t.value);break;case 70:0!=(1&t.value)&&(a.closed=!0),0!=(2&t.value)&&(a.periodic=!0),0!=(4&t.value)&&(a.rational=!0),0!=(8&t.value)&&(a.planar=!0),0!=(16&t.value)&&(a.planar=!0,a.linear=!0);break;case 71:a.degreeOfSplineCurve=t.value;break;case 72:a.numberOfKnots=t.value;break;case 73:a.numberOfControlPoints=t.value;break;case 74:a.numberOfFitPoints=t.value;break;case 210:a.normalVector=s(e);break;default:c(a,t)}t=e.next()}return a},L.ForEntityName="TEXT",L.prototype.parseEntity=function(e,t){var a;for(a={type:t.value},t=e.next();"EOF"!==t&&0!==t.code;){switch(t.code){case 10:a.startPoint=s(e);break;case 11:a.endPoint=s(e);break;case 40:a.textHeight=t.value;break;case 41:a.xScale=t.value;break;case 50:a.rotation=t.value;break;case 1:a.text=t.value;break;case 72:a.halign=t.value;break;case 73:a.valign=t.value;break;default:c(a,t)}t=e.next()}return a};var D=r(1),B=r.n(D);B.a.setLevel("error"),P.prototype.parse=function(){throw new Error("read() not implemented. Use readSync()")},P.prototype.registerEntityHandler=function(e){var t=new e;this._entityHandlers[e.ForEntityName]=t},P.prototype.parseSync=function(e){return"string"==typeof e?this._parse(e):(console.error("Cannot read dxf source of type `"+typeof e),null)},P.prototype.parseStream=function(e,t){var a="",n=this;e.on("data",(function(e){a+=e})),e.on("end",(function(){try{var e=n._parse(a)}catch(e){return t(e)}t(null,e)})),e.on("error",(function(e){t(e)}))},P.prototype._parse=function(e){var t,n,r={},i=0,s=e.split(/\r\n|\r|\n/g);if(!(t=new o(s)).hasNext())throw Error("Empty file");var c=this,u=function(e,t){return n.code===e&&n.value===t},l=function(){var e=null,a=null,r={};for(n=t.next();;){if(u(0,"ENDSEC")){e&&(r[e]=a);break}9===n.code?(e&&(r[e]=a),e=n.value):10===n.code?a={x:n.value}:20===n.code?a.y=n.value:30===n.code?a.z=n.value:a=n.value,n=t.next()}return n=t.next(),r},p=function(){var e,a={};for(n=t.next();"EOF"!==n.value&&!u(0,"ENDSEC");)u(0,"BLOCK")?(B.a.debug("block {"),e=f(),B.a.debug("}"),g(e),e.name?a[e.name]=e:B.a.error('block with handle "'+e.handle+'" is missing a name.')):(T(n),n=t.next());return a},f=function(){var e={};for(n=t.next();"EOF"!==n.value;){switch(n.code){case 1:e.xrefPath=n.value,n=t.next();break;case 2:e.name=n.value,n=t.next();break;case 3:e.name2=n.value,n=t.next();break;case 5:e.handle=n.value,n=t.next();break;case 8:e.layer=n.value,n=t.next();break;case 10:e.position=x(),n=t.next();break;case 67:e.paperSpace=!(!n.value||1!=n.value),n=t.next();break;case 70:0!=n.value&&(e.type=n.value),n=t.next();break;case 100:n=t.next();break;case 330:e.ownerHandle=n.value,n=t.next();break;case 0:if("ENDBLK"==n.value)break;e.entities=y(!0);break;default:T(n),n=t.next()}if(u(0,"ENDBLK")){n=t.next();break}}return e},d=function(){var e={};for(n=t.next();"EOF"!==n.value&&!u(0,"ENDSEC");)if(u(0,"TABLE")){n=t.next(),h[n.value]?(B.a.debug(n.value+" Table {"),e[h[n.value].tableName]=b(),B.a.debug("}")):B.a.debug("Unhandled Table "+n.value)}else n=t.next();return n=t.next(),e};const v="ENDTAB";var b=function(){var e,a=h[n.value],r={},o=0;for(n=t.next();!u(0,v);)switch(n.code){case 5:r.handle=n.value,n=t.next();break;case 330:r.ownerHandle=n.value,n=t.next();break;case 100:"AcDbSymbolTable"===n.value||T(n),n=t.next();break;case 70:o=n.value,n=t.next();break;case 0:n.value===a.dxfSymbolName?r[a.tableRecordsProperty]=a.parseTableRecords():(T(n),n=t.next());break;default:T(n),n=t.next()}var i=r[a.tableRecordsProperty];return i&&(i.constructor===Array?e=i.length:"object"==typeof i&&(e=Object.keys(i).length),o!==e&&B.a.warn("Parsed "+e+" "+a.dxfSymbolName+"'s but expected "+o)),n=t.next(),r},h={VPORT:{tableRecordsProperty:"viewPorts",tableName:"viewPort",dxfSymbolName:"VPORT",parseTableRecords:function(){var e=[],a={};for(B.a.debug("ViewPort {"),n=t.next();!u(0,v);)switch(n.code){case 2:a.name=n.value,n=t.next();break;case 10:a.lowerLeftCorner=x(),n=t.next();break;case 11:a.upperRightCorner=x(),n=t.next();break;case 12:a.center=x(),n=t.next();break;case 13:a.snapBasePoint=x(),n=t.next();break;case 14:a.snapSpacing=x(),n=t.next();break;case 15:a.gridSpacing=x(),n=t.next();break;case 16:a.viewDirectionFromTarget=x(),n=t.next();break;case 17:a.viewTarget=x(),n=t.next();break;case 42:a.lensLength=n.value,n=t.next();break;case 43:a.frontClippingPlane=n.value,n=t.next();break;case 44:a.backClippingPlane=n.value,n=t.next();break;case 45:a.viewHeight=n.value,n=t.next();break;case 50:a.snapRotationAngle=n.value,n=t.next();break;case 51:a.viewTwistAngle=n.value,n=t.next();break;case 79:a.orthographicType=n.value,n=t.next();break;case 110:a.ucsOrigin=x(),n=t.next();break;case 111:a.ucsXAxis=x(),n=t.next();break;case 112:a.ucsYAxis=x(),n=t.next();break;case 110:a.ucsOrigin=x(),n=t.next();break;case 281:a.renderMode=n.value,n=t.next();break;case 281:a.defaultLightingType=n.value,n=t.next();break;case 292:a.defaultLightingOn=n.value,n=t.next();break;case 330:a.ownerHandle=n.value,n=t.next();break;case 63:case 421:case 431:a.ambientColor=n.value,n=t.next();break;case 0:"VPORT"===n.value&&(B.a.debug("}"),e.push(a),B.a.debug("ViewPort {"),a={},n=t.next());break;default:T(n),n=t.next()}return B.a.debug("}"),e.push(a),e}},LTYPE:{tableRecordsProperty:"lineTypes",tableName:"lineType",dxfSymbolName:"LTYPE",parseTableRecords:function(){var e,a,r={},o={};for(B.a.debug("LType {"),n=t.next();!u(0,"ENDTAB");)switch(n.code){case 2:o.name=n.value,e=n.value,n=t.next();break;case 3:o.description=n.value,n=t.next();break;case 73:0<(a=n.value)&&(o.pattern=[]),n=t.next();break;case 40:o.patternLength=n.value,n=t.next();break;case 49:o.pattern.push(n.value),n=t.next();break;case 0:B.a.debug("}"),0<a&&a!==o.pattern.length&&B.a.warn("lengths do not match on LTYPE pattern"),r[e]=o,o={},B.a.debug("LType {"),n=t.next();break;default:n=t.next()}return B.a.debug("}"),r[e]=o,r}},LAYER:{tableRecordsProperty:"layers",tableName:"layer",dxfSymbolName:"LAYER",parseTableRecords:function(){var e,r={},o={};for(B.a.debug("Layer {"),n=t.next();!u(0,"ENDTAB");)switch(n.code){case 2:o.name=n.value,e=n.value,n=t.next();break;case 62:o.visible=0<=n.value,o.colorIndex=a(n.value),o.color=O(o.colorIndex),n=t.next();break;case 70:o.frozen=0!=(1&n.value)||0!=(2&n.value),n=t.next();break;case 0:"LAYER"===n.value&&(B.a.debug("}"),r[e]=o,B.a.debug("Layer {"),o={},e=void 0,n=t.next());break;default:T(n),n=t.next()}return B.a.debug("}"),r[e]=o,r}}},y=function(e){var a=[],r=e?"ENDBLK":"ENDSEC";for(e||(n=t.next());;)if(0===n.code){if(n.value===r)break;var o,i=c._entityHandlers[n.value];if(null==i){B.a.warn("Unhandled entity "+n.value),n=t.next();continue}B.a.debug(n.value+" {"),o=i.parseEntity(t,n),n=t.lastReadGroup,B.a.debug("}"),g(o),a.push(o)}else n=t.next();return"ENDSEC"==r&&(n=t.next()),a},x=function(){var e={},a=n.code;if(e.x=n.value,a+=10,(n=t.next()).code!=a)throw new Error("Expected code for point value to be "+a+" but got "+n.code+".");return e.y=n.value,a+=10,(n=t.next()).code!=a?(t.rewind(),e):(e.z=n.value,e)},g=function(e){if(!e)throw new TypeError("entity cannot be undefined or null");e.handle||(e.handle=i++)};return function(){for(n=t.next();!t.isEOF();)if(0===n.code&&"SECTION"===n.value){if(2!==(n=t.next()).code){console.error("Unexpected code %s after 0:SECTION",C(n)),n=t.next();continue}"HEADER"===n.value?(B.a.debug("> HEADER"),r.header=l(),B.a.debug("<")):"BLOCKS"===n.value?(B.a.debug("> BLOCKS"),r.blocks=p(),B.a.debug("<")):"ENTITIES"===n.value?(B.a.debug("> ENTITIES"),r.entities=y(!1),B.a.debug("<")):"TABLES"===n.value?(B.a.debug("> TABLES"),r.tables=d(),B.a.debug("<")):"EOF"===n.value?B.a.debug("EOF"):B.a.warn("Skipping section '%s'",n.value)}else n=t.next()}(),r},n.a=P},function(e){var t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n,r){"use strict";var o=Math.max,i=Math.sin;r.r(n),r.d(n,"DXFLoader",(function(){return l}));var s=r(0),c=(r.n(s),r(2)),u=(r.n(c),r(3));s.Math.angle2=function(e,t){var a=Math.acos,n=new s.Vector2(e.x,e.y),r=new s.Vector2(t.x,t.y);return r.sub(n),r.normalize(),0>r.y?-a(r.x):a(r.x)},s.Math.polar=function(e,t,a){return{x:e.x+t*Math.cos(a),y:e.y+t*i(a)}},s.BulgeGeometry=function(e,n,r,c){var u,l,p,f,d,v,b,h,y;for(s.Geometry.call(this),this.startPoint=f=e?new s.Vector2(e.x,e.y):new s.Vector2(0,0),this.endPoint=d=n?new s.Vector2(n.x,n.y):new s.Vector2(1,0),this.bulge=r=r||1,v=4*Math.atan(r),b=f.distanceTo(d)/2/i(v/2),p=s.Math.polar(e,b,s.Math.angle2(f,d)+(t/2-v/2)),this.segments=c=c||o(a(Math.ceil(v/(t/18))),6),h=s.Math.angle2(p,f),y=v/c,this.vertices.push(new s.Vector3(f.x,f.y,0)),l=1;l<=c-1;l++)u=s.Math.polar(p,a(b),h+y*l),this.vertices.push(new s.Vector3(u.x,u.y,0))},s.BulgeGeometry.prototype=Object.create(s.Geometry.prototype);const l=function(e){s.Loader.call(this,e),this.font=null};l.prototype=Object.assign(Object.create(s.Loader.prototype),{constructor:l,setFont:function(e){return this.font=e,this},load:function(e,t,a,n){var r=this,o=new s.XHRLoader(r.manager);o.setPath(r.path);const i=function(e){if(e){const t=e.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);if(t&&0<t.length){const a=t[1],n=e.replace("data:"+a+";","").split(",");if(n&&2===n.length&&"base64"===n[0]){const e=n[1];return c.Base64.decode(e)}}}return null}(e);i?r.loadString(i,t,n):o.load(e,e=>{r.loadString(e,t,n)},a,n)},loadString:function(e,t,a){try{t(this.parse(e))}catch(e){a?a(e):console.error(e),this.manager.itemError(url)}},parse:function(e){var t=(new u.a).parseSync(e);return this.loadEntities(t,this.font)},loadEntities:function(e,n){function r(e,t){var a;if("CIRCLE"===e.type||"ARC"===e.type)a=i(e,t);else if("LWPOLYLINE"===e.type||"LINE"===e.type||"POLYLINE"===e.type)a=function(e,t){var a,n,r,o,i,c,u,p,f=new s.Geometry,d=l(e,t);if(!e.vertices)return console.log("entity missing vertices.");for(p=0;p<e.vertices.length;p++)e.vertices[p].bulge?(u=e.vertices[p].bulge,o=e.vertices[p],i=p+1<e.vertices.length?e.vertices[p+1]:f.vertices[0],c=new s.BulgeGeometry(o,i,u),f.vertices.push.apply(f.vertices,c.vertices)):(r=e.vertices[p],f.vertices.push(new s.Vector3(r.x,r.y,0)));return e.shape&&f.vertices.push(f.vertices[0]),e.lineType&&(n=t.tables.lineType.lineTypes[e.lineType]),a=n&&n.pattern&&0!==n.pattern.length?new s.LineDashedMaterial({color:d,gapSize:4,dashSize:4}):new s.LineBasicMaterial({linewidth:1,color:d}),new s.Line(f,a)}(e,t);else if("TEXT"===e.type)a=c(e,t);else if("SOLID"===e.type)a=function(e,t){var a,n,r=new s.Geometry;(n=r.vertices).push(new s.Vector3(e.points[0].x,e.points[0].y,e.points[0].z)),n.push(new s.Vector3(e.points[1].x,e.points[1].y,e.points[1].z)),n.push(new s.Vector3(e.points[2].x,e.points[2].y,e.points[2].z)),n.push(new s.Vector3(e.points[3].x,e.points[3].y,e.points[3].z));var o=new s.Vector3,i=new s.Vector3;return o.subVectors(n[1],n[0]),i.subVectors(n[2],n[0]),o.cross(i),0>o.z?(r.faces.push(new s.Face3(2,1,0)),r.faces.push(new s.Face3(2,3,1))):(r.faces.push(new s.Face3(0,1,2)),r.faces.push(new s.Face3(1,3,2))),a=new s.MeshBasicMaterial({color:l(e,t)}),new s.Mesh(r,a)}(e,t);else if("POINT"===e.type)a=function(e,t){var a,n,r;(a=new s.Geometry).vertices.push(new s.Vector3(e.position.x,e.position.y,e.position.z));var o=l(e,t),i=new Float32Array(3);i[0]=o.r,i[1]=o.g,i[2]=o.b,a.colors=i,a.computeBoundingBox(),n=new s.PointsMaterial({size:.05,vertexColors:s.VertexColors}),r=new s.Points(a,n),v.push(r)}(e,t);else if("INSERT"===e.type)a=u(e,t);else if("SPLINE"===e.type)a=function(e,t){var a,n=l(e,t),r=e.controlPoints.map((function(e){return new s.Vector2(e.x,e.y)})),o=[];if(2===e.degreeOfSplineCurve||3===e.degreeOfSplineCurve){var i=0;for(i=0;i+2<r.length;i+=2)a=2===e.degreeOfSplineCurve?new s.QuadraticBezierCurve(r[i],r[i+1],r[i+2]):new s.QuadraticBezierCurve3(r[i],r[i+1],r[i+2]),o.push.apply(o,a.getPoints(50));i<r.length&&(a=new s.QuadraticBezierCurve3(r[i],r[i+1],r[i+1]),o.push.apply(o,a.getPoints(50)))}else a=new s.SplineCurve(r),o=a.getPoints(100);var c=(new s.BufferGeometry).setFromPoints(o),u=new s.LineBasicMaterial({linewidth:1,color:n});return new s.Line(c,u)}(e,t);else if("MTEXT"===e.type)a=o(e,t);else if("ELLIPSE"===e.type)a=function(e,t){var a=Math.pow,n=l(e,t),r=Math.sqrt(a(e.majorAxisEndPoint.x,2)+a(e.majorAxisEndPoint.y,2)),o=r*e.axisRatio,i=Math.atan2(e.majorAxisEndPoint.y,e.majorAxisEndPoint.x),c=new s.EllipseCurve(e.center.x,e.center.y,r,o,e.startAngle,e.endAngle,!1,i).getPoints(50),u=(new s.BufferGeometry).setFromPoints(c),p=new s.LineBasicMaterial({linewidth:1,color:n});return new s.Line(u,p)}(e,t);else if("DIMENSION"===e.type){var n=7&e.dimensionType;0==n?a=function(e,t){var a=t.blocks[e.block];if(!a||!a.entities)return null;for(var n,o=new s.Object3D,i=0;i<a.entities.length;i++)(n=r(a.entities[i],t))&&o.add(n);return o}(e,t):console.log("Unsupported Dimension type: "+n)}else"3DFACE"===e.type?console.log("Unsupported Entity Type: "+e.type,e):console.log("Unsupported Entity Type: "+e.type);return a}function o(e,t){var a=l(e,t);if(!n)return console.log("font parameter not set. Ignoring text entity.");var r=new s.TextGeometry(e.text,{font:n,size:.8*e.height,height:1}),o=new s.MeshBasicMaterial({color:a}),i=new s.Mesh(r,o),c=new s.Box3;c.setFromObject(i);var u=c.max.x-c.min.x;if(!(u>e.width)){switch(i.position.z=0,e.attachmentPoint){case 1:i.position.x=e.position.x,i.position.y=e.position.y-e.height;break;case 2:i.position.x=e.position.x-u/2,i.position.y=e.position.y-e.height;break;case 3:i.position.x=e.position.x-u,i.position.y=e.position.y-e.height;break;case 4:i.position.x=e.position.x,i.position.y=e.position.y-e.height/2;break;case 5:i.position.x=e.position.x-u/2,i.position.y=e.position.y-e.height/2;break;case 6:i.position.x=e.position.x-u,i.position.y=e.position.y-e.height/2;break;case 7:i.position.x=e.position.x,i.position.y=e.position.y;break;case 8:i.position.x=e.position.x-u/2,i.position.y=e.position.y;break;case 9:i.position.x=e.position.x-u,i.position.y=e.position.y;break;default:return}return i}console.log("Can't render this multipline MTEXT entity, sorry.",e)}function i(e,a){var n,r;"CIRCLE"===e.type?r=(n=e.startAngle||0)+2*t:(n=e.startAngle,r=e.endAngle);var o=new s.ArcCurve(0,0,e.radius,n,r).getPoints(32),i=(new s.BufferGeometry).setFromPoints(o),c=new s.LineBasicMaterial({color:l(e,a)}),u=new s.Line(i,c);return u.position.x=e.center.x,u.position.y=e.center.y,u.position.z=e.center.z,u}function c(e,a){var r,o,i;if(!n)return console.warn("Text is not supported without a Three.js font loaded with THREE.FontLoader! Load a font of your choice and pass this into the constructor. See the sample for this repository or Three.js examples at http://threejs.org/examples/?q=text#webgl_geometry_text for more details.");if(r=new s.TextGeometry(e.text,{font:n,height:0,size:e.textHeight||12}),e.rotation){var c=e.rotation*t/180;r.rotateZ(c)}return o=new s.MeshBasicMaterial({color:l(e,a)}),(i=new s.Mesh(r,o)).position.x=e.startPoint.x,i.position.y=e.startPoint.y,i.position.z=e.startPoint.z,i}function u(e,a){var n=a.blocks[e.name];if(!n.entities)return null;var o=new s.Object3D;e.xScale&&(o.scale.x=e.xScale),e.yScale&&(o.scale.y=e.yScale),e.rotation&&(o.rotation.z=e.rotation*t/180),e.position&&(o.position.x=e.position.x,o.position.y=e.position.y,o.position.z=e.position.z);for(var i,c=0;c<n.entities.length;c++)(i=r(n.entities[c],a))&&o.add(i);return o}function l(e,t){var a=0;return e.color?a=e.color:t.tables&&t.tables.layer&&t.tables.layer.layers[e.layer]&&(a=t.tables.layer.layers[e.layer].color),(null==a||16777215===a)&&(a=0),a}function p(e){var t,n={},r=0;for(t=0;t<e.length;t++)r+=a(e[t]);return n.uniforms=s.UniformsUtils.merge([s.UniformsLib.common,s.UniformsLib.fog,{pattern:{type:"fv1",value:e},patternLength:{type:"f",value:r}}]),n.vertexShader=["attribute float lineDistance;","varying float vLineDistance;",s.ShaderChunk.color_pars_vertex,"void main() {",s.ShaderChunk.color_vertex,"vLineDistance = lineDistance;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),n.fragmentShader=["uniform vec3 diffuse;","uniform float opacity;","uniform float pattern["+e.length+"];","uniform float patternLength;","varying float vLineDistance;",s.ShaderChunk.color_pars_fragment,s.ShaderChunk.fog_pars_fragment,"void main() {","float pos = mod(vLineDistance, patternLength);","for ( int i = 0; i < "+e.length+"; i++ ) {","pos = pos - abs(pattern[i]);","if( pos < 0.0 ) {","if( pattern[i] > 0.0 ) {","gl_FragColor = vec4(1.0, 0.0, 0.0, opacity );","break;","}","discard;","}","}",s.ShaderChunk.color_fragment,s.ShaderChunk.fog_fragment,"}"].join("\n"),n}!function(e){var t,a;if(e.tables&&e.tables.lineType){var n=e.tables.lineType.lineTypes;for(a in n)(t=n[a]).pattern&&(t.material=p(t.pattern))}}(e);var f,d,v=[];for(f=0;f<e.entities.length;f++)(d=r(e.entities[f],e))&&v.push(d),d=null;return{entities:v,dxf:e}}})}])}));