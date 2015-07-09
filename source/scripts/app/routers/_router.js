/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    var Router = Backbone.Router.extend({ });

    tcApp.Router = new Router();

    Backbone.history.start();
})();