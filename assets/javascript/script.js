var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
      
      function displayAnimals() {

        $("#gifs-appear-here").empty();
        var animal = $(this).attr("data-animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            console.log(response);
            
            var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.addClass("itemImg")
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalImage.attr("data-state", "still");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });

      }
      
      
      function renderButtons() {
        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {
            
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
            
        }
      }
      
      function renderImg() {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "animate");
          }
      }
      
      
      
      $("#add-animal").on("click", function(event) {
          
        event.preventDefault();
          
        var animal = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
            
      $(document).on("click", ".animal", displayAnimals);
      $(document).on("click", ".itemImg", renderImg);

      renderButtons();