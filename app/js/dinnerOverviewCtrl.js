// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerOverviewCtrl', function ($scope,Dinner) {

    $scope.dinnerService = Dinner;

});