$(function(){    
    // Attach an event listener to all input fields to clear the "default" value on click
    $("input:text, textarea").bind("focus blur",clearForm );

    $("section#coreValuesAndAboutUs > h1.nonActive").click(function(event){
        sections = $(this).siblings("section");        

        sections.eq(".nonActive").removeClass("nonActive");

    });
    

});




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
    coded = "EG0w4Ew@jJqc4WqJf4c0w.GjP";
    key = "ZTGHN8qt6fVgBcCre4zym53hWLInDuF1wKOvPSEojJAlUsp7MYid0kaxXRQ29b";
    shift=coded.length;
    link="";
    for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
            ltr = coded.charAt(i);
            link += (ltr);
        }
        else {     
            ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
            link += (key.charAt(ltr));
        }
    }
    return "<a href = \"mailto:" + link + "\">" + link + "</a>";
}


