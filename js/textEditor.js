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
            backgroundColor: "white",   //Default Background Color of Container
            buttons: ['bold','italic'],
            loadFontAwesomeCss: true       //load Font Awesome
        }, options );


        //Load Default Css file
        if(settings.css){
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: "css/textEditor.css"
             }).appendTo("head");
        }

        //Load Font Awesome CSS
        if(settings.css){
            $("<link/>", {
                rel: "stylesheet",
                type: "text/css",
                href: "css/all.min.css"
             }).appendTo("head");
        }

        //This will confirm plugin work with multi object
        return this.each(function(){
            create.apply(this);
        });

        function enableEditMode () {
            frame.document.designMode = 'On';
        }

        
        //Create the elements
        function create(){
            originalObjects.push(this);
            let container = $('<div></div>').addClass('textEditor').css('width',settings.width).css('height',settings.height);
            let toolBar = $("<div></div>").addClass('toolBox');


            settings.buttons.forEach(function(i,k){
                let letBtn = getDefaultButton(i);
                toolBar.append(letBtn);
            })


            let frameBox = $('<div></div>').addClass('frameBox');
            let frame = $('<iframe></iframe>').addClass('frame').attr('id','frame').attr('name','frame');

            $(this).css('display','none'); //Hide the main object
            frameBox.append(frame);
            container.append(toolBar).append(frameBox);

            container.insertBefore(this);

            enableEditMode();
        }
        
        //This function will hold all the predefined buttons
        function getDefaultButton(title){
            let btn;
            switch (title){
                case 'bold':
                    btn = {title:'bold',icon:'bold',className:'btn btn-primary',callBack:boldFunction};
                break;
                case 'italic': 
                    btn = {title:'italic',icon:'italic',className:'btn btn-primary',callBack:italicFunction}
                    break;
                default:
                    btn =  null;
            }
            if(btn != null) return createButtonX(btn);
            return null;
        }

        function createButtonX(obj){
            let btnObj = $('<button></button>').addClass(obj.className);
            
            //Set Icon
            if(obj.icon != null){
                let icon = $('<i></i>').addClass('fa fa-' + obj.icon);
                btnObj.append(icon);
            }else{
                btnObj.text(obj.title);
            }

            //Set Callback function
            if(obj.callBack != null && obj.callBack instanceof Function){
                btnObj.on('click',obj.callBack);
            }
            return btnObj;
        }
    };


    function boldFunction(){
        execCmd('bold');
    }

    function italicFunction(){
        execCmd('italic');
    }

    function execCmd (command) {
        frame.document.execCommand(command, false, null);
    }

}( jQuery ));
 