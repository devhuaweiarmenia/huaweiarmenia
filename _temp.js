var app=angular.module('huaweiApp', ['ngRoute', 'ngSanitize', 'pascalprecht.translate']);
app.config(['$routeProvider', '$locationProvider', '$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {
    $translateProvider.useStaticFilesLoader( {
            'prefix': '/locales/locale-', 'suffix': '.json'
        }
    );
    $routeProvider.when("/", {
            templateUrl: '/templates/home.html', controller: 'homeController'
        }
    );
    $routeProvider.when("/:lang/", {
            templateUrl: '/templates/home.html', controller: 'homeController'
        }
    );
    $routeProvider.when("/:lang/smartphones", {
            templateUrl: '/templates/smartphones.html', controller: 'smartphonesController'
        }
    );
    $routeProvider.when("/:lang/tablets", {
            templateUrl: '/templates/smartphones.html', controller: 'tabletsController'
        }
    );
    $routeProvider.when("/:lang/products/:product_slug", {
            templateUrl: '/templates/product.html', controller: 'productController'
        }
    );
    $routeProvider.when("/:lang/enterprises", {
            templateUrl: '/templates/enterprises.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/about-us", {
            templateUrl: '/templates/aboutus.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/our-partners", {
            templateUrl: '/templates/partners.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/our-projects", {
            templateUrl: '/templates/projects.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/contacts", {
            templateUrl: '/templates/contacts.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/contacts", {
            templateUrl: '/templates/contacts.html', controller: 'enterprisesController'
        }
    );
    $routeProvider.when("/:lang/blog", {
            templateUrl: '/templates/blog.html', controller: 'blogController'
        }
    );
    $routeProvider.when("/:lang/blog/:slug", {
            templateUrl: '/templates/article.html', controller: 'articleController'
        }
    );
    $locationProvider.html5Mode( {
            enabled: true, requireBase: false
        }
    );
}

]);
app.run(['$rootScope', '$routeParams', '$route', '$location', '$timeout', '$translate', 'mainService', function($rootScope, $routeParams, $route, $location, $timeout, $translate, mainService) {
    $rootScope.$on("$routeChangeSuccess", function(event, current) {
            $rootScope.currentRoute=location.pathname.slice(4);
        }
    );
}

]);
app.controller('mainController', ['$http', '$routeParams', '$scope', '$rootScope', '$sce', 'mainService', function($http, $routeParams, $scope, $rootScope, $sce, mainService) {
    $scope.appStart=false;
    console.log(location.hostname);
    if(location.hostname!='huaweiarmenia.am') {
        $scope.appStart=true;
    }
    console.log($scope.appStart);
    $scope.menuLinks= {
        smartphones:[ {
            title: 'Nexus 6P', slug: 'nexus-6p'
        }
            , {
                title: 'G6', slug: 'g6'
            }
            , {
                title: 'G730', slug: 'g730'
            }
            , {
                title: 'Honor 3', slug: 'honor3'
            }
            , {
                title: 'Honor 3X', slug: 'honor-3x'
            }
            , {
                title: 'Honor 4C', slug: 'honor-4c'
            }
            , {
                title: 'Honor 4X', slug: 'honor-4x'
            }
            , {
                title: 'Honor 7', slug: 'honor-7'
            }
            , {
                title: 'P8 lite', slug: 'nexus-6p'
            }
            , {
                title: 'P8', slug: 'p8'
            }
            , {
                title: 'P6 S', slug: 'p6-s'
            }
            , {
                title: 'Y220', slug: 'y220'
            }
            , {
                title: 'Y330', slug: 'y330'
            }
            , {
                title: 'Y541', slug: 'y541'
            }
            , {
                title: 'Y625', slug: 'y625'
            }
            , {
                title: 'Honor 5X', slug: 'honor-5x'
            }
        ], tablets:[ {
            title: 'MediaPad X1', slug: 'mediapad-x1'
        }
            , {
                title: 'MediaPad T1 7 3G', slug: 'mediapad-t1-7'
            }
            , {
                title: 'MediaPad T1 8 4G', slug: 'mediapad-t1-8'
            }
        ]
    }
    ;
    $scope.productsSubmenu=[ {
        title: "Huawei P8", description: "5.2\" Dual SIM smartphone with IPS LCD display", img: "/img/header-menu/6p.png", slug: "huawei-p8"
    }
        , {
            title: "Huawei Honor 7", description: "5.2\" Dual SIM smartphone with IPS-NEO LCD display", img: "/img/header-menu/6p.png", slug: "huawei-honor-7"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/header-menu/6p.png", slug: "huawei-nexus-6p"
        }
    ];
    $scope.trustSrc=function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    ;
    $rootScope.scrollToTop=function() {
        console.log('a');
        $('html, body').animate( {
                scrollTop: 0
            }
            , 'fast');
        $('html, body').scrollTop(300);
    }
    ;
    $rootScope.leftMenu= {
        visible:false, opened: {
            products: false, abouts: false
        }
        , toggle:function(target) {
            $rootScope.leftMenu.opened[''+target]=!$rootScope.leftMenu.opened[''+target];
        }
        , open:function() {
            $rootScope.leftMenu.visible=true;
        }
        , close:function() {
            $rootScope.leftMenu.visible=false;
        }
    }
}

]);
app.controller('homeController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$routeParams', '$translate', 'mainService', function($http, $scope, $rootScope, $location, $timeout, $routeParams, $translate, mainService) {
    $rootScope.scrollToTop();
    $scope.videoLink='';
    $scope.showVideo=false;
    mainService.init($routeParams);
    $scope.homeSlider=[ {
        title: 'Ascend Honor 4C', img: '/img/slider/111.jpg', description: "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
    }
        , {
            title: 'Ascend Honor 4C', img: '/img/slider/111.jpg', description: "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
        }
        , {
            title: 'Ascend Honor 4C', img: '/img/slider/111.jpg', description: "\- Three-segment ultra slim frame design <br> - Innovative design <br> - Strong signal reception delivers stable call experience <br>"
        }
    ];
    $scope.productsMain=[ {
        title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
    }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
        , {
            title: "Huawei NEXUS 6P", description: "5.7\" Single SIM smartphone with AMOLED displayy", img: "/img/main-products/Huawei NEXUS 6P.png", slug: "huawei-nexus-6p"
        }
    ];
    $scope.mainVideos=[ {
        title: 'Huawei P8', img: '/img/video/p9.png', text: 'Smartphone Huawei P8!', link: 'https://www.youtube.com/embed/uPV7v1SUDkY'
    }
    ];
    $scope.openVideoMain=function(link) {
        $scope.showVideo=true;
        $scope.videoLink=link;
    }
    ;
    $scope.closeVideo=function() {
        $scope.showVideo=false;
        $scope.videoLink='';
    }
    ;
}

]);
app.controller('smartphonesController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$routeParams', '$translate', 'mainService', function($http, $scope, $rootScope, $location, $timeout, $routeParams, $translate, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.menuActive='smartphones';
    $http({url:"/api/getProducts", method:"POST", data: {type:'s'}}
    ).success(function(products) {
        $scope.productsMain = products;
    });
    // $scope.productsMain = [
    //     {
    //         title: "Huawei P6S", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "p6s"
    //     },
    //     {
    //         title: "Honor 3", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "honor-3"
    //     },
    //     {
    //         title: "Huawei G6", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "g6-3g"
    //     },
    //     {
    //         title: "Huawei Y220", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "y220"
    //     },
    //     {
    //         title: "Honor 4C Pro", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "4c-pro"
    //     },
    //     {
    //         title: "Huawei G730", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "g730"
    //     },
    //     {
    //         title: "Huawei P9 Lite", description: "", status: 'new', statusText: 'Coming Soon', img: "/img/main-products/", slug: "p9-lite"
    //     },
    //     {
    //         title: "Huawei P9", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "huawei-p9"
    //     },
    //     {
    //         title: "Honor 5X", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "honor-5x"
    //     },
    //     {
    //         title: "Huawei Y5 II", description: "", status: 'new', statusText: 'Coming Soon', img: "/img/main-products/", slug: "huawei-y5ii"
    //     },
    //     {
    //         title: "Huawei Y3 II", description: "", status: '', statusText: '', img: "/img/main-products/", slug: "huawei-huawei-y3ii"
    //     },
    //     {
    //         title: "Honor 5C", description: "", status: 'new', statusText: 'Coming Soon', img: "/img/main-products/"
    //         //, slug: "honor-5c"
    //     },
    //     {
    //         title: "Honor 8", description: "", status: 'new', statusText: 'Coming Soon', img: "/img/main-products/"
    //         //,slug: "honor-8"
    //     },
    //     {
    //         title: "Huawei Y6 II", description: "", status: 'new', statusText: 'Coming Soon', img: "/img/main-products/", slug: "huawei-y6ii"
    //     }
    // ];
}

]);
app.controller('tabletsController', ['$http', '$scope', '$rootScope', '$location', '$timeout', '$routeParams', '$translate', 'mainService', function($http, $scope, $rootScope, $location, $timeout, $routeParams, $translate, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.menuActive='tablets';
    $http({url:"/api/getProducts", method:"POST", data: {type:'t'}}
    ).success(function(products) {
        $scope.productsMain = products;
    });
    // $scope.productsMain = [
    //     {
    //         title: "Huawei MediaPad X1", description: "", img: "/img/main-products/", slug: "mediapad-t1-7-0"
    //     },
    //     {
    //         title: "Huawei MediaPad T1 7.0", description: "", img: "/img/main-products/", slug: "mediapad-t1-8-0"
    //     },
    //     {
    //         title: "Huawei MediaPad T1 8.0", description: "", img: "/img/main-products/", slug: "mediapad-x1-7"
    //     }
    // ];
}

]);
app.controller('productController', ['$http', '$scope', '$routeParams', '$rootScope', '$location', 'mainService', function($http, $scope, $routeParams, $rootScope, $location, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.isNarrow=$(window).width()>770;
    $scope.productBottom=$scope.isNarrow?'overview': 'none';
    $scope.currentBigImg="";
    $scope.toggleBottom=function(tab) {
        $scope.productBottom==tab?$scope.productBottom='none': $scope.productBottom=tab;
    }
    ;
    $http( {
            url:"/api/getProduct", method:"POST", data: {
                lang: $rootScope.currentLang, slug: $routeParams.product_slug
            }
        }
    ).success(function(product) {
            if(!product.error) {
                $scope.product=product;
                if($scope.product.img.length>0)$scope.currentBigImg=$scope.product.img[0];
                $scope.toggleBigImg=function(url) {
                    $scope.currentBigImg=url;
                }
            }
            else {
                $location.path("/"+$rootScope.currentLang+"/404")
            }
        }
    );
}

]);
app.controller('enterprisesController', ['$scope', '$routeParams', '$rootScope', 'mainService', function($scope, $routeParams, $rootScope, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.enterpriseLink=$rootScope.currentLang!='hy'?$rootScope.currentLang: 'ru';
}

]);
app.controller('blogController', ['$scope', '$routeParams', '$rootScope', 'mainService', function($scope, $routeParams, $rootScope, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.enterpriseLink=$rootScope.currentLang!='hy'?$rootScope.currentLang: 'ru';
    $scope.news=[ {
        title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
    }
        , {
            title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
        }
        , {
            title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
        }
        , {
            title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
        }
        , {
            title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
        }
        , {
            title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
        }
    ];
    var Share= {
            vkontakte:function(purl, ptitle, pimg, text) {
                url='http://vkontakte.ru/share.php?';
                url+='url='+'http://'+location.hostname+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&title='+encodeURIComponent(ptitle);
                url+='&description='+encodeURIComponent(text);
                url+='&image='+encodeURIComponent(pimg);
                url+='&noparse=true';
                Share.popup(url);
            }
            , facebook:function(purl, ptitle, pimg, text) {
                url='http://www.facebook.com/sharer.php?s=100';
                url+='&p[title]='+encodeURIComponent(ptitle);
                url+='&p[summary]='+encodeURIComponent(text);
                url+='&p[url]='+'http://'+location.hostname+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&p[images][0]='+encodeURIComponent(pimg);
                Share.popup(url);
            }
            , twitter:function(purl, ptitle) {
                url='http://twitter.com/share?';
                url+='text='+encodeURIComponent(ptitle.replace(/<\S[^><]*>/g, ''));
                url+='&url='+'http://'+location.hostname+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&counturl='+encodeURIComponent(purl);
                Share.popup(url);
            }
            , popup:function(url) {
                window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
            }
        }
        ;
    $scope.shareIt=Share;
}

]);
app.controller('articleController', ['$scope', '$routeParams', '$rootScope', 'mainService', function($scope, $routeParams, $rootScope, mainService) {
    $rootScope.scrollToTop();
    mainService.init($routeParams);
    $scope.enterpriseLink=$rootScope.currentLang!='hy'?$rootScope.currentLang: 'ru';
    $scope.article= {
        title: 'All About App Search: Indexing, Ranking Factors, Universal Links, and More - Whiteboard Friday', text: 'App search is growing and changing, and there\'s more opportunity than ever to both draw customers in at the top of the funnel and retain them at the bottom. In today\'s special British Whiteboard Friday, Tom Anthony and Will Critchlow of Distilled dig into everything app search and highlight a future where Google may have some competition as the search engine giant.', date: 'May 20th, 2016', img: '1.png', slug: 'news1'
    }
    ;
    var Share= {
            vkontakte:function(purl, ptitle, pimg, text) {
                url='http://vkontakte.ru/share.php?';
                url+='url='+'http://'+location.host+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&title='+encodeURIComponent(ptitle);
                url+='&description='+encodeURIComponent(text);
                url+='&image='+encodeURIComponent(pimg);
                url+='&noparse=true';
                Share.popup(url);
            }
            , facebook:function(purl, ptitle, pimg, text) {
                url='http://www.facebook.com/sharer.php?s=100';
                url+='&p[title]='+encodeURIComponent(ptitle);
                url+='&p[summary]='+encodeURIComponent(text);
                url+='&p[url]='+'http://'+location.host+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&p[images][0]='+encodeURIComponent(pimg);
                Share.popup(url);
            }
            , twitter:function(purl, ptitle) {
                url='http://twitter.com/share?';
                url+='text='+encodeURIComponent(ptitle.replace(/<\S[^><]*>/g, ''));
                url+='&url='+'http://'+location.host+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                url+='&counturl='+encodeURIComponent(purl);
                Share.popup(url);
            }
            , google:function(purl) {
                url='https://plus.google.com/share?';
                url+='&url='+'http://'+location.host+$rootScope.preLink+'/news/article/'+encodeURIComponent(purl);
                Share.popup(url);
            }
            , popup:function(url) {
                window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
            }
        }
        ;
    $scope.shareIt=Share;
}

]);
app.service('mainService', ['$rootScope', '$translate', '$location', '$route', function($rootScope, $translate, $location, $route) {
    return {
        init:function(routeParams) {
            $rootScope.defaultLang="hy";
            $rootScope.preLink="/";
            if(!$rootScope.currentLang)$rootScope.currentLang=$rootScope.defaultLang;
            var tempLocale=routeParams.lang;
            console.log(tempLocale);
            if(routeParams.lang) {
                if(tempLocale!="en"&&tempLocale!="ru"&&tempLocale!="hy") {
                    $location.path("/"+$rootScope.defaultLang+$location.path());
                    $translate.use($rootScope.defaultLang);
                }
                else {
                    $rootScope.currentLang=routeParams.lang;
                    $translate.use($rootScope.currentLang);
                }
                $rootScope.preLink='/'+$rootScope.currentLang;
                $rootScope.changeLang=function(lang) {
                    $rootScope.currentLang=lang;
                    $route.updateParams( {
                            lang: $rootScope.currentLang
                        }
                    );
                }
                ;
            }
            else {
                $location.path("/"+$rootScope.defaultLang+$location.path());
                $translate.use($rootScope.defaultLang);
            }
        }
    }
}

]);
app.directive('homeslider', function($timeout) {
        return {
            restrict:'A', link:function(scope, el, attrs) {
                $timeout(function() {
                        if(scope.$last===true) {
                            var owl=$('.main-slider-list');
                            owl.owlCarousel( {
                                    margin: 0, loop: true, dots: true, items: 1, navigation: true, navigationText: ["<div class=\"main-slider-arrow-left\"></div>", "<div class=\"main-slider-arrow-right\"></div>"], autoplay: true, autoplayTimeout: 5000, autoplayHoverPause: true, singleItem: true
                                }
                            );
                        }
                    }
                )
            }
        }
    }

);
app.directive('secondslider', function($timeout) {
        return {
            restrict:'A', link:function(scope, el, attrs) {
                $timeout(function() {
                        if(scope.$last===true) {
                            var owl=$('.products-slider-list');
                            owl.owlCarousel( {
                                    margin: 0, loop: true, pagination: false, navigation: true, navigationText: ["<div class=\"main-slider-arrow-left\"></div>", "<div class=\"main-slider-arrow-right\"></div>"], autoplay: true, autoplayTimeout: 5000, autoplayHoverPause: true
                                }
                            );
                        }
                    }
                )
            }
        }
    }

);
app.directive('productsimgslider', function($timeout) {
        return {
            restrict:'A', link:function(scope, el, attrs) {
                $timeout(function() {
                        if(scope.$last===true) {
                            var owl=$('.more-views-list');
                            owl.owlCarousel( {
                                    margin: 0, loop: true, dots: false, navigation: true, navigationText: ["<img class=\"prod-arrow-left\" src='/img/other/arrow_dark_left.png'>", "<img class=\"prod-arrow-right\" src='/img/other/arrow_dark_right.png'>"], autoplay: true, autoplayTimeout: 5000, autoplayHoverPause: true
                                }
                            );
                        }
                    }
                )
            }
        }
    }

);