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

        //function getWindWidth();

        $scope.isNarrow = $(window).width() > 770;

        $scope.productBottom = $scope.isNarrow ? 'overview' : 'none';

        $scope.toggleBottom = function(tab) {
            $scope.productBottom == tab ? $scope.productBottom = 'none' : $scope.productBottom = tab;
        };

        $scope.product = {
            lang : "en",
            slug : "honor-7",
            title : "Honor 7",
            shortDescr : [
                "Dual SIM",
                "5,2 inches IPS-NEO LCD, 1920 x 1080 HD",
                "Hisilicon Kirin 935, 4* 2.2GHz + 4* 1.5GHz processor",
                "Memory 16 GB ROM, 3 GB RAM ",
                "Camera 20MP rear, 8MP"
            ],
            price : "215000,00 AMD",
            overview : [
                {
                    title : "Smart Key: Fast Access to Apps",
                    text : "Single/Double tap to access to pre-set apps and shortcut functions, long press to get access to Google Search and Google Voice.",
                    img : "honor-7/overview/1.png"
                },
                {
                    title : "Fingerprint sensor",
                    text : "Cutting edge technology:a sensor detects a fingerprint, applied at any angle, and the lowest rate of release of the smartphone – 0.5 seconds. Self-learning algorithm:The more you unlock the smartphone, the faster the detection is triggered the next time. Touch Control:use the fingerprint scanner as an additional control: Move your finger down to open the notifications panel, double-tap will remove the extra notification. The sensor can be a button for shooting photos, receive a call or turn off the alarm. Close the information from prying eyes:3 levels of protection: normal, “guest” and protected by all.",
                    img : "honor-7/overview/2.png"
                },
                {
                    title : "Elegant design with innovative features",
                    text : "Ergonomic metallic body that fits perfectly with your hand, combining compact size with 5.2 inch big display. Perfection in Details: The dented power button with CD texture provides a visual experience compareable to precision watches. Body with ceramic sand blasting, delight to the touch.",
                    img : "honor-7/overview/3.png"
                },
                {
                    title : "Super Camera 20MP",
                    text : "Capture the best moments of your life with Honor 7’s 20MP rear-facing camera which features 0.1 seconds PDAF fast-focusing technology. Noise reduction: Features a ARM GPU OpenCL that helps to reduce noise in your images. Sapphire lens for the rear camera, offering impeccable wear-resisting and anti-scratch performance.",
                    img : "honor-7/overview/4.png"
                },
                {
                    title : "Capture beautiful moments with ultimate creativity",
                    text : "Take perfect selfie with honor 7’s 8MP front-facing camera soft lighting, a 26 mm wide angle lens and the unique 10-level beauty mode. Second generation SLR-level independent ISP and personalised filter function bringing stunning photo quality. Food mode help you create your own unique filter to enrich the photos taken and make the pictures of food more attractive. Special time-lapse mode, panorama and four key photo-taking scenes (light painting, taillight track, silky water and star track).",
                    img : "honor-7/overview/5.png"
                },
                {
                    title : "An optimal 5.2-inch Full HD Screen",
                    text : "An optimal 5.2-inch display with screen-to-body ratio of 76.7% and 423 PPI, give you ultimate HD visual experience. Brighter, clearer and genuine images: It features a 1500:1 high contrastratio with The RGLED technology , 50% higher than that of regular displays and high color saturation rate at 85% (NTSC). Features the brand-new display effect optimization and the power saving technologies, keeping vivid colors while consuming less power.",
                    img : "honor-7/overview/6.png"
                },
                {
                    title : "3100 mAh battery",
                    text : "The smartphone is equipped with a 3100 mAh battery with a record high density of 600 Wh / l. SmartPower 3.0 technology saves up to 30% of energy through the hardware and software optimization. The smartphone automatically pauses unused but running applications, saving energy and increasing performance. Light users: Up to 60 hours Heavy users: Up to 30 hours",
                    img : "honor-7/overview/7.png"
                },
                {
                    title : "Revolutionary Thermal Design: Keep Your Honor 7 Cool",
                    text : "The back cover is made of aluminum alloy – heat dissipates significantly better compared to plastic casings. L-architecture: internal components are arranged around the battery, which leads to a uniform distribution of the heating elements and contributes to the rapid cooling. Processing of the internal components of the smartphone special gel improves thermal conduction and reduces power consumption by 15%. Achieved a decrease in heating by 40% during the games.",
                    img : "honor-7/overview/8.png"
                },
                {
                    title : "True Honor comes from the inside",
                    text : "The performance and power consumption are perfectly balanced by using up to 2.2GHz HiSilicon Kirin 935 chip with the integration of the big LITTLE architecture and the smart octa-core heterogeneous algorithm. i3 motion processor + Sensor Hub technology to ensure faster response and lower power consumption. All-sided security:Integrates a security feature 2.0 which isolates the Android OS from security OS; HiSEE security solution that provides all-sided protection.",
                    img : "honor-7/overview/9.png"
                },
                {
                    title : "Premium Signal at Anytime: Our Dedication to Communication",
                    text : "Intelligent, seamless switch of upper and bottom antennas, solving the “Dead Hold”problem. In case of poor signal strength, the smartphone switches to the antenna providing the best signal recept. In this case there is no additional energy consumption towards signal enhancement.",
                    img : "honor-7/overview/10.png"
                },
                {
                    title : "Voice control: do what you say",
                    text : "Find and wake-up your honor 7: Find your phone using pre-set voice wakeup command. You can customize the wakeup keyword.To make a call without unlocking the screen.",
                    img : "honor-7/overview/11.png"
                },
                {
                    title : "Smart EMUI 3.1 Ultimate Experience: Elegant, Easy, Enjoy, Efficient",
                    text : "3D Dynamic UI: The new 3D UI 2.0 user interface enables super-fluent transitions and effects. Draw to fast access to apps: Fast access to apps by pre-set and customizable drawing. Fast snapshot: Double click on the down volume button to take a snapshot of every exciting moment. Hide private apps: Spread two fingers apart along the diagonals of the screen to add applications you want to hide.",
                    img : "honor-7/overview/12.png"
                },
                {
                    title : "Infrared Remote-control with Smart Control 3.0",
                    text : "Independent IR remote chip with preinstalled IR code libraries from global industry-leading manufacturers, can be used without any network connections. Revolutionary Smart Control 3.0 that enables you to control your TV, STB, DVD, air-conditioner, and other devices matched in the IR code libraries.",
                    img : "honor-7/overview/13.png"
                }
            ]
        }
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

