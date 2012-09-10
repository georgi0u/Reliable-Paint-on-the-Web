$(function(){    
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

});

// Clears forms placeholder text
function clearForm(event) {
    if (event.type == 'focus') {
        if (!$(this).data('placeholder'))
            $(this).data('placeholder', $(this).val());
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
    coded = "1pJHT1H@NXkvTGkXdTvJH.1py"
    key = "wxd9QYWuyXnEbVo5T7MAZ1rUI6RjFqgi0StJlGLpDP3CzmeNhs82Ba4KvOcHfk"
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
    return "<a href='mailto:"+link+"'>Contact@ReliablePaint.com</a>";
}
