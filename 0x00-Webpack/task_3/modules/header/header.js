// interesting jquery import thanks to babel
import $ from "jquery";
// styles
import "./header.css";

// append elements
$("body").append(`<div id="logo"></div>`);
$("body").append(`<p>Holberton Dashboard</p>`);
console.log("Init header");
