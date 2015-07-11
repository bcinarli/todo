/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function($) {
    "use strict";

    /**
     * Convert form data to a json object
     * @param rawData
     * @returns {{}}
     */
    tcApp.serializeJSON = function(rawData) {
        var arr = rawData.serializeArray(),
            json = {};

        $.map(arr, function(item) {
            json[item["name"]] = item["value"];
        });

        return json;
    };

    /**
     * Reformats the phone number according to spec
     * @param phone
     * @returns {XML|string|*}
     */
    tcApp.reformatPhone = function(phone) {
        var reformatted;

        // remove spaces, dash and parenthesis and replace
        reformatted = phone.replace(/\+/g, "00").replace(/[\(\)\-\s+]/g, "");

        // change phone format for storage
        reformatted = reformatted.replace(/(\d{5})(\d{3})(\d{3})/, "$1 $2 $3 ");

        return reformatted;
    };

    /**
     * Finds the first call (the next call).
     * Loops through the call records and compare time with current time
     */
    tcApp.findNext = function() {
        var date = new Date(),
            time = date.getHours() + ":" + date.getMinutes(),
            next = "",
            tmp = [];

        // first need to copy model to a temp array
        // otherwise, the ordering changes everytime
        _.each(tcApp.calls.models, function(item) {
            tmp.push(item.attributes);
        });

        var sorted = _.sortBy(tmp, function(item) {
            return item.time;
        });

        _.each(sorted, function(item) {
            if(next === "" && Date.parse("01/01/2015 " + item.time) > Date.parse("01/01/2015 " + time)) {
                next = item;
            }
        });

        return next;
    };

    /**
     * Backbone Collection comparator modifier
     * Modifies the comparator method according to given column name and the directions
     * By default, collection sorted according to "time" in ascending order.
     * @param sortBy
     * @param direction
     */
    tcApp.sort = function(collection, sortBy, direction) {
        collection.comparator = function(call1, call2) {
            if(direction === "desc") {
                return call1.get(sortBy) > call2.get(sortBy) ? -1 : 1;
            }

            return call1.get(sortBy) > call2.get(sortBy) ? 1 : -1;
        };
        collection.sort();
    };

    new tcApp.View({model: tcApp.Call});
})(jQuery);