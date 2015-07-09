/**
 * @author Bilal Cinarli
 */

Handlebars.registerHelper("ifpassed", function(conditional, options) {
    var currentDate = new Date(),
        time = currentDate.getHours() + ":" + currentDate.getMinutes();

    if(Date.parse("01/01/2015 " + conditional) < Date.parse("01/01/2015 " + time)) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});