var openAccount = function() {
  $('#openModal').modal('show');
}

// FIXME: init authClient then:
// authClient.token.getUserInfo(v).then(function(x) { userProfile.profile = jsonPP(x); userProfile.username = x.username; })

var tokenModal = new Vue({
  delimiters: ['[[', ']]'],
  el: '#tokenModal',
  data: {
    cards: [
      // {
      //   "name": "id_token",
      //   "jwt": id_token,
      // },
      // {
      //   "name": "access_token",
      //   "jwt": access_token
      // },
    ]
  },
  methods: {
    header: function(input) {
      return jwtPP(input, 0);
    },
    payload: function(input) {
      return jwtPP(input, 1);
    }
  }
});

var branchPrompt = new Vue({
  el: '#branchPrompt',
  data: {
    message: "",
    branches: [],
    seen: false,
  }
});

$(document).ready(function () {
  window.onload = function () {
    document.getElementById("password1").onchange = validatePassword;
    document.getElementById("password2").onchange = validatePassword;
  }

  function validatePassword() {
    var pass2 = document.getElementById("password2").value;
    var pass1 = document.getElementById("password1").value;
    if (pass1 != pass2)
      document.getElementById("password2").setCustomValidity("Passwords Don't Match");
    else
      document.getElementById("password2").setCustomValidity('');
      //empty string means no validation error
  }
  
  branchPrompt.message = "Hello world";
  branchPrompt.branches = ["aye", "bee", "sea"];
  branchPrompt.seen = true;
});

// Start Token Viewer Code
function jsonPP(input) {
  var obj = JSON.parse(input);
  return JSON.stringify(obj, undefined, 4);
}

function jwtPP(token, part = 0) {
  var token_parts = token.split('.');
  var rawJson = window.atob(token_parts[part]);
  return jsonPP(rawJson);
}

var access_token = authClient.tokenManager.get("accessToken").accessToken;
var id_token     = authClient.tokenManager.get("idToken").idToken;

  
  tokenModal.cards = [
    {
      "name": "id_token",
      "jwt": id_token,
    },
    {
      "name": "access_token",
      "jwt": access_token
    },
  ]
// End Token Viewer Code