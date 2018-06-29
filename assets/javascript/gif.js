$(document).ready(function () {
    
    var apiKey = "ykPNDV7WGDLwZhSU8nqG2FwJ39SvyFJi";

    var topics = ["Cristiano Ronaldo", "Lionel Messi", "Neymar", "Zlatan Ibrahimovic", "Ronaldinho",];

    function displayGifs() {
        var selectedGif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=" + apiKey + "&limit=10";

        // Create  AJAX call for the specific soccer player button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                var still = response.data[i].images.fixed_height_still.url;
                var animated = response.data[i].images.fixed_height.url;
                var rating = response.data[i].rating;
                var imgDiv = ` <div class = "img-container">
                    <p>Rating: ${rating.toUpperCase()}</p>
                    <img src="${still}" class="giphy-gifs" data-still="${still}" data-animate="${animated}" data-state="still"/>
                </div>`;
                console.log(still);
                $(".gifs-display").prepend(imgDiv)
            }
            message();
        });
    }

    // Function for displaying gif buttons
    function createButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif-btn");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
    }

    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        createButtons();
    });

    $(document).on("click", ".gif-btn", displayGifs);
    $(document).on("click", ".giphy-gifs", function() {
        
        var state = $(this).attr('data-state');
        console.log(state)

        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate')
        }

        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still')
        };
    });
    
    createButtons();

});