let RE=require('../main.js');
RE.$B.push(function () {
    window.WebFont.load({
        google: {
            families: RE.$C['main.fonts']
        }
    });
});

window.addEventListener('load', RE.bootstrap.bind(RE), false);