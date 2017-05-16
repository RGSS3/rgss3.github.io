let RE=require('../main.js');
RE.$B.push(function () {
  if(RE.$C['main.fonts']){
    window.WebFont.load({
        google: {
            families: RE.$C['main.fonts']
        }
    });
  };
});

window.addEventListener('load', RE.bootstrap.bind(RE), false);