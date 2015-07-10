/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    // Single Call item
    tcApp.callsView = Backbone.View.extend({
        tagName: "tr",

        // Call item template
        template: tcApp.Templates["call-list"],

        events: {
            "click .delete-action": "delete"
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },

        render: function() {
            if(this.model.changed.id !== undefined) {
                return;
            }

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        delete: function() {
            // show confirmation window in not testing
            if(typeof mochaTesting === "undefined") {
                if(confirm("The call will be deleted. Do you want to continue?")) {
                    this.model.destroy();
                }
            }
            else {
                this.model.destroy();
            }
        }
    });
})(jQuery);