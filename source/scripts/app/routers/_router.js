/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

/**
 * In the application we are not using router
 * but for the standard architecture of the Backbone Apps
 * we just add an empty router
 */

(function() {
    "use strict";

    var Router = Backbone.Router.extend({ });

    tcApp.Router = new Router();

    Backbone.history.start();
})();