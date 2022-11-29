// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var retriveJson = JSON.parse(localStorage.getItem("dkey")) || [];
$(function () {
  // storing dayjs in a variable called currDate
  let currDate = dayjs();

  //Test Console
  console.log(retriveJson);

  // Function to call when button element is clicked.
  $("button").click(function () {
    let dKey = $(this).parent().attr("id");
    let dVal = $(this).siblings(".description").val();
    let keyItem = { [dKey]: dVal };

    retriveJson.push(keyItem);
    localStorage.setItem("dkey", JSON.stringify(retriveJson)) || [];

    //Test console
    var domOBJ = $(this);
    console.log(domOBJ);
    console.log(keyItem);
    // });
  });


  // Function that compares time of id of HTML and curr time to assign present, past and future.
  function getCurrentTime(){
    let currTime = dayjs().hour()
    console.log("hour-"+currTime)
    var main = $(".main-container").children();
    for(var child of main){
      var childHour = parseInt(child.id.replace("hour-",""));
      console.log(childHour)
      if(childHour < currTime){
        $("#hour-"+childHour).removeClass("future").removeClass("present").addClass("past");
      } else {
        $("#hour-"+childHour).removeClass("present").removeClass("present").addClass("future");

      }
    }
    $("#hour-"+currTime).removeClass("future").addClass("present");

  }




  // function to grab local storage items and display it in the correct id Div
  function addValueToHour() {
    var testStorageData = JSON.parse(localStorage.getItem("dkey")) || [];
    console.log(testStorageData);
    //[{hour-10:" test 1"}]
    for (item of testStorageData) {
      console.log(item);
      for (key in item) {
        var idEl = $("#" + key).children("textarea");
        idEl.text(item[key]);
      }
    }
    //Different Method that I have tried.
    // for (var i = 0; i > retriveJson.length; i++) {
    //   if (Object.keys(retriveJson[i]) === $("div").attr("id")) {
    //     $("textarea").text(retriveJson[i].val());
    //   }
    // }
  }
getCurrentTime();
  addValueToHour();

  // Display Current Time
  $("#currentDay").text(currDate.format("MMMM D YYYY, h:mm a"));
});
