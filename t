<div class="tab-pane position-relative fade" id="nav-order" role="tabpanel" aria-labelledby="nav-order-tab">
					<table class="table">
						<thead>
							<tr>
								<th scope="col">
									 Order No.</th>
								<th scope="col">User ID</th>
                                <th scope="col">Total</th>
								<th scope="col">Pending</th>
                                <th scope="col">Status</th>
                                <th scope="col">Send Doc</th>
                                <th scope="col">Notify</th>
								<th scope="col">Update</th>
								<th scope="col">Delete</th>
								<th scope="col">Date</th>
							</tr>
						</thead>
						<tbody>
							{% for x in data['all_orders'] %}
								<tr id="order_row_{{x.id}}">
									<td scope="row">
										 #CR0{{x.id}}</td>
									<td>{{x.Users.username}}</td>
									<td scope="col">${{x.total}}</td>
									<td scope="col">${{x.pending_amount}}</td>
									<td scope="col">{{x.status}}</td>
									<td><button class="update_btn send_doc" data-id="{{x.id}}">Send DOC</button></td>
									<td><button class="update_btn notify_btn notify_order" data-id="{{x.id}}">Notify</button></td>
									<td><button class="update_btn update_order" data-id="{{x.id}}">Update</button></td>
									<td><button class="update_btn delete_btn delete_order" data-id="{{x.id}}">Delete</button></td>
									<td>{{x.created_date}}</td>
								</tr>
							{% endfor %}
						</tbody>
					</table>
					<div class="search-table search-table-green">
						<div class="search-table-wrap">
							<div class="search-input">
								<input type="search" name="search" id="search_order" placeholder="Search Order...">
								<img src="static/assets/images/search-icon.svg" alt="">
							</div>
							<a class="search-button search-button-green" id="generate_report" href="#">Generate Report</a>
						</div>
					</div>
					<div class="custom-model-main" id="manage-order">
                        <div class="custom-model-inner">
                            <div class="close-btn"><img class="arrow" src="static/assets/images/cross.svg" alt=""></div>
                            <div class="custom-model-wrap manege-model">
                                <div class="pop-up-content-wrap">
									<form class="login-form order-input">
										<div class="form-image">
										   <img src="static/assets/images/favicon 1.svg" alt="">
										</div>
										<div class="input-fields">
											<input type="text" class="login-inputs package" placeholder="Package ID" name="package_id" id="update_order_package_id" hidden>
											<input type="text" class="login-inputs package" placeholder="User ID" name="user_hidden_id" id="update_order_user_hidden_id" hidden>
											<div class="rap">
												<h5>Order ID</h5>
												<input type="text" class="login-inputs package" placeholder="ORDER ID" name="id" id="update_order_id" readonly maxlength="50" style="background-color: #f0f0f0;">
											</div>
											<div class="rap">
												<h5>User ID</h5>
												<input type="text" class="login-inputs package" placeholder="USER ID" name="userid" readonly maxlength="50" id="update_order_user_id" style="background-color: #f0f0f0;">
											</div>
											<div class="rap">
												<h5>Paid Amount</h5>
												<input type="text" class="login-inputs package" placeholder="Paid amount" name="paid_amount" readonly maxlength="8" id="update_order_paid_amount" style="background-color: #f0f0f0;">
											</div>
											<div class="checkbox-package">
												<h5>Services</h5>
												<div class="check-wrap">
													{% for x in all_services %}
														<div class="form-group">
															<input type="checkbox" class="obox" name="{{x.id}}" id="orc{{x.id}}">
															<label for="orc{{x.id}}">{{x.name}}</label>
														</div>
													{% endfor %}
												</div>
											</div>
											<div class="checkbox-package">
												<h5>Shipping</h5>
												<div class="check-wrap">
												  {% for x in data["all_shippings"] %}
													<div class="form-group">
													  <input type="radio" class="sbox" name="selected_package" id="src{{x.id}}" value="{{x.id}}">
													  <label for="src{{x.id}}">{{x.type}}</label>
													</div>
												  {% endfor %}
												</div>
											</div>
											<div class="rap">
												<h5>Shipping Total</h5>
												<input type="text" class="login-inputs" placeholder="Shipping Total" name="shipping_total" id="update_order_shipping_price" maxlength="8" required>
											</div>
											<div class="checkbox-package">
												<h5>Status</h5>
												<div class="check-wrap">
													<div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status1" value="Processing">
													  <label for="status1">Processing</label>
													</div>
													<div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status2" value="Completed">
													  <label for="status2">Completed</label>
													</div><div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status3" value="Await Feedback">
													  <label for="status3">Await Feedback</label>
													</div><div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status4" value="Await Approval">
													  <label for="status4">Await Approval</label>
													</div><div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status5" value="Gather Data">
													  <label for="status5">Gather Data</label>
													</div><div class="form-group">
													  <input type="radio" class="status_boxes" name="selected_status" id="status6" value="Need Details">
													  <label for="status6">Need Details</label>
													</div>
												</div>
											</div>
											<div class="rap">
												<h5>Reason of additional charges</h5>
												<input type="text" class="login-inputs" placeholder="Reason" name="reason" id="update_order_reason" maxlength="50">
											</div>
											<div class="rap">
												<h5>Order Total</h5>
												<input type="text" class="login-inputs" placeholder="Order Total" name="total" id="update_order_price" maxlength="8" required>
											</div>
											<button type="submit" id="admin_update_order_button">Update Order</button>
										</div>
									</form>
                                </div>
                            </div>
                        </div>
                        <div class="bg-overlay"></div>
                    </div>
					<div class="custom-model-main" id="notify">
                        <div class="custom-model-inner">
                            <div class="close-btn"><img class="arrow" src="static/assets/images/cross.svg" alt=""></div>
                            <div class="custom-model-wrap manege-model">
                                <div class="pop-up-content-wrap">
									<form action="submit" class="login-form">
										<div class="form-image">
										   <h3>Send Notification</h3>
										</div>
										<div class="input-fields">
											<input type="text" class="login-inputs package" placeholder="ORDER ID" name="orderid" id="notify_order_id" hidden maxlength="50">
											<input type="text" class="login-inputs package" placeholder="USER ID" name="userid" id="notify_user_id" hidden maxlength="50">
											<textarea class="login-inputs login-package login-textarea" placeholder="Message" id="notify_message" maxlength="90" required></textarea>
											<button type="submit" id="submit_notification" class="google-btn">SEND Notification</button>
										</div>
									</form>
                                </div>
                            </div>
                        </div>
                        <div class="bg-overlay"></div>
                    </div>
					<div class="custom-model-main" id="document">
						<div class="custom-model-inner">
							<div class="close-btn"><img class="arrow" src="static/assets/images/cross.svg" alt=""></div>
							<div class="custom-model-wrap manege-model">
								<div class="pop-up-content-wrap">
									<form id="document_form" enctype="multipart/form-data" class="login-form">
										<div class="form-image">
											<h3>Send Document</h3>
										</div>
										<div class="input-fields">
											<div class="upload-btn-wrapper-pic">
												<input type="text" class="login-inputs" placeholder="Title" id="send_doc_user_title" maxlength="45" required>
												<input type="text" class="login-inputs package" placeholder="ORDER ID" name="orderid" id="send_doc_order_id" hidden maxlength="50">
												<input type="text" class="login-inputs package" placeholder="USER ID" name="userid" id="send_doc_user_id" hidden maxlength="50">
                                        		<div class="upload-btn-wrapper-pic">
													<button class="btn" id="upload_button">Upload Document of size less than 5MB</button>
													<input type="file" name="document" id="document_input" accept=".pdf" />
												</div>
												<div id="file-info" style="display: none;">
													<span id="file-name"></span>
													<span id="remove-file" onclick="removeFile()">&#10006;</span>
												</div>
											</div>
											<button type="submit" class="google-btn" id="send_document_button">Send Document</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="bg-overlay"></div>
					</div>
				</div>












# CRUD operations for Order
@app.route('/order', methods=['POST'])
def create_order():
    """
    Endpoint to create a new order.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO Order_DB (Date, Customer_ID, Price, Chair, Stool, 'Table', Cabinet, Dresser, Couch, Bed, Shelf) "
                   "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                   (data['Date'], data['Customer_ID'], data['Price'], data['Chair'], data['Stool'], data['Table'], data['Cabinet'],
                    data['Dresser'], data['Couch'], data['Bed'], data['Shelf']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order created successfully'}), 201


@app.route('/order/<int:id>', methods=['GET'])
def get_order(id):
    """
    Endpoint to retrieve a specific order by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Order_DB WHERE Order_ID=?", (id,))
    order = cursor.fetchone()
    conn.close()
    if order:
        return jsonify(dict(order)), 200
    else:
        return jsonify({'error': 'Order not found'}), 404


@app.route('/order/<int:id>', methods=['PUT'])
def update_order(id):
    """
    Endpoint to update an order's information.
    """
    conn = get_db_connection()
    data = request.get_json()
    cursor = conn.cursor()
    cursor.execute("UPDATE Order_DB SET Date=?, Customer_ID=?, Price=?, Chair=?, Stool=?, 'Table'=?, Cabinet=?, Dresser=?, Couch=?, Bed=?, Shelf=? "
                   "WHERE Order_ID=?",
                   (data['Date'], data['Customer_ID'], data['Price'], data['Chair'], data['Stool'], data['Table'], data['Cabinet'],
                    data['Dresser'], data['Couch'], data['Bed'], data['Shelf'], id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order updated successfully'}), 200


@app.route('/order/<int:id>', methods=['DELETE'])
def delete_order(id):
    """
    Endpoint to delete an order by ID.
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM Order_DB WHERE Order_ID=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Order deleted successfully'}), 200
