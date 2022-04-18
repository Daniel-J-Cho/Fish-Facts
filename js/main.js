// requesting API for data and populating scrollbar with 'Species Name' data
var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');
var $species = document.getElementById('species');
var $speciesH3 = document.querySelector('.species-h3');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  // console.log(xhr.status);
  // console.log(xhr.response);
  for (let i = 0; i < xhr.response.length; i++) {
    var $option = document.createElement('option');
    $option.textContent = xhr.response[i]['Species Name'];
    $option.setAttribute('value', xhr.response[i]['Species Name']);
    $option.setAttribute('class', 'species');
    $option.setAttribute('id', 'species-name');
    $species.appendChild($option);
  }
});
xhr.send();

var $img = document.querySelector('.species-image');
var $selTabContainer = document.querySelector('.select-tab-container');
var $tabs = document.querySelectorAll('.tab');
var $views = document.querySelectorAll('.view');

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
    for (var j = 0; j < $views.length; j++) {
      if (dataViewVal === $views[j].getAttribute('data-view')) {
        $views[j].className = 'view column-full';
      } else {
        $views[j].className = 'view column-full hidden';
      }
    }
  }
});

var $optionList = document.querySelectorAll('.species');
var $speciesText = document.querySelector('.species-name-text');
var $funFactText = document.querySelector('.fun-fact-text');

$species.addEventListener('change', function (event) {
  if (event.target.matches('.species')) {
    for (var i = 0; i < $optionList.length; i++) {
      for (var j = 0; j < $optionList[i].length; j++) {
        if (event.target.value === $optionList[i][j].value) {
          // console.log('$optionList[i][j].value:', $optionList[i][j].value);
          // console.log('$optionList[i][j]:', $optionList[i][j]);
          // console.log('j:', j);
          if (xhr.response[j]['Image Gallery'][0].src === null) {
            $img.setAttribute('src', 'images/placeholder.png');
          } else {
            $speciesH3.textContent = xhr.response[j]['Species Name'];
            $img.setAttribute('src', xhr.response[j]['Image Gallery'][0].src);
            $img.setAttribute('alt', xhr.response[j]['Image Gallery'][0].alt);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j].Quote;
          }
        }
      }
    }
  }
  // console.log(event.target);
  // console.log(event.target.value);
  // console.log($optionList);
  // console.log($img);
});
