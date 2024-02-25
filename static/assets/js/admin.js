////////////////////////////////////////////////////////////////////////////////////////////////////////
// Search Customer
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search_hr");       // get search keyword
    const tableRows = document.querySelectorAll(".table tbody tr"); // get table data

    searchInput.addEventListener("input", function() {              // search keyword in table and display info
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
$("#nav-home-tab").click();     // Show customer details
////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to show message
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

// Create, Update, Delete Customer
////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete customer
$(".update_btn.delete_btn.delete_hr").on('click', function() {
    var result; // Declare result in a global scope
    var id = this.getAttribute("data-id");
    async function exampleUsage() {
        result = await customConfirm("Are you sure you want to delete the manager?");
        // This code should be placed inside the async function
        if (result !== undefined && result === true) {
            $.ajax({
                url: "/delete_hr/" + id
            }).done(function (response) {
                if (response.message === "Customer Deleted Successfully") {
                    var rowToRemove = $("#hr_row_" + id); // Target the row using the ID
                    console.log(rowToRemove)
                    if (rowToRemove.length > 0) {
                        rowToRemove.remove(); // Remove the row from the table
                    }
                }
                showMessage(response.message);
            });
        }
    }
    exampleUsage();

});


$(".update_btn.update_hr").on('click', function() {
    var id = this.getAttribute("data-id");
    console.log(id)
    $.ajax({
        url: "/get_customer/" + id
    }).done(function(arr) {
        document.getElementById("update-hr-id").value = arr.Customer_ID
        document.getElementById("update-hr-name1").value = arr.Customer_First_Name;
        document.getElementById("update-hr-name2").value = arr.Customer_Last_Name;
        document.getElementById("update-hr-age").value = arr.Age;
        document.getElementById("update-hr-country").value = arr.Country;
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
        var name1 = $("#update-hr-name1").val();
        var name2 = $("#update-hr-name2").val();
        var age = $("#update-hr-age").val();
        var country = $("#update-hr-country").val();
        var id = $("#update-hr-id").val()

        if (name1 === "" || age === "" || name2 === "" || country === "") {
            showMessage("Please fill out all fields.");
            return;
        }

        var titleRegex = /^[a-zA-Z0-9\s]+$/; // Only allow letters, numbers, and spaces
        if (!titleRegex.test(name1 + name2 + country)) {
            showMessage("Name and country should not contain special characters.");
            return;
        }

        let regex = /^[0-9]+$/;
        if (!regex.test(age)) {
            showMessage("Age should be a number");
            return;
        }

        // Create a FormData object to store form data
        var formData = new FormData();
        formData.append("name1", name1);
        formData.append("name2", name2);
        formData.append("age", age);
        formData.append("country", country);

        // Send the form data using an AJAX request
        $.ajax({
            url: "/update_customer/"  + id, // Replace with your route URL
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Handle the success response here
                showMessage(response.message);

                if(response.message === "Customer updated successfully!!!"){

                    // Update the table row content
                    var rowToUpdate = $("#hr_row_" + id); // Assuming the response includes the updated manager's ID
                    if (rowToUpdate.length > 0) {
                        rowToUpdate.find("td:eq(1)").text(name1);
                        rowToUpdate.find("td:eq(2)").text(name2);
                        rowToUpdate.find("td:eq(3)").text(age);
                        rowToUpdate.find("td:eq(4)").text(country);
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

// create manager form
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

        let regex = /^[0-9]+$/;
        if (!regex.test(age)) {
            showMessage("Age should be a number");
            return;
        }

        // Send data to the server using AJAX
        $.ajax({
            url: "/add_customer", // Replace with your actual route URL
            method: "POST",
            data: {
                name1: name1,
                name2: name2,
                age: age,
                country: country
            },
            success: function(response) {
                showMessage(response.message)
                if(response.message === "Customer created successfully"){
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
                                }).done(function (response) {
                                    if (response.message === "Customer Deleted Successfully") {
                                        var rowToRemove = $("#hr_row_" + id); // Target the row using the ID
                                        console.log(rowToRemove)
                                        if (rowToRemove.length > 0) {
                                            rowToRemove.remove(); // Remove the row from the table
                                        }
                                    }
                                    showMessage(response.message);
                                });
                            }
                        }
                        exampleUsage();

                    });

                    $(".update_btn.update_hr").on('click', function() {
                        var id = this.getAttribute("data-id");
                        console.log(id)
                        $.ajax({
                            url: "/get_customer/" + id
                        }).done(function(arr) {
                            document.getElementById("update-hr-id").value = arr.Customer_ID
                            document.getElementById("update-hr-name1").value = arr.Customer_First_Name;
                            document.getElementById("update-hr-name2").value = arr.Customer_Last_Name;
                            document.getElementById("update-hr-age").value = arr.Age;
                            document.getElementById("update-hr-country").value = arr.Country;
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

