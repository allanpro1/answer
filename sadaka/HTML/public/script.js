  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
  // TODO: Add SDKs for Firebase Posts that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAuKWPEzY5qWnRPR1kofnIaWxILIt2oGXI",
    authDomain: "answerzcry.firebaseapp.com",
    projectId: "answerzcry",
    storageBucket: "answerzcry.appspot.com",
    messagingSenderId: "420113336306",
    appId: "1:420113336306:web:a3877f53088f9e259b4d6b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

auth = firebase.auth();
db = firebase.firestore();

// login
function login(){
    email = document.getElementById('mail').value;
    password = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href ="dashboard.html";
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("errorMessage")
    window.location.href="about.html";
  });
}


// upload post 

function upload_to_db(imageURL) {

  db.collection("Posts").add({
    heading:document.getElementById('head').value,
    main:document.getElementById('main').value,
     item_image: imageURL,
  
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert('success');
    })
    .catch((error) => {
      alert('fail' + errorMessage);

      console.error("Error adding document: ", error);
    });
}


function post_news(){
  var file = document.getElementById('pic').files[0]

  var storageRef = firebase.storage().ref(file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(percentage + "%");

  }, function error(err) {
    var errorCode = error.code;
    var errorMessage = error.message;
      console.log("failed to upload" + errorMessage);

  },function complete() {
      console.log("image uploaded");
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // do logic with downloadURL
          upload_to_db(downloadURL);
      });
  });
}


// populating posts table
function read_posts() {


  db.collection("Posts")

    .onSnapshot((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        product = doc.data();
        // regrence to your table
        table_ref = document.getElementById('posts_table').getElementsByTagName('tbody')[0];
        // inser row after the last index always
        newRow = table_ref.insertRow(-1);

        //  INSTRUCT THE JS ON HOW TO FILL IN THE ROW
        //  key names that we used wheninputing in the db iin upload function
        newRow.innerHTML = `<tr> 
       
         <td> ${product["heading"]}</td>
         <td><img src="${product['item_image']}" height=50></td>
         <td>${product["main"]}</td>
         <td>          
           <button class="btn" onClick="delete_itens('${doc.id}')">Delete</button>
         </td>
         <td>          
         <button class="btn" onClick="edit_itens('${doc.id}')">Edit </button>
       </td>
        </tr>`


      });
    });
}







// posting advertisement

function upload_to_db_ad(imageURL) {

  db.collection("advertisemnts").add({
    caption:document.getElementById('caption').value,
    // main:document.getElementById('main').value,
     item_image: imageURL,
  
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert('success');
    })
    .catch((error) => {
      alert('fail' + errorMessage);

      console.error("Error adding document: ", error);
    });
}


function post_ad(){
  var file = document.getElementById('ad_pic').files[0]

  var storageRef = firebase.storage().ref(file.name);
  var task = storageRef.put(file);
  task.on('state_changed', function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(percentage + "%");

  }, function error(err) {
    var errorCode = error.code;
    var errorMessage = error.message;
      console.log("failed to upload" + errorMessage);

  },function complete() {
      console.log("image uploaded");
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // do logic with downloadURL
          upload_to_db_ad(downloadURL);
      });
  });
}



