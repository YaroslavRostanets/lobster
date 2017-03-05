var lobster = angular.module("lobster-app", ['ngRoute']);




lobster.controller("lobsterCtrl",function($scope, myFactory){
	$scope.myFactory = myFactory;

        setTimeout(function(){
            if( window.localStorage.getItem("vk_access_token") !== null ){
                window.location.hash = "#!/search";
            } else {
                window.location.hash = "#!/auth";
            }
        },3000);

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

