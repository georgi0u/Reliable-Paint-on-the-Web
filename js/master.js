$(function(){    
    // Smooth Scroll
    $('ul#navLinks a').smoothScroll({
        easing: 'swing',
        speed: 400
    });

    // Attach an event listener to all input fields to clear the "default" value on click
    $("input:text, textarea").bind("focus blur", clearForm);

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
        if (!$(this).data('placeholder'))
            $(this).data('placeholder', $(this).val());
    });

    // Form Validation
    $("#contactForm").data("valid", false);
    $("#contactForm .takesInput").data("valid", false);

    $("#name_input").bind("blur", function() {
        if($(this).val() == $(this).data('placeholder') || $(this).val() == '')
            $(this).addClass("invalid");
        else {
            $(this).removeClass("invalid");
            $(this).data("valid", true);
        }        
    });

    $("#reply_to_input").bind("blur", function() {
        $(this).data("valid", false);
        var email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        var val = $(this).val();
        if(val == $(this).data('placeholder') || val == '')
            $(this).addClass("invalid");
        else if (!email_regex.exec(val))
            $(this).addClass("invalid");
        else {
            alert(val);
            $(this).removeClass("invalid");
            $(this).data("valid", true);
        }
    });

    $("#phone_number_input").bind("blur", function() {
        $(this).data("valid", false);
        var email_regex = /^\d{3}$/i xxx start here
        var val = $(this).val();
        if(val == $(this).data('placeholder') || val == '')
            $(this).addClass("invalid");
        else if (!email_regex.exec(val))
            $(this).addClass("invalid");
        else {
            alert(val);
            $(this).removeClass("invalid");
            $(this).data("valid", true);
        }
    });
    

});

// Clears forms placeholder text
function clearForm(event) {
    if (event.type == 'focus') {    
        if ($(this).val() == $(this).data('placeholder'))
            $(this).val('');
    } 
    else
        if ($.trim($(this).val()) == '')
            $(this).val($(this).data('placeholder'));
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
