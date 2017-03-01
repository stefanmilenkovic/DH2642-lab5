// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource) {

    this.numberOfGuests = 2;
    this.currentView = 1;
    this.currentDishId = -1;
    this.currentDish = -1;
    this.dishFilterKeywords = "";
    this.dishFilterType = "";
    this.dishesInMenu = [];

    this.loadedDishes = [];
    this.dishListPageSize = 100;
    this.currentDishListIndex = 0;

    this.setNumberOfGuests = function(num) {
        this.numberOfGuest = num;
    };

    this.getNumberOfGuests = function() {
        return numberOfGuest;
    };

    this.resetDishList = function () {
        this.loadedDishes = [];
        this.dishListPageSize = 100;
        this.currentDishListIndex = 0;
    };

    this.setDishFilterKeywords = function(newDishFilterKeywords){
        this.dishFilterKeywords = newDishFilterKeywords;
    };

    this.getDishFilterKeywords = function(){
        return this.dishFilterKeywords;
    };

    this.setDishFilterType = function(newDishFilterType){
        this.dishFilterType = newDishFilterType;
    };

    this.getDishFilterType = function(){
        return this.dishFilterType;
    };

    this.setCurrentDish = function(dish){
        this.currentDish = dish;
    };

    this.getCurrentDish = function(){
        return this.currentDish;
    };

    this.setCurrentDishId = function (newCurrentDishId) {
        this.currentDishId = newCurrentDishId;
    };

    this.getCurrentDishId = function(){
        return this.currentDishId;
    };

    this.setCurrentView = function (newCurrentView) {
        this.currentView = newCurrentView;
        this.viewChanged.notify(this.currentView);
    };

    this.incrementNumberOfGuests = function(){
        this.numberOfGuests += 1;
    };

    this.decrementNumberOfGuests = function(){
        this.numberOfGuests -= 1;
        if(this.numberOfGuests == 0){
            this.numberOfGuests = 1;
        }
    };

    this.setNumberOfGuests = function(num) {
        this.numberOfGuests = num;
    };

    // should return
    this.getNumberOfGuests = function() {
        return this.numberOfGuests;
    };

    //Returns all the dishes on the menu.
    this.getFullMenu = function() {
        return this.dishesInMenu;
    };

    //Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function() {
        var ingredientsMap = {};
        for (dishIndex in this.dishesInMenu) {
            for (ingredientIndex in this.dishesInMenu[dishIndex].extendedIngredients) {
                var ingredient = this.cloneObject(this.dishesInMenu[dishIndex].extendedIngredients[ingredientIndex]);
                console.log("Ingredient: "+JSON.stringify(ingredient));

                var ingredientInMap = ingredientsMap[ingredient.id];
                if(ingredientInMap !== undefined){
                    ingredientsMap[ingredient.id].amount = ingredientInMap.amount + ingredient.amount;
                    //ingredientsMap[ingredient.id].price = ingredientInMap.price + ingredient.price;
                }
                else{
                    ingredientsMap[ingredient.id] = ingredient;
                }
            }
        }
        return ingredientsMap;
    };

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function() {
        var totalPrice = 0;
        for (dishIndex in this.dishesInMenu) {
            totalPrice += this.getDishesPrice(this.dishesInMenu[dishIndex]);
        }
        return totalPrice;
    };

    this.getDishesPrice = function(dish){
        return (dish.pricePerServing * this.getNumberOfGuests()).toFixed(2);
    };

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function(dish) {
        //Add only if dish not already in the menu
        if(this.getDishFromMenu(dish.id) === undefined){
            this.dishesInMenu.push(dish);
        }
        console.log("Menu now: "+JSON.stringify(this.dishesInMenu));
    };

    this.getDishFromMenu = function(id){
        for(key in this.dishesInMenu){
            if(this.dishesInMenu[key].id == id) {
                return this.dishesInMenu[key];
            }
        }
        return undefined;
    };

    //Removes dish from menu
    this.removeDishFromMenu = function(id) {
        var foundDishIndex = undefined;
        for(key in this.dishesInMenu) {
            if (foundDishIndex == undefined && this.dishesInMenu[key].id == id) {
                foundDishIndex = key;
            }
        }
        this.dishesInMenu.splice(foundDishIndex, 1);
    };


    this.cloneObject = function(object){
        return JSON.parse(JSON.stringify(object));
    };

    this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });

    this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
        get: {
            headers: {
                'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
            }
        }
    });



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
