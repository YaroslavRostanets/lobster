var lobster = angular.module("lobster-app", ['ngRoute','ngAnimate']);




lobster.controller("lobsterCtrl",function($scope, myFactory){
    document.addEventListener("deviceready", function(){
        document.addEventListener("backbutton", function(event){
            event.preventDefault();
        }, false);
    }, false);
	$scope.myFactory = myFactory;

        setTimeout(function(){
            if( window.localStorage.getItem("vk_access_token") !== null ){
                window.location.hash = "#!/search";
            } else {
                window.location.hash = "#!/auth";
            }
        },2999);

});






lobster.factory('myFactory', function(){
    var showSearch = true;
    return {
        setShowSearch: function(value){
            showSearch = value;
        },
        getShowSearch: function(){
            return showSearch;
        },
        logout: function(){
            alert('logout!');
            window.localStorage.clear();
        }
    }
});

