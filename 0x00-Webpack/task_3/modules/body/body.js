// interesting jquery import thanks to babel
import $ from "jquery";
// import lodash
import _ from "lodash";
// styles
import "./body.css";

// append elements
$("body").append(`<p>Dashboard data for the students</p>`);
$("body").append(`<button>Click here to get started</button>`);
$("body").append(`<p id="count"></p>`);

// bind lodash's debounce to the button
$("button").on("click", _.debounce(updateCounter, 500));

let count = 0;
// function to update the counter
function updateCounter() {
  count++;
  $("#count").text(`${count} clicks on the button`);
}
