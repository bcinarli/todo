/**
 * @author Bilal Cinarli
 */

var tcApp = tcApp || {};

(function() {
    "use strict";

    tcApp.View = Backbone.View.extend({
        el: "#tc-app",

        events: {
            "submit #new-call"    : "createCall",
            "click .sortable"     : "sortCalls",
            "click .show-all"     : "showAll",
            "click .show-next"    : "showNext",
            "click .show-finished": "showFinished"
        },

        templates: {
            nextCall: tcApp.Templates["next-call"]
        },

        initialize: function() {
            this.$form = this.$("#new-call");
            this.$list = this.$("#all-calls");
            this.$next = this.$("#next-call");

            this.listenTo(tcApp.calls, "add", this.addCall);
            this.listenTo(tcApp.calls, "reset", this.addCalls);
            this.listenTo(tcApp.calls, "sort", this.sortAll);
            this.listenTo(tcApp.calls, "all", _.debounce(this.render, 0));

            tcApp.calls.fetch({reset: true});
        },

        render: function() {
            if(tcApp.calls.length) {
                this.$list.removeClass("is-hidden");

                var $next = this.findNext();

                if(typeof $next !== "undefined") {
                    this.$next.removeClass("is-hidden");
                    this.showNextCall($next);
                }
            }
            else {
                this.$next.addClass("is-hidden");
                this.$list.addClass("is-hidden");
            }
        },

        addCall: function(call) {
            var view = new tcApp.callsView({model: call});

            this.$list.find("tbody").append(view.render().el);
        },

        addCalls: function() {
            this.$list.find("tbody").html("");

            tcApp.calls.each(this.addCall, this);
        },

        showNextCall: function($next) {
            this.$next.html(this.templates.nextCall($next));
        },

        showAll: function(e) {
            e.preventDefault();

            this.$list.find(".is-hidden").removeClass("is-hidden");
        },

        showNext: function(e) {
            e.preventDefault();

            var $next = this.findNext();

            this.$list.find("#" + $next.id).parent().removeClass("is-hidden").siblings().addClass("is-hidden");
        },

        showFinished: function(e) {
            e.preventDefault();

            this.$list.find(".is-passed").parent().removeClass("is-hidden").siblings().addClass("is-hidden");
        },

        sortAll: function() {
            this.addCalls();
        },

        sortCalls: function(e) {
            e.preventDefault();

            var $e = $(e.currentTarget),
                sortBy = $e.data("sort"),
                direction = $e.hasClass("asc") ? "desc" : "asc";

            this.$list.find(".sortable").removeClass("asc desc");
            $e.addClass(direction);

            this.sort(sortBy, direction);
        },

        createCall: function(e) {
            e.preventDefault();

            var _self = this,
                callData = tcApp.serializeJSON(_self.$form);

            callData["phone"] = tcApp.reformatPhone(callData["phone"]);

            tcApp.calls.create(callData, {
                    success: function() {
                        _self.$form.find("input").val("");
                        _self.sort("time", "asc");
                    }
                }
            );
        },

        /**
         * Utility Methods
         */

        /**
         * Finds the first call (the next call).
         * Loops through the call records and compare time with current time
         */
        findNext: function() {
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
        },

        /**
         * Backbone Collection comparator modifier
         * Modifies the comparator method according to given column name and the directions
         * By default, collection sorted according to "time" in ascending order.
         * @param sortBy
         * @param direction
         */
        sort: function(sortBy, direction) {
            tcApp.calls.comparator = function(call1, call2) {
                if(direction === "desc") {
                    return call1.get(sortBy) > call2.get(sortBy) ? -1 : 1;
                }

                return call1.get(sortBy) > call2.get(sortBy) ? 1 : -1;
            };
            tcApp.calls.sort();
        }
    });
})();