/**
 * Created by Yaroslav on 05.03.2017.
 */
lobster.component('profile',{
   template: '<div id="search">' +
                '<div id="top-but">' +
                    '<a href="javascript:void(0);">' +
                        '<img src="images/person.png" alt="image">' +
                    '</a>' +
                    '<div class="avatar">' +
                        '<img src="images/pictures/ava.jpg" alt="image">' +
                    '</div>' +
                    '<a href="javascript:void(0);">' +
                        '<img src="images/messages.png" alt="image">' +
                    '</a>' +
                '</div>' +
                '<div id="set-tabs">' +
                '<div class="tabs">' +
                    '<a href="javascript:void(0)" class="one-tab" data-tab="user-profile">' +
                        '<h4>Эмили, <span>28</span></h4>' +
                        '<div>Киев, Украина</div>' +
                    '</a>' +
                    '<a href="javascript:void(0)" class="one-tab active" data-tab="user-settings">' +
                        '<h4>Поиск</h4>' +
                        '<div>Параметры поиска</div>' +
                    '</a>' +
                '</div>' +
                '<div class="content visible" id="user-settings">' +
                    '<div class="cont-stripe">' +
                    '<div class="bl-title">' +
                        'Отображение' +
                    '</div>' +
                    '<ul class="bl-content" id="sex-search">' +
                        '<li ng-click="setSexSearch();">' +
                            '<label>' +
                                '<span>Мужчины</span>' +
                                '<input type="radio" value="2" name="sex" id="sex2">' +
                            '</label>' +
                        '</li>' +
                        '<li ng-click="setSexSearch();">' +
                            '<label>' +
                                '<span>Женщины</span>' +
                                '<input type="radio" value="1" name="sex" id="sex1">' +
                            '</label>' +
                        '</li>' +
                        '<li ng-click="setSexSearch();">' +
                            '<label>' +
                                '<span>Все</span>' +
                                '<input type="radio" value="0" name="sex" id="sex0">' +
                            '</label>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div class="cont-stripe">' +
                    '<div class="bl-title">' +
                        'Радиус поиска' +
                    '</div>' +
                '<div class="slider-cont">' +
                    '<div id="sliderRad"></div>' +
                '</div>' +
                    '</div>' +
                '<div class="cont-stripe">' +
                    '<div class="bl-title">' +
                        'Возрастные параметры:' +
                    '</div>' +
                '<div class="slider-cont">' +
                    '<div id="sliderAge"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="content" id="user-profile">' +
                    '</div>' +
                    '</div>' +
    '</div>',

    controller: function($scope){

        document.addEventListener("backbutton", function(event){
            event.preventDefault();
            history.back();
        }, false);


        var tabs = document.querySelectorAll('#set-tabs .one-tab');
        tabs = Array.prototype.slice.call(tabs);

        tabs.forEach(function(item, i){
            item.addEventListener('click',function(){
                tabs.forEach(function(item){
                    item.classList.remove('active');
                });
                this.classList.add('active');

                var cont = document.querySelectorAll('#set-tabs .content');

                cont = Array.prototype.slice.call(cont);
                cont.forEach(function(item,i){
                    item.classList.remove('visible');
                });

                document.getElementById(this.getAttribute('data-tab')).classList.add('visible');
            });
        });

        var sliderRad = document.getElementById('sliderRad');
        var sliderAge = document.getElementById('sliderAge');



        noUiSlider.create(sliderRad, {
            start: [5],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });
        noUiSlider.create(sliderAge, {
            start: [localStorage.getItem('minAge'), localStorage.getItem('maxAge')],
            connect: true,
            range: {
                'min': 18,
                'max': 65
            }
        });

        sliderRad.noUiSlider.on('update', function( values, handle ) {
            var minRad = document.querySelector('#sliderRad .noUi-handle-lower');
            console.log(minRad);
            var value = values[handle];
                minRad.innerHTML = Math.round(value);
        });

        sliderAge.noUiSlider.on('update', function( values, handle ) {
            var minAge = document.querySelector('#sliderAge .noUi-handle-lower');
            var maxAge = document.querySelector('#sliderAge .noUi-handle-upper');
            var value = values[handle];
            var roundValue = Math.round(value);
            if ( handle ) {
                    maxAge.innerHTML = roundValue;
                    localStorage.setItem("maxAge", roundValue);
            } else {
                    minAge.innerHTML = Math.round(value);
                    localStorage.setItem("minAge", roundValue);
            }


        });
/*
        sliderRad.addEventListener('touchstart', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, false);
        sliderRad.addEventListener('touchmove', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, false);
        sliderRad.addEventListener('touchend', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, false);

        sliderAge.addEventListener('touchstart', function(event) {
            //event.preventDefault();
            event.stopPropagation();
        }, false);

        sliderAge.addEventListener('touchmove', function(event) {
            //event.preventDefault();
            event.stopPropagation();
        }, false);

        sliderAge.addEventListener('touchend', function(event) {
            //event.preventDefault();
            event.stopPropagation();
        }, false);
        */

        /*-- localStorage --*/
        var radioOn = window.localStorage.getItem('sexSearch');

            document.getElementById('sex' + radioOn).setAttribute("checked",true);

        $scope.setSexSearch = function(){
            var sexRadio = document.querySelectorAll('#sex-search input[type="radio"]');
                sexRadio = Array.prototype.slice.call(sexRadio);

            sexRadio.forEach(function(radio){
                if(radio.checked == true){
                    window.localStorage.setItem('sexSearch',radio.value);
                }
            });
        };

        /*--end localStorage --*/


    }
});
