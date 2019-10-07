$(document).ready(function () {

  var housewives = [
    "The Real Housewives of Orange County", "The Real Housewives of New York City", "The Real Housewives of Atlanta", "The Real Housewives of New Jersey", "The Real Housewives of D.C.", "The Real Housewives of Beverly Hills", "The Real Housewives of Miami", "The Real Housewives of Potomac", "The Real Housewives of Dallas"

  ];

  // function to make buttons from input and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".housewife-button", function () {
    $("#housewives").empty();
    $(".housewife-button").removeClass("active");
    $(this).addClass("active");

    // function to display gifs
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response);

        var results = response.data;
        // for loop goes through each gif and adds these variables
        for (var i = 0; i < results.length; i++) {
          // creates a generic div to hold the results
          var housewifeDiv = $("<div class=\"housewife-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var housewifeImage = $("<img>");
          housewifeImage.attr("src", still);
          housewifeImage.attr("data-still", still);
          housewifeImage.attr("data-animate", animated);
          housewifeImage.attr("data-state", "still");
          housewifeImage.addClass("housewife-image");

          housewifeDiv.append(p);
          housewifeDiv.append(housewifeImage);

          $("#housewives").append(housewifeDiv);
        }
      });
  });

  //  When the user clicks one of the still GIPHY images, and it animates. When the user clicks the gif again, it stops playing.

  $(document).on("click", ".housewife-image", function () {

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-housewife").on("click", function (event) {
    event.preventDefault();
    var newhousewife = $("input").eq(0).val();

    // HERE is where you add the code for adding an additional gifs without deleting the previous ones.

    if (newhousewife.length > 2) {
      housewives.push(newhousewife);
      
    }

    populateButtons(housewives, "housewife-button", "#housewife-buttons");

  });

  populateButtons(housewives, "housewife-button", "#housewife-buttons");
});
