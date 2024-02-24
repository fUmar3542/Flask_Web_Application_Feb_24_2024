 $(".update_btn.update_shipping").on('click', function() {
    var id = this.getAttribute("data-id");
    console.log(id)
    $.ajax({
        url: "/get_shipping/" + id
    }).done(function(arr) {
        document.getElementById("update_shipping_id").value = arr[0];
        document.getElementById("update_shipping_type").value = arr[1];
        document.getElementById("update_shipping_price").value = arr[2];
        $("#mange-shipping").addClass('model-open');
    });
  });
 $(".close-btn, .bg-overlay").click(function(){
    $("#mange-shipping").removeClass('model-open');
 });

 // Close Shipping Modal
    function closeShippingModal() {
        $("#mange-shipping").removeClass("open");
        // Clear inputs in the modal
        $("#update_shipping_id").val("");
        $("#update_shipping_type").val("");
        $("#update_shipping_price").val("");
    }


// Function to Update Shipping
    function updateShipping(shippingId, shippingPrice) {
        $.ajax({
            type: "POST",
            url: "/update_shipping", // Replace with the actual route URL
            data: {
                id: shippingId,
                price: shippingPrice
            },
            success: function(response) {
                // Update table and close modal
                $("#shipping_row_" + shippingId + " td:eq(2)").text("$" + shippingPrice.toFixed(2));
                closeShippingModal();
                showMessage("Shipping info updated successfully")
            },
            error: function(error) {
                showMessage("Error updating shipping:", error);
            }
        });
    }

 // Update Shipping Button in Modal Click
    $(document).on("click", "#admin_update_shipping", function() {
        var shippingId = $("#update_shipping_id").val();
        var newPrice = $("#update_shipping_price").val();

        if (!isNaN(newPrice)) {
            updateShipping(shippingId, parseFloat(newPrice));
        } else {
            showMessage("Invalid input. Please enter a valid number.");
        }
    });
