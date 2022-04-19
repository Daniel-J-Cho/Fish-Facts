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
// var $tabAnchor = document.querySelectorAll('.tab-anchor');
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
    // for (var k = 0; k < $tabAnchor.length; k++) {
    //   if (event.target === $tabAnchor[i]) {
    //     $tabAnchor[k].className = 'tab-anchor active';
    //   } else {
    //     $tabAnchor[k].className = 'tab-anchor';
    //   }
    // }
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
var $biologyText = document.querySelector('.biology-text');
var $habitatText = document.querySelector('.habitat-text');
var $caloriesText = document.querySelector('.calories-text');
var $carbohydratesText = document.querySelector('.carbohydrates-text');
var $cholesterolText = document.querySelector('.cholesterol-text');
var $fatContentText = document.querySelector('.fat-content-text');
var $healthBenefitsText = document.querySelector('.health-benefits-text');
var $tasteText = document.querySelector('.taste-text');

$species.addEventListener('change', function (event) {
  if (event.target.matches('.species')) {
    for (var i = 0; i < $optionList.length; i++) {
      for (var j = 1; j < $optionList[i].length; j++) {
        if (event.target.value === $optionList[i][j].value) {
          // console.log('$optionList[i][j].value:', $optionList[i][j].value);
          // console.log('$optionList[i][j]:', $optionList[i][j]);
          // console.log('j:', j);
          if (xhr.response[j - 1]['Image Gallery'] === null) {
            $speciesH3.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', 'images/placeholder.png');
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + xhr.response[j - 1].Biology;
            $habitatText.textContent = 'Habitat: ' + ' ' + xhr.response[j - 1].Habitat;
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            $cholesterolText.textContent = 'Cholesterol: ' + ' ' + xhr.response[j - 1].Cholesterol;
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + xhr.response[j - 1]['Health Benefits'];
            $tasteText.textContent = 'Taste: ' + ' ' + xhr.response[j - 1].Taste;
          } else if (xhr.response[j - 1]['Image Gallery'][0] === undefined) {
            $speciesH3.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'].alt);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + xhr.response[j - 1].Biology;
            $habitatText.textContent = 'Habitat: ' + ' ' + xhr.response[j - 1].Habitat;
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            $cholesterolText.textContent = 'Cholesterol: ' + ' ' + xhr.response[j - 1].Cholesterol;
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + xhr.response[j - 1]['Health Benefits'];
            $tasteText.textContent = 'Taste: ' + ' ' + xhr.response[j - 1].Taste;
          } else {
            $speciesH3.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'][0].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'][0].alt);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + xhr.response[j - 1].Biology;
            $habitatText.textContent = 'Habitat: ' + ' ' + xhr.response[j - 1].Habitat;
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            $cholesterolText.textContent = 'Cholesterol: ' + ' ' + xhr.response[j - 1].Cholesterol;
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + xhr.response[j - 1]['Health Benefits'];
            $tasteText.textContent = 'Taste: ' + ' ' + xhr.response[j - 1].Taste;
          }
        }
      }
    }
  }
});

var $leftArrow = document.querySelector('.prev-img');
var $rightArrow = document.querySelector('.next-img');

$leftArrow.addEventListener('click', function (event) {
  var currImgSrcL = $img.getAttribute('src');
  for (var i = 0; i < xhr.response.length; i++) {
    if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 5) {
      if (currImgSrcL === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][4].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][4].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][3].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][3].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 4) {
      if (currImgSrcL === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][3].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][3].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 3) {
      if (currImgSrcL === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 2) {
      if (currImgSrcL === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcL === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else {
      if (currImgSrcL === xhr.response[i]['Image Gallery']) {
        break;
      }
    }
  }
});

$rightArrow.addEventListener('click', function (event) {
  var currImgSrcR = $img.getAttribute('src');
  for (var i = 0; i < xhr.response.length; i++) {
    if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 5) {
      if (currImgSrcR === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][3].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][3].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][4].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][4].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 4) {
      if (currImgSrcR === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][3].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][3].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 3) {
      if (currImgSrcR === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][2].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][2].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else if (Array.isArray(xhr.response[i]['Image Gallery']) && xhr.response[i]['Image Gallery'].length === 2) {
      if (currImgSrcR === xhr.response[i]['Image Gallery'][0].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][1].src);
      } else if (currImgSrcR === xhr.response[i]['Image Gallery'][1].src) {
        $img.setAttribute('src', xhr.response[i]['Image Gallery'][0].src);
      }
    } else {
      if (currImgSrcR === xhr.response[i]['Image Gallery']) {
        break;
      }
    }
  }
});
