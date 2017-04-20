/**
 * Created by Yaroslav on 04.03.2017.
 */
lobster.component("planetSearch",{
        template: '<div id="planet-wrap" ng-if="showPlanet">' +
                    '<div class="in-center">' +
                        '<div class="earth">' +
                                '<img src="images/earth.png" alt="img">' +
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
                        '<div ng-repeat="person in showArr" class="one-tile">' +
                            '<img ng-src="{{person.ava_url}}" src={{person.ava_url}} alt="image">' +
                            '<div class="bottom-description">' +
                                '<span class="name">{{person["first_name"]}}</span>,{{person.age}}' +
                            '</div>' +
                        '</div>' +
                    '</div>',

    controller: function($http, $scope, myFactory, $interval){
        document.addEventListener("backbutton", function(event){
            //navigator.app.exitApp();
            event.preventDefault();
        }, false);

        $scope.peopleCounter = 0;

        $scope.showArr = [{
            "first_name": "Ярослав",
            "age": "24",
            "ava_url": "https://pp.vk.me/c9712/u28159319/-6/z_2d468e66.jpg"},
            {
                "first_name": "Серафим",
                "age": "24",
                "ava_url": "https://pp.userapi.com/c615720/v615720516/1de26/a86KHE0n0Ow.jpg"
            }];

        $scope.data = [];


        $scope.disLikeArr = [];

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
            console.log($scope.data.length);
            if($scope.data.length < 10){
                console.log('<<<<');
                $http.jsonp(url).then(function(response) {
                    console.log(url);
                    $scope.data = $scope.data.concat(response.data);
                    console.log($scope.data);
                }, function error(response){
                    console.log(response);
                });
            }

        };

        $scope.getPeople();

        $scope.showPlanet = myFactory.getShowSearch();

        var timer = $interval(function () {
            $scope.showPlanet = myFactory.getShowSearch();
            if($scope.showPlanet == false){
                $interval.cancel(timer);
                touchStart();
            }
            console.log($scope.showPlanet);
        }, 3000);

            function touchStart(){

                var touchStartInt = $interval(function(){
                    if(document.getElementById('people-cont') != null){
                            $interval.cancel(touchStartInt);
                            go();
                    }
                },100);

                function go(){
                    var touchZone = document.getElementById('people-cont');

                    var touchstartX = 0;
                    var touchstartY = 0;
                    var touchendX = 0;
                    var touchendY = 0;

                    touchZone.addEventListener('touchstart', function(event) {
                        event.preventDefault();
                        console.log('touchstart: ' + touchstartX);
                        touchstartX = event.changedTouches[0].pageX;
                        touchstartY = event.changedTouches[0].pageY;
                    }, false);

                    touchZone.addEventListener('touchend', function(event) {
                        event.preventDefault();
                        touchendX = event.changedTouches[0].pageX;
                        touchendY = event.changedTouches[0].pageY;
                        handleTouch();
                    }, false);

                    touchZone.addEventListener('touchmove', function(event) {
                        event.preventDefault();
                        var positionX = event.changedTouches[0].clientX;
                        //console.log(startX);
                        var El = document.getElementById('people-cont').lastElementChild;
                        var difference = positionX - touchstartX;
                            El.style.left = difference + 'px';
                            El.style.top = -difference/4 + 'px';
                            El.style['-webkit-transform'] = 'rotate(' + difference/20 + 'deg)';
                    }, false);

                    function handleTouch() {
                        var swiped = 'swiped: ';
                        if (touchendX < touchstartX) {

                        }
                        if (touchendX > touchstartX) {
                            $scope.getPeople();
                            $scope.rightSwipe();
                            $scope.showArr.unshift($scope.data.shift());
                            console.log($scope.data);
                        }
                        if (touchendY == touchstartY) {
                            alert('tap!');
                        }
                    }
                }
            }



            $scope.rightSwipe = function(){
                $scope.showArr.pop();
                var lastEl = document.getElementById('people-cont').lastElementChild;
                    lastEl.classList.add("hide-anim");
                $scope.$apply();
            };

            $scope.leftSwipe = function() {
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
