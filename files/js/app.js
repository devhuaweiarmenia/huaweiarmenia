var app = angular.module('huaweiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate']);

app.config(['$routeProvider', '$locationProvider', '$translateProvider',
    function ($routeProvider, $locationProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            'prefix': '/locales/locale-',
            'suffix': '.json'
        });
        $routeProvider
            .when("/:lang/", {
                templateUrl: '/templates/home.html',
                controller: 'homeController'
            });
        $routeProvider
            .when("/:lang/products/:product_slug", {
                templateUrl: '/templates/product.html',
                controller: 'productController'
            });
        $routeProvider
            .when("/:lang/enterprises", {
                templateUrl: '/templates/enterprises.html',
                controller: 'enterprisesController'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);
app.run(['$rootScope', '$routeParams', '$route', '$location', '$timeout', '$translate',
    function($rootScope, $routeParams, $route, $location, $timeout, $translate) {
        //$rootScope.$on('$routeChangeStart', function (event, next, current) {
            //var tempLocale = $location.path().slice(1,3);
            //if(tempLocale != "en" && tempLocale != "ru" && tempLocale != "hy") {
                //$location.path("/" + $rootScope.defaultLang + $location.path());
                //$translate.use($rootScope.defaultLang);
            //}
            //else {
            //    $rootScope.currentLang = $location.path().slice(1,3);
            //    $translate.use($rootScope.currentLang);
            //}
            //$rootScope.preLink = '/' + $rootScope.currentLang;
        //});
    }
]);

app.controller('mainController', ['$http', '$scope', 'mainService',
    function($http, $scope, mainService) {
        $scope.appStart = true;
        //            $route.updateParams({lang : $rootScope.lang});
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

app.controller('homeController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$routeParams', '$translate', 'mainService',
    function($http, $scope, $rootScope, $location, $timeout, $routeParams, $translate, mainService) {
        mainService.init($routeParams);
        $scope.homeSlider = [
            {
                title : 'Ascend Honor 4C',
                img : '/img/slider/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            },
            {
                title : 'Ascend Honor 4C',
                img : '/img/slider/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            },
            {
                title : 'Ascend Honor 4C',
                img : '/img/slider/P8.png',
                description : "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
            }
        ];
        $scope.productsMain = [
            {
                title : "Huawei P8",
                description : "5.2\" Dual SIM smartphone with IPS LCD display",
                img : "/img/main-products/Huawei P8.png",
                slug : "huawei-p8"
            },
            {
                title : "Huawei Honor 7",
                description : "5.2\" Dual SIM smartphone with IPS-NEO LCD display",
                img : "/img/main-products/Huawei Honor 7.png",
                slug : "huawei-honor-7"
            },
            {
                title : "Huawei NEXUS 6P",
                description : "5.7\" Single SIM smartphone with AMOLED displayy",
                img : "/img/main-products/Huawei NEXUS 6P.png",
                slug : "huawei-nexus-6p"
            }
        ];
    }
]);

app.controller('productController', ['$http', '$scope', '$routeParams', '$rootScope', '$location', 'mainService',
    function($http, $scope, $routeParams, $rootScope, $location, mainService) {

        mainService.init($routeParams);

        $scope.isNarrow = $(window).width() > 770;

        $scope.productBottom = $scope.isNarrow ? 'overview' : 'none';
        $scope.currentBigImg = "";
        $scope.toggleBottom = function(tab) {
            $scope.productBottom == tab ? $scope.productBottom = 'none' : $scope.productBottom = tab;
        };
        $http({
            url: "/api/getProduct",
            method: "POST",
            data: {
                lang : $rootScope.currentLang,
                slug : $routeParams.product_slug
            }
        }).success(function (product) {
            if(!product.error) {
                $scope.product = product.data;
                if($scope.product.img.length > 0) $scope.currentBigImg = $scope.product.img[0];
                $scope.toggleBigImg = function(url) {
                    $scope.currentBigImg = url;
                }
            }
            else {
                $location.path("/" + $rootScope.currentLang + "/404")
            }
        });

    }
]);

app.controller('enterprisesController', ['$scope', '$routeParams', '$rootScope', 'mainService',
    function($scope, $routeParams, $rootScope, mainService) {
        mainService.init($routeParams);
        $scope.enterpriseLink = $rootScope.currentLang != 'hy' ? $rootScope.currentLang : 'ru';
    }
]);

app.service('mainService', ['$rootScope', '$translate', '$location', '$route',
    function($rootScope, $translate, $location, $route){
        return {
            init : function(routeParams) {
                $rootScope.defaultLang = "hy";
                $rootScope.preLink = "/";
                if(!$rootScope.currentLang) $rootScope.currentLang = $rootScope.defaultLang;
                var tempLocale = routeParams.lang;
                console.log(tempLocale);
                if(routeParams.lang) {
                    if(tempLocale != "en" && tempLocale != "ru" && tempLocale != "hy") {
                        $location.path("/" + $rootScope.defaultLang + $location.path());
                        $translate.use($rootScope.defaultLang);
                    }
                    else {
                        $rootScope.currentLang = routeParams.lang;
                        $translate.use($rootScope.currentLang);
                    }
                    $rootScope.preLink = '/' + $rootScope.currentLang;
                    $rootScope.changeLang = function(lang) {
                        $rootScope.currentLang = lang;
                        $route.updateParams({lang : $rootScope.currentLang});
                        //$location.path("/" + lang + "/" + $location.path().slice(4));
                    };
                }
                else {
                    $location.path("/" + $rootScope.defaultLang + $location.path());
                    $translate.use($rootScope.defaultLang);
                }
            }
        }
    }
]);

app.directive('homeslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
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
                    });
                }
            })
        }
    }
});

app.directive('productsimgslider', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                if (scope.$last === true) {
                    var owl = $('.more-views-list');
                    owl.owlCarousel({
                        margin: 0,
                        loop: true,
                        dots: false,
                        navigation: true,
                        navigationText: [
                            "<img class=\"prod-arrow-left\" src='/img/other/arrow_dark_left.png'>",
                            "<img class=\"prod-arrow-right\" src='/img/other/arrow_dark_right.png'>"
                        ],
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplayHoverPause: true
                    });
                }
            })
        }
    }
});
