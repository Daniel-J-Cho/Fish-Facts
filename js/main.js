// requesting API for data and populating scrollbar with 'Species Name' data
var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');
var $species = document.getElementById('species');
var $speciesH2 = document.querySelector('.species-h2');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
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
var $biologyText = document.querySelector('.biology-text');
var $habitatText = document.querySelector('.habitat-text');
var $caloriesText = document.querySelector('.calories-text');
var $carbohydratesText = document.querySelector('.carbohydrates-text');
var $cholesterolText = document.querySelector('.cholesterol-text');
var $fatContentText = document.querySelector('.fat-content-text');
var $healthBenefitsText = document.querySelector('.health-benefits-text');
var $tasteText = document.querySelector('.taste-text');

function noTags(str) {
  if ((str === '') || (str === null)) {
    return false;
  } else {
    str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, '');
  }
}

$species.addEventListener('change', function (event) {
  if (event.target.matches('.species')) {
    for (var i = 0; i < $optionList.length; i++) {
      for (var j = 1; j < $optionList[i].length; j++) {
        if (event.target.value === $optionList[i][j].value) {
          if (xhr.response[j - 1]['Image Gallery'] === null) {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', 'placeholder.png');
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
            } else {
              $tasteText.textContent = 'Taste:' + ' ' + noTags(xhr.response[j - 1].Taste);
            }
          } else if (xhr.response[j - 1]['Image Gallery'][0] === undefined) {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'].alt);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
            } else {
              $tasteText.textContent = 'Taste: ' + ' ' + noTags(xhr.response[j - 1].Taste);
            }
          } else {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'][0].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'][0].alt);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
            } else {
              $tasteText.textContent = 'Taste: ' + ' ' + noTags(xhr.response[j - 1].Taste);
            }
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

var $ul = document.querySelector('.unordered-list');
var $form = document.querySelector('.form');
var $formTwo = document.querySelector('.form-2');
var $formThree = document.querySelector('.form-3');
var dataFish;

function submitButton(event) {
  event.preventDefault();
  var newObj = {};
  newObj.img = $img.getAttribute('src');
  newObj.title = $speciesH2.textContent;
  newObj.text = $biologyText.textContent;
  newObj.entryId = dataFish.nextEntryId;
  dataFish.nextEntryId++;
  dataFish.entries.unshift(newObj);
  var listItem = favSpecies(newObj);
  $ul.prepend(listItem);
}

$form.addEventListener('submit', submitButton);

$formTwo.addEventListener('submit', submitButton);

$formThree.addEventListener('submit', submitButton);

function favSpecies(entry) {
  var liNode = document.createElement('li');
  var mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'row');
  var firstColDiv = document.createElement('div');
  firstColDiv.setAttribute('class', 'column-half');
  var imgNode = document.createElement('img');
  imgNode.setAttribute('class', 'species-image-fav');
  imgNode.setAttribute('src', entry.img);
  var secondColDiv = document.createElement('div');
  secondColDiv.setAttribute('class', 'column-half');
  var innerDiv = document.createElement('div');
  innerDiv.className = 'inner-div';
  var h2Node = document.createElement('h2');
  h2Node.textContent = entry.title;
  var innerInnerDiv = document.createElement('div');
  innerInnerDiv.className = 'inner-inner-div';
  var pNode = document.createElement('p');
  pNode.textContent = entry.text.slice(8);
  liNode.appendChild(mainDiv);
  liNode.className = 'li-item';
  liNode.setAttribute('data-entry-id', entry.entryId);
  var delButton = document.createElement('button');
  delButton.setAttribute('class', 'del-button');
  delButton.textContent = 'DELETE FROM FAVORITES';
  delButton.setAttribute('data-entry-id', entry.entryId);
  mainDiv.appendChild(firstColDiv);
  firstColDiv.appendChild(imgNode);
  mainDiv.appendChild(secondColDiv);
  secondColDiv.appendChild(innerDiv);
  innerDiv.appendChild(h2Node);
  innerDiv.appendChild(innerInnerDiv);
  secondColDiv.appendChild(pNode);
  var innInnInnDiv = document.createElement('div');
  innInnInnDiv.setAttribute('class', 'column-full inner');
  pNode.appendChild(innInnInnDiv);
  innInnInnDiv.appendChild(delButton);
  return liNode;
}

$ul.addEventListener('click', function (event) {
  if (event.target.matches('.del-button')) {
    var nextEntryIdStr = event.target.getAttribute('data-entry-id');
    var nextEntryIdNum = parseInt(nextEntryIdStr, 10);
    for (var j = 0; j < dataFish.entries.length; j++) {
      if (nextEntryIdNum === dataFish.entries[j].entryId) {
        dataFish.editing = dataFish.entries[j];
      }
    }
    var currEntryId = dataFish.editing.entryId;
    var currEntryNum = parseInt(currEntryId, 10);
    var $listNodes = document.querySelectorAll('.li-item');
    for (let i = 0; i < dataFish.entries.length; i++) {
      if (currEntryNum === dataFish.entries[i].entryId) {
        dataFish.entries.splice(i, 1);
        $listNodes[i].remove();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < dataFish.entries.length; i++) {
    var entry = favSpecies(dataFish.entries[i]);
    $ul.appendChild(entry);
  }
});
