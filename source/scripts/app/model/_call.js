/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.Call = Backbone.Model.extend({
        defaults    : {
            name : "",
            phone: "",
            time : ""
        },
        localStorage: new Backbone.LocalStorage("todo-calls")
    });
})();