let RE=require('../main.js');
RE.$B.push(function () {
    console.log(RE.$C);
    window.WebFont.load({
        google: {
            families: RE.$C['main.fonts']
        }
    });
});

window.addEventListener('load', RE.bootstrap.bind(RE), false);