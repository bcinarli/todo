/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.callsView = Backbone.View.extend({
        tagName: "tr",

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
            if(confirm("The call will be deleted. Do you want to continue?")) {
                this.model.destroy();
            }
        }
    });
})(jQuery);