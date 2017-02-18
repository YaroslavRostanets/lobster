var lobster = angular.module("lobster-app", ['ngRoute']);

lobster.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([    // Allow same origin resource loads.
    'self',
    'http://rostanets.zzz.com.ua/**'
  ]);
});


lobster.controller("lobsterCtrl",function($scope, myFactory){
	$scope.myFactory = myFactory;

	
});

lobster.component("authComp", {
	template: "<h4>Шаблон страницы авторизации</h4><a href='javascript:void(0)' ng-click='auth();'>Авторизация ВК</a>" + 
				'<div><a href="#" ng-click="myFactory.logout();">logout</a></div>' + 
				'<p>token - {{token}}</p><p>userId - {{userId}}</p>' + 
				'<a href="javascript:void(0)" ng-click="authTest();"> SERVER TEST </a>',

	controller: function($scope, myFactory, $http, $sce){
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
						
    				uri.close();
    			}
    		});
    			$scope.userId = window.localStorage.getItem("vk_user_id");
    			$scope.token = window.localStorage.getItem("vk_access_token");
    			$scope.vk_expires_in = window.localStorage.getItem("vk_expires_in");
            	$scope.email = window.localStorage.getItem("email");
            	alert($scope.userId);
            	alert($scope.token);
            	alert($scope.vk_expires_in);
            	alert($scope.email);

    			var getParams = {
    				'vk_user_id': $scope.userId,
    				'vk_access_token': $scope.token
    			}
    			var getStr ='';
    			for( var key in getParams ){
    				getStr += key + '=' + getParams[key] + '&';
    			}


    			$http.jsonp({
    				method: 'GET', 
    				url: lobsterUrl + '/auth/?' + getStr})
    				.success(function(data) {
    					alert(data);
    				});
    			
    		}

    	$scope.authTest = function(){
    		var getParams = {
    				'vk_user_id': '84',
    				'vk_access_token': '1234567829847834783478'
    			}

    		var getStr = lobsterUrl + '/auth/?';
    		for( var key in getParams ){
    			getStr += key + '=' + getParams[key] + '&';
    		}
    		console.log(getStr);


    		$http.jsonp(getStr).then(function(response) {
    				console.log(response.data);
    			});

    			
    		}






	}
});




lobster.factory('myFactory', function(){
	return {
		showPage: [0,1,0],
		logout: function(){
			alert('logout!');
			window.localStorage.clear();
		}
	}
});

