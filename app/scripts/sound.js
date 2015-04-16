var soundJs = function() {
  if (location.href.split('/')[2] == 'localhost:9000') {
    var SOUND_DATA_URL = {"Sound1": "../images/quintino.mp3"}
  } else {
    var SOUND_DATA_URL = {"Sound1": "../threejs-fire/dist/images/quintino.mp3"}
  }

  snd.onload = function() {
    snd.util.createBufferSources(SOUND_DATA_URL, true, function(loadedSound) {
      loadedSound["Sound1"].start();
    });
  };

  window.onload = function() {
    setTimeout(function(){
      snd.init();
    },2000);

    setTimeout(function(){
      location.reload();
    },190000);
  }
}

try {
  soundJs()
} catch(e) {
  console.info('Web Audio API is not supported in this browser');
}
