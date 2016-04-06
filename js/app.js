var app = angular.module('huaweiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider',
    function ($routeProvider, $locationProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            'prefix': 'locales/locale-',
            'suffix': '.json'
        });
        $routeProvider
            .when("/", {
                //templateUrl: '/templates/home.html',
                //controller: 'HomeCtrl'
            });
    }
]);

app.controller('mainController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$window', '$translate',
    function($http, $scope, $rootScope, $location, $timeout, $window, $translate) {
        $translate.use("ru");
        $scope.homeSlider = [
            {
                title : 'Ascend Honor 4C',
                img : 'http://huaweiarmenia.am/images/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            },
            {
                title : 'Ascend Honor 4C',
                img : 'http://huaweiarmenia.am/images/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            },
            {
                title : 'Ascend Honor 4C',
                img : 'http://huaweiarmenia.am/images/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            }
        ]
    }
]);

app.directive('homeslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    //console.log(el);
                    //var $frame=el.parent().parent();
                    //console.log($frame);
                    //var $wrap = $frame.parent();
                    //
                    //// Call Sly on frame
                    //$frame.sly({
                    //    horizontal: 1,
                    //    itemNav: 'forceCentered',
                    //    smart: 1,
                    //    activateMiddle: 1,
                    //    mouseDragging: 1,
                    //    touchDragging: 1,
                    //    releaseSwing: 1,
                    //    startAt: 0,
                    //    scrollBar: $wrap.find('.scrollbar'),
                    //    scrollBy: 1,
                    //    speed: 300,
                    //    elasticBounds: 1,
                    //    easing: 'easeOutExpo',
                    //    dragHandle: 1,
                    //    dynamicHandle: 1,
                    //    clickBar: 1,
                    //
                    //    prev: $wrap.find('.prev'),
                    //    next: $wrap.find('.next')
                    //});
                    var owl = $('.main-slider-list');
                    owl.owlCarousel({
                        margin: 0,
                        loop: true,
                        dots: true,
                        items :1,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true,
                        singleItem: true
                        //navigation: true,
                        //slideSpeed: 800,
                        //singleItem: true,
                        //responsive: true,
                        //transitionStyle: "fadeUp",
                        //loop: true,
                        //autoplay: true,
                        //autoplayTimeout: 5000,
                        //autoplayHoverPause: true
                    });
                }
            })
        }
    }
});

