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

function isValidPhoneNumber(phoneNumber) {
  // Define a regular expression pattern for a valid phone number.
  // This is a simple example and might need to be adjusted based on your needs.
  const pattern = /^\d{10,14}$/; // Assumes a 10-digit number without any formatting characters.

  // Test the phoneNumber against the pattern.
  return pattern.test(phoneNumber);
}

 $(".services-plan-click").on('click', function() {
    var id = this.getAttribute("data-id");
    $.ajax({
        url: "/get_service/" + id
    }).done(function(arr) {
        console.log(arr);
        document.getElementById("popTitle").textContent = arr[1];
        document.getElementById("popDescription").innerHTML= arr[2].replace(/\n/g, "<br>");
        document.getElementById("popPrice").textContent = '$' + arr[3];
        $("#click-two-model-1").addClass('model-open');
    });
 });
 $(".close-btn, .bg-overlay").click(function(){
   $("#click-two-model-1").removeClass('model-open');
 });



$(document).ready(function() {
    var subTotalField = document.getElementById("order_subTotal");
    var initialSubTotal = parseFloat(subTotalField.textContent.replace("Total: $", "")) || 0;

    // Function to update the subtotal and total
    function updateSubTotalAndTotal() {
        var subTotalField = document.getElementById("order_subTotal");
        var totalField = document.getElementById("order_total");

        // Calculate the subtotal by summing the prices of selected service checkboxes
        var subTotal = initialSubTotal;
        $(".cbox:checked").each(function() {
            var price = parseFloat($(this).attr("data-id")) || 0;
            subTotal += price;
        });

        // Update the subTotal field
        subTotalField.textContent = "Total: $" + subTotal.toFixed(2);

        // Get the selected shipping price
        var shippingPrice = 0;

        // Only consider the shipping checkbox that is checked
        var selectedShipping = $(".ship:checked:first");
        if (selectedShipping.length > 0) {
            shippingPrice = parseFloat(selectedShipping.attr("data-id")) || 0;
        }

        // Calculate the new total by adding the selected shipping price to the subtotal
        var newTotal = subTotal + shippingPrice;

        // Update the Total field
        totalField.textContent = "Total: $" + newTotal.toFixed(2);
    }

    // Handle both checkbox and div click events for shipping cards
    $(".shipping_cards").on('click', function(e) {
        var checkbox = $(this).find(".ship");
        if (checkbox.length > 0) {
            // Uncheck all other shipping checkboxes
            $(".ship").prop("checked", false);
            checkbox.prop("checked", true);
            updateSubTotalAndTotal();
        }
    });

    // Handle both checkbox and div click events for service rows
    $(".table tbody tr").on('click', function(e) {
        var checkbox = $(this).find(".cbox");
        if (checkbox.length > 0 && !checkbox.prop("disabled")) {
            checkbox.prop("checked", !checkbox.prop("checked"));
            updateSubTotalAndTotal();
        }
    });

    // Initial update to set the total based on the initial state
    updateSubTotalAndTotal();
});


 // Checkout
 $(document).ready(function() {
    $("#checkout").on('click', function() {
        var subTotalValue = parseFloat($("#order_subTotal").text().replace("Total: $", ""));
        var selectedShipping = $(".ship:checked").length > 0;

        // Disable the submit button to prevent multiple clicks
        document.getElementById('checkout').disabled = true;

        if (subTotalValue !== 0 && selectedShipping) {
            u = ''
            if(role != 'user'){
                showMessage("Only user can place the order");
                document.getElementById('checkout').disabled = false;
                return;
            }
            // ------------------------------------------------------------------------


            // Check if any service checkboxes are selected
            var selectedServiceIds = [];
            $(".cbox:checked").each(function() {
                var checkboxText = $(this).closest("td").text();
                var serviceId = parseInt(checkboxText.replace("#CR", ""));
                if (!isNaN(serviceId)) {
                    selectedServiceIds.push(serviceId);
                }
            });

            // Determine the package type based on the state of service checkboxes
            var packageType = $(".cbox:disabled").length > 0 ? 'admin_defined' : 'user_defined';

            var selectedShippingType = $(".ship:checked").closest('h4').text().trim();
            var total = $("#order_total").text().replace("Total: $", "");

            showMessage("Processing your request");

            // Create the checkout data object
            var checkoutData = {
                selectedServiceIds: selectedServiceIds,
                selectedShippingType: selectedShippingType,
                total: total,
                packageType: packageType,
                u: u,
            };

            // Use AJAX to send checkoutData to the server
            $.ajax({
                url: '/process_payment', // Update the URL to your server endpoint
                type: 'POST',
                data: JSON.stringify(checkoutData),
                contentType: 'application/json',
                success: function(response) {
                    // Handle the server's response here (e.g., show a success message)
                    console.log(response);
                    if (response.success) {
                        if(response.id != -1){
                            var documentUrl = "/request_processed/" + response.id + "/0";
                            window.open(documentUrl, "_blank");
                        }
                        localStorage.setItem("order", response.message);
                        setTimeout(function() {
                            window.location.href = "/user";
                        }, 1000); // 1000 milliseconds = 1 second
                    } else {
                        showMessage('Payment failed. Please try again.');
                    }
                },
                error: function(error) {
                    console.error(error);
                    showMessage('An error occurred during payment.');
                },
                complete: function() {
                    // Re-enable the submit button after processing
                    document.getElementById('checkout').disabled = false;
                }
            });
        } else {
            // Show an showMessage to the user
            showMessage("Please select at least one shipping option and services to place the order");
            document.getElementById('checkout').disabled = false;
        }
    });
});

// Download excel
$(document).ready(function() {
    $("#generate_report").on('click', function() {
        var documentUrl = "/download_excel";
        window.open(documentUrl, "_blank");
        showMessage("Request Processed");
    });
});


$("#change_password").click(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var name = $("#full-name").val();
        var phone = $("#phone-number").val();
        var password = $("#password").val();

        if (name === "" || phone === "" || password === "") {
            showMessage("Please fill out all fields.");
            return;
        }

        if(password.length <= 3){
            showMessage("Password should be greater than 3 characters.");
            return;
        }

        if(!isValidPhoneNumber(phone)){
            showMessage("Please provide a valid 10-14 digit phone number");
            return;
        }

        var jsonData = {
            name: name,
            phone: phone,
            password: password
        };

        // Assuming you have the URL to update the profile
        var url = "/update_profile";

        // Use AJAX to send the POST request with JSON data
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(jsonData), // Convert JSON object to string
            contentType: 'application/json', // Set the Content-Type header to JSON
            success: function(response) {
                showMessage(response.message);
            },
            error: function(error) {
                console.error(error);
                showMessage("An error occurred while updating the info");
            }
        });
});


$(".update_btn.user_send_details").on('click', function() {
    var id = this.getAttribute("data-id");
    $("#user_send_doc_order_id").val(id); // Fix the assignment here
    // Clear the input and textarea fields
    $("#doc_title").val("");
    $("#doc_description").val("");
    $("#user_doc_input").val(""); // Clear the file input
    $("#services-details-user-send-details").addClass('model-open');
});
$(".close-btn, .bg-overlay").click(function(){
    $("#services-details-user-send-details").removeClass('model-open');
});
 $("#user_submit_doc").click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var orderid = $("#user_send_doc_order_id").val();
    var title = $("#doc_title").val();
    var description = $("#doc_description").val();
    var documentInput = document.getElementById("user_doc_input");

    // Check if all fields are filled
    if (title === "" || description === "") {
        showMessage("Please fill out all fields.");
        return;
    }

    // Validate the subject (title) for special characters
    var titleRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters, numbers, and spaces
    if (!titleRegex.test(title)) {
        showMessage("Title should not contain special characters.");
        return;
    }

    var selected_file = "";

    // Check if a file is selected
    if (!documentInput.files || !documentInput.files[0]) {
        selected_file = "";
    }
    else{
        selected_file = documentInput.files[0];
        // Check the file size before sending
        var maxSize = 5 * 1024 * 1024; // 5 MB in bytes
        if (selected_file.size > maxSize) {
            showMessage("File size exceeds the limit of 5 MB.");
            return;
        }
    }

    // Construct FormData object to send the file
    var formData = new FormData();
    formData.append("file", selected_file);
    formData.append("orderid", orderid);
    formData.append("title", title);
    formData.append("description", description);

    // Assuming you have the URL to add a document
    var url = "/add_document_user";

    // Use AJAX to send the POST request with FormData
     $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            showMessage(response.message);
            $("#services-details-user-send-details").removeClass('model-open');
            removeFile();
        },
        error: function(error) {
            showMessage("An error occurred while sending the details.");
        }
    });
});

function removeFile1() {
  const fileInput = $('#user_review_doc_input');
  fileInput.val(''); // Clear the selected file
  const fileInfo = $('#file-info1');
  fileInfo.css('display', 'none');
}

$(".update_btn.notify_btn.send_review").on('click', function() {
    var id = this.getAttribute("data-id");
    $("#user_send_review_order_id").val(id);

    // Clear the textarea
    $("#reviews-user textarea").val("");

    // Remove the "active" class from all stars
    var allStars = $('.review-container .star');
    allStars.removeClass('active');

    $("#reviews-user").addClass('model-open');
});
$(".close-btn, .bg-overlay").click(function(){
    $("#reviews-user").removeClass('model-open');
});
$('.star').click(function() {
    var clickedStar = $(this);
    var allStars = $('.review-container .star');

    var clickedIndex = allStars.index(clickedStar);

    allStars.removeClass('active');

    for (var i = 0; i <= clickedIndex; i++) {
        allStars.eq(i).addClass('active');
    }

    for (var i = clickedIndex + 1; i < allStars.length; i++) {
        allStars.eq(i).removeClass('active');
    }
});
$("#submit_review").click(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    document.getElementById('submit_review').disabled = false;

    var orderid = $("#user_send_review_order_id").val();
    var description = $("#reviews-user textarea").val();

    // Calculate the rating based on selected stars
    var selectedStars = $("#reviews-user .star.active").length;
    var maxStars = $("#reviews-user .star").length;
    var rating = selectedStars / maxStars * 5; // Convert to a 5-star scale
    var documentInput = document.getElementById("user_review_doc_input");

    // Check if all fields are filled
    if (description === "") {
        showMessage("Please write review text");
        document.getElementById('submit_review').disabled = false;
        return;
    }

    // Ensure at least one star is selected
    if (selectedStars === 0) {
        showMessage("Please select at least one star for your rating.");
        document.getElementById('submit_review').disabled = false;
        return;
    }

    // Check if a file is selected
    if (!documentInput.files || !documentInput.files[0]) {
        showMessage("Please select a profile picture.");
        document.getElementById('submit_review').disabled = false;
        return;
    }

    // Check the file size before sending
    var maxSize = 3 * 1024 * 1024; // 5 MB in bytes
    if (documentInput.files[0].size > maxSize) {
        showMessage("File size exceeds the limit of 3 MB.");
        document.getElementById('submit_review').disabled = false;
        return;
    }

    // Construct FormData object to send the file and review data
    var formData = new FormData();
    formData.append("file", documentInput.files[0]);
    formData.append("orderid", orderid);
    formData.append("rating", rating);
    formData.append("description", description);

    // Assuming you have the URL to add reviews with files
    var url = "/add_reviews";

    // Use AJAX to send the POST request with FormData
    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false, // Let jQuery set the correct content type
        processData: false, // Prevent jQuery from processing the data
        success: function(response) {
            showMessage(response.message);
            document.getElementById('submit_review').disabled = false;
            $("#reviews-user").removeClass('model-open');
            removeFile1();
        },
        error: function(error) {
            console.error(error);
            showMessage("An error occurred while submitting the review.");
            document.getElementById('submit_review').disabled = false;
        }
    });
});


// download doc
 $(".update_btn.admin_doc_download, .update_btn.user_download_doc").on('click', function() {
    event.preventDefault(); // Prevent the default form submission behavior
    showMessage("Processing your request")
    var id = this.getAttribute("data-id");
    var documentUrl = "/request_processed/" + id + "/1";
    console.log(documentUrl);
    if (documentUrl){
        showMessage("Request Processed");
        window.open(documentUrl, "_blank");
    }
    else{
        showMessage("File downloading error");
    }
 });

 // view doc
 $(".update_btn.user_view_doc").on('click', function() {
    event.preventDefault(); // Prevent the default form submission behavior
    var id = this.getAttribute("data-id");
    var documentUrl = "/request_processed/" + id + "/0";
    if (documentUrl){
        window.open(documentUrl, "_blank");
    }
    else{
        showMessage("File error");
    }

 });




// ---------------------------------------------------------------------------
// Sign up
$(document).ready(function() {
    $("#sign_up_button").click(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var firstName = $("input[name='first']").val();
        var lastName = $("input[name='last']").val();
        var email = $("input[name='email']").val();
        var phone = $("input[name='phone']").val();
        var password = $("input[name='password']").val();
        var agreedToTerms = $("#scales").prop("checked");

        // Check if all fields are filled
        if (firstName === "" || lastName === "" || email === "" || phone === "" || password === "") {
            showMessage("Please fill out all fields.");
            return;
        }

        var titleRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters, numbers, and spaces
        if ((!titleRegex.test(firstName)) || (!titleRegex.test(lastName))) {
            showMessage("Name should not contain any special characters.");
            return;
        }

        // Check if password length is greater than 3
        if (password.length <= 3) {
            showMessage("Password must be at least 4 characters long.");
            return;
        }

        // Validate email format using a regular expression
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            showMessage("Invalid email format. Please enter a valid email address.");
            return;
        }

        // Check if the phone format is valid
        if (!isValidPhoneNumber(phone)) {
            showMessage("Please enter a valid 10-14 digit phone number.");
            return;
        }

        // Check if user agreed to terms
        if (!agreedToTerms) {
            showMessage("Please agree to the Terms & Conditions.");
            return;
        }

        // Perform AJAX call to register route
        $.ajax({
            url: "/register_user", // Replace with the actual register route URL
            method: "POST",
            data: {
                first: firstName,
                last: lastName,
                email: email,
                phone: phone,
                password: password
            },
            success: function(response) {
                if(response.message === "Welcome to LAMEGO Trading"){
                    // script1.js
                    localStorage.setItem("welcome", "yes");
                    window.location.href = "/";
                }
                else{
                    showMessage(response.message);
                }
            },
            error: function() {
                showMessage("An error occurred while registering.");
            }
        });
    });
});


//-------------------------------------------------------------------------------
// login
$(document).ready(function() {
    $("#login_in_button").on("click", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var email = $("input[name='email']").val();
        var password = $("input[name='password']").val();

        // Check if email and password are not empty
        if (email === "" || password === "") {
            showMessage("Please enter your email and password.");
            return;
        }

        // Perform AJAX call to login_user route
        $.ajax({
            url: "/login_user", // Replace with the actual login_user route URL
            method: "POST",
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                if(response.message === "Welcome to LAMEGO Trading"){
                    // script1.js
                    localStorage.setItem("welcome", "yes");
                    window.location.href = "/";
                }
                else{
                    showMessage(response.message);
                }
            },
            error: function() {
                showMessage("An error occurred while logging in.");
            }
        });
    });
});


 $("#checkout_add_billing").on('click', function() {
    window.location.href = "/move_to_dashboard";
 });
