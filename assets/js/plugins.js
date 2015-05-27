// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));

/*global window */

/* Demonstration of cross-domain security workaround
   by Philip Hutchison, October 2010
   MIT-style license. Use at your own risk.
   This example's code can be made much more concise, but I'm using long form for clarity in the example
   See explanation at http://pipwerks.com/2010/10/17/iframes-and-cross-domain-security-part-3/
*/

//Returns boolean indicating whether parent frame is accessible
function isSameDomain(){
    
    //Using try/catch to check for top.location so we don't throw a JS error
    try {
        return !!top.location.href;
    } catch (e){
        return false;
    }
    
}


function useProxy(msg){
    
    //var 'msg' will be sent to proxy HTML file via a querystring.
    //This function will prep the string, then send to proxy 

    var querystring = window.location.href.split("?")[1] || false,
        id = "proxyframe", //The name of the frame
        proxy = frames[id], //Look for existing frame with name "proxyframe"
        url_array,
        root = "",
        pairs,
        url;

    if(!querystring || !msg){ return false; }
    

    // --- Prep/clean up string ---
    
    //Encode any question marks since they're reserved for querystrings
    msg = msg.replace(/\?/gi, "%3F");
    
    //URI encode the entire string
    msg = encodeURI(msg);
    
    
    // --- Send to proxy via querystring ---

    //First we must determine what domain is hosting the proxy file
    //by examining the querystring for our custom 'root' parameter
        
    //Ensure all ampersands are single (not entities) so we can split using "&"
    querystring = querystring.replace(/&amp;/g, "&");    
    pairs = querystring.split("&");

    //Loop through the pairs.
    for(var i=0; i < pairs.length; i++){

        if(pairs[i].indexOf("root=") !== -1){

            //Extract the value from the string by replacing the
            //identifier/assignment portion of the string with nothing ""
            root = pairs[i].replace("root=", "");    
            
            if(root !== ""){
                
                //a root parameter was found. decode it.
                root = decodeURI(root);
                
                //replace parent page filename in root parameter
                //with proxy filename and querystring
                url_array = root.split("/");                
                url_array[url_array.length -1] = "proxy.html?msg=" +msg;
                
                //Set new URL
                url = url_array.join("/");                
            
            }
            
            break; //We only care about the 'root' parameter
            
        }

    }
    
    //If the proxy iframe has already been created, use it
    if(proxy){

        //Redirect to the new URL
        proxy.location.href = url;

    //else create the proxy iframe
    } else {

        var iframe = document.createElement("iframe");
        iframe.id = id;
        iframe.name = id;
        iframe.src = url;
        iframe.style.display = "none";
        document.body.appendChild(iframe);

    }
    
}


function sendMessage(){

    var msg = document.getElementById("message").value;

    //If domains match, no need for proxy workaround.
    if(parent && isSameDomain()){
    
        //Invoke parent's JavaScript directly
        top.showMessage(msg);
    
    } else {
        
        //Security restrictions prevent us from communicating
        //directly with parent. Must use proxy instead.
        useProxy(msg);
        
    }

    return false;

}