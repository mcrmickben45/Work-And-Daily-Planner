var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// Time blocks for standard business hours //
var timeBlocks = $(".time-block.row");
var blockText = $("<textarea>").addClass("event-description col-sm-9");
timeBlocks.append(blockText);

var currentHour = parseInt(moment().format("H"));

// Refreshes page, saved events persist // 
var loadEvents = function (timeSlots) {
  timeSlots.forEach((element) => {
    let text = localStorage.getItem(parseInt(element.time));
    if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var tempArr = [];
  $(".event-description").each(function (index, elem) {
    tempArr.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  loadEvents(tempArr);
};

// Time blocks colored coced to indicate past, present, or future // 
$(".event-description").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < currentHour) {
    $this.addClass("past");
  }
  if (id > currentHour) {
    $this.addClass("future");
  }
  if (id === currentHour) {
    $this.addClass("present");
  }
});

// Click the save button to add value to events // 
$(".save-btn").click(function (event) {
  event.preventDefault();

  var $element = $(this).siblings(".event-description");
  var time = $element.attr("id");
  var text = $element.val().trim();

  if (time && text !== "") {
    localStorage.setItem(time, text);
  }
});

$(".save-btn").hover(function () {
  $(this).addClass("save-btn:hover");
});

fetchEvents();
