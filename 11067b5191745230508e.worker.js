!function(r){var n={};function t(e){if(n[e])return n[e].exports;var u=n[e]={i:e,l:!1,exports:{}};return r[e].call(u.exports,u,u.exports,t),u.l=!0,u.exports}t.m=r,t.c=n,t.d=function(r,n,e){t.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:e})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,n){if(1&n&&(r=t(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var u in r)t.d(e,u,function(n){return r[n]}.bind(null,u));return e},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},t.p="",t(t.s=0)}([function(r,n,t){"use strict";function e(r){return function(r){if(Array.isArray(r)){for(var n=0,t=new Array(r.length);n<r.length;n++)t[n]=r[n];return t}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.r(n);var u=function(r){var n,t=!1,e=0;return r.forEach(function(r){n!==r||null===r?(e=1,n=r):e+=1,4===e&&(t=n)}),t},o=function(r){var n;return r.forEach(function(r){var t=u(r);t&&(n=t)}),n},a=function(r){return function(r){var n;return r.forEach(function(r){var t=u(r);t&&(n=t)}),n}(r)||function(r){var n;return r[0].forEach(function(t,e){var o=u(r.map(function(r){return r[e]}));o&&(n=o)}),n}(r)||o(function(r){for(var n=[],t=r[0].length-4;t>=0;t--){for(var e=[],u=t,o=0;o<r.length&&(e.push(r[o][u]),!(++u>r[0].length-1));o++);n.push(e)}for(var a=1;a<r.length-3;a++){for(var f=[],i=a,l=0;l<r[0].length&&(f.push(r[i][l]),++i!==r.length);l++);n.push(f)}return n}(r))||o(function(r){for(var n=[],t=3;t<r.length;t++){for(var e=[],u=0,o=t;o>=0;o--)e.push(r[o][u]),u++;n.push(e)}for(var a=1;a<r[0].length-3;a++){for(var f=[],i=a,l=r.length-1;l>0&&(f.push(r[l][i]),!(++i>r[0].length-1));l--);n.push(f)}return n}(r))||function(r){var n;return-1!==(n=[]).concat.apply(n,e(r)).indexOf(null)&&null}(r)};function f(r){return function(r){if(Array.isArray(r)){for(var n=0,t=new Array(r.length);n<r.length;n++)t[n]=r[n];return t}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var i=function(r,n,t){var e,u=f(r),o=u[n];return o=o.map(function(r){return r||e?r:(e=!0,t)}),u[n]=o,u},l=function(r){for(var n=r.length-1;n>0;n--){var t=Math.floor(Math.random()*(n+1)),e=[r[t],r[n]];r[n]=e[0],r[t]=e[1]}return r},c=function r(n,t,e){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:-1e4,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1e4,f=a(n);if(null===f&&t<8){for(var c=[],v=0;v<n.length;v++){var p=n[v];if(null===p[p.length-1]){var h=r(i(n,v,e),t+1,"r"===e?"y":"r",u,o);if(c.push({columnNumber:v,value:h}),"r"===e?u=Math.max(u,h):o=Math.min(h,o),u>o)break}}if("r"===e){var s=l(c).reduce(function(r,n){return r.value>=n.value?r:n},{}),d=s.columnNumber,g=s.value;return 0===t?d:g}var y=function(r){return r.reduce(function(r,n){return r.value<=n.value?r:n},{})}(l(c)),b=y.columnNumber,m=y.value;return 0===t?b:m}return"y"===f?t-9999:"r"===f?9999-t:0};self.addEventListener("message",function(r){if(r.data){var n=r.data,t=n.board,e=n.player;self.postMessage(c(t,0,e))}})}]);