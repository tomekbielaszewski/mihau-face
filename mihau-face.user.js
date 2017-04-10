// ==UserScript==
// @name       Mihau
// @namespace  http://wykop.pl/
// @version    1.3
// @description  Bug i wladca - Michaił Biaukov
// @match      http://www.wykop.pl/*
// @copyright  2017, @Grizwold
// @run-at document-body
// @updateURL   https://github.com/tomekbielaszewski/mihau-face/raw/master/mihau-face.user.js
// @installURL  https://github.com/tomekbielaszewski/mihau-face/raw/master/mihau-face.user.js
// @downloadURL https://github.com/tomekbielaszewski/mihau-face/raw/master/mihau-face.user.js
// ==/UserScript==

(function () {
    var css = "" +
        "@keyframes woosh {" +
        "4% {transform: translate(-40px);}" +
        "6% {transform: translate(0px);}" +
        "}" +
        " " +
        "#nav > div > ul.clearfix.mainnav > li:nth-child(2) > a {" +
        "background-color: " + (isNightMode() ? "#3c3c3c" : "#4383af;") +
        "}" +
        " " +
        "#nav > div > ul.clearfix.mainnav > li.active > a {" +
        "background-color: " + (isNightMode() ? "#2c2c2c" : "#2e6e99;") +
        "}" +
        " " +
        "#nav > div > ul.clearfix.mainnav > li:nth-child(2):before {" +
        "background-image: url('data:image/png;base64,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');" +
        "position: absolute;" +
        "width: 38px;" +
        "content: ' ';" +
        "left: 12px;" +
        "height: 48px;" +
        "top: 2px;" +
        "animation: woosh 30s infinite;" +
        "z-index: -1000" +
        "}";

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    function isNightMode() {
        return document.getElementsByTagName('body')[0].className.trim() === "night";
    }
})();