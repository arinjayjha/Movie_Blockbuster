"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var seats = document.querySelectorAll(".row .seat:not(.occupied)");
var seatContainer = document.querySelector(".row-container");
var count = document.getElementById("count");
var total = document.getElementById("total");
var movieSelect = document.getElementById("movie");
populateUI();
var ticketPrice = +movieSelect.value; // Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  var selectedSeats = document.querySelectorAll(".container .selected");
  seatsIndex = _toConsumableArray(selectedSeats).map(function (seat) {
    return _toConsumableArray(seats).indexOf(seat);
  });
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  var selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
} // Get data from localstorage and populate


function populateUI() {
  var selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  var selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
} // Movie select event


movieSelect.addEventListener("change", function (e) {
  ticketPrice = +movieSelect.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
}); // Adding selected class to only non-occupied seats on 'click'

seatContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
}); // Initial count and total rendering

updateSelectedCount();
$(document).ready(function () {
  $("#btn").click(function () {
    window.open("Form.html", "_self");
  });
  $(".movie-container").hide();
});