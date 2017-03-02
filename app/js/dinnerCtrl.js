// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

    $scope.dinnerService = Dinner;

    $scope.numberOfGuests = $scope.dinnerService.getNumberOfGuests();

    $scope.setNumberOfGuest = function(number){
        $scope.dinnerService.setNumberOfGuests(number);
    };

    $scope.getNumberOfGuests = function() {
      return $scope.dinnerService.getNumberOfGuests();
    };

    //Checks the cookie with dishes in menu on startup, and in case there are any, adds them to the menu
    $scope.checkAndDownloadDishesFromCookies = function(){
        var dishesInMenuIds = $scope.dinnerService.getDishesInMenuIdsFromCookieStore();

        if(dishesInMenuIds != undefined && dishesInMenuIds.length != $scope.dinnerService.getFullMenu().length){

            console.log("Should download dishes from menu: "+dishesInMenuIds);
            angular.forEach(dishesInMenuIds, function(value, key){
                console.log("Should retrieve: "+value);
                $scope.dinnerService.Dish.get({id: value},function(data){
                    console.log("Retrieved: "+JSON.stringify(data));
                    $scope.dinnerService.addDishToMenu(data);
                },function(data){
                    alert("There was an error");
                });
            });
        }
    };

    $scope.checkAndDownloadDishesFromCookies();

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});