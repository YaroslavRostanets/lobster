cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cl.rmd.cordova.dialoggps/www/DialogGPS.js",
        "id": "cl.rmd.cordova.dialoggps.DialogGPS",
        "pluginId": "cl.rmd.cordova.dialoggps",
        "clobbers": [
            "cordova.dialogGPS"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/src/browser/InAppBrowserProxy.js",
        "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
        "pluginId": "cordova-plugin-inappbrowser",
        "merges": [
            ""
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-geolocation": "2.4.1",
    "cordova.plugins.diagnostic": "3.3.3",
    "cordova-plugin-gpslocation": "1.0.0",
    "cl.rmd.cordova.dialoggps": "0.0.2",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-inappbrowser": "1.6.1",
    "cordova-plugin-crosswalk-webview": "2.1.0",
    "cordova-plugin-device": "1.1.5"
}
// BOTTOM OF METADATA
});