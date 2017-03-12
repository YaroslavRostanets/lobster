authUrl = 'https://oauth.vk.com/authorize?';
var lobsterUrl = 'http://rostanets.zzz.com.ua/application';

var authConfig = {
    'client_id':'5811057',
    'display':'mobile',
    'redirect_uri':'https://oauth.vk.com/blank.html',
    'scope':'friends,audio,video,email,offline',
    'response_type':'token',
    'v':'5.52'
    };

if(localStorage.getItem("minAge") == null){
  localStorage.setItem("minAge", 18);
}

if(localStorage.getItem("maxAge") == null){
    localStorage.setItem("maxAge", 65);
}

