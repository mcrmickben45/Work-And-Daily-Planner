// Displays current day at the top of the page
var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = dayjs();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// Gets the current hour
var currentHour = parseInt(dayjs().format("H"));

// Function to load events from localStorage
var loadEvents = function (timeSlots) {
    timeSlots.forEach((element) => {
        let text = localStorage.getItem(element.time);
        if (text) {
            element.text.val(text);
        }
    });
};

// Function fetches and loads events on page
var fetchEvents = function () {
    var tempArr = [];
    $("textarea").each(function (index, elem) {
        tempArr.push({
            time: $(elem).attr("id").replace("time-", ""),
            text: $(elem),
        });
    });
    // Loads events from localStorage
    loadEvents(tempArr);
};

// Adds past, present, or future class to each textblock based on current hour
$("textarea").each(function () {
    var $this = $(this);
    var id = parseInt($this.attr("id").replace("time-", ""));

    if (id < currentHour) {
        $(this).addClass("past");
    }
    if (id > currentHour) {
        $(this).addClass("future");
    }
    if (id === currentHour) {
        $(this).addClass("present");
    }
});

// Saves button click event
$("button.saveBtn").click(function (event) {
    event.preventDefault();
    var $element = $(this).siblings("textarea");
    var time = $element.attr("id").replace("time-", "");
    var text = $element.val().trim();

    // Saves data to localStorage
    if (time && text !== "") {
        localStorage.setItem(time, text);
    }
});

// Hover effect for save button
$(".saveBtn").hover(function () {
    $(this).addClass("saveBtn:hover");
});

// Fetchs and loads events on page load
fetchEvents();
