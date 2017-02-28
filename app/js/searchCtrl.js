// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

    $scope.dinnerService = Dinner;

    $scope.type = "all";
    $scope.query = undefined;

    $scope.search = function(query,type) {
        console.log("searching: "+query +" - "+type);
        $scope.status = "Searching...";

        var requestParams = {
            query:query,
            type:type,
            number: 100,
            offset: 0
        };

        $scope.dinnerService.DishSearch.get(requestParams,function(data){
            console.log("Retrieved: "+JSON.stringify(data));
            $scope.dishes=data.results;
            $scope.status = "Showing " + data.results.length + " results";
        },function(data){
            $scope.status = "There was an error";
        });
    }

});