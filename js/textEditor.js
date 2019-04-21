(function( $ ) {
 
    $.fn.textEditor = function(options) {
        let originalObjects = new Array();
        let createdObjects = new Array();

        let settings = $.extend({
            // These are the defaults.
            css: true,
            height: '200px',
            width: '100%',
            backgroundColor: "white"
        }, options );

        //Load Default Css file
        if(settings.css){
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: "css/textEditor.css"
             }).appendTo("head");
        }


        //This will confirm plugin work with multi object
        return this.each(function(){
            create(this);
        });


        //Create the elements
        function create(e){
            originalObjects.push(e);
            let container = $('<div></div>').addClass('textEditor').css('width',settings.width).css('height',settings.height);
            let toolBar = $("<div></div>").addClass('toolBox');
            let frameBox = $('<div></div>').addClass('frameBox');
            let frame = $('<iframe></iframe>').addClass('frame');

            $(e).css('display','none'); //Hide the main object
            frameBox.append(frame);
            container.append(toolBar).append(frameBox);

            container.insertBefore(e);
        }

        // // Greenify the collection based on the settings variable.
        // return this.css({
        //     color: settings.color,
        //     backgroundColor: settings.backgroundColor
        // });
        alert('Plugins Called');
 
    };
 
}( jQuery ));
 