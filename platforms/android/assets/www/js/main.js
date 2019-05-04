/*
 Creator:David Mackenzie
 Creation Date: 19/05/2017
 Current Version: 10
 Current Revision: 2
 Last Modified: 08/05/2017
 Last Modified by: David Mackenzie
*/

/////////////////////////////////////////Variable Declaration
var pageinited = false;

//10.0.0.2 is Localhost of Application running in Emulator
var rootURL="https://phoenix-travel-slimv2.herokuapp.com/index.php";

/////////////////////////////////////////jquery On Document Ready
$(function(){
        // Billk added code
        if(pageinited){return;} else{pageinited= true;}
        // end added code

        $("#tourContent").hide();
        $("#itineraryContent").hide();
        $("#tourButtons").hide();
        //alert(localStorage.Email);
        //alert(localStorage.Akey);
        //localStorage navigation
        if(localStorage.Akey == undefined){
            $(":mobile-pagecontainer").pagecontainer("change", "#createAccount");
        }else{
            getCustomerTrips();
            $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
        }

        // Homepage Event Handlers
        $("#homepage").on("pagebeforeshow", function(){
            //alert("help me!!");
            getCustomerTrips();
        }); // end myTrips live beforepageshow

		$("#homepage").on("pagebeforehide", function(){
             //alert("Before hide homepage");
        }); // end homepage live pagebeforehide
        // END myTrips Event Handlers

        // Page 1 Event Handlers
        $("#register").on("pagebeforeshow", function(event){
               //alert("before page1 show");
              //console.log('before page1 show'); // Displayed in Studio console
        });

        $("#register").on("pageshow", function(){
             alert("page1 show");
             //console.log('page1 show'); // Displayed in Studio console
        }); // end  live pageshow

        // Page 2 Show Tours
        $("#page2").on("pagebeforeshow", function(event){
              //alert("before page2 show");

            //Display Tour Content Panel
            $("#tourContent").hide();
            $("#tourButtons").hide();
              getAllTours();
              console.log('before page2 show'); // Displayed in Studio console
        });

        // Page 4 Change Password
        $("#page4").on("pagebeforeshow", function(event){
               //alert("before page1 show");
               $("#txtCurrentPass").val("");
               $("#txtPass1").val("");
               $("#txtPass2").val("");
              //console.log('before page1 show'); // Displayed in Studio console
        });

        // Update Page
        $("#page1").on("pagebeforeshow", function(){
            getUserDetails();
        }); // end myTrips live beforepageshow

         //Create user button event
         $("#btnCreate").on("click",function(){
            // validate user and register if validation ok
            $("#register").validate({
            rules: {
                txtFirst: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtLast: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtStreetNo: {
                    required: true,
                    minlength: 1,
                    maxlength: 10
                },
                txtStreetName: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                txtSuburb: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtPostcode: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                },
                txtEmail: {
                    required: true,
                    email: true,
                    minlength: 5,
                    maxlength: 150
                },
                txtPassword: {
                    required: true,
                    minlength: 8,
                    maxlength: 50
                },
                txtPassword2: {
                        required: true,
                        equalTo: "#txtPassword"
                    }
                },
            messages: {
                txtFirst: {
                    required: "Please enter your first name.",
                    minlength: "First name must be at least 2 charcters",
                    maxlength: "First name cannot be more than 35 characters"
                },
                txtLast: {
                    required: "Please enter your last name.",
                    minlength: "Last name must be at least 2 charcters",
                    maxlength: "Last name cannot be more than 35 characters"
                },
                txtStreetNo: {
                    required: "Please enter your street no.",
                    minlength: "Street no must be at least 1 digit",
                    maxlength: "Street no cannot be more than 10 digits"
                },
                txtStreetName: {
                    required: "Please enter your street name.",
                    minlength: "Street name must be at least 2 characters",
                    maxlength: "Street name cannot be more than 50 characters"
                },
                txtSuburb: {
                    required: "Please enter your suburb.",
                    minlength: "Suburb must be at least 2 characters",
                    maxlength: "Suburb cannot be more than 35 characters"
                },
                txtPostcode: {
                    required: "Please enter your postcode.",
                    minlength: "Postcode must be 4 digits only",
                    maxlength: "Postcode must be 4 digits only"

                },
                txtEmail: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email",
                    minlength: "Email must be at least 5 characters",
                    maxlength: "Email cannot be more than 150 characters"
                },
                txtPassword: {
                    required: "Please enter your password.",
                    minlength: "Password must be at least 8 characters",
                    maxlength: "Password cannot be more than 50 characters"
                },
                txtPassword2: {
                    required: "Please enter your confirm password.",
                    equalTo: "Password does not match"

                },
            },
              submitHandler: function() {
                //Add user to the database
                registerUser();
              }
            });

         });

         //Update user button
         $("#btnUpd").on("click",function(){
            //alert(updateDetails());
            $("#update").validate({
            rules: {
                txtFirstUpd: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtLastUpd: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtStreetNoUpd: {
                    required: true,
                    minlength: 1,
                    maxlength: 10
                },
                txtStreetNameUpd: {
                    required: true,
                    minlength: 2,
                    maxlength: 50
                },
                txtSuburbUpd: {
                    required: true,
                    minlength: 2,
                    maxlength: 35
                },
                txtPostcodeUpd: {
                    required: true,
                    minlength: 4,
                    maxlength: 4
                },
                txtEmailUpd: {
                    required: true,
                    email: true,
                    minlength: 5,
                    maxlength: 150
                }
            },
            messages: {
                txtFirstUpd: {
                    required: "Please enter your first name.",
                    minlength: "First name must be at least 2 charcters",
                    maxlength: "First name cannot be more than 35 characters"
                },
                txtLastUpd: {
                    required: "Please enter your last name.",
                    minlength: "Last name must be at least 2 charcters",
                    maxlength: "Last name cannot be more than 35 characters"
                },
                txtStreetNoUpd: {
                    required: "Please enter your street no.",
                    minlength: "Street no must be at least 1 digit",
                    maxlength: "Street no cannot be more than 10 digits"
                },
                txtStreetNameUpd: {
                    required: "Please enter your street name.",
                    minlength: "Street name must be at least 2 characters",
                    maxlength: "Street name cannot be more than 50 characters"
                },
                txtSuburbUpd: {
                    required: "Please enter your suburb.",
                    minlength: "Suburb must be at least 2 characters",
                    maxlength: "Suburb cannot be more than 35 characters"
                },
                txtPostcodeUpd: {
                    required: "Please enter your postcode.",
                    minlength: "Postcode must be 4 digits only",
                    maxlength: "Postcode must be 4 digits only"

                },
                txtEmailUpd: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email",
                    minlength: "Email must be at least 5 characters",
                    maxlength: "Email cannot be more than 150 characters"
                }
            },
              submitHandler: function() {
                //Update record in the database
                updateUser();
              }
            });
         });

         //Cancel update button event
         $("#btnUpdCancel").on("click",function(){
            $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
         });

         //Update password button event
         $("#btnUpdPass").on("click",function(){
            //alert("button");
    	// validate password before passing to api
            $("#password").validate({
                rules: {
                    txtCurrentPass: {
                        required: true,
                        minlength: 8,
                        maxlength: 50
                    },
                    txtPass1: {
                        required: true,
                        minlength: 8,
                        maxlength: 50
                    },
                    txtPass2: {
                        required: true,
                        equalTo: "#txtPass1"
                    },
                },
                messages: {
                    txtCurrentPass: {
                        required: "Please enter current password",
                        minlength: "Your password must be at least 8 characters long",
                        maxlength: "Your password cannot be more than 50 characters"
                    },
                    txtPass1: {
                        required: "Please provide a new password",
                        minlength: "New password must be at least 8 characters long",
                        maxlength: "New password cannot be more than 50 characters"
                    },
                    txtPass2: {
                        required: "Please provide a confirmation password",
                        equalTo: "Please enter the same password as above"
                    },
                },
                      submitHandler: function() {
                          //Update password in the database
                          updatePassword();
                      }
                });
         });

         //Cancel password update button event
          $("#btnUpdPassCancel").on("click",function(){
             $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
          });

          //Get trips button
          $("#btnGetTrips").on("click",function(){
               //alert($( "#selTour option:selected" ).text());
          });

          //Get itinerary button
          $("#btnGetItinerary").on("click",function(){
            getItineraries();
            $(":mobile-pagecontainer").pagecontainer("change", "#itinerary");
          });

          //Display Tour details on page
          $("#selTour").on("change",function(){
                getSingleTour();
          });

          //Back button for Itinerary Page
          $("#btnItineraryBack").on("click",function(){
            $(":mobile-pagecontainer").pagecontainer("change", "#page2");
          });

          //Get available Trip booking dates
          $("#btnGetTrips").on("click",function(){
            getAvailableTrips();
            $(":mobile-pagecontainer").pagecontainer("change", "#trip");
          });

          //Back button for Trip Booking page
          $("#btnBookBack").on("click",function(){
            $(":mobile-pagecontainer").pagecontainer("change", "#page2");
          });

            //Book trip button
          $("#btnBookTrip").on("click",function(){

            //alert(getBookingDetails());

            //Validate trip booking values before submitting to database
            $("#bookTrip").validate({
                rules: {
                    txtStandard: {
                        required: true,
                        number: true,
                    },
                    txtConcession: {
                        required: true,
                        number: true,
                    },
                },
                messages: {
                    txtStandard: {
                        required: "Please enter a value or 0 for no tickets",
                        number: "Please enter a numeric value for standard ticket"
                    },
                    txtConcession: {
                        required: "Please enter a value or 0 for no tickets",
                        number: "Please enter a numeric value for concession ticket"
                    },
                },
                      submitHandler: function() {
                          //Add booking in the database
                          addBooking();
                         }
                });
          });

            //Review page
          $("#review").on("pagebeforeshow",function(){
            getCustomerReviewTrips();
          });

          //Save review page
          $("#btnSaveReview").on("click",function(){

                addReview();
          });

         //-------------------------------Register User Function------------------------------------
         function registerUser(){
            $.ajax({
                    type: 'POST',
                    contentType:'application/json',
                    url:rootURL + '/customer/addCustomer',
                    dataType:"json",
                    data:formToJSON(),
                })
                .done(function(data){
                    localStorage.Akey=data.Akey;
                    localStorage.Email=data.Email;
                    localStorage.ID=data.Customer_Id;
                    $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
                })
                .always(function(){/*Always execute this code*/})
                .fail(function(data){
                alert("Error");
            });
         }

          //------------------------------Convert Customer details to JSON--------------------------
          function formToJSON(){

             return JSON.stringify({
                 "first_name":$("#txtFirst").val(),
                 "middle_initial":$("#txtInitial").val(),
                 "last_name":$("#txtLast").val(),
                 "street_no":$("#txtStreetNo").val(),
                 "street_name":$("#txtStreetName").val(),
                 "suburb":$("#txtSuburb").val(),
                 "postcode":$("#txtPostcode").val(),
                 "email":$("#txtEmail").val(),
                 "phone":$("#txtPhone").val(),
                 "enabled":"0",
                 "password":$("#txtPassword").val(),

             });
          }

          //----------------------Get current user details from web service-------------------------
          function getUserDetails()
          {
              $.ajax({
                      type: 'POST',
                      contentType:'application/json',
                      url:rootURL + '/customer/getDetails',
                      dataType:"json",
                      data:getDetailsToJSON(),
                  })
                  .done(function(data){
                        displayUser(data);
                  })
                  .always(function(){/*Always execute this code*/})
                  .fail(function(data){
                  alert("Fail");
              });
          }

         //--------------------Email localStorage.Email is passed to Web service-----------------
         function getDetailsToJSON(){
                return JSON.stringify({
                    "email":localStorage.Email,
                    "akey":localStorage.Akey,
               });
          }

          //----------------------Display user account on update form-------------------------------
          function displayUser(data){
                $("#txtFirstUpd").val(data[0].first_name);
                $("#txtInitialUpd").val(data[0].middle_initial);
                $("#txtLastUpd").val(data[0].last_name);
                $("#txtStreetNoUpd").val(data[0].street_no);
                $("#txtStreetNameUpd").val(data[0].street_name);
                $("#txtSuburbUpd").val(data[0].suburb);
                $("#txtPostcodeUpd").val(data[0].postcode);
                $("#txtEmailUpd").val(data[0].email);
                $("#txtPhoneUpd").val(data[0].phone);
          }

          //-----------------------Account update details function----------------------------------
          function updateUser(){
              $.ajax({
                      type: 'PUT',
                      contentType:'application/json',
                      url:rootURL + '/customer/updateCustomer',
                      dataType:"json",
                      data:updateDetails(),

                  })
                  .done(function(data){
                        //alert(data[0].First_Name);
                        $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
                  })
                  .always(function(){/*Always execute this code*/})
                  .fail(function(data){
                  alert("Fail");
              });
          }

         //---------------------------Convert Customer details to JSON------------------------------
         function updateDetails(){

           return JSON.stringify({
               "customer_id":localStorage.ID,
               "first_name":$("#txtFirstUpd").val(),
               "middle_initial":$("#txtInitialUpd").val(),
               "last_name":$("#txtLastUpd").val(),
               "street_no":$("#txtStreetNoUpd").val(),
               "street_name":$("#txtStreetNameUpd").val(),
               "suburb":$("#txtSuburbUpd").val(),
               "postcode":$("#txtPostcodeUpd").val(),
               "email":$("#txtEmailUpd").val(),
               "phone":$("#txtPhoneUpd").val(),
               "akey":localStorage.Akey,
               });
        }


        //-------------------------Function to update password--------------------------------------
        function updatePassword(){
              $.ajax({
                      type: 'PUT',
                      contentType:'application/json',
                      url:rootURL + '/customer/updatePassword',
                      dataType:"json",
                      data:getPassword(),

                  })
                  .done(function(data){
                        alert(data.Status);
                        $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
                        localStorage.Akey=data.Akey;
                  })
                  .always(function(){
                  //Always execute this code
                  })
                  .fail(function(data){
                  alert("Fail");
              });
        }

        //-----------------------Get password values from form--------------------------------------
        function getPassword(){
            return JSON.stringify({
                "email":localStorage.Email,
                "password":$("#txtCurrentPass").val(),
                "newPassword":$("#txtPass1").val(),
            });
        }

        //--------------------------Get all tours and display on Tour page----------------------
        function getAllTours(){
              $.ajax({
                      type: 'GET',
                      contentType:'application/json',
                      url:rootURL + '/tours',
                      dataType:"json",
                  })
                  .done(function(data){
                       //alert(data[0].Tour_Name);
                        displayAllTours(data);
                  })
                  .always(function(){
                  //Always execute this code
                  })
                  .fail(function(data){
                  alert("Fail");
              });
        }

        //-------------------------------Display all tours in a select menu-------------------------
        function displayAllTours(data){
            //Clear select menu first so that it doesn't keep concatening records
            $('#selTour').empty();

            var toAppend = '<option >Select a Tour</option>';
            $.each(data,function(i,item){
            toAppend += "<option value='"+item.tour_no+"' >"+" "
            +item.tour_name+"</option>";

            });

            $('#selTour').append(toAppend).selectmenu("refresh",true);
         }

         //-------------------API to get a single tour and display on the Tour Page-----------------
         function getSingleTour(){
                       $.ajax({
                               type: 'GET',
                               contentType:'application/json',
                               url:rootURL + '/tour/'+$("#selTour").val(),
                               dataType:"json",
                           })
                           .done(function(data){
                                //alert(data[0].Tour_Name);
                                 displaySingleTour(data);
                           })
                           .always(function(){
                           //Always execute this code
                           })
                           .fail(function(data){
                           alert("Fail");
                       });
         }

         function displaySingleTour(data){
            //Clear any previous values
            $("#lblTourName").empty();
            $("#lblTourDescription").empty();
            $("#lblTourDuration").empty();

            //Display Tour Content Panel
            $("#tourContent").show();
            $("#tourButtons").show();

            $("#lblTourName").append("<strong>Tour Name:</strong><br/>"
            +data[0].tour_name);
            $("#lblTourDescription").append("<strong>Tour Description:</strong><br/>"
            +data[0].description);
            $("#lblTourDuration").append("<strong>Tour Duration:</strong><br/>"
            +data[0].duration+"days");
         }

          //------API to get all itineraries for a trip and display on the itineraryPage------------
          function getItineraries(){
                        $.ajax({
                                type: 'GET',
                                contentType:'application/json',
                                url:rootURL + '/tour/itinerary/'+$("#selTour").val(),
                                dataType:"json",
                            })
                            .done(function(data){
                                 //alert(data[0].Tour_Name);
                                  displayItineraries(data);
                            })
                            .always(function(){
                            //Always execute this code
                            })
                            .fail(function(data){
                            alert("Fail");
                        });
          }

          function displayItineraries(data){
             //Clear any previous values
            $('#listItinerary').empty();

            var toAppend = '';
            $.each(data,function(i,item){
            toAppend += "<li><a href='#' class='ui-btn ui-icon-none' >"+" Day "
            +item.day_no + " "+item.activities+"</a></li>";
            });

            $('#listItinerary').append(toAppend);
          }

        //-------------------API to get available trips for the selected Tour-----------------------
         function getAvailableTrips(){
         $.ajax({
                     type: 'GET',
                     contentType:'application/json',
                     url:rootURL + '/trips/search/'+$("#selTour").val(),
                     dataType:"json",
                 })
                 .done(function(data){
                      //alert(data[0].Tour_Name);
                       displayTrips(data);
                 })
                 .always(function(){
                 //Always execute this code
                 })
                 .fail(function(data){
                 alert("Error");
             });
           }

           function displayTrips(data){
            //Clear select menu first so that it doesn't keep concatenating records
            $('#selTrip').empty();

            var toAppend = '<option >Select a Trip</option>';
            $.each(data,function(i,item){
            toAppend += "<option value='"+item.trip_id+"' >"+" "
            +item.departure_date+"</option>";
            });

            $('#selTrip').append(toAppend).selectmenu("refresh",true);
           }

            //-------------------Add customer booking for selected Trip----------------------
           function addBooking(){
            $.ajax({
                     type: 'POST',
                     contentType:'application/json',
                     url:rootURL + '/customer/addBooking',
                     dataType:"json",
                     data:getBookingDetails(),
                 })
                 .done(function(data){
                      //alert(data[0].Tour_Name);
                       alert(data.Status);
                       getCustomerTrips();
                       $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
                 })
                 .always(function(){
                 //Always execute this code
                 })
                 .fail(function(data){
                 alert("Please select a trip!");
             });
           }

           function getBookingDetails(){
               return JSON.stringify({
                   "customer_id":localStorage.ID,
                   "trip_id":$("#selTrip").val(),
                   "num_concessions":$("#txtConcession").val(),
                   "num_adults":$("#txtStandard").val(),
                   });
           }

           //-------------------View Trips for a customer-------------------------------------------
            function getCustomerTrips(){
            $.ajax({
                        type: 'GET',
                        contentType:'application/json',
                        url:rootURL + '/trips/'+localStorage.ID,
                        dataType:"json",
                    })
                    .done(function(data){
                         //alert(data[0].Tour_Name);
                          displayMyTrips(data);
                    })
                    .always(function(){
                    //Always execute this code
                    })
                    .fail(function(data){
                    alert("Fail");
                });
              }

              function displayMyTrips(data){
             //Clear any previous values
                $('#listMyTrips').empty();

            var toAppend = '';
                    $.each(data,function(i,item){
                    toAppend += "<li><a href='#' class='ui-btn ui-icon-none' >"
                    +" Tour No "+item.tour_no + " Departure Date "
                    +item.departure_date+"</a></li>";
                });

            $('#listMyTrips').append(toAppend);
            }

           //-------------------Review Trips for a customer-------------------------------------------
            function getCustomerReviewTrips(){
            $.ajax({
                        type: 'GET',
                        contentType:'application/json',
                        url:rootURL + '/trips/'+localStorage.ID,
                        dataType:"json",
                    })
                    .done(function(data){
                         //alert(data[0].Tour_Name);
                          displayReviewMyTrips(data);
                    })
                    .always(function(){
                    //Always execute this code
                    })
                    .fail(function(data){
                    alert("Fail");
                });
              }

              function displayReviewMyTrips(data){
             //Clear any previous values
                $('#selReviewTrip').empty();

            var toAppend = '<option >Select a Trip</option>';
                    $.each(data,function(i,item){
                    toAppend += "<option value='"+item.trip_id+"' >"+" Tour No: "
                    +item.tour_no + " Date: "+item.departure_date+"</option>";
                    });

            $('#selReviewTrip').append(toAppend).selectmenu("refresh",true);
            }

            //-------------------Add customer review for selected Trip----------------------
           function addReview(){
            $.ajax({
                     type: 'POST',
                     contentType:'application/json',
                     url:rootURL + '/customer/addReview',
                     dataType:"json",
                     data:getReviewDetails(),
                 })
                 .done(function(data){
                      //alert(data[0].Tour_Name);
                       alert(data.Status);
                       getCustomerTrips();
                       $(":mobile-pagecontainer").pagecontainer("change", "#homepage");
                 })
                 .always(function(){
                 //Always execute this code
                 })
                 .fail(function(data){
                 alert("Please select a trip to review!");
             });
           }

           function getReviewDetails(){
               return JSON.stringify({
                   "customer_id":localStorage.ID,
                   "trip_id":$("#selReviewTrip").val(),
                   "rating":$("#selRating").val(),
                   "general_feedback":$("#txtGeneral").val(),
                   "likes":$("#txtLikes").val(),
                   "dislikes":$("#txtDislikes").val(),
                   });
           }

});  // end document on pageinit
