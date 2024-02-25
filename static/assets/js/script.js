function showMessage(message) {
    swal({
        content: {
            element: "p",
            attributes: {
                innerText: message,
                style: "color: black;",
                className: "p",
            },
        },
    });
}


let customResolveFunction;
function customConfirm(message) {
    // Set the message in the modal
    document.getElementById("popTitle1").innerText = message;

    // Show the modal
    $("#confirmationModel").addClass('model-open');

    // Return a Promise that resolves to the user's choice
    return new Promise((resolve) => {
        customResolveFunction = resolve;
    });
}

// Bind click events using JavaScript
document.getElementById("yes_confirmation_button").addEventListener('click', function() {
    $("#confirmationModel").removeClass('model-open');
    customResolveFunction(true);
});

document.getElementById("no_confirmation_button").addEventListener('click', function() {
    $("#confirmationModel").removeClass('model-open');
    customResolveFunction(false);
});

document.querySelector(".close-btn").addEventListener('click', function() {
    $("#confirmationModel").removeClass('model-open');
    customResolveFunction(false);
});






  $(".link-flex").click(function() {
    $(this).find(".dropdown").slideToggle(300);
    $(this).find(".arrow").toggleClass("rotate");
  });

  $(document).on("click", function(event){
    var $trigger = $(".link-flex");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".dropdown").slideUp(300);
        $(".arrow").removeClass("rotate");
    }            
  });

  $(".menu").click(function() {
    $(".header-li").slideToggle(300);
    $(this).find(".arrow").toggleClass("rotate");
  });

  $(".cross-menu").click(function() {
    $(".header-li").slideUp(300);
    $(".cross-nav").toggleClass("rotate");
    $(".arrow").removeClass("rotate");
  });
  
  $(".services-plan-click").on('click', function() {
    $("#click-two-model-4").addClass('model-open');
    $(".arrow").addClass("rotate");
  }); 

  $("#click-4").on('click', function() {
    $("#click-two-model-4").addClass('model-open');
    $(".arrow").addClass("rotate");
  }); 
  $(".close-btn, .bg-overlay").click(function(){
    $("#click-two-model-4").removeClass('model-open');
    $(".arrow").removeClass("rotate");
  });

  $("#click-3").on('click', function() {
    $("#click-two-model-3").addClass('model-open');
  }); 
  $(".close-btn, .bg-overlay").click(function(){
    $("#click-two-model-3").removeClass('model-open');
  });

  $("#click-2").on('click', function() {
    $("#click-two-model-2").addClass('model-open');
  }); 
  $(".close-btn, .bg-overlay").click(function(){
    $("#click-two-model-2").removeClass('model-open');
  });

  $("#click-1").on('click', function() {
    $("#click-two-model-1").addClass('model-open');
  }); 
  $(".close-btn, .bg-overlay").click(function(){
    $("#click-two-model-1").removeClass('model-open');
  });


  // Account wrap and Notifications functionality -> should be in my_js.js
  $(".account-wrap").click(function() {
    $(".notifecation-content").slideUp(300);
    $(".account-logout").slideToggle(300);
    $(this).find(".arrow-2").toggleClass("rotate");
  });

  $(document).on("click", function(event){
      var $trigger = $(".account-content");
      if($trigger !== event.target && !$trigger.has(event.target).length){
          $(".account-logout").slideUp(300);
          $(".arrow-2").removeClass("rotate");
      }
    });

  $(document).on("click", function(event){
    var $trigger = $(".account-content");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".account-logout").slideUp(300);
        $(".arrow-2").removeClass("rotate");
    }
  });


  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

 // Get the element with id="defaultOpen" and click on it
 document.getElementById("defaultOpen").click();
