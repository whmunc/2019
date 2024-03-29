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
})

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