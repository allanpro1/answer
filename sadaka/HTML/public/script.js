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
  appId: "1:420113336306:web:a3877f53088f9e259b4d6b",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

auth = firebase.auth();
db = firebase.firestore();

// login
function login() {
  email = document.getElementById("mail").value;
  password = document.getElementById("pass").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      window.location.href = "dashboard.html";
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      window.location.href = "about.html";
    });
}

// state observer to prevsent non admins  fron accessing the dashboard
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    // User is signed in.
  } else {
    if (window.location.pathname == "/dashboard.html") {
      window.location.href = "../index.html";
    }
    // No user is signed in.
  }
});

// upload post

function upload_to_db(imageURL) {
  db.collection("Posts")
    .add({
      heading: document.getElementById("head").value,
      main: document.getElementById("main").value,
      postDate: document.getElementById("dateid").value,
      item_image: imageURL,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("success");
    })
    .catch((error) => {
      alert("fail" + errorMessage);

      console.error("Error adding document: ", error);
    });
}

function post_news() {
  var file = document.getElementById("pic").files[0];

  var storageRef = firebase.storage().ref(file.name);
  var task = storageRef.put(file);
  task.on(
    "state_changed",
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage + "%");
    },
    function error(err) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("failed to upload" + errorMessage);
    },
    function complete() {
      console.log("image uploaded");
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // do logic with downloadURL
        upload_to_db(downloadURL);
      });
    }
  );
}

// populating posts table
function read_posts() {
  db.collection("Posts").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      product = doc.data();
      // regrence to your table
      table_ref = document
        .getElementById("posts_table")
        .getElementsByTagName("tbody")[0];
      // inser row after the last index always
      newRow = table_ref.insertRow(-1);

      newRow.innerHTML = `<tr> 
       
         <td> ${product["heading"]}</td>
         <td><img src="${product["item_image"]}" height=50></td>
         <td>${product["main"]}</td>
         <td>                  
           <button class="btn" onClick="delete_post('${doc.id}')">Delete</button>
         </td>
         <td>          
         <button class="btn" onClick="edit_itens('${doc.id}')">Edit </button>
       </td>
       <td>${product["postDate"]}</td>
         <td>  
        </tr>`;
    });
  });
}

// reading postst
function display_posts() {
  db.collection("Posts").onSnapshot((querySnapshot) => {
    var posts = ``;
    querySnapshot.forEach((doc) => {
      product = doc.data();
      div_ref = document.getElementById("posts");

      posts += `<div class="col-md-3 col-sm-6">
      
        <img src="${product["item_image"]} alt="image" class="cause-img"style="height: 100%; width:100%;">

        <div class="progress cause-progress">
          <div>
          ${product["postDate"]} 
          
            </div>
        </div>

        <h1 class="cause-title"><a href="#">${product["heading"]} </a></h1>
        <div class="cause-details">
        ${product["main"]}
        </div>

        <div class="btn-holder text-center">

          <a href="#" class="btn btn-primary"> Read more</a>
          
        </div>
        <hr>
        <br>
        </div>
    `;
    });
    div_ref.innerHTML = posts;
  });
}

// posting advertisement

function upload_to_db_ad(imageURL) {
  db.collection("advertisemnts")
    .add({
      caption: document.getElementById("caption").value,
      // main:document.getElementById('main').value,
      item_image: imageURL,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("success");
    })
    .catch((error) => {
      alert("fail" + errorMessage);

      console.error("Error adding document: ", error);
    });
}

function post_ad() {
  var file = document.getElementById("ad_pic").files[0];

  var storageRef = firebase.storage().ref(file.name);
  var task = storageRef.put(file);
  task.on(
    "state_changed",
    function progress(snapshot) {
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percentage + "%");
    },
    function error(err) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("failed to upload" + errorMessage);
    },
    function complete() {
      console.log("image uploaded");
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // do logic with downloadURL
        upload_to_db_ad(downloadURL);
      });
    }
  );
}

// populating Ads table
function read_ads() {
  db.collection("advertisemnts").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      product = doc.data();
      // regrence to your table
      table_ref = document
        .getElementById("ads_table")
        .getElementsByTagName("tbody")[0];
      // inser row after the last index always
      newRow = table_ref.insertRow(-1);

      newRow.innerHTML = `<tr> 
       
         <td> ${product["caption"]}</td>
         <td><img src="${product["item_image"]}" height=50></td>
         <td>          
           <button class="btn" onClick="delete_items('${doc.id}')">Delete</button>
         </td>
         <td>          
         <button class="btn" onClick="edit_itens('${doc.id}')">Edit </button>
       </td>
        </tr>`;
    });
  });
}

// reading advertisement
function display_ads() {
  db.collection("advertisemnts").onSnapshot((querySnapshot) => {
    div_ref = document.getElementById("slide_showBucket");
    div_ref.innerHTML += ``;

    querySnapshot.forEach((doc) => {
      product = doc.data();
      console.log(product);
      div_ref.innerHTML += `
            <div class="mySlides fade">
            <img src="${product.item_image}" style="width:100%">
            <div class="text">${product.caption}</div>
            </div>`;

      document.getElementById("dots").innerHTML += `<span class="dot"></span>`;
    });
    showSlides();
  });
}

//  slide show function

let slideIndex = 0;
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showSlides, 5000); // Change image every 2 seconds
}

// delete adverts
function delete_items(id) {
  db.collection("advertisemnts")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

// delete posts
function delete_post(id) {
  db.collection("Posts")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

// Flutterwave
function donate() {
  // if (document.getElementById('form-donate').checkValidity()) {
  //   return
  // }

  FlutterwaveCheckout({
    public_key: "FLWPUBK-1e3dcf99e333d3fbfaba8d5153660041-X",
    tx_ref: "hey",
    amount: document.getElementById("amount").value,
    currency: document.getElementById("currency").value,
    country: document.getElementById("country").value,
    payment_options: "mobilemoneyuganda",
    redirect_url: "https://answerthecry.org/index.html",

    customer: {
      email: document.getElementById("email").value,
      // phone_number: "",
      // name: user.displayName,
    },
    callback: function (data) {
      console.log(data);
      alert("oi io");
    },
    onclose: function () {
      // close modal
    },
    customizations: {
      title: "Answer The Cry",
      description: "Donate " + amount + " To Answer the cry",
      logo: "https://answerthecry.org/assets/images/logo.png",
    },
  });
}







// mail to 
//update this with your js_form selector
var form_id_js = "javascript_form";

var data_js = {
  "access_token": "{x5dnyc0dhbw9al9bbhqbgg8t}" // sent after you sign up
};

function js_onSuccess() {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
}

function js_onError(error) {
  // remove this to avoid redirect
  window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

var sendButton = document.getElementById("js_send");

function js_send() {
  sendButton.value = 'Sending…';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    } else
      if (request.readyState == 4) {
        js_onError(request.response);
      }
  };

  var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
  var message = document.querySelector("#" + form_id_js + " [name='text']").value;
  data_js['subject'] = subject;
  data_js['text'] = message;
  var params = toParams(data_js);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.send(params);

  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  var form_data = [];
  for (var key in data_js) {
    form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }

  return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
  e.preventDefault();
});

