// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookieStore) {

    this.numberOfGuests = $cookieStore.get('numberOfGuests') === undefined ? 2 : $cookieStore.get('numberOfGuests');
    this.currentView = 1;
    this.dishesInMenu = [];

    this.dishes = [];

    this.setDishes = function(dishes) {
        this.dishes = dishes;
    };

    this.getDishes = function() {
        return this.dishes;
    };

    this.setNumberOfGuests = function(num) {
        this.numberOfGuest = num;
    };

    this.getNumberOfGuests = function() {
        return numberOfGuest;
    };

    this.incrementNumberOfGuests = function(){
        this.numberOfGuests += 1;
        $cookieStore.put('numberOfGuests', this.numberOfGuests);
    };

    this.decrementNumberOfGuests = function(){
        this.numberOfGuests -= 1;
        if(this.numberOfGuests == 0){
            this.numberOfGuests = 1;
        }
        $cookieStore.put('numberOfGuests', this.numberOfGuests);
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

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function() {
        var totalPrice = 0;
        for (dishIndex in this.dishesInMenu) {
            totalPrice += this.getDishesPrice(this.dishesInMenu[dishIndex]);
        }
        return totalPrice;
    };

    this.getDishesPrice = function(dish){
        return parseFloat((dish.pricePerServing * this.getNumberOfGuests()).toFixed(2));
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
