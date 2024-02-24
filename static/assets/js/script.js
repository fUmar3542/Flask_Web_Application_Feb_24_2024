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





document.addEventListener("DOMContentLoaded", function() {
    var sharedValue = localStorage.getItem("welcome");
    if (sharedValue !== null) {
        localStorage.removeItem("welcome");
        showMessage("Welcome to LAMEGO TRADING");
    }
    var shared = localStorage.getItem("order");
    if (shared !== null) {
        showMessage(shared);
        localStorage.removeItem("order");
    }
});

// Update credentials
$(document).ready(function() {
    // Event listener for the form submission
    $("#update_credentials_button").on('click', function(event) {
        event.preventDefault();

        // Get form values
        var email = $("#update_credentials_email").val();
        var name = $("#update_credentials_name").val();
        var phone = $("#update_credentials_phone").val();
        var password = $("#update_credentials_password").val();

        // Check if fields are empty
        if (!email || !name || !phone || !password) {
            showMessage("Please fill in all the required fields.");
            return;
        }

        // Check if the name contains only letters and spaces
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showMessage("Name should only contain letters and spaces.");
            return;
        }

        // Check if phone number is valid (assuming a 10-digit phone number)
        if (!/^\d{10,14}$/.test(phone)) {
            showMessage("Please enter a valid 10-14 digit phone number.");
            return;
        }

        // Check if the password length is greater than 3 characters
        if (password.length < 4) {
            showMessage("Password must be at least 4 characters long.");
            return;
        }

        // Create a FormData object to send form data
        var formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("password", password);

        // Send data to the server using AJAX
        $.ajax({
            url: "/update_credentials", // Replace with your actual route URL
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                // Display the response message to the user
                showMessage(response.message);
                if(response.message === "Credentials updated successfully!!!"){
                    setTimeout(function() {
                            window.location.href = "/";
                        }, 2000); // 1000 milliseconds = 1 second
                }
            },
            error: function(error) {
                showMessage("Error: " + error);
            }
        });
    });
});



// Notification
document.addEventListener("DOMContentLoaded", function() {
    const notificationItems = document.querySelectorAll(".notification-item");

    notificationItems.forEach(function(item) {
        const closeIcon = item.querySelector(".close-icon");
        const id = item.getAttribute("data-notification-id");

        closeIcon.addEventListener("click", function() {
            $.ajax({
                url: "/delete_notification/" + id
            }).done(function(message) {
                if(message === "Notification deleted"){
                    // Remove the entire notification container
                    item.remove();
                }
                else{
                    showMessage(message);
                }
            });
        });
    });
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


  var loader = document.getElementById("preloader");

  window.addEventListener("load" , function(){
    loader.style.display = "none";
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

$("#noti-img, #noti-img1, #noti-close").click(function() {
    $(".account-logout").slideUp(300);
    $(".arrow-2").removeClass("rotate");

    // Check if there are notifications in all_notifications
    var allNotifications = all_notifications; // Get the JavaScript array

    if (allNotifications.length > 0) {
        // Get the state of the first notification
        var firstNotificationState = allNotifications[0][2];

        // Check if the first notification is not already "viewed"
        if (firstNotificationState !== "viewed") {

            // Make an AJAX request to update the state of all notifications on the server
            $.ajax({
                url: "/update_notification_state",
                type: "POST",
                data: {
                    new_state: "viewed"
                },
                success: function(response) {
                    // Update the state of all notifications to "viewed" on the frontend
                    for (var i = 0; i < allNotifications.length; i++) {
                        allNotifications[i][2] = "viewed";
                    }
                    console.log("All notification states updated on the server.");

                    // Update the icon source
                    $("#noti-img1").attr("src", "static/assets/images/notifecation.png");
                },
                error: function(error) {
                    console.error("An error occurred while updating notification states:", error);
                }
            });
        }
    }
    // Slide toggle the notification content
    $(".notifecation-content").slideToggle(300);
});


  $(document).on("click", function(event){
    var $trigger = $(".notifecation-wrap");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        $(".notifecation-content").slideUp(300);
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
