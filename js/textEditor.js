(function( $ ) {
 
    $.fn.textEditor = function(options) {
 
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white"
        }, options );

        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
        
 
    };
 
}( jQuery ));
 
// Usage example:
$( "a" ).showLinkLocation();