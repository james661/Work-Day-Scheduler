// Runs the Javascript code when the page's DOM is ready.
$(document).ready(function () {
  // Puts all the column containers into a variable.
  var schedule = $(".containers");
  // Generates time blocks from 9AM to 5PM, with 17 being 5PM.
  for (var i = 9; i <= 17; i++) {
    var timeBlock = $("<div>")
      .attr("id", "hour-" + i)
      .addClass("hourcolumn hour-column");
    timeBlock.addClass(getTimeBlockClass(i));
    schedule.append(timeBlock);
  }

  $(".saveBtn").on("click", saveButton);
  // Event listener for when the save button is clicked.
  function saveButton() {
    var writing = $(this).siblings(".writing");
    var timeBlock = writing.closest(".hour-column");
    var time = timeBlock.attr("id");
    var value = writing.val();
    // console.log(test);
    localStorage.setItem(time, value);
    // function that follows the save button being clicked, which directly references the writing area and retrieves its ID. Then saves to local storage.
    $(".notification").addClass("show");

    setTimeout(function () {
      $(".notification").removeClass("show");
    }, 5000);
  }

  function getTimeBlockClass(hour) {
    var currentHour = dayjs().hour();
    if (hour < currentHour) {
      return "past";
    } else if (hour === currentHour) {
      return "present";
    } else {
      return "future";
    }
  }
  // Function which checks the current time and compares it to the time on the schedule.
  function hourKeeper() {
    var currentHour = dayjs().hour();

    $(".hour-column").each(function () {
      var columnHour = parseInt($(this).attr("id").split("-")[1]);
      var $this = $(this);

      $this.removeClass("past present future");

      if (columnHour < currentHour) {
        $this.addClass("past");
      } else if (columnHour === currentHour) {
        $this.addClass("present");
      } else {
        $this.addClass("future");
        // Function that gives a certain time class to the column's hour, so that different CSS will be applied.
        // console.log(test2);
      }
    });
  }

  hourKeeper();

  setInterval(hourKeeper, 15000);

  $("#hour-9 .writing").val(localStorage.getItem("hour-9"));
  $("#hour-10 .writing").val(localStorage.getItem("hour-10"));
  $("#hour-11 .writing").val(localStorage.getItem("hour-11"));
  $("#hour-12 .writing").val(localStorage.getItem("hour-12"));
  $("#hour-13 .writing").val(localStorage.getItem("hour-13"));
  $("#hour-14 .writing").val(localStorage.getItem("hour-14"));
  $("#hour-15 .writing").val(localStorage.getItem("hour-15"));
  $("#hour-16 .writing").val(localStorage.getItem("hour-16"));
  $("#hour-17 .writing").val(localStorage.getItem("hour-17"));
  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));
});
// Grabs values of the schedule hours. Then displays the current month and day.
