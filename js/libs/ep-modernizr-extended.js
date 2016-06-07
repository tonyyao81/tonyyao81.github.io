/* modernizr-test.js
 * Daniel Ott
 * 3 March 2011
 * Custom Tests using Modernizr's addTest API
 * https://gist.github.com/danott/855078
 *
 * Extended by Lakana
 * This must be loaded after Modernizr and that is its only dependency
 *
 * **** ATTENTION! ****
 * Make sure to minify this to ep-modernizr-extended.min.js when editing
 */
(function() {

    //Perform our UA checks and store them to vars.
    var ipadUAString     = navigator.userAgent.match(/iPad/i),
        iphoneUAString   = navigator.userAgent.match(/iPhone/i),
        ipodUAString     = navigator.userAgent.match(/iPod/i),
        androidUAString  = navigator.userAgent.match(/Android/i),
        windowsUAString  = navigator.userAgent.match(/Windows/i),
        appleiosUAString = (ipadUAString || iphoneUAString || ipodUAString);

    // Single object to configure device names
    var devices = {
        iphone   : "iphone",
        ipad     : "ipad",
        ipod     : "ipod",
        appleios : "appleios",
        android  : "android",
        windows  : "windows"
    };

    Modernizr.addTest(devices.ipad, function () {
        return !!ipadUAString && !windowsUAString;
    });

    Modernizr.addTest(devices.iphone, function () {
        return !!iphoneUAString && !windowsUAString;
    });

    Modernizr.addTest(devices.ipod, function () {
        return !!ipodUAString && !windowsUAString;
    });

    Modernizr.addTest(devices.appleios, function () {
        return !!appleiosUAString && !windowsUAString;
    });

    Modernizr.addTest(devices.android, function () {
        return !!androidUAString && !windowsUAString;
    });

    /*
     * CSS position:fixed
     * Not supported in older IE browsers, nor on Apple's iOS devices.
     * Actually the token example on the Modernizr docs. http://www.modernizr.com/docs/
     */
    Modernizr.addTest('positionfixed', function () {
        var test    = document.createElement('div'),
            control = test.cloneNode(false),
            fake = false,
            root = document.body || (function () {
                fake = true;
                return document.documentElement.appendChild(document.createElement('body'));
            }());

        var oldCssText = root.style.cssText;
        root.style.cssText = 'padding:0;margin:0';
        test.style.cssText = 'position:fixed;top:42px';
        root.appendChild(test);
        root.appendChild(control);

        var ret = test.offsetTop !== control.offsetTop;

        root.removeChild(test);
        root.removeChild(control);
        root.style.cssText = oldCssText;

        if (fake) {
            document.documentElement.removeChild(root);
        }

        /*
         * Uh-oh. iOS would return a false positive here.
         * If it's about to return true, we'll explicitly test for known iOS User Agent strings.
         * "UA Sniffing is bad practice" you say. Agreeable, but sadly this feature has made it to
         * Modernizr's list of undectables, so we're reduced to having to use this.
         */
        return ret && !Modernizr.appleios;
    });

    /**
     * Update a tag in the dom with the device class and log the action.
     *
     * @param {string} tagName - The tag we are targeting with the new class.
     * @param {string} deviceClass - The class being added to the DOM element.
     * @param {string} deviceName - Passing the name of the device for logging.
     */
    function updateTag(tagName, deviceClass, deviceName) {
        var elem = document.getElementsByTagName(tagName)[0];
        elem.className += " " + deviceClass + " ";
        console.log(deviceName + " detected, adding the class: " + deviceClass + " to the " + tagName + " tag" );
    }

    // Set up some globals to use in our tests.
    var tagToUpdate = "html",
        prefix = "ep-base-";

    /*
     * Use the tests to update the html tag
     * accordingly.
     */
    if (Modernizr[devices.iphone]) {
        updateTag(tagToUpdate, prefix + devices.iphone, devices.iphone);
    }

    if (Modernizr[devices.ipad]){
        updateTag(tagToUpdate, prefix + devices.ipad, devices.ipad);
    }

    if (Modernizr[devices.ipod]){
        updateTag(tagToUpdate, prefix + devices.ipod, devices.ipod);
    }

    if (Modernizr[devices.appleios]){
        updateTag(tagToUpdate, prefix + devices.appleios, devices.appleios);
    }

    if (Modernizr[devices.android]){
        updateTag(tagToUpdate, prefix + devices.android, devices.android);
    }

}());