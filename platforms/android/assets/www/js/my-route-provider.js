

lobster.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([    // Allow same origin resource loads.
        'self',
        'http://rostanets.zzz.com.ua/**',
        'http://vk.com/**',
        'https://vk.com/**',
        'https://pp.vk.me/**',
        'http://pp.vk.me/**'
    ]);
});


lobster.config(function($routeProvider){
    $routeProvider.when('/',
        {
            template:'<div id="load">' +
                        '<div id="big-logo">' +
                            '<img src="images/big_logo.png" alt="logo">' +
                        '</div>' +
                     '</div>',

            controller: function(){
                document.addEventListener("backbutton", function(event){
                    //navigator.app.exitApp();
                    event.preventDefault();
                    alert(device.version);

                    function getAndroidVersion(ua) {
                        ua = (ua || navigator.userAgent).toLowerCase();
                        var match = ua.match(/android\s([0-9\.]*)/);
                        return match ? match[1] : false;
                    };

                    getAndroidVersion(); //"4.2.1"
                    alert(getAndroidVersion());
                    parseInt(getAndroidVersion(), 10); //4
                    parseFloat(getAndroidVersion()); //4.2

                }, false);
            }
        });
	$routeProvider.when('/auth',
        {
            template: '<div id="auth-cont">' +
                        '<div id="auth-cont-in">' +
                            '<div id="pager">' +
                                '<a href="#" class="active"></a>' +
                                 '<a href="#"></a>' +
                                '<a href="#"></a>' +
                            '</div>' +
                            '<div id="slider-center">' +
                                '<div id="logo-cont">' +
                                    '<img src="images/big_logo.png" alt="logo">' +
                                    '<span ng-click="test();" style="font-size: 25px; color: #1A6886; margin-left: 15px;">Lobster</span>' +
                                '</div>' +
                                '<div id="slider">' +
                                    '<div class="one-slide active" data-style="blue">' +
                                        '<img src="images/slider/slide1.jpg" alt="image">' +
                                    '</div>' +
                                    '<div class="one-slide" data-style="purple">' +
                                        '<img src="images/slider/slide2.jpg" alt="image">' +
                                    '</div>' +
                                    '<div class="one-slide" data-style="dark-blue">' +
                                        '<img src="images/slider/slide3.jpg" alt="image">' +
                                    '</div>' +
                                '</div>' +
                                '<div id="vk-cont">' +
                                    '<a href="#" ng-click="auth();" id="vk-link"><span>Войти через <span>Вконтакте</span></span></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                     '</div>',

            controller: function($scope, myFactory, $http, $sce){
                document.addEventListener("backbutton", function(event){
                    //navigator.app.exitApp();
                    event.preventDefault();
                }, false);
                $scope.myFactory = myFactory;

                $(document).ready(function(){
                    var slideImg = $('#slider .one-slide img');
                    var slides = $('#slider .one-slide');
                    var skinArr = [];
                    var counter = 0;
                    for(var i = 0 ; i < slides.length; i++ ){
                        skinArr.push(slides.eq(i).attr("data-style"));
                    }

                    var timerId = setInterval(function() {
                        if(counter != 2){
                            counter ++;
                        } else {
                            counter = 0;
                        }
                        $('#pager > a, #slider .one-slide').removeClass('active');
                        $('#slider .one-slide').eq(counter).addClass('active');
                        $('#pager > a').eq(counter).addClass('active');
                        $('#auth-cont').removeClass();
                        $('#auth-cont').addClass(skinArr[counter]);
                    }, 3000);
                });

                $scope.auth = function(){

                    for ( var key in authConfig ){
                        authUrl += key + '=' + authConfig[key] + '&';
                    }

                    var uri = window.open(authUrl, '_blank', 'location=no,toolbar=no');
                    uri.addEventListener('loadstop', function(event) {
                        var tmp = (event.url).split("#");
                        if (tmp[0]=='https://oauth.vk.com/blank.html' || tmp[0]=='http://oauth.vk.com/blank.html'){

                            var outData = tmp[1].split("&");
                            for( var i = 0; i < outData.length; i++ ){
                                outData[i] = outData[i].substr(outData[i].indexOf('=') + 1);
                            }
                            window.localStorage.setItem("vk_access_token", outData[0]);
                            window.localStorage.setItem("vk_expires_in", outData[1]);
                            window.localStorage.setItem("vk_user_id", outData[2]);
                            window.localStorage.setItem("email", outData[3]);

                            $scope.userId = window.localStorage.getItem("vk_user_id");
                            $scope.token = window.localStorage.getItem("vk_access_token");
                            $scope.vk_expires_in = window.localStorage.getItem("vk_expires_in");
                            $scope.email = window.localStorage.getItem("email");
                            uri.close();

                            var getParams = {
                                'vk_user_id': $scope.userId,
                                'vk_access_token': $scope.token,
                                'email': $scope.email
                            };

                            var getStr = lobsterUrl + '/auth/?';  // lobsterUrl = 'http://rostanets.zzz.com.ua/application'
                            for( var key in getParams ){
                                getStr += key + '=' + getParams[key] + '&';
                            }


                            $http.jsonp(getStr).then(function(response) {
                                if(response.data.satus = 'valid'){
                                    alert(valid);
                                    window.location.hash = "#!/search";

                                }
                            }, function error(response){
                                for( key in response){
                                    alert(response[key]);
                                }
                            });

                        }
                    });
                };

                $scope.test = function(){
                    var getParams = {
                        'vk_user_id': '105416658',
                        'vk_access_token': '7c2af7394125249690fa5159fd215662d7d2c766f9868da18a8a9a828f587c012263a7ec6a07774816a12',
                        'email': 'rostanets@gmail.com'
                    };

                    var getStr = lobsterUrl + '/auth/?';  // lobsterUrl = 'http://rostanets.zzz.com.ua/application';

                    for( var key in getParams ){
                        getStr += key + '=' + getParams[key] + '&';
                    };
                    console.log(getStr);


                    $http.jsonp(getStr).then(function(response) {
                        console.log(response.data.status);
                        if(response.data.status){
                            window.location.hash = "#!/search";
                        }
                    }, function error(response){
                        alert(response.satus);
                    });


                };

            }
        });
	$routeProvider.when('/search',
	{
            template:'<div id="search">' + 
						'<div id="top-but">' + 
							'<a href="#!/profile">' +
								'<img src="images/person.png" alt="image">' + 
							'</a>' +
							'<a href="javascript:void(0);">' +
								'<img src="images/messages.png" alt="image">' +
							'</a>' +
						'</div>' +
						'<planet-search></planet-search>' +
						'<div id="buttons">' +
							'<a href="javascript:void(0)">' +
								'<img src="images/back.png" alt="image">' +
							'</a>' +
							'<a href="javascript:void(0)">' +
								'<img src="images/like.png" alt="image">' +
							'</a>' +
							'<a href="javascript:void(0)">' +
								'<img src="images/dislike.png" alt="image">' +
							'</a>' +
						'</div>' +
					'</div>',

	});

	$routeProvider.when('/profile',{
	    template: '<profile></profile>',

        controller: function($scope){
            addEventListener('backbutton', function (event) {
                event.preventDefault();
                alert('ss');
            },false);
        }
    });
});