

lobster.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([    // Allow same origin resource loads.
        'self',
        'http://rostanets.zzz.com.ua/**'
    ]);
});


lobster.config(function($routeProvider){
    $routeProvider.when('/',
        {
            template:'<h3 style="text-align: center; margin-top: 50px; margin-bottom: 50px;">I love u, creator</h3>' +
				'<a href="javascript:void(0);" onclick="window.localStorage.clear();">Очистить Storage</a>',

            controller: function(){
                document.addEventListener("backbutton", function(event){
                    navigator.app.exitApp();
                    event.preventDefault();
                }, false);
            }
        });
	$routeProvider.when('/auth',
        {
        	template: "<h4>Шаблон страницы авторизации</h4><a href='javascript:void(0)' ng-click='auth();'>Авторизация ВК</a>" +
            '<div><a href="#" ng-click="myFactory.logout();">logout</a></div>' +
            '<p>token - {{token}}</p><p>userId - {{userId}}</p>' +
            '<a href="javascript:void(0)" ng-click="test();"> SERVER TEST </a>',

            controller: function($scope, myFactory, $http, $sce){
                document.addEventListener("backbutton", function(event){
                    navigator.app.exitApp();
                    event.preventDefault();
                }, false);
                $scope.myFactory = myFactory;

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

                            alert(getStr);

                            $http.jsonp(getStr).then(function(response) {
                                alert(response.data.status);
                                window.location.hash = "#!/search";
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
                        'vk_user_id': '6825516',
                        'vk_access_token': '88b606ffb32458eee17aa5bcf06e5d7f916176ff3a8ccf3d8603c9075428758bc956b8c85b1ae7c3ea4a8',
                        'email': 'rostanets@2c.kiev.ua'
                    };

                    var getStr = lobsterUrl + '/auth/?';  // lobsterUrl = 'http://rostanets.zzz.com.ua/application'
                    for( var key in getParams ){
                        getStr += key + '=' + getParams[key] + '&';
                    };



                    $http.jsonp(getStr).then(function(response) {
                        console.log(response);
                        window.location.hash = "#!/search";
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

            controller:'lobsterCtrl'
	});

	$routeProvider.when('/profile',{
	    template: '<profile></profile>',

        controller: function($scope){

        }
    });
});