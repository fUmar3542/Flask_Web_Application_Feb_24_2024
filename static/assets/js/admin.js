////////////////////////////////////////////////////////////////////////////////////////////////////////
// Search HR
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search_hr");
    const tableRows = document.querySelectorAll(".table tbody tr");

    searchInput.addEventListener("input", function() {
        const searchText = searchInput.value.toLowerCase();
        tableRows.forEach(function(row) {
            const rowData = row.textContent.toLowerCase();
            if (rowData.includes(searchText)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////
// mange hr
$(".update_btn.delete_btn.delete_hr").on('click', function() {
    var result; // Declare result in a global scope
    var id = this.getAttribute("data-id");
    async function exampleUsage() {
        result = await customConfirm("Are you sure you want to delete the manager?");
        // This code should be placed inside the async function
        if (result !== undefined && result === true) {
            $.ajax({
                url: "/delete_hr/" + id
            }).done(function (message) {
                if (message === "Manager Deleted Successfully") {
                    var rowToRemove = $("#hr_row_" + id); // Target the row using the ID
                    console.log(rowToRemove)
                    if (rowToRemove.length > 0) {
                        rowToRemove.remove(); // Remove the row from the table
                    }
                }
                showMessage(message);
            });
        }
    }

    exampleUsage();

});

$(".update_btn.update_hr").on('click', function() {
    var id = this.getAttribute("data-id");
    console.log(id)
    $.ajax({
        url: "/get_hr/" + id
    }).done(function(arr) {
        document.getElementById("update-hr-id").value = arr[0]
        document.getElementById("update-hr-name").value = arr[1];
        document.getElementById("update-hr-email").value = arr[2];
        document.getElementById("update-hr-password").value = arr[3];
        $("#update-hr").addClass('model-open');
    });
});
$(".close-btn, .bg-overlay").click(function(){
    $("#update-hr").removeClass('model-open');
});
// update manager
$(document).ready(function() {
    // Attach a submit event handler to the form
    $("#admin_update_manager").click(function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get the form input values
        var email = $("#update-hr-email").val();
        var name = $("#update-hr-name").val();
        var password = $("#update-hr-password").val();
        var id = $("#update-hr-id").val()

        if (name === "" || password === "") {
            showMessage("Please fill out all fields.");
            return;
        }

        var titleRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters, numbers, and spaces
        if (!titleRegex.test(name)) {
            showMessage("Name should not contain special characters.");
            return;
        }

        // Create a FormData object to store form data
        var formData = new FormData();
        formData.append("email", email);
        formData.append("name", name);
        formData.append("password", password);

        // Send the form data using an AJAX request
        $.ajax({
            url: "/update_manager", // Replace with your route URL
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Handle the success response here
                showMessage(response.message);

                if(response.message === "Manager updated successfully!!!"){

                    // Update the table row content
                    var rowToUpdate = $("#hr_row_" + id); // Assuming the response includes the updated manager's ID
                    if (rowToUpdate.length > 0) {
                        rowToUpdate.find("td:eq(1)").text(name);
                        rowToUpdate.find("td:eq(2)").text(email);
                        rowToUpdate.find("td:eq(3)").text(password);
                    }
                    $("#update-hr").removeClass('model-open');
                }
            },
            error: function(error) {
                // Handle the error response here
                showMessage("Update error:", error);
            }
        });
    });
});

// create manager
$("#create_hr").on('click', function() {
    document.getElementById("admin_create_hr_name1").value = "";
    document.getElementById("admin_create_hr_name2").value = "";
    document.getElementById("admin_create_hr_age").value = "";
    document.getElementById("admin_create_hr_country").value = "";
    $("#mange-hr").addClass('model-open');
});
$(".close-btn, .bg-overlay").click(function(){
    $("#mange-hr").removeClass('model-open');
});

$(document).ready(function() {
    $("#admin_add_manager_button").on("click", function(event) {
        event.preventDefault();

        // Get form values
        var name1 = $("input[name='name1']").val();
        var name2 = $("input[name='name2']").val();
        var age = $("input[name='age']").val();
        var country = $("input[name='country']").val();

        if (name1 === "" || name2 === "" || age === "" || country === "") {
            showMessage("Please fill out all fields.");
            return;
        }
        var titleRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters, numbers, and spaces
        if (!titleRegex.test(name1 + name2 + country)) {
            showMessage("Name or country should not contain special characters.");
            return;
        }

        // Send data to the server using AJAX
        $.ajax({
            url: "/add_manager", // Replace with your actual route URL
            method: "POST",
            data: {
                name1: name1,
                name2: name2,
                age: age,
                country: country
            },
            success: function(response) {
                showMessage(response.message)
                if(response.message === "Customer added successfully"){
                    // Assuming the response is a JSON object containing the new manager's data
                    var newRow = "<tr id='hr_row_" + response.id + "'>" +
                                 "<td>#CR" + response.id + "</td>" +
                                 "<td>" + name1 + "</td>" +
                                 "<td>" + name2 + "</td>" +
                                 "<td>" + age + "</td>" +
                                 "<td>" + country + "</td>" +
                                 "<td><button class='update_btn update_hr' data-id='" + response.id + "'>Update</button></td>" +
                                 "<td><button class='update_btn delete_btn delete_hr' data-id='" + response.id + "'>Delete</button></td>" +
                                 "</tr>";

                    // Append the new row to the table
                    $("#hr_table").append(newRow);

                    $(".update_btn.delete_btn.delete_hr").on('click', function() {
                        var result; // Declare result in a global scope
                        var id = this.getAttribute("data-id");
                        async function exampleUsage() {
                            result = await customConfirm("Are you sure you want to delete the manager?");
                            // This code should be placed inside the async function
                            if (result !== undefined && result === true) {
                                $.ajax({
                                    url: "/delete_hr/" + id
                                }).done(function (message) {
                                    if (message === "Customer Deleted Successfully") {
                                        var rowToRemove = $("#hr_row_" + id); // Target the row using the ID
                                        console.log(rowToRemove)
                                        if (rowToRemove.length > 0) {
                                            rowToRemove.remove(); // Remove the row from the table
                                        }
                                    }
                                    showMessage(message);
                                });
                            }
                        }
                        exampleUsage();
                    });

                    $(".update_btn.update_hr").on('click', function() {
                        var id = this.getAttribute("data-id");
                        console.log(id)
                        $.ajax({
                            url: "/get_hr/" + id
                        }).done(function(arr) {
                            document.getElementById("update-hr-id").value = arr[0]
                            document.getElementById("update-hr-name").value = arr[1];
                            document.getElementById("update-hr-email").value = arr[2];
                            document.getElementById("update-hr-password").value = arr[3];
                            $("#update-hr").addClass('model-open');
                        });
                    });
                    $(".close-btn, .bg-overlay").click(function(){
                        $("#update-hr").removeClass('model-open');
                    });
                    // Close the modal
                    $("#mange-hr").removeClass('model-open');
                }
            },
            error: function(error) {
                showMessage("Error:" + error);
            }
        });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

