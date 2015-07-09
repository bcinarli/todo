/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function($) {
    "use strict";

    tcApp.serializeJSON = function(rawData) {
        var arr = rawData.serializeArray(),
            json = {};

        $.map(arr, function(item) {
            json[item["name"]] = item["value"];
        });

        return json;
    };

    tcApp.reformatPhone = function(phone) {
        var reformatted;

        // remove spaces, dash and parenthesis and replace
        reformatted = phone.replace(/\+/g, "00").replace(/[\(\)\-\s+]/g, "");

        // change phone format for storage
        reformatted = reformatted.replace(/(\d{5})/g, "$1 ").replace(/(\s\d{3})/, "$1 ");

        return reformatted;
    };

    tcApp.sort = function(list, direction) {
        var sorted = [],
            key, a = [];

        for(key in list) {
            if(list.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        a.sort();

        if(direction === "reverse") {
            a.reverse();
        }

        for(key = 0; key < a.length; key++) {
            sorted.push(list[a[key]]);
        }
        return sorted;
    };

    new tcApp.View({model: tcApp.Call});
})(jQuery);