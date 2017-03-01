// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('FullRecipeCtrl', function ($scope,Dinner) {

    $scope.dinnerService = Dinner;

    $scope.allIngredients = {};

    //Returns all ingredients for all the dishes on the menu.
    $scope.getAllIngredients = function() {

        $scope.allIngredients = {};

        angular.forEach($scope.dinnerService.dishesInMenu, function(dishValue, dishKey) {
            angular.forEach(dishValue.extendedIngredients, function(ingredientValue, ingredientKey) {

                var ingredient = angular.copy(ingredientValue);

                var ingredientInMap = $scope.allIngredients[ingredient.id];
                if(ingredientInMap !== undefined){
                    $scope.allIngredients[ingredient.id].amount = ingredientInMap.amount + ingredient.amount;
                    //ingredientsMap[ingredient.id].price = ingredientInMap.price + ingredient.price;
                }
                else{
                    $scope.allIngredients[ingredient.id] = ingredient;
                }
            });
        });
    };

    $scope.getAllIngredients();

});