/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.Calls = Backbone.Collection.extend({
        model       : tcApp.Call,
        localStorage: new Backbone.LocalStorage("todo-calls"),

        finished: function(){

        },

        nextOrder   : function() {
            return this.length ? this.last().get("order") + 1 : 1;
        },

        comparator: "time"
    });

    tcApp.calls = new tcApp.Calls();
})();