function Pizza(name,toppings, size) {
  this.customerName = name;
  this.toppings = toppings;
  this.size = size;
}

var pepperoni = {name:"Pepperoni", price:150};
var mushroom = {name:"Mushroom", price:175};
var onion = {name:"Onion", price:12};
var sausage = {name:"Sausage", price:200};
var bacon = {name:"Bacon", price:250};
var pineapple = {name:"Pineapple", price:160};
var olive = {name:"Olive", price:150};
var extraCheese = {name:"Extra Cheese", price:200};

var toppingsArray = [pepperoni,mushroom,onion,sausage,bacon,pineapple,olive,extraCheese];
var selectedToppings = [];

var personal = {name:"Personal", price: 500 ,diameter:8};
var small = {name:"Small",price:600,diameter:10};
var medium = {name:"Medium",price:700,diameter:12};
var large = {name:"Large",price:900,diameter:14};
var extraLarge = {name:"Extra Large",price:1100,diameter:16};

var sizesArray = [personal,small,medium,large,extraLarge];

function toppingsArray(allToppings) {
  $("input:checkbox[name=topping]:checked").each(function(){
    var topping = parseInt($(this).val());
    selectedToppings.push(allToppings[topping]);
  });
}
//prototype
Pizza.prototype.cost = function(){
  var toppingsTotal = 0;
  for (i = 0; i < this.toppings.length; i++){
    toppingsTotal += this.toppings[i].price;
  }
  return (toppingsTotal + parseFloat(this.size.price)).toFixed(2);
}
//Functions
function resetForm(){
  $(".address-entry").hide();
  $(".no-address").hide();
  $(".has-error").hide();
  $(".no-error").show();
  document.getElementById("pizza-order-form").reset();
}
$(document).ready(function(){
  $("#home-page").click(function(){
    $(".home").fadeIn();
    $(".order").hide();
    $(".about-us").hide();
    $(".order-summary").hide();
  });
  $("#order-page").click(function(){
    $(".home").hidden();
    $(".order").fadeIn();
    $(".about-us").hide();
    $(".order-summary").hide();
  });
  $("#about-page").click(function(){
    $(".home").hide();
    $(".order").hide();
    $(".about-us").fadeIn();
    $(".order-summary").hide();
  });
  $(".pickup-click").click(function(){
    $(".address-entry").hide();
  });
  $(".deliver-click").click(function(){
    $(".addressEntry").fadeIn();
  });
})
//Submission
$("#pizza-order-form").submit(function(event){
  event.preventDefault();
  var userName = $("input#User-Name").val();
  var userNameAgain = $("input#User-Name-Again").val();
  if (userName === "" && userNameAgain === ""){
    $(".no-error").hide();
    $(".has-error").show();
  } else {
    //total
    var inputtedSize = parseInt($("select#size").val());
    var pizzaSize = sizesArray[inputtedSize];
    selectedToppings = [];
    toppingsToArray(toppingsArray);
    var newPizza = new Pizza (userName, selectedToppings, pizzaSize);
    //order SUMMARY
    $("#name-order").text(userName + userNameAgain);
    $("#size-pizza").text(newPizza.size.name);
    $("#diameter-pizza").text(newPizza.size.diameter);
    $("#toppings-ordered").empty();
    if (newPizza.toppings[0]){
      for (j = 0; j < newPizza.toppings.length; j++) {
        $("#toppings-ordered").append("<li>" + newPizza.toppings[j].name + "</li>");
      }
    } else {
      $("#topping-ordered").append("<li>No additional toppings</li>");
    }
    $("#total-cost").text("Kshs" + newPizza.cost());
    var pickupOrDeliver = $("input:radio[name=pickup-deliver]:checked").val();
    if(pickupOrDeliver === "pickup"){
      $(".deliver-message").hide();
      $(".pickup-message").show();
      //Order Summary
      $(".order").hide();
      $(".order-summary").fadeIn();
      resetForm();
    } else {
      //Address Details
      var street = $("input#addressStreet").val();
      var city = $("input#addressCity").val();
      var estate = $("input#addressEstate").val();
      var zipCode = $("input#addressZip").val();
      if (street === "" || city === "" || zipCode === ""){
        $(".no-address").fadeIn();
      } else {
        $("#address-street").text(street);
         $("#address-city").text(city);
         $("#address-estate").text(estate);
         $("#address-zip").text(zipCode);
         $(".pickup-message").hide();
         $(".deliver-message").show();
         //Order Summary
         $(".order").hide();
         $(".order-summary").fadeIn();
         resetForm();
      }
    }
  });
});
