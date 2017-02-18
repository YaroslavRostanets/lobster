

lobster.config(function($routeProvider){
    $routeProvider.when('/',
        {
            template:'<h3 style="text-align: center; margin-top: 50px; margin-bottom: 50px;">I love u, creator</h3>' +
				'<a href="javascript:void(0);" onclick="window.localStorage.clear();">Очистить Storage</a>'
        });
	$routeProvider.when('/auth',
        {
            template:'<auth-comp></auth-comp>',
        });
	$routeProvider.when('/search',
	{
            template:'<div id="search">' + 
						'<div id="top-but">' + 
							'<a href="javascript:void(0);">' + 
								'<img src="images/person.png" alt="image">' + 
							'</a>' +
							'<a href="javascript:void(0);">' +
								'<img src="images/messages.png" alt="image">' +
							'</a>' +
						'</div>' +
						'<div id="planet-wrap">' +
							'<div class="in-center">' +
								'<div class="earth">' +
									'<div class="wrap">' +
										'<img src="images/earth.png" alt="img">' +
									'</div>' +
								'</div>' +
								'<div class="ava">' +
									'<img src="images/pictures/ava.jpg" alt="img">' +
								'</div>' +
							'</div>' +
							'<div class="text">' +
								'Поиск подходящих пар' +
							'</div>' +
						'</div>' +
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
});