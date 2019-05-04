<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

//Get route for All Tours
$app->get('/tours','getTours');
function getTours()
{
	try{
		//Get connection
		$dbh=getConnection();
			
		//Now lets craft a SQL select string.
		$sql = "SELECT * from tours";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchALL(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

		//return array of objects in json format
		echo json_encode($row);
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Get route for A Tours
$app->get('/tour/:tour_no','getSingleTour');
function getSingleTour($tour_no)
{
	try{
		//Get connection
		$dbh=getConnection();
			
		//Now lets craft a SQL select string.
		$sql = "SELECT * from tours WHERE tour_no =".$tour_no;

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchALL(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

		//return array of objects in json format
		echo json_encode($row);
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Get route for All Trips
$app->get('/trips','getTrips');
function getTrips()
{
	try{
		//Get connection
		$dbh=getConnection();
			
		//Now lets craft a SQL select string.
		$sql = "SELECT * from trips";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchALL(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

		//return array of objects in json format
		echo json_encode($row);
	}
	catch(PDOException $e){
		$e->getMessage();
	}

}

//Get route for Available Trips For a Tour Number
$app->get('/trips/search/:tour_no','getAvailableTrips');
function getAvailableTrips($tour_no)
{
	try{
		//Get connection
		$dbh=getConnection();
			
		//Now lets craft a SQL select string.
		$sql = "SELECT * from trips Where tour_no =:tour_no AND booked_passengers < max_passengers";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("tour_no",$tour_no);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;
		
		if($row==null)
		{
			echo "No Trips available for that Tour";
		}
		else{
			//return array of objects in json format
			echo json_encode($row);
		}
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Get route all trips for a customer
$app->get('/trips/:id','getCustomerTrips');
function getCustomerTrips($id)
{
	try{
		//Get connection
		$dbh=getConnection();
			
		//Now lets craft a SQL select string.
		$sql = "SELECT trips.trip_id, trips.tour_no, trips.rego_no, trips.departure_date, trips.booked_passengers, trips.max_passengers,trips.standard_amount,trips.concession_amount FROM trips, customer_bookings, trip_bookings, customers WHERE customers.customer_id = customer_bookings.customer_id AND customer_bookings.trip_booking_no = trip_bookings.trip_booking_no AND trip_bookings.trip_id = trips.trip_id AND customers.customer_id = '".$id."'";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchALL(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

		//return array of objects in json format
		echo json_encode($row);
	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Post route - Register Customer
$app->post('/customer/addCustomer','addCustomer');
function addCustomer(){
	try{
			
	//Get database connection
	$dbh=getConnection();
	
	//Use slim to get the contents of the HTTP Post request
	$request = \Slim\Slim::getInstance()->request();
	
	//The request is in JSON format so we need to decode it
	$q = json_decode($request->getBody());
	
	$hash = md5($q->password);

	//Now lets craft a SQL select string.
	$sql = "INSERT INTO customers(first_name, middle_initial, last_name, street_no, street_name, suburb, postcode, email, phone, enabled, akey,created_at,updated_at) values (:first_name,:middle_initial,:last_name,:street_no,:street_name,:suburb,:postcode,:email,:phone,:enabled,:akey,NULL,NULL)";
	
	//Make sql string into an SQL statement and execute the statement
	$stmt=$dbh->prepare($sql);
	$stmt->bindParam("first_name",$q->first_name);
	$stmt->bindParam("middle_initial",$q->middle_initial);
	$stmt->bindParam("last_name",$q->last_name);
	$stmt->bindParam("street_no",$q->street_no);
	$stmt->bindParam("street_name",$q->street_name);
	$stmt->bindParam("suburb",$q->suburb);
	$stmt->bindParam("postcode",$q->postcode);
	$stmt->bindParam("email",$q->email);
	$stmt->bindParam("phone",$q->phone);
	$stmt->bindParam("enabled",$q->enabled);
	$stmt->bindParam("akey",$hash);
		
	$stmt->execute();

	$row=$stmt->fetch(PDO::FETCH_OBJ);
	
	$Customer_Id=getCustomerId($q->email,$hash);
	
	//IMPORTANT to close connection after you have finished with it
	$dbh=null;	
	
	echo '{"Akey":"'.$hash.'","Email":"'.$q->email.'","Customer_Id":"'.$Customer_Id.'"}';

			
	}
	catch(PDOException $e){
		$e->getMesage();
	}
}

//Get Customer details
$app->post('/customer/getDetails','getDetails');
function getDetails()
{
	try{
		//Get connection
		$dbh=getConnection();
		
		//Use slim to get the contents of the HTTP Post request
		$request = \Slim\Slim::getInstance()->request();
	
		//The request is in JSON format so we need to decode it
		$q = json_decode($request->getBody());
			
		//Now lets craft a SQL select string.
		$sql = "SELECT * from customers Where email =:email AND akey=:akey";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("email",$q->email);
		$stmt->bindParam("akey",$q->akey);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);

		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;
			
		echo json_encode($row);	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Put route - Manage customer details
$app->put('/customer/updateCustomer','updateCustomer');
function updateCustomer(){
	try{
		//Get database connection
		$dbh=getConnection();
		
		//Use slim to get the contents of the HTTP Post request
		$request = \Slim\Slim::getInstance()->request();
		
		//The request is in JSON format so we need to decode it
		$q = json_decode($request->getBody());
		
		//Create SQL UPDATE STRING
		$sql = "UPDATE customers set first_name=:first_name,middle_initial=:middle_initial,last_name=:last_name,street_no=:street_no,street_name=:street_name,suburb=:suburb,postcode=:postcode,email=:email,phone=:phone Where akey=:akey AND customer_id=:customer_id";
				
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("customer_id",$q->customer_id);
		$stmt->bindParam("akey",$q->akey);
		$stmt->bindParam("first_name",$q->first_name);
		$stmt->bindParam("middle_initial",$q->middle_initial);
		$stmt->bindParam("last_name",$q->last_name);
		$stmt->bindParam("street_no",$q->street_no);
		$stmt->bindParam("street_name",$q->street_name);
		$stmt->bindParam("suburb",$q->suburb);
		$stmt->bindParam("postcode",$q->postcode);
		$stmt->bindParam("email",$q->email);
		$stmt->bindParam("phone",$q->phone);
		$stmt->execute();
		
		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);
				
		//IMPORTANT to close connection after you have finished with it
		$dbh=null;	
		
		//echo '{"Test":"Test"}';
		
		echo json_encode($row);
		
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Put route - Update customer password
$app->put('/customer/updatePassword','updatePassword');
function updatePassword(){
	try{
		//Get database connection
		$dbh=getConnection();
		
		//Use slim to get the contents of the HTTP Post request
		$request = \Slim\Slim::getInstance()->request();
		
		//The request is in JSON format so we need to decode it
		$q = json_decode($request->getBody());
		
		$hash = md5($q->password);
						
		//Now lets craft a SQL select string.
		$sql = "SELECT * from customers Where email =:email AND akey=:akey";

		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("email",$q->email);
		$stmt->bindParam("akey",$hash);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);
			
		if($row){
			//Now lets craft a SQL select string.
			$sql = "Update customers set akey=:akey Where email=:email" ;
			$hash=md5($q->newPassword);
			$stmt=$dbh->prepare($sql);
			$stmt->bindParam("email",$q->email);
			$stmt->bindParam("akey",$hash);
			$stmt->execute();	
			
			echo '{"Akey":"'.$hash.'","Status":"Password Update Successfully!"}';
			
		}	
		else{
			echo '{"Status":"Old Password Does Not Match, Please Try Again!","Akey":"false"}';
		}
		
		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;
		
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Post Route -Book a Trip
$app->post('/customer/addBooking','addBooking');
function addBooking(){
	try{
		//Get database connection
		$dbh=getConnection();
		
		//Use slim to get the contents of the HTTP Post request
		$request = \Slim\Slim::getInstance()->request();
		
		//The request is in JSON format so we need to decode it
		$q = json_decode($request->getBody());
			
		//Get the trip id to check the trip booking number
		$trip_booking_no=getTripBookingNo($q->trip_id);
				
		//Now lets craft a SQL select string.
		$sql = "INSERT INTO customer_bookings(trip_booking_no,customer_id,num_concessions,num_adults,created_at,updated_at) values (:trip_booking_no,:customer_id,:num_concessions,:num_adults,null,null)";
				
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("trip_booking_no",$trip_booking_no);
		$stmt->bindParam("customer_id",$q->customer_id);
		$stmt->bindParam("num_concessions",$q->num_concessions);
		$stmt->bindParam("num_adults",$q->num_adults);
		$booked = $q->num_concessions + $q->num_adults;

		$stmt->execute();
	
		//Function to update passengers on a Trip
		updateBooked($booked,$q->trip_id);
		//IMPORTANT to close connection after you have finished with it
		$dbh=null;	
		
		echo '{"Status":"Booking Added Sucessfully!"}';		
		
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}


//View Tour itinerary
//Get route - Tour Itinerary
$app->get('/tour/itinerary/:tour_no','getTourItinerary');
function getTourItinerary($tour_no)
{
	//Get connection
	$dbh=getConnection();
		
	//Now lets craft a SQL select string.
	$sql = "SELECT * from itineraries where tour_no = ".$tour_no;

	//Make sql string into an SQL statement and execute the statement
	$stmt=$dbh->prepare($sql);
	$stmt->execute();

	//fetch record and place in array of objects
	$row=$stmt->fetchALL(PDO::FETCH_OBJ);

	//IMPORTANT to close connection after you have finished with it.
	//There could be hundreds of clients connecting to your site.
	//If you dont close connections to database this could
	//slow your system greatly
	$dbh=null;

	//return array of objects in json format
	echo json_encode($row);
	
	try{
		
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Post - Route Review Trip
$app->post('/customer/addReview','addReview');
function addReview(){
	try{
		//Get database connection
		$dbh=getConnection();
		
		//Use slim to get the contents of the HTTP Post request
		$request = \Slim\Slim::getInstance()->request();
		
		//The request is in JSON format so we need to decode it
		$q = json_decode($request->getBody());
		
		$tour_no=getTourNo($q->trip_id);
		
		//Now lets craft a SQL select string.
		$sql = "INSERT INTO customer_reviews(trip_id,tour_no,customer_id,rating,general_feedback,likes,dislikes) values (:trip_id,:tour_no,:customer_id,:rating,:general_feedback,:likes,:dislikes)";
				
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->bindParam("trip_id",$q->trip_id);
		$stmt->bindParam("tour_no",$tour_no);
		$stmt->bindParam("customer_id",$q->customer_id);
		$stmt->bindParam("rating",$q->rating);
		$stmt->bindParam("general_feedback",$q->general_feedback);
		$stmt->bindParam("likes",$q->likes);
		$stmt->bindParam("dislikes",$q->dislikes);
		$stmt->execute();
		
		$row=$stmt->fetch(PDO::FETCH_OBJ);
		
		//IMPORTANT to close connection after you have finished with it
		$dbh=null;	

		echo '{"Status":"Review Added Sucessfully!"}';	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Function to get a customer id to be returned and saved in local storage
function getCustomerId($email,$akey)
{
	//echo $akey; die;
	try{
		//Get connection
		$dbh=getConnection();
		//Now lets craft a SQL select string.
		$sql = "SELECT * from customers Where email ='".$email."' AND akey='".$akey."'";
		//echo $sql; die;
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);
		
		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

		return $row[0]->customer_id;;	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Function to get the trip booking number linked to trip table
function getTripBookingNo($trip_id){
	try{
		//Get connection
		$dbh=getConnection();
		//Now lets craft a SQL select string.
		$sql = "SELECT * from trip_bookings Where trip_id ='".$trip_id."'";
		//echo $sql; die;
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);
	
		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;
	
		return $row[0]->trip_booking_no;	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Function to update the amount of passengers booked on a trip
function updateBooked($booked_passengers,$trip_id){
	
	try{
		//Get connection
		$dbh=getConnection();
		//Now lets craft a SQL select string.
		$sql = "UPDATE trips set booked_passengers=booked_passengers+".$booked_passengers." WHERE trip_id='".$trip_id."'";
		
		//echo $sql; die;
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();
		
		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;

	}
	catch(PDOException $e){
		$e->getMessage();
	}
}

//Function to get the tour no for a trip
function getTourNo($trip_id){
	try{
		//Get connection
		$dbh=getConnection();
		//Now lets craft a SQL select string.
		$sql = "SELECT * from trips Where trip_id ='".$trip_id."'";
		//echo $sql; die;
		//Make sql string into an SQL statement and execute the statement
		$stmt=$dbh->prepare($sql);
		$stmt->execute();

		//fetch record and place in array of objects
		$row=$stmt->fetchAll(PDO::FETCH_OBJ);
	
		//IMPORTANT to close connection after you have finished with it.
		//There could be hundreds of clients connecting to your site.
		//If you dont close connections to database this could
		//slow your system greatly
		$dbh=null;
	
		return $row[0]->tour_no;	
	}
	catch(PDOException $e){
		$e->getMessage();
	}
}


//GET route
$app->get('/',function(){
	$template= <<<EOT
	<!DOCTYPE html>
	<html><head>
	<title>404 Page Not Found</title>
	<body><h1>404 Page Not Found</h1>
	<p>The page you are looking for could not be found. Dave M</p>
	</body></html>
EOT;
	echo $template;
});

function getConnection()
{
	$dbh = null;
	try{
		//First we need to get a connection object to the database
		$hostname = 'sql12.freemysqlhosting.net';
		$username = 'sql12177914';
		$password = 'cVvyy22ivF';
		$dbname = 'sql12177914';
		$dbh = new PDO("mysql:host=$hostname;dbname=$dbname",$username,$password);
	}	
	catch(PDOException $e)
	{
		echo $e->getMessage();
	}
	
	return $dbh;
}

$app->run();

?>