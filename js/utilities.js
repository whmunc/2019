var APP_ID = 'NVSqkDBloWJ2VX1WBgLhH4RF-gzGzoHsz';
var APP_KEY = 'PElcj8eR8eEXhbhGKVAF56nc';
var login_url = '';
var user_id = getQueryVariable('uid');
AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
});
//interact with LeanCloud
var delegateData = AV.Object.createWithoutData('delegate_info', user_id);
delegateData.fetch().then( function writeBack(){
    var u_name = document.getElementById('u_name');
    u_name.innerText = delegateData.get('name');

    var co_name = document.getElementById('co_name');
    co_name.innerText = delegateData.get('name');

    var u_school = document.getElementById('u_school');
    u_school.innerText = delegateData.get('school');

    var u_phone = document.getElementById('u_phone');
    u_phone.innerText = delegateData.get('phone');

    login_url = delegateData.get('backend_url');
})

function login_jump(){
    window.location.href = login_url;
}
//get hitokoto from online API
fetch('https://v1.hitokoto.cn/?charset=UTF-8&c=d')
.then(function (res) {
    return res.json();
})
.then(function (data) {
    var hitokoto = document.getElementById('hitokoto');
    hitokoto.innerText = data.hitokoto;
})
.catch(function (err) {
    console.error(err);
})
//get Variable
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

//Service Worker
if('serviceWorker' in navigator){
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sworker.js', {scope: '/'})
            .then(function (registeration) {
                console.log('◕‿◕ Registered Successfully.');
            })
            .catch(function (error) {
                console.log('ಠ_ಠ Something wrong when starting, please help us debug.');
            });
    });
}