    fetch('https://v1.hitokoto.cn/?charset=UTF-8?c=d')
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