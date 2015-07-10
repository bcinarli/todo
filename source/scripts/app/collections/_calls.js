/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.Calls = Backbone.Collection.extend({
        model       : tcApp.Call,

        // Local storage with namespace "todo-calls"
        localStorage: new Backbone.LocalStorage("todo-calls"),

        // initial sorting when collection fetched first time
        comparator: "time"
    });

    tcApp.calls = new tcApp.Calls();
})();