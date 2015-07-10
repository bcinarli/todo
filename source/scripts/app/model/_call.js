/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.Call = Backbone.Model.extend({
        /**
         * Default attributes for a call
         * Make sure required fields passed to the storage
         */
        defaults    : {
            name : "",
            phone: "",
            time : ""
        }
    });
})();