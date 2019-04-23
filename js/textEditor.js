(function( $ ) {

    $.fn.textEditor = function(options) {

        let originalObjects = new Array();  //to hold all the original objects
        let createdObjects = new Array();   //to hold all the created objects

        //Get the options from user
        let settings = $.extend({
            // These are the defaults.
            css: true,                  //Set if default css file will be loaded with plugins
            height: '200px',            //Default Height fo container
            width: '100%',              //Default width of the container
            backgroundColor: "white",   //Default Backgroud Color of Container
            buttos: ['bold']
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
            create.apply(this);
        });


        //Create the elements
        function create(){
            originalObjects.push(this);
            let container = $('<div></div>').addClass('textEditor').css('width',settings.width).css('height',settings.height);
            let toolBar = $("<div></div>").addClass('toolBox');

            let btnObj1 = createButton('Bold');
            let btnObj2 = createButton('Italic');

            toolBar.append(btnObj1).append(btnObj2);

            let frameBox = $('<div></div>').addClass('frameBox');
            let frame = $('<iframe></iframe>').addClass('frame');

            $(this).css('display','none'); //Hide the main object
            frameBox.append(frame);
            container.append(toolBar).append(frameBox);

            container.insertBefore(this);
        }

        //A function to create button
        function createButton(btnTitle,btnClass = 'btn btn-primary',btnIcon = null ,btnCallback = null){
            let btnObj = $('<button></button>').addClass(btnClass).text(btnTitle);
            btnObj.on('click',function(){
                alert('You clicked on ' + btnTitle);
            })
            return btnObj;
        }

        // // Greenify the collection based on the settings variable.
        // return this.css({
        //     color: settings.color,
        //     backgroundColor: settings.backgroundColor
        // });
        alert('Plugins Called');
 
    };
 
}( jQuery ));
 