var validEmails = [
  "jonsmith@example.com",
  "janesmith@example.com",
  "doesmith@example.com"
];

$("#btn-go").click(function() {
  var email = document.getElementById("email").value;
  email = email.trim();

  var validEmail = validEmails.some(function (element) {
    return element === email;
  })

  if(validEmail){
    sendValue(email);
    hideError();

  } else {
    showError();
  }

});

function init() {
  var numberOptions = 6;
  var showNumber = 7;

  for (let i = 0; i < numberOptions; i++) {
    showNumber--;
    document.getElementById('options')
    .insertAdjacentHTML(
      'afterbegin', 
      '<div class="col-md-6 col-lg-6 option"><div class="option-number"><div class="blue-circle"><span class="text-gold">'+ showNumber +'</span></div></div> <div class="text-option"><h2 class="text-blue">Lorem Ipsum</h2><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seddo eiusmod tempor incididunt ut labore et dolore magnaaliqua.</span> </div></div>'
    )
  };

  searchInit();

}

function sendValue(email) {
  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" +
      email,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    type: "GET",
    dataType: "json",
    error: function() {
      showError();
    },
    success: function(data) {
      successSend(data);
    }
  });
}

function searchInit() {
  document.getElementById('text-search').textContent = "Search Any Email Address";
  document.getElementById('text-subtext').textContent = "Look up the owner's name,photos and online profiles. See what you find!";
  document.getElementById('text-subtext-gold').textContent = "Start Here";
}

function searchSuccess() {
  document.getElementById('text-search').textContent = "Can’t Find The Right Person?";
  document.getElementById('text-subtext').textContent = "Make a new search";
  document.getElementById('text-subtext-gold').textContent = "Try Again";
}

function showError() {
  document.querySelector(".email").classList.add("error-border");
}

function hideError() {
  document.querySelector(".email").classList.remove("error-border");
}

function successSend(person) {
  document.getElementById('phone-numbers').innerHTML = "";
  document.getElementById('relatives').innerHTML = "";
  searchSuccess();

  var fullName = person.first_name + " " + person.last_name;
  document.getElementById('name-span').textContent = fullName;
  document.getElementById('email-span').textContent = person.email;
  document.getElementById('address-span').textContent = person.address;
  document.getElementById('description-span').textContent = person.description;
  document.getElementById('reverse-email').style.display="none";

  person.phone_numbers.forEach(function(element) {
    document.getElementById('phone-numbers')
    .insertAdjacentHTML('afterbegin', '<li class="text-blue number-list-li">'+element+'</li>')
  });

  person.relatives.forEach(function(element) {
    document.getElementById('relatives')
    .insertAdjacentHTML('afterbegin', '<li class="relatives-list-li">'+element+'</li>')
  });

}

init();