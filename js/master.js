$(function(){    
    // Smooth Scroll
    $('ul#navLinks a').smoothScroll({
        easing: 'swing',
        speed: 400
    });

    // Attach an event listener to all input fields to clear the "default" value on click
    $("input:text, textarea").bind("focus blur", massageInput);

    // Flip between core values and about us sections
    $("section#coreValuesAndAboutUs > h1.nonActive").live('click',function(event){
        to_toggle = $("section#coreValuesAndAboutUs").children();
        to_toggle.each(function() {
            var non_active_str = "nonActive"
            if($(this).attr("class") == non_active_str)
                $(this).toggleClass();
            else
                $(this).toggleClass(non_active_str);
        });
    });

    // Attach placeholder values to forms
    clearForm();

    // Form Validation
    $("#contactForm .takesInput").data("valid", false);
    $("#name_input").bind("blur", function() {
        validate($(this), true, /.*/);
    });
    $("#reply_to_input").bind("blur", function() {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        validate($(this), false, regex);
    });
    $("#phone_number_input").bind("blur", function() {
        var regex = /^\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/;
        validate($(this), false, regex);
    });    
    $("#message_input").bind("blur", function() {
        var regex = /.+/;
        validate($(this), true, regex);
    });
    $("#contactForm input.submit").click(function() {
        if($("body_input").val() != "")
            return false;        

        if(isPlaceheld($("#reply_to_input")) && isPlaceheld($("#phone_number_input"))) {
            alert("Please enter either an email address or a phonenumber for us to get back to you by");
            return false;
        }

        var inputs_valid = true;

        $("#contactForm .takesInput").each(function() {
            $(this).trigger("blur");
            inputs_valid &= $(this).data("valid");
        });

        if(!inputs_valid) {
            alert("Please fix the fields outlined in red above");
            return false;
        }        

        alert("valid");                        
    });
});

function clearInput(input) {
    input.val(input.data("placeholder"));
    input.addClass("placeHolder");
    input.removeClass("invalid");
}
function clearForm() {
    $("input:text, textarea").each(function(){
        clearInput($(this));
    });
}

// Clears forms placeholder text
function massageInput(event) {
    if (event.type == 'focus') {    
        if (isPlaceheld($(this))) {
            $(this).val('');
            $(this).removeClass("placeHolder");
            $(this).removeClass("invalid");
        }
    } 
    else if ($.trim($(this).val()) == '') {
        clearInput($(this));
    }
}


function isPlaceheld(element) {
    return (element.val() == element.data("placeholder") ||
            element.val() == element.data("error_message") ||
            element.val() == "");
}

function validate(input_element, required, regex) {
    input_element.data('valid', false);
    var val = input_element.val().trim();
    if(!val) return;

    if(val == input_element.data('placeholder') || 
       val == input_element.data('error_message') ||
       val == '') 
    {
        if(required) {
            input_element.addClass("invalid");
            var error_message = "This field is required.";
            input_element.data('error_message',error_message);
            input_element.val(error_message);
        }
        else {
            input_element.data('valid', true);
            return;
        }
    }
    else if (!regex.exec(val)) {
        var error_message = "This field doesn't look right. Is it in the correct format?";
        input_element.data('error_message',error_message);
        input_element.val(error_message);
        input_element.addClass("invalid");
    }
    else {
        input_element.removeClass("invalid");
        input_element.data("valid", true);
        input_element.val(val);
    }
}



// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/
function email(){
    coded = "dYq9Wd9@v14HWf41lWHq9.Yvp"
    key = "oI0jAyr3QaKkNTPbqldtEz1H2YJ86gmvsMWLOGU7fX4x9VhZ5DFwBnpcSuCeiR"
    shift=coded.length
    link=""
    for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
            ltr = coded.charAt(i)
            link += (ltr)
        }
        else {     
            ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
            link += (key.charAt(ltr))
        }
    }
    return "<a href='mailto:"+link+"'>Contact@ReliablePaint.org</a>";
}
