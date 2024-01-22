// Display current day at the top of the page
var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = dayjs();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// Gets the current hour in 24-hour format
var currentHour = parseInt(dayjs().format("H"));

// Function loads events from localStorage
var loadEvents = function (timeSlots) {
    timeSlots.forEach((element) => {
        let text = localStorage.getItem(parseInt(element.time));
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
            time: $(elem).attr("id"),
            text: $(elem),
        });
    });
    loadEvents(tempArr);
};

// Adds past, present, or future class to each column based on current hour
$("textarea").each(function () {
    var $this = $(this);
    var id = parseInt($this.attr("id"));

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

// Saves button to click event
$("button.saveBtn").click(function (event) {
    event.preventDefault();
    var $element = $(this).siblings("textarea");
    var time = $element.attr("id");
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

// Fetches and loads  events on page load
fetchEvents();
