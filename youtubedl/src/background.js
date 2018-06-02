chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  // console.log(request);

  chrome.downloads.download({
    url: request.url,
    filename: request.name
  })
});