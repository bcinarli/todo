/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    /**
     * Wrapper View of the application
     * All main events and subviews rendered here
     */
    tcApp.View = Backbone.View.extend({
        el: "#tc-app",

        events: {
            "submit #new-call"    : "createCall",
            "click .sortable"     : "sortCalls",
            "click .show-all"     : "showAll",
            "click .show-next"    : "showNext",
            "click .show-finished": "showFinished",
            "keydown #phone"      : "validatePhone"
        },

        // Templates using the main view. Other templates defined in subviews
        templates: {
            nextCall: tcApp.Templates["next-call"]
        },

        /**
         * Initializes the application
         * bind events and starts to listen model changes,
         * if any previously added call present, renders them
         */
        initialize: function() {
            /**
             * Cache the items
             */
            this.$form = this.$("#new-call");
            this.$phone = this.$("#phone");
            this.$list = this.$("#all-calls");
            this.$next = this.$("#next-call");

            this.listenTo(tcApp.calls, "add", this.addCall);
            this.listenTo(tcApp.calls, "reset", this.addCalls);
            this.listenTo(tcApp.calls, "sort", this.sortAll);
            this.listenTo(tcApp.calls, "all", _.debounce(this.render, 0));

            // make sure render when at the and of the fetch
            tcApp.calls.fetch({reset: true});
        },

        render: function() {
            /**
             * if any stored call present, shows the Calls list
             * also finds the next available call
             */
            if(tcApp.calls.length) {
                this.$list.removeClass("is-hidden");

                var $next = tcApp.findNext();

                if(typeof $next !== "undefined") {
                    this.$next.removeClass("is-hidden");
                    this.showNextCall($next);
                }
            }
            /**
             * if there are no calls or all calls are deleted
             * hides the Call list and Next Call panel
             */
            else {
                this.$next.addClass("is-hidden");
                this.$list.addClass("is-hidden");
            }
        },

        // Add a single call item to the list by creating a sub-view for it, and
        // appending its element to the `<tr>`.
        addCall: function(call) {
            var view = new tcApp.callsView({model: call});

            this.$list.find("tbody").append(view.render().el);
        },

        // Add all call items in collection
        addCalls: function() {
            this.$list.find("tbody").html("");

            tcApp.calls.each(this.addCall, this);
        },

        // Renders the Next Call panel if any upcoming call available
        showNextCall: function($next) {
            this.$next.html(this.templates.nextCall($next));
        },

        // Shows all items in the Call list
        showAll: function(e) {
            e.preventDefault();

            this.$list.find(".is-hidden").removeClass("is-hidden");
        },

        // Shows only the upcoming call item in the Call list
        showNext: function(e) {
            e.preventDefault();

            var $next = tcApp.findNext();

            this.$list.find("#" + $next.id).parent().removeClass("is-hidden").siblings().addClass("is-hidden");
        },

        // Shows only finished calls in the Call list
        showFinished: function(e) {
            e.preventDefault();

            this.$list.find(".is-passed").parent().removeClass("is-hidden").siblings().addClass("is-hidden");
        },

        // Force re-rendering to sorted collection
        sortAll: function() {
            this.addCalls();
        },

        // Trigger sorting according to direction and column
        sortCalls: function(e) {
            e.preventDefault();

            var $e = $(e.currentTarget),
                sortBy = $e.data("sort"),
                direction = $e.hasClass("asc") ? "desc" : "asc";

            this.$list.find(".sortable").removeClass("asc desc");
            $e.addClass(direction);

            tcApp.sort(sortBy, direction);
        },

        validatePhone: function(e) {
            // todo make this check more programmatic
            return e.which === 0 || e.which === 8 || e.which === 32 || e.which === 43 || e.which === 187 || e.which === 189 || (e.which >= 48 && e.which <= 57);
        },

        // Adds news call to the list
        createCall: function(e) {
            e.preventDefault();

            var _self = this,
                callData = tcApp.serializeJSON(_self.$form);

            // replace submitted phone number with reformatted one
            callData["phone"] = tcApp.reformatPhone(callData["phone"]);

            tcApp.calls.create(callData, {
                    success: function() {
                        _self.$form.find("input").val("");
                        tcApp.sort("time", "asc");
                    }
                }
            );
        }
    });
})();