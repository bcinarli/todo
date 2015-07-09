this["tcApp"] = this["tcApp"] || {};
this["tcApp"]["Templates"] = this["tcApp"]["Templates"] || {};

this["tcApp"]["Templates"]["call-list"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "class=\"is-passed\"";
},"3":function(depth0,helpers,partials,data) {
    return "checked";
},"5":function(depth0,helpers,partials,data) {
    return "disabled";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<td data-order=\""
    + alias3(((helper = (helper = helpers.order || (depth0 != null ? depth0.order : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"order","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + alias3(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"phone","hash":{},"data":data}) : helper)))
    + "</td>\n<td>"
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "</td>\n<td><button class=\"cancel-action delete-action\" title=\"Delete Call\">X</button></td>\n<td "
    + ((stack1 = (helpers.ifpassed || (depth0 && depth0.ifpassed) || alias1).call(depth0,(depth0 != null ? depth0.time : depth0),{"name":"ifpassed","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "><input type=\"checkbox\" "
    + ((stack1 = (helpers.ifpassed || (depth0 && depth0.ifpassed) || alias1).call(depth0,(depth0 != null ? depth0.time : depth0),{"name":"ifpassed","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " /></td>";
},"useData":true});

this["tcApp"]["Templates"]["next-call"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<fieldset>\n    <legend>Next Call</legend>\n\n    <ol class=\"form-elements group\">\n        <li class=\"five-columns\">\n            <label class=\"item item-stacked one-whole\">\n                <input type=\"text\" class=\"one-whole\" readonly value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" />\n            </label>\n        </li>\n\n        <li class=\"five-columns\">\n            <label class=\"item item-stacked one-whole\">\n                <input type=\"tel\" class=\"one-whole\" readonly value=\""
    + alias3(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"phone","hash":{},"data":data}) : helper)))
    + "\" />\n            </label>\n        </li>\n\n        <li class=\"two-columns\">\n            <label class=\"item item-stacked one-whole\">\n                <input type=\"text\" class=\"one-whole\" readonly value=\""
    + alias3(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"time","hash":{},"data":data}) : helper)))
    + "\" />\n            </label>\n        </li>\n    </ol>\n</fieldset>";
},"useData":true});