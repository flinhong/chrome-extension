/* author: Frank Lin
   from Udemy course: The complete front-end web development course!
   https://www.udemy.com/front-end-web-development/learn/v4/
*/

window.onload = function() {
  // console.log('extention loaded');
    
  let videoUrls = ytplayer.config.args.url_encoded_fmt_stream_map.split(',');

  videoUrls = videoUrls.map(function(item) {
    return item.split('&').reduce(function(pre, cur) {
      // console.log(pre, cur);
      cur = cur.split('=');
      return Object.assign(pre, {[cur[0]]: decodeURIComponent(cur[1])})
    }, {});
  });

  let container = document.querySelectorAll('#menu-container #menu ytd-menu-renderer');
  // console.log(container[0]);

  let newBtn = document.createElement('ytd-button-renderer');
  newBtn.className = 'style-scope ytd-menu-renderer force-icon-button style-text';
  newBtn.innerHTML = `<a class="yt-simple-endpoint style-scope ytd-button-renderer" tabindex="-1"><yt-icon-button class="style-scope ytd-button-renderer style-default"><button class="style-scope yt-icon-button" aria-label="Download">Download</button></yt-icon-button></a>`;
  newBtn.id = 'downloadVideo';

  container[0].appendChild(newBtn);

  newBtn.addEventListener('click', downloadVideo);

  let dropdown = document.createElement('div');
  dropdown.id = 'downloadVideoDropdown';
  let dropList = document.createElement('ul');
  dropdown.appendChild(dropList);

  container[0].appendChild(dropdown);

  for (i in videoUrls) {
    // console.log(videoUrls[i]);
    let item = document.createElement('a');
    let ext = videoUrls[i]['type'].split('/')[1].split(';')[0];
    item.innerText = videoUrls[i]['quality'] + " ( " + ext + " )";
    item.setAttribute('href', videoUrls[i]['url']);
    item.setAttribute('target', '_blank');
    item.setAttribute('data-type', videoUrls[i]['type']);
    item.addEventListener('click', downloadURI);
    dropList.appendChild(item);
  }

  let dl = document.querySelector('#downloadVideoDropdown');
  document.addEventListener('click', function(event) {
    console.log(event.target);
  });

}

function downloadVideo() {
  // console.log('clicked');
  let download = document.querySelector('#downloadVideoDropdown');

  if (download.className.indexOf('shown') > -1) {
    download.className = '';
  } else {
    download.className = 'shown';
  }

}

function downloadURI(event) {
  event.preventDefault();
  event.stopPropagation();

  let url = event.currentTarget.getAttribute('href');
  // console.log(url);
  let name = document.getElementsByTagName('title')[0].innerText;
  // console.log(name);
  let datatype = event.currentTarget.getAttribute('data-type');
  let data = {'url': url, 'name': name, 'type': datatype, 'sender': 'YTDL'};

  let download = document.querySelector('#downloadVideoDropdown');
  if (download.className.indexOf('shown') > -1) {
    download.className = '';
  } else {
    download.className = 'shown';
  }

  window.postMessage(data, '*');
}
