// requesting API for data and populating scrollbar with 'Species Name' data
var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');
var $species = document.getElementById('species');
// var $speciesH3 = document.querySelector('.species-h3');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(xhr.status);
  // console.log(xhr.response);
  for (let i = 0; i < xhr.response.length; i++) {
    var $option = document.createElement('option');
    $option.textContent = xhr.response[i]['Species Name'];
    $species.appendChild($option);
  }
});
xhr.send();

var $selTabContainer = document.querySelector('.select-tab-container');
var $tabs = document.querySelectorAll('.tab');
var $views = document.querySelectorAll('.view.column-full');

$selTabContainer.addEventListener('click', function (event) {
  if (event.target.matches('.tab')) {
    for (var i = 0; i < $tabs.length; i++) {
      if (event.target === $tabs[i]) {
        $tabs[i].className = 'tab active';
      } else {
        $tabs[i].className = 'tab';
      }
    }
    var dataViewVal = event.target.getAttribute('data-view');
    for (var j = 0; $views.length; j++) {
      if (dataViewVal === $views[j].getAttribute('data-view')) {
        $views[j].className = 'view column-full';
      } else {
        $views[j].className = 'view column-full hidden';
      }
    }
  }
});
