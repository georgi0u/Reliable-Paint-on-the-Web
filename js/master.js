$(function(){    
   
    
    // Smooth Scroll
    $('ul#navLinks a').smoothScroll({
        easing: 'swing',
        speed: 400
    });


    // Attach an event listener to all input fields to clear the "default" value on click
    $("input:text, textarea").bind("focus blur", inputFocusHandler);


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
    $("input:text, textarea").each(function(){
        setPlaceHolder.call($(this));
    });


    // Form Validation
    $("#contactForm .takesInput").data("valid", false);
    $("#name_input").bind("blur", function() {
        validate.call($(this), true, /.*/);
    });
    $("#reply_to_input").bind("blur", function() {
        var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        validate.call($(this), false, regex);
    });
    $("#phone_number_input").bind("blur", function() {
        var regex = /^(\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4})|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/;
        validate.call($(this), false, regex);
    });    
    $("#message_input").bind("blur", function() {
        var regex = /.+/;
        validate.call($(this), true, regex);
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
        return false;
    });
});

var isPlaceheld = function(element) {
    return (element.val() == element.data("placeholder"));    
}

function setPlaceHolder() {
    $(this).val($(this).data("placeholder"));
    $(this).addClass("placeHolder");
    $(this).removeClass("invalid");
}

function clearPlaceHolder() {
    $(this).val('');
    $(this).removeClass("placeHolder");
}

function inputFocusHandler(event) {
    if (event.type == 'focus') {
        if (isPlaceheld($(this)))
            clearPlaceHolder.call($(this));
    } 
    else if ($.trim($(this).val()) == '') {
        setPlaceHolder.call($(this));
    }
}

function setFormatErrorMessage() {
    var error_message = $(this).next("span").data("format_error");
    setErrorMessage.call($(this),error_message);
}

function setErrorMessage(error_message) {
    var id = $(this).attr("id");
    $(this).next('span').text(error_message);
}

attach functions to input elements

function validate(required, regex) {
    $(this).data('valid', false);
    var val = $(this).val().trim();
    if(!val) return;

    if(val == $(this).data('placeholder') || val == '') {
        if(!required) {
            $(this).data('valid', true);
            setErrorMessage.call($(this),"");
            return;            
        }
        $(this).addClass("invalid");
        setErrorMessage.call($(this), "This input is required.");
    }
    else if (!regex.exec(val)) {
        setFormatErrorMessage.call($(this));
        $(this).addClass("invalid");
    }
    else {
        $(this).removeClass("invalid");
        $(this).data("valid", true);
        $(this).val(val);
        setErrorMessage($(this),"");
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
