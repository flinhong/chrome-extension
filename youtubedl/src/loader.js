s = document.createElement('script');

s.src = chrome.extension.getURL('src/script.js');

(document.head || document.documentElement).appendChild(s);

window.addEventListener('message', function(e) {
  if (e.data.sender) {
    let item = e.data;
    // console.log('download', item);

    let ext = item.type.split('/')[1].split(';')[0];

    let isValid=(function(){
      var rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
      var rg2=/^\./; // cannot start with dot (.)
      var rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
      return function isValid(fname){
        return rg1.test(fname)&&!rg2.test(fname)&&!rg3.test(fname);
      }
    })();

    let fileName = '';
    if (isValid(item.name)) {
      fileName = item.name + '.' + ext;
    } else {
      fileName = 'video' + '.' + ext;
    }

    chrome.runtime.sendMessage({url: item.url, name: fileName}, function(res) {
      console.log(res);
    });
  }
})