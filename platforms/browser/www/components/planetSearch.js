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
                            '<img ng-src="{{person.ava_url}}" alt="image">' +
                            '<div class="bottom-description">' +
                                '<span class="name">{{person["first_name"]}}</span>,{{person.age}}' +
                            '</div>' +
                        '</div>' +
                    '</div>',

    controller: function($http, $scope, myFactory, $interval){

        var timer = $interval(function () {
            console.log($scope.showPlanet);
            $scope.showPlanet = myFactory.getShowSearch();
            if($scope.showPlanet == false){
                $interval.cancel(timer);
                touchStart();
            }
            console.log($scope.showPlanet);
        }, 3000);

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
                            $scope.photoMove();
                        }, false);

                        /*
                        * touchend и touchcancel - одна и та же фигня
                        */

                        gesuredZone.addEventListener('touchend', function(event) {
                            touchendX = event.changedTouches[0].pageX;
                            touchendY = event.changedTouches[0].pageY;
                            handleGesure();
                        }, false);


                        /*--------------------------------*/



                        function handleGesure() {
                            $scope.photoMove();
                            if (touchendX < touchstartX) {
                                var el = document.getElementById('people-cont').lastElementChild;
                                    el.style['-webkit-transform'] = 'translate(0px,0px)';
                                $scope.leftSwipe();
                            }
                            if (touchendX > touchstartX) {
                                $scope.rightSwipe();
                            }
                            if (touchendY == touchstartY) {

                            }
                        };

                    }
                },100);

            }

            $scope.rightSwipe = function(){
                if($scope.data.length <= 10){
                    $scope.getPeople();
                };
              $scope.disLikeArr.push( $scope.data.pop() ); //В массив дизлайков пушим обьект человека =)
              $scope.$apply();
            };

            $scope.leftSwipe = function() {
                $scope.data.push( $scope.disLikeArr.pop() );
                $scope.$apply();
            };

            $scope.photoMove = function(){
                var startX, startY;
                var el = document.getElementById('people-cont').lastElementChild;
                    el.addEventListener('touchmove',function(event){
                        event.preventDefault();
                        if(startX == undefined){
                            startX = event.changedTouches[0].pageX;
                            startY = event.changedTouches[0].pageY;
                        } else {
                            var result = 'translate(' + (event.changedTouches[0].pageX - startX) + 'px' + ','
                                                      + (event.changedTouches[0].pageY - startY) + 'px' + ')';
                                el.style['-webkit-transform'] = result;
                        }
                    }, false);
            };




            $scope.data = [{
                "first_name": "Ярослав",
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

        $scope.peopleCounter = 0;

        $scope.getPeople = function(){
            console.log('getPeople');
            var url = lobsterUrl + '/getpeople/?';
            var config = {
                "minAge": localStorage.getItem("minAge"),
                "maxAge": localStorage.getItem("maxAge"),
                "minLat": "0",
                "maxLat": "0",
                "minLon": "0",
                "maxLon": "0",
                "sex": localStorage.getItem("sexSearch"),
                "limit": $scope.peopleCounter
            };

            for ( var key in config ){
                url += key + '=' + config[key] + '&';
            }

            console.log(url);
            $scope.peopleCounter += 10;

            $http.jsonp(url).then(function(response) {
                console.log(response.data);
                $scope.data = $scope.data.concat(response.data);
                console.log($scope.data);
            }, function error(response){
                console.log(response);
            });


        }

    }
});
