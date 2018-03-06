//=======================================================
// File:        BE-App-Logic.js
// Author:      Borja Carb贸
// Description: Logic for the application at the Back End 
//              minimal implementation for the login and
//              without Data Base connection.
//         
// Data:        Port: 47600
//              testing host: 127.0.0.1
//
// Testing URL: http://127.0.0.1:47600/?username=Vicent&password=xyz123
//
// Revision:    V 1.0.0
//
//=======================================================


//=======================================================
// CONTEXT
//=======================================================
//-------------------------------------------------------
// Included Libraries
//-------------------------------------------------------
const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3');

dataBase = new sqlite3.Database('userAccess.db',
				  (error) => {
				              if (error != null) console.log('Error al abrir DB');
				             }
				  );


  
//=======================================================
// DEFINES
//=======================================================
//-------------------------------------------------------
// Headers
//-------------------------------------------------------


//-------------------------------------------------------
// Synchronous Function Definitions
//-------------------------------------------------------
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Funci贸 type_1 --> synchronous_func/1 --> type_2
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// type_1 could be of types:  ........
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// function synchronous_func(value) {
//     // execution code using value
//     return result
// }   // End synchronous_func/1


//-------------------------------------------------------
// Asynchronous Function Definitions
//-------------------------------------------------------
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Funci髇 parsed_URL   --> get_user_password/1 --> user_password object
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// type_1 could be of types:  ........
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
 function get_user_password(parsedURL, fun) {
   console.log(parsedURL.search);
   var queryURL = parsedURL.query;
   console.log(queryURL);
   fun(queryURL.username, queryURL.password);
 }   // End get_user_password/2


// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Funci髇 parsed_URL --> autentication/1 --> user_password object
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// type_1 could be of types:  ........
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
function autentication(parsedURL, fun) {
  get_user_password(parsedURL, (username, password) => {
								  console.log(" --> 1");
								  console.log(username);
								  console.log(password);
								  console.log(" --> 2");
						 
						 dataBase.get('SELECT * FROM usersaccess WHERE userName = ?',  // amb get torna sols el primr de la tabla
							      [ username ],
							      (error, result) => {
								if ( error != null ) {
								  console.log(error);
								  fun(500); 
								  return;
								};  // End fi (first)
								if ( result != undefined ) {
								  if (result.passWord == password ) {
								    console.log("found --> ");
								    console.log(result.passWord);
								    fun(204);
								    return;
								  } else {
								    fun(401);
								    console.log("unknown user");
								    return;
								  } // End fi (inner)
								} else {
								  fun(401);
								  console.log("unknown user");
								  return;
                                                                };  // End fi (second)
							      } // End lambda (inner)
							      ) // End dataBase.get
						   }  // End lambda (outer)  
		    )// End get_user_password/2
    } // End autentication





//-------------------------------------------------------
// Asynchronous Function Definitions
//-------------------------------------------------------
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Funci贸 type_1 --> asynchronous_func/1 --> type_2
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// type_1 could be of types:  ........
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// function asynchronous_func(value, fun) {
//     // execution code using value
//     fun(result)
// }   // End asynchronous_func/1


//=======================================================
//--------------------------------------------------------
//Main
//--------------------------------------------------------
//=======================================================
  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // definici贸 de variables
  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
const testingHost = '127.0.0.1';
const port = 47600;

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // L貌gica del programa
  // - - - - - - - - - - - - - - - - - - - - - - - - - - -


http.createServer((req, res) => {
		    var addr = req.url;
		    var parsedURL = url.parse(addr, true);
		    var pathName = parsedURL.pathname;
		    console.log(pathName)
		    if ( pathName === "/login/" ) {
		      autentication(parsedURL, (resStatusCode) => {
				      res.statusCode = resStatusCode;
				      res.setHeader('Access-Control-Allow-Origin','*');
				      res.end();
				    })
			}
		    if ( pathName === "/userdata/" ) {
		      console.log("requesting user data")
			}
		    if ( pathName === "/favicon.ico" ) {
		      res.statusCode = 302;
		      res.end();
		    }
		  }).listen(port, testingHost, () => {
			      console.log(`Server running at http://${testingHost}:${port}/`);
					  });
	   



// E.g. for a synchronous function call
// var a = synchronous_func(parameter_value)


//E.g. for an asynchronous anonimous function call
// asynchronous(parameter_value,
//                            function (result) {            
//                                               execution code using result
//                                              })


//E.g. for am asynchronous nominal function call
//asynchronous(parameter_value,
//                           function_CB)


//-------------------------------------------------------
// CallBack Function Definitions
//-------------------------------------------------------
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Funci贸 type_1 --> function_CB/1
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// type_1 could be of types:  ........
// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// function function_CB(result) {
//     // execution code using result
// }   // End function_CB/1
