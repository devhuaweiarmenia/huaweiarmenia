var app = angular.module('huaweiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider',
    function ($routeProvider, $locationProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            'prefix': '/locales/locale-',
            'suffix': '.json'
        });
        $routeProvider
            .when("/", {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            });
        $routeProvider
            .when("/products/:product_slug", {
                templateUrl: '/templates/product.html',
                controller: 'productController'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

app.controller('mainController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$window', '$translate',
    function($http, $scope, $rootScope, $location, $timeout, $window, $translate) {
        $translate.use("ru");
        $scope.menuLinks = {
            smartphones : [
                { title : 'Nexus 6P', slug : 'nexus-6p'},
                { title : 'G6', slug : 'g6'},
                { title : 'G730', slug : 'g730'},
                { title : 'Honor 3', slug : 'honor3'},
                { title : 'Honor 3X', slug : 'honor-3x'},
                { title : 'Honor 4C', slug : 'honor-4c'},
                { title : 'Honor 4X', slug : 'honor-4x'},
                { title : 'Honor 7', slug : 'honor-7'},
                { title : 'P8 lite', slug : 'nexus-6p'},
                { title : 'P8', slug : 'p8'},
                { title : 'P6 S', slug : 'p6-s'},
                { title : 'Y220', slug : 'y220'},
                { title : 'Y330', slug : 'y330'},
                { title : 'Y541', slug : 'y541'},
                { title : 'Y625', slug : 'y625'},
                { title : 'Honor 5X', slug : 'honor-5x'}
            ],
            tablets : [
                { title : 'MediaPad X1', slug : 'mediapad-x1'},
                { title : 'MediaPad T1 7 3G', slug : 'mediapad-t1-7'},
                { title : 'MediaPad T1 8 4G', slug : 'mediapad-t1-8'}
            ]
        };
    }
]);

app.controller('homeController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$window', '$translate',
    function($http, $scope, $rootScope, $location, $timeout, $window, $translate) {
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
        ];
        $scope.productsMain = [
            {
                title : "Huawei P8",
                description : "5.2\" Dual SIM smartphone with IPS LCD display",
                link : "http://huaweiarmenia.am/images/01_3.png",
                slug : "huawei-p8"
            },
            {
                title : "Huawei Honor 7",
                description : "5.2\" Dual SIM smartphone with IPS-NEO LCD display",
                link : "http://huaweiarmenia.am/images/01_2.png",
                slug : "huawei-honor-7"
            },
            {
                title : "Huawei NEXUS 6P",
                description : "5.7\" Single SIM smartphone with AMOLED displayy",
                link : "http://huaweiarmenia.am/images/01_1.png",
                slug : "huawei-nexus-6p"
            }
        ];
    }
]);

app.controller('productController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$window', '$translate',
    function($http, $scope, $rootScope, $location, $timeout, $window, $translate) {

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

