var introductionElement = document.getElementById("intro");
var noteElement = document.getElementById("note");
var imageElement = document.getElementById("image");
var dobDodElement = document.getElementById("dobdod");
var wikiElement = document.getElementById("wikilink");
var affiliationElement = document.getElementById("affiliation");
var section = document.getElementById("elephantInfo");
var elephant;

fetch('https://cors-anywhere.herokuapp.com/https://elephant-api.herokuapp.com/elephants/random')
  .then(function (res) {
    if (res.status == 429) {
      window.alert("Too many requests have been made to the server, please try again later");
    }
    res.json().then(function (json) {
      document.getElementsByClassName("fa-3x")[0].style.display = "none";
      elephant = json[0];
      console.log(elephant);

      if (elephant.name == undefined) {
        window.location.reload();
      } else if(elephant.name == "Mary"){
        elephant.image = "https://elephant-api.herokuapp.com/pictures/missing.jpg";
      }

      if (elephant.species == "Unavailable") {
        introductionElement.innerHTML = elephant.name + ", the elephant";
      } else {
        introductionElement.innerHTML = elephant.name + " the " + elephant.species + " elephant";
      }
      if (elephant.dob == undefined & elephant.dod == undefined ||
        elephant.dob == "Unavailable" && elephant.dod == "Unavailable") {
        dobDodElement.innerHTML = "Unknown date of birth and death";
      } else {
        if (elephant.dod == "-") {
          elephant.dod = "Present";
        }
        dobDodElement.innerHTML = elephant.dob + "  -  " + elephant.dod;
      }

      if (elephant.affiliation == undefined) {
        affiliationElement.innerHTML = "";
      } else {
        affiliationElement.innerHTML = "Affiliation: " + elephant.affiliation;
      }

      noteElement.innerHTML = elephant.note;
      imageElement.src = elephant.image;
      wikiElement.href = elephant.wikilink;

      section.style.display = "block";
      document.getElementsByTagName("footer")[0].style.display = "block";
    });
  })

  // We can catch errors from fetch with 'catch()'
  .catch(function (err) {
    // Output the error message to the console
    console.log(err);
    window.location.reload();
  });


document.getElementsByTagName("footer")[0].getElementsByTagName("i")[0].addEventListener("click", function () {
  scrollToTop();
});

function scrollToTop() {
  var position =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (position) {
    window.scrollBy(0, -Math.max(1, Math.floor(position / 10)));
    scrollAnimation = setTimeout("scrollToTop()", 30);
  } else clearTimeout(scrollAnimation);
}