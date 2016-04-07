var Class = (function() {

    var IS_DONTENUM_BUGGY = (function(){
        for (var p in { toString: 1 }) {
            if (p === 'toString') return false;
        }
        return true;
    })();

    function $A(iterable) {
        if (!iterable) return [];
        if ('toArray' in Object(iterable)) return iterable.toArray();
        var length = iterable.length || 0, results = new Array(length);
        while (length--) results[length] = iterable[length];
        return results;
    }
    function subclass() {};
    function create() {
        var parent = null, properties = $A(arguments);
        if (Object.isFunction(properties[0]))
            parent = properties.shift();

        function klass() {
            this.initialize.apply(this, arguments);
        }

        Object.extend(klass, Class.Methods);
        klass.superclass = parent;
        klass.subclasses = [];

        if (parent) {
            subclass.prototype = parent.prototype;
            klass.prototype = new subclass;
            parent.subclasses.push(klass);
        }

        for (var i = 0, length = properties.length; i < length; i++)
            klass.addMethods(properties[i]);

        if (!klass.prototype.initialize)
            klass.prototype.initialize = Prototype.emptyFunction;

        klass.prototype.constructor = klass;
        return klass;
    }

    function addMethods(source) {
        var ancestor   = this.superclass && this.superclass.prototype,
            properties = Object.keys(source);

        if (IS_DONTENUM_BUGGY) {
            if (source.toString != Object.prototype.toString)
                properties.push("toString");
            if (source.valueOf != Object.prototype.valueOf)
                properties.push("valueOf");
        }

        for (var i = 0, length = properties.length; i < length; i++) {
            var property = properties[i], value = source[property];
            if (ancestor && Object.isFunction(value) &&
                value.argumentNames()[0] == "$super") {
                var method = value;
                value = (function(m) {
                    return function() { return ancestor[m].apply(this, arguments); };
                })(property).wrap(method);

                value.valueOf = (function(method) {
                    return function() { return method.valueOf.call(method); };
                })(method);

                value.toString = (function(method) {
                    return function() { return method.toString.call(method); };
                })(method);
            }
            this.prototype[property] = value;
        }

        return this;
    }

    return {
        create: create,
        Methods: {
            addMethods: addMethods
        }
    };
})();

var AmZoomer  = Class.create();
AmZoomer.prototype = ({
    zoomSettings: [],
    generalSettings: [],
    carouselSettings: [],
    lightboxSettings: [],
    
    initialize: function (settings) {
            if(settings['zoom'] || settings['general']) {
                this.zoomSettings = settings['zoom'];
                this.generalSettings = settings['general'];
                this.carouselSettings = settings['carousel'];
                this.lightboxSettings = settings['lightbox'];
            }
    },
    
    loadZoom: function() {
        if(this.generalSettings['zoom_enable'] === "1" || this.generalSettings['lightbox_enable'] === "1") {
            $("#amasty_zoom").elevateZoom(this.zoomSettings);
        }        
        //$("#amasty_zoom").data('elevateZoom', this.zoomSettings);/*
        if(this.generalSettings['change_image'] != "0" && $("amasty_zoom") && $("amasty_gallery")) {
            var self = this;
            $("#amasty_gallery a").bind(self.generalSettings['change_image'], function(e) {  
                 // Example of using Active Gallery
                 $('#amasty_gallery a').removeClass('active');
                 $(this).addClass('active'); 
                 var ez =   $('#amasty_zoom').data('elevateZoom');
                 ez.swaptheimage($(this).attr("data-image"), $(this).attr("data-zoom-image"));
                 if(!self.generalSettings['thumbnail_lignhtbox'] === "1") {
                    return false;   
                 } 
            });
        }
        
        if(this.generalSettings['lightbox_enable'] === "1"  && $("amasty_zoom")) {
            $("#amasty_zoom").bind("click", function(e) {  
                var ez =  $("#amasty_zoom").data('elevateZoom'); 
                $.fancybox(ez.getGalleryList(), AmZoomerObj.lightboxSettings);
                return false;
            });    
        } 
        if(this.generalSettings['thumbnail_lignhtbox'] === "1") {
            $('.fancybox').fancybox(AmZoomerObj.lightboxSettings);    
        }
        this.loadCarousel();
    },
    
    loadCarousel: function() {
        if(this.generalSettings['carousel_enable'] === "1"  && $("amasty_zoom")  && $("amasty_gallery")) {
            $("#amasty_gallery").carouFredSel(this.carouselSettings);    
        }        
    }
    
});

Event.observe(window, 'load', function(){
    if('undefined' != typeof(AmZoomerObj)) {
        AmZoomerObj.loadZoom();
    }
});