$(function(){    
   
    
    // Smooth Scroll
    $('ul#navLinks a').smoothScroll({
        easing: 'swing',
        speed: 400
    });


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


    // Add appropriote functions to input elements
    $("input:text, textarea").each(function(){
        this.validate = validate;
        this.setPlaceHolder = setPlaceHolder;
        $(this).bind("focus blur", inputFocusHandler);
        $(this).bind("blur", validate);
        this.setPlaceHolder();
    });

    // Validate the form on submit
    $("#contactForm").submit(function() {
        // Spam Check
        if($("#body_input").val() != "")
            return false;

        // Check to see if all the fields are valid
        var inputs = $(this).find('.takesInput');

        var inputs_valid = true;
        inputs.each(function() {
            this.validate();
            inputs_valid &= $(this).data("valid");
        });

        // Error Case
        if(!inputs_valid) {
            alert("Please fix the fields outlined in red above");
            return false;
        }

        // Send the Message
        $(this).ajaxSubmit();

        // Finish Up...
        inputs.each(setPlaceHolder);
        alert("Thanks! We'll get back to you by the next business day or sooner!");
        return false;

    });
});

function setPlaceHolder() {
    $(this).val($(this).data("placeholder"));
    $(this).addClass("placeHolder");
    $(this).removeClass("invalid");
}

function inputFocusHandler(event) {
    if (event.type == 'focus') {
        if ($(this).val() == $(this).data("placeholder")) {
            $(this).val('');
            $(this).removeClass("placeHolder");            
        }
    } 
    else if ($.trim($(this).val()) == '') {
        this.setPlaceHolder()
    }
}

function validate() {
    var input_element = this;

    var setErrorMessage = function(error_message) {
        var id = $(this).attr("id");
        $(input_element).next('span').text(error_message);
    }

    var setFormatErrorMessage = function() {
        var error_message = $(input_element).next("span").data("format_error");
        setErrorMessage.call($(input_element),error_message);
    }

    var regex = new RegExp($(input_element).data("valid_value_regex"));
    $(input_element).data('valid', false);
    var val = $(input_element).val().trim();
    if(!val) return;

    if(val == $(input_element).data('placeholder') || val == '') {
        $(input_element).addClass("invalid");
        setErrorMessage("This field is required.");
    }
    else if (!regex.exec(val)) {
        setFormatErrorMessage();
        $(input_element).addClass("invalid");
    }
    else {
        $(input_element).removeClass("invalid");
        $(input_element).data("valid", true);
        $(input_element).val(val);
        setErrorMessage("");
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
