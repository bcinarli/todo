/**
 * @author Bilal Cinarli
 */

describe("Testing ToDo Calls", function() {
    var $list = $("#all-calls-list");

    var setForm = function(values) {
        var $form = $("#new-call");

        _.each(values, function(value, prop) {
            $("#" + prop).val(value);
        });

        return $form.trigger("submit");
    };

    before(function() {
        Object.keys(localStorage)
            .forEach(function(key) {
                if(/^todo-call/.test(key)) {
                    localStorage.removeItem(key);
                }
            });

        tcApp.calls.reset();
    });

    it("Adding New Call", function() {
        setForm({
            name : "Giacomo Guilizzoni",
            phone: "00420 777 888 999",
            time : "09:20"
        });

        setForm({
            name : "Miranda Patterson",
            phone: "+(420)-111222333",
            time : "11:35"
        });

        setForm({
            name : "Erica Foster",
            phone: "+420 222333444",
            time : "12:40"
        });

        setForm({
            name : "Shannon Holland",
            phone: "+420 333 444 555",
            time : "16:50"
        });

        setForm({
            name : "Alexandar Morgan",
            phone: "+420444555666",
            time : "17:20"
        });

        expect($list.find("tbody tr").length).to.be.equal(5);
    });

    it("Deleting Call", function() {
        $list.find(".delete-action").first().click();
        expect($list.find("tbody tr").length).to.be.equal(4);
    });

    it("Finding Next Call", function() {
        var storage_next = tcApp.findNext(),
            calculate_next = "",
            testlist = [
                {name: "Miranda Patterson", phone: "+(420)-111222333", time: "11:35"},
                {name: "Erica Foster", phone: "+420 222333444", time: "12:40"},
                {name: "Shannon Holland", phone: "+420 333 444 555", time: "16:50"},
                {name: "Alexandar Morgan", phone: "+420444555666", time: "17:20"}
            ],
            date = new Date(),
            time = date.getHours() + ":" + date.getMinutes();

        _.each(testlist, function(item) {
            if(calculate_next === "" && Date.parse("01/01/2015 " + item.time) > Date.parse("01/01/2015 " + time)) {
                calculate_next = item;
            }
        });

        expect(storage_next.time).to.be.equal(calculate_next.time);
    });

    it("Reformatting Phone Number", function() {
        var phone1 = tcApp.reformatPhone("+(420) 111 222 333"),
            phone2 = tcApp.reformatPhone("+(420)111222333"),
            phone3 = tcApp.reformatPhone("+420111222333"),
            phone4 = tcApp.reformatPhone("00420111222333");

        expect(phone1).to.be.equal("00420 111 222 333");
        expect(phone2).to.be.equal("00420 111 222 333");
        expect(phone3).to.be.equal("00420 111 222 333");
        expect(phone4).to.be.equal("00420 111 222 333");
    });
});