// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($location, $scope,$routeParams,Dinner) {

    $scope.dinnerService = Dinner;

    $scope.dishStatus = undefined;

    $scope.addDishToMenu = function(dish){
        $scope.dinnerService.addDishToMenu(dish);
        $location.path("search");
    };

    $scope.retrieveDish = function(dishId) {
        //Before the call
        $scope.dish = {};
        console.log("retrieval of: "+dishId);
        $scope.dishStatus = "Retrieval of dish...";

        $scope.dinnerService.Dish.get({id: dishId},function(data){
            console.log("Retrieved: "+JSON.stringify(data));
            $scope.dish=data;
            $scope.dishStatus = undefined;
        },function(data){
            $scope.dishStatus = "There was an error";
        });
    };

    $scope.getNumberOfGuests = function(){
        console.log("Getting: "+Dinner.getNumberOfGuests());
        return Dinner.getNumberOfGuests();
    };

    $scope.retrieveDish($routeParams.dishId);
  
});