(function( $ ) {

    $.fn.textEditor = function(options) {

        let originalObjects = new Array();  //to hold all the original objects
        let createdObjects = new Array();   //to hold all the created objects
        let frame;
        let theIframe;
        let sections = new Object();

        //Get the options from user
        let settings = $.extend({
            // These are the defaults.
            css: true,                  //Set if default css file will be loaded with plugins
            height: '200px',            //Default Height fo container
            width: '100%',              //Default width of the container
            backgroundColor: "white",   //Default Background Color of Container
            buttons: ['bold','italic','underline','|'],
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

        function enableEditMode (frame) {
            
            frame.cdocument.designMode = 'On';

        }

        
        //Create the elements
        function create(){
            //Get the container
            let container = $('<div></div>').addClass('textEditor').css('width',settings.width).css('height',settings.height);
            //Get the Toolbar
            let toolBar = $("<div></div>").addClass('toolBox');

            //Get all  buttons
            settings.buttons.forEach(function(i,k){
                let letBtn = getButton(i);
                toolBar.append(letBtn);
            })

            //Container for iFrame
            let frameBox = $('<div></div>').addClass('frameBox');
            //The iFrame
            frame = $('<iframe></iframe>').addClass('frame').attr('id','frame').attr('name','frame');

            //Hide the main object
            $(this).css('display','none');
            //iFrame added in frame container
            frameBox.append(frame);
            //Toolbar added into container
            container.append(toolBar).append(frameBox);
            //Container added into textarea
            container.insertBefore(this);

            theIframe = $('#frame').contents().get(0);

            theIframe.open();
            theIframe.write('Test');
            theIframe.close();
            theIframe.designMode = 'on';
        }
        
        //This function will return default functions
        function getButton(obj){
           if(typeof (obj) === 'string' ){
                return getDefaultButton(obj);
            }else if(typeof(obj) === 'object' ){
                return getCustomButtonY(obj);
            }
        }

        //This function will create custom button
        function getCustomButtonY(x){
            
            let title       =   x.title       || null;
            let icon        =   x.icon        || null;
            let type        =   x.type        || 'insert';
            let btnClass    =   x.btnClass    || null;

            let btnObj = $('<button></button>');
            btnObj.attr('data-title',title);
            btnObj.attr('data-icon',icon);
            btnObj.attr('data-type',type);
            btnObj.attr('data-btnClass',btnClass);

            if(btnClass != null ){
                btnObj.addClass(btn);
            }else{
                btnObj.addClass('btn btn-primary')
            }     

            //Set Icon
            if(icon != null){
                let icon = $('<i></i>').addClass('fa fa-' + icon);
                btnObj.append(icon);
            }else{
                btnObj.text(title);
            }

            //Set Callback function
            if(type == 'insert'){
                btnObj.on('click',function(){
                    let xF = $(window.frame.document.getElementsByTagName("body")[0]);
                    
                    if(typeof sections[title] === 'undefined' || sections[title] == false){
                        sections[title] = true;
                        let container = $('<div></div>').attr('id',title);
                        let headings = $('<p></p>').addClass('headings');
                        let para = $("<p></p>").text('Write about ' + title + ' here.');
                        container.append(headings);
                        container.append(para);
                       
                        let c = $('<div></div>').attr('id',title);
                        let h = $('<h3></h3>').addClass('headings').text(title);
                        let p = $('<p></p>').text('Overwrite ' + title + 'here');
                        c.append(h).append(p);
                        xF.append(c);
                    }else if(sections[title] == true){
                        sections[title] = false;
                        
                        let id =  title;
                        let el = $(window.frame.document.getElementById(id));
                        if(el.length > 0 ){
                            el.remove();
                            return;
                        }
                    }
                });
            }

            return btnObj;
            }

       

        
    };

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
            case 'underline': 
                btn = {title:'underline',icon:'underline',className:'btn btn-primary',callBack:underlineFunction}
            break;
            case '|': 
                return addSpace();
            default:
                btn =  null;
        }
        if(btn != null) return createButtonX(btn);
        return null;
    }
    
    //This function will return default buttons
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

    //The execCommand for iFrame
    function execCmd (command) {
        frame.document.execCommand(command, false, null);
    }

    /**
     * All this below functions are for default buttons
     */

    //The Bold Function
    function boldFunction(){
        execCmd('bold');
    }

    //The italic Function
    function italicFunction(){
        execCmd('italic');
    }

    //The underline Function
    function underlineFunction(){
        execCmd('underline');
    }
  

    //This function wil return a space item, you can customize the space with css of plugins
    function addSpace(){
        let spcObj = $('<span></span>').addClass('spacer');
        
        return spcObj;
    }


}( jQuery ));
 