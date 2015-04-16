var SOUND_DATA_URL = {"Sound1": "../images/quintino.mp3"}

snd.onload = function() {
  snd.util.createBufferSources(SOUND_DATA_URL, true, function(loadedSound) {
    loadedSound["Sound1"].start();
  });
};

window.onload = function() {
  setTimeout(function(){
    snd.init();
  },2000);
}
