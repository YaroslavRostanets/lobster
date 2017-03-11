/**
 * Created by Yaroslav on 04.03.2017.
 */
lobster.component("planetSearch",{
        template: '<div id="planet-wrap" ng-if="showPlanet">' +
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
                        'Поиск подходящих пар {{}}' +
                    '</div>' +
                   '</div>' +
                    '<div id="people-cont" ng-if="!showPlanet">' +
                        '<div ng-repeat="person in data" class="one-tile">' +
                            '<img ng-src="{{person.photoUrl}}" alt="image">' +
                            '<div class="bottom-description">' +
                                '<span class="name">{{person.name}}</span>, {{person.age}}' +
                            '</div>' +
                        '</div>' +
                    '</div>',

    controller: function($http, $scope, myFactory, $interval){
            function touchStart(){

                var touchstartX = 0;
                var touchstartY = 0;
                var touchendX = 0;
                var touchendY = 0;

                var touchStart = $interval(function(){
                    if(document.getElementById('people-cont') != null){
                        var gesuredZone = document.getElementById('people-cont');
                            $interval.cancel(touchStart);

                        gesuredZone.addEventListener('touchstart', function(event) {
                            touchstartX = event.changedTouches[0].pageX;
                            touchstartY = event.changedTouches[0].pageY;
                            console.log('touchstart');
                        }, false);

                        /*
                        * touchend и touchcancel - одна и та же фигня
                        */
                        gesuredZone.addEventListener('touchcancel', function(event) {
                            touchendX = event.changedTouches[0].pageX;
                            touchendY = event.changedTouches[0].pageY;
                            handleGesure();
                        }, false);

                        gesuredZone.addEventListener('touchend', function(event) {
                            touchendX = event.changedTouches[0].pageX;
                            touchendY = event.changedTouches[0].pageY;
                            handleGesure();
                        }, false);

                        /*--------------------------------*/

                        function handleGesure() {
                            var swiped = 'swiped: ';
                            console.log('---touchend: ' + touchendX);
                            console.log('---touchstart:' + touchstartX);
                            if (touchendX < touchstartX) {
                                $scope.leftSwipe();
                            }
                            if (touchendX > touchstartX) {
                                $scope.rightSwipe();
                                console.log(swiped + 'right!');
                            }
                            if (touchendY < touchstartY) {
                                console.log(swiped + 'down!');
                            }
                            if (touchendY > touchstartY) {
                                console.log(swiped + 'left!');
                            }
                            if (touchendY == touchstartY) {
                                console.log('tap!');
                            }
                        };

                    }
                },100);

            }

            $scope.rightSwipe = function(){
              //console.log($scope.data);
              $scope.disLikeArr.push( $scope.data.pop() ); //В массив дизлайков пушим обьект человека =)
                console.log($scope.data);
              $scope.$apply();
            };

            $scope.leftSwipe = function() {
                $scope.data.push( $scope.disLikeArr.pop() );
                console.log($scope.data);
                $scope.$apply();
            };




            $scope.data = [{
                "name": "Ярослав",
                "age": "24",
                "photoUrl": "images/pictures/user-ava.jpg"
            }, {
                "name": "Женевия",
                "age": "18",
                "photoUrl": "images/pictures/user-ava3.jpg"
            }, {
                "name": "Ярослава",
                "age": "18",
                "photoUrl": "images/pictures/user-ava2.jpg"
                }
            ];

            $scope.disLikeArr = [];

        document.addEventListener("backbutton", function(event){
            //navigator.app.exitApp();
            event.preventDefault();
        }, false);
        //$scope.myFactory = myFactory;

        $scope.showPlanet = myFactory.getShowSearch();

        var timer = $interval(function () {
            console.log($scope.showPlanet);
            $scope.showPlanet = myFactory.getShowSearch();
            if($scope.showPlanet == false){
                $interval.cancel(timer);
                touchStart();
            }
            console.log($scope.showPlanet);
        }, 3000);

        var options = { maximumAge: 3000,
                        timeout: 8000,
                        enableHighAccuracy: false };

        var onSuccess = function(position) {
            console.log('Latitude: '+ position.coords.latitude);
            console.log('Longitude: '+ position.coords.longitude);
            sessionStorage.setItem('latitude', position.coords.latitude);
            sessionStorage.setItem('longitude', position.coords.longitude);
            /*
             * Тут нужно отправтиь на сервер координаты пользователя
             */
            myFactory.setShowSearch(false);

        };

        function onError(error) {
            var getStr = lobsterUrl + '/geolocation/';
            $http.jsonp(getStr).then(function(response) {
                console.log(response.data);
                sessionStorage.setItem('latitude', response.data.lat);
                sessionStorage.setItem('longitude', response.data.lon);
                /*
                 * Тут нужно отправтиь на сервер координаты пользователя
                 */
                myFactory.setShowSearch(false);

            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);


    }
});
