// Function to verify that the phone number is correct.
// Here, I validate for (12345), but you have to change that for a phone validation
// Tutorials on Regular expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions 
// https://flaviocopes.com/javascript-regular-expressions/ 
// Regular expressions can get complex, you can think in terms of a series of characters
// or numbers 

// Regex was taken from here https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
// This regex validate this format --> (123)456-7890
function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like 1234567890, (123) 456-7890, 123 456 7890, 123.456.7890, +91 (123) 456-7890

    var filter = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (filter.test(a)) {
        return true;
    } else {
        return false;
    }
}
// This regex was taken from 
// here: https://stackoverflow.com/questions/10246242/basic-regex-for-16-digit-numbers
function validateDebit(txtDebit) {
    var b = document.getElementById(txtDebit).value;
    // This filter asks for something like 1111222233334444, 
    // 1111 2222 3333 4444, 1111-2222-3333-4444
    var filter = /^\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b$/;
    if (filter.test(b)) {
        return true;
    } else {
        return false;
    }
}

function validateSecurityCode(txtSecurityCode) {
    var c = document.getElementById(txtSecurityCode).value;
    // This filter asks for something like 1111222233334444, 
    // 1111 2222 3333 4444, 1111-2222-3333-4444
    var filter = /^\d{3}$/;
    if (filter.test(c)) {
        return true;
    } else {
        return false;
    }
}


// Using date restrictions on datepicker
// Document of datepicker is here: https://api.jqueryui.com/datepicker/ 
// The following code shows how to set specific dates to exclude, as well as Sundays (Day 0)
// Make sure in your version that you associate Days to remove with Experts (e.g. John doesn't work Mondays)

var barbersAvailability = {
    "1": ["06/10/2020", "06/19/2020", "06/27/2020", "07/30/2020", "07/07/2020", "07/16/2020"],
    "2": ["06/04/2020", "06/06/2020", "06/18/2020", "06/09/2020", "07/28/2020", "07/17/2020"],
    "3": ["06/08/2020", "06/25/2020", "06/10/2020", "08/29/2020", "07/21/2020", "07/23/2020"],
    "4": ["06/12/2020", "06/27/2020", "06/26/2020", "06/25/2020", "07/10/2020", "08/20/2020"],
    "5": ["06/30/2020", "06/11/2020", "06/19/2020", "06/16/2020", "07/23/2020", "07/02/2020"]
};

const setDateFormat = "mm/dd/yy";
const setDateFormatForSecurityCode = "mm/yy";

function disableDates(date) {
    var choice = $("input:radio[name='barberChoices']:checked").val();
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    // return [unavailableDates.indexOf(string) == -1]
    return [barbersAvailability[choice].indexOf(string) == -1]
}


// HERE, JQuery "LISTENING" starts
$(document).ready(function () {

    $("#customerInfoForm").submit(function () {
        alert("Your appointment is booked! Thank you.");
    });

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function () {
        if (!validatePhone("phone")) {
            alert("Wrong format for phone number");
            $("#phone").val("(xxx) xxx-xxxx");
            $("#phone").addClass("error");
        } else {
            $("#phone").removeClass("error");
        }
    });

    // credit validation, it calls validateDebit
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the debit input
    // The "error" class in style.css defines yellow background and red foreground
    $("#debit").on("change", function () {
        if (!validateDebit("debit")) {
            alert("Wrong format for credit card");
            $("#debit").val("xxxxxxxxxxxxxxxx");
            $("#debit").addClass("error");
        } else {
            $("#debit").removeClass("error");
        }
    });



    // securityCode validation, it calls validateSecurityCode
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the debit input
    // The "error" class in style.css defines yellow background and red foreground
    $("#securityCode").on("change", function () {
        if (!validateSecurityCode("securityCode")) {
            alert("Wrong format for security code");
            $("#securityCode").val("xxx");
            $("#securityCode").addClass("error");
        } else {
            $("#securityCode").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $("#dateInput").datepicker({
        dateFormat: setDateFormat,
        // no calendar before June 1rst 2020
        minDate: new Date('06/01/2020'),
        maxDate: '+3M',
        // used to disable some dates
        beforeShowDay: $.datepicker.noWeekends,
        beforeShowDay: disableDates
    });

    $("#expiryDate").datepicker({
        dateFormat: setDateFormatForSecurityCode
    });


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function () {
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function () {
        $("#debit").removeClass("showInput");
    });

    $("#phone").on("mouseenter", function () {
        $("#phone").addClass("showInput");
    });

    $("#phone").on("mouseleave", function () {
        $("#phone").removeClass("showInput");
    });

    $("#securityCode").on("mouseenter", function () {
        $("#securityCode").addClass("showInput");
    });

    $("#securityCode").on("mouseleave", function () {
        $("#securityCode").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#phone").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

    $("#securityCode").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });
});