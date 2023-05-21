// requesting API for data and populating scrollbar with 'Species Name' data

var specImgGall = {};
var targetUrl = encodeURIComponent('https://www.fishwatch.gov/api/species');
var $species = document.getElementById('species');
var $speciesH2 = document.querySelector('.species-h2');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  if (selectedSpecies.specName === '') {
    $speciesH2.textContent = 'Select a species!';
  }
  for (let i = 0; i < xhr.response.length; i++) {
    var $option = document.createElement('option');
    $option.textContent = xhr.response[i]['Species Name'];
    $option.setAttribute('value', xhr.response[i]['Species Name']);
    $option.setAttribute('class', 'species');
    $option.setAttribute('id', 'species-name');
    $species.appendChild($option);
    var property = xhr.response[i]['Species Name'];
    specImgGall[property] = xhr.response[i]['Image Gallery'];
  }
  if (xhr.response.length === undefined) {
    $speciesH2.textContent = 'Results came back empty.  Sorry about that!';
  }
});
window.addEventListener('error', function () {
  if (xhr.response === null || xhr.responseURL !== 'https://lfz-cors.herokuapp.com/?url=https%3A%2F%2Fwww.fishwatch.gov%2Fapi%2Fspecies') {
    $speciesH2.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection and try again!';
  }
});
xhr.send();

var $goldfish = document.querySelector('.goldfish');
var $piranha = document.querySelector('.piranha');
var $shortfin = document.querySelector('.shortfin-mako');

var gsap;
var tl = gsap.timeline();

tl.to($goldfish, {
  keyframes: {
    x: ['100vw', '75vw', '50vw', '25vw', '-10vw'],
    y: [0, 11, 5, 1, -3, 11, -2],
    easeEach: 'sine.inOut'
  },
  repeat: -1,
  duration: 11,
  repeatDelay: 2
})
  .to($piranha, {
    keyframes: {
      x: ['-5vw', '25vw', '50vw', '75vw', '105vw'],
      y: [125, 136, 130, 136, 123, 136, 124],
      easeEach: 'sine.inOut'
    },
    repeat: -1,
    duration: 11,
    repeatDelay: 1
  }, '-=5')
  .to($shortfin, {
    keyframes: {
      x: ['105vw', '80vw', '60vw', '40vw', '20vw', '0vw', '-10vw'],
      y: [350, 360, 355, 343, 350, 360, 350],
      easeEach: 'sine.inOut'
    },
    repeat: -1,
    duration: 14,
    repeatDelay: 1
  }, '>-=10');

var $img = document.querySelector('.species-image');
var $selButtonContainer = document.querySelector('.select-button-container');
var $buttons = document.querySelectorAll('.button');
var $views = document.querySelectorAll('.view');
var $selectedButton;
var dataSelButtonContainer;

const buttonsArray = Array.from($buttons);
const viewsArray = Array.from($views);

$selButtonContainer.addEventListener('click', function (event) {
  if (event.target.matches('.button')) {
    for (var i = 0; i < $buttons.length; i++) {
      if (event.target === $buttons[i]) {
        $buttons[i].className = 'button active';
        $selectedButton = $buttons[i];
        buttonsArray[i].setAttribute('class', 'button active');
      } else {
        $buttons[i].className = 'button';
        buttonsArray[i].setAttribute('class', 'button');
      }
    }
    var dataViewVal = event.target.getAttribute('data-view');
    for (var j = 0; j < $views.length; j++) {
      if (dataViewVal === $views[j].getAttribute('data-view')) {
        $views[j].className = 'view column-full';
        viewsArray[j].setAttribute('class', 'view column-full');
      } else {
        $views[j].className = 'view column-full hidden';
        viewsArray[j].setAttribute('class', 'view column-full hidden');
      }
    }

    for (let k = 0; k < buttonsArray.length; k++) {
      dataSelButtonContainer.buttons[k] = buttonsArray[k].getAttribute('class');
      dataSelButtonContainer.views[k] = viewsArray[k].getAttribute('class');
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
    return str.replace(/(<([^>]+)>)|&nbsp;/gi, '');
  }
}
var selectedSpecies;

$species.addEventListener('change', function (event) {
  if (event.target.matches('.species')) {
    for (var i = 0; i < $optionList.length; i++) {
      for (var j = 1; j < $optionList[i].length; j++) {
        if (event.target.value === $optionList[i][j].value) {
          if (xhr.response[j - 1]['Image Gallery'] === null) {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', 'images/no-image-icon-15.png');
            $img.setAttribute('value', xhr.response[j - 1]['Species Name']);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            selectedSpecies.img = $img.getAttribute('src');
            selectedSpecies.specVal = $img.getAttribute('value');
            selectedSpecies.specName = $speciesH2.textContent;
            selectedSpecies.specText = $speciesText.textContent;
            selectedSpecies.biologyText = $biologyText.textContent;
            selectedSpecies.funFactText = $funFactText.textContent;
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
              selectedSpecies.habitatText = $habitatText.textContent;
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
              selectedSpecies.habitatText = $habitatText.textContent;
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            selectedSpecies.caloriesText = $caloriesText.textContent;
            selectedSpecies.carbohydratesText = $carbohydratesText.textContent;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            selectedSpecies.fatContentText = $fatContentText.textContent;
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
              selectedSpecies.tasteText = $tasteText.textContent;
            } else {
              $tasteText.textContent = 'Taste:' + ' ' + noTags(xhr.response[j - 1].Taste);
              selectedSpecies.tasteText = $tasteText.textContent;
            }
          } else if (xhr.response[j - 1]['Image Gallery'][0] === undefined) {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'].alt);
            $img.setAttribute('value', xhr.response[j - 1]['Species Name']);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            selectedSpecies.img = $img.getAttribute('src');
            selectedSpecies.imgVal = $img.getAttribute('value');
            selectedSpecies.specName = $speciesH2.textContent;
            selectedSpecies.specText = $speciesText.textContent;
            selectedSpecies.biologyText = $biologyText.textContent;
            selectedSpecies.funFactText = $funFactText.textContent;
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
              selectedSpecies.habitatText = $habitatText.textContent;
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
              selectedSpecies.habitatText = $habitatText.textContent;
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            selectedSpecies.caloriesText = $caloriesText.textContent;
            selectedSpecies.carbohydratesText = $carbohydratesText.textContent;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            selectedSpecies.fatContentText = $fatContentText.textContent;
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
              selectedSpecies.tasteText = $tasteText.textContent;
            } else {
              $tasteText.textContent = 'Taste: ' + ' ' + noTags(xhr.response[j - 1].Taste);
              selectedSpecies.tasteText = $tasteText.textContent;
            }
          } else {
            $speciesH2.textContent = xhr.response[j - 1]['Species Name'];
            $img.setAttribute('src', xhr.response[j - 1]['Image Gallery'][0].src);
            $img.setAttribute('alt', xhr.response[j - 1]['Image Gallery'][0].alt);
            $img.setAttribute('value', xhr.response[j - 1]['Species Name']);
            $speciesText.textContent = 'Species Name: ' + ' ' + xhr.response[j - 1]['Species Name'];
            $funFactText.textContent = 'Fun Fact: ' + ' ' + xhr.response[j - 1].Quote;
            $biologyText.textContent = 'Biology: ' + ' ' + noTags(xhr.response[j - 1].Biology);
            selectedSpecies.img = $img.getAttribute('src');
            selectedSpecies.imgVal = $img.getAttribute('value');
            selectedSpecies.specName = $speciesH2.textContent;
            selectedSpecies.specText = $speciesText.textContent;
            selectedSpecies.biologyText = $biologyText.textContent;
            selectedSpecies.funFactText = $funFactText.textContent;
            if (xhr.response[j - 1].Habitat === null) {
              $habitatText.textContent = 'Habitat:' + ' ' + 'We currently have no information regarding this species\' habitat at this time';
              selectedSpecies.habitatText = $habitatText.textContent;
            } else {
              $habitatText.textContent = 'Habitat: ' + ' ' + noTags(xhr.response[j - 1].Habitat);
              selectedSpecies.habitatText = $habitatText.textContent;
            }
            $caloriesText.textContent = 'Calories: ' + ' ' + xhr.response[j - 1].Calories + ' cal';
            $carbohydratesText.textContent = 'Carbohydrates: ' + ' ' + xhr.response[j - 1].Carbohydrate;
            selectedSpecies.caloriesText = $caloriesText.textContent;
            selectedSpecies.carbohydratesText = $carbohydratesText.textContent;
            if (xhr.response[j - 1].Cholesterol === null) {
              $cholesterolText.textContent = 'Cholesterol:' + ' ' + 'We currently have no information regarding this species\' cholesterol.';
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            } else {
              $cholesterolText.textContent = 'Cholesterol: ' + ' ' + noTags(xhr.response[j - 1].Cholesterol);
              selectedSpecies.cholesterolText = $cholesterolText.textContent;
            }
            $fatContentText.textContent = 'Fat Content: ' + ' ' + xhr.response[j - 1]['Fat, Total'];
            selectedSpecies.fatContentText = $fatContentText.textContent;
            if (xhr.response[j - 1]['Health Benefits'] === null) {
              $healthBenefitsText.textContent = 'Health Benefits:' + ' ' + 'We currently have no information regarding this species\' health benefits at this time';
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            } else {
              $healthBenefitsText.textContent = 'Health Benefits: ' + ' ' + noTags(xhr.response[j - 1]['Health Benefits']);
              selectedSpecies.healthBenefitsText = $healthBenefitsText.textContent;
            }
            if (xhr.response[j - 1].Taste === null) {
              $tasteText.textContent = 'Taste:' + ' ' + 'We currently have no information regarding this species\' taste.';
              selectedSpecies.tasteText = $tasteText.textContent;
            } else {
              $tasteText.textContent = 'Taste: ' + ' ' + noTags(xhr.response[j - 1].Taste);
              selectedSpecies.tasteText = $tasteText.textContent;
            }
          }
        }
      }
    }
  }
  if (event.target.matches('.species') && $selectedButton === $buttons[3]) {
    $buttons[0].setAttribute('class', 'button active');
    $buttons[1].setAttribute('class', 'button');
    $buttons[2].setAttribute('class', 'button');
    $buttons[3].setAttribute('class', 'button');
    $views[0].setAttribute('class', 'view column-full');
    $views[1].setAttribute('class', 'view column-full hidden');
    $views[2].setAttribute('class', 'view column-full hidden');
    $views[3].setAttribute('class', 'view column-full hidden');
  }
});

var $leftArrow = document.querySelector('.prev-img');
var $rightArrow = document.querySelector('.next-img');
var $loadSpin = document.querySelector('.load-spinner.hidden');

$leftArrow.addEventListener('click', function (event) {
  $loadSpin.setAttribute('class', 'load-spinner');
  var currImgSrcL = $img.getAttribute('src');
  var currImgValL = $img.getAttribute('value');
  if (Array.isArray(specImgGall[currImgValL]) && specImgGall[currImgValL].length === 5) {
    if (currImgSrcL === specImgGall[currImgValL][0].src) {
      $img.setAttribute('src', specImgGall[currImgValL][4].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][4].src) {
      $img.setAttribute('src', specImgGall[currImgValL][3].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][3].src) {
      $img.setAttribute('src', specImgGall[currImgValL][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][2].src) {
      $img.setAttribute('src', specImgGall[currImgValL][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][1].src) {
      $img.setAttribute('src', specImgGall[currImgValL][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValL]) && specImgGall[currImgValL].length === 4) {
    if (currImgSrcL === specImgGall[currImgValL][0].src) {
      $img.setAttribute('src', specImgGall[currImgValL][3].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][3].src) {
      $img.setAttribute('src', specImgGall[currImgValL][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][2].src) {
      $img.setAttribute('src', specImgGall[currImgValL][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][1].src) {
      $img.setAttribute('src', specImgGall[currImgValL][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValL]) && specImgGall[currImgValL].length === 3) {
    if (currImgSrcL === specImgGall[currImgValL][0].src) {
      $img.setAttribute('src', specImgGall[currImgValL][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][2].src) {
      $img.setAttribute('src', specImgGall[currImgValL][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][1].src) {
      $img.setAttribute('src', specImgGall[currImgValL][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValL]) && specImgGall[currImgValL].length === 2) {
    if (currImgSrcL === specImgGall[currImgValL][0].src) {
      $img.setAttribute('src', specImgGall[currImgValL][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcL === specImgGall[currImgValL][1].src) {
      $img.setAttribute('src', specImgGall[currImgValL][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (currImgSrcL === 'images/no-image-icon-15.png') {
    $loadSpin.setAttribute('class', 'load-spinner hidden');
  } else {
    if (currImgSrcL === specImgGall[currImgValL].src) {
      $loadSpin.setAttribute('class', 'load-spinner hidden');
    }
  }
});

$rightArrow.addEventListener('click', function (event) {
  $loadSpin.setAttribute('class', 'load-spinner');
  var currImgSrcR = $img.getAttribute('src');
  var currImgValR = $img.getAttribute('value');
  if (Array.isArray(specImgGall[currImgValR]) && specImgGall[currImgValR].length === 5) {
    if (currImgSrcR === specImgGall[currImgValR][0].src) {
      $img.setAttribute('src', specImgGall[currImgValR][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][1].src) {
      $img.setAttribute('src', specImgGall[currImgValR][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][2].src) {
      $img.setAttribute('src', specImgGall[currImgValR][3].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][3].src) {
      $img.setAttribute('src', specImgGall[currImgValR][4].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][4].src) {
      $img.setAttribute('src', specImgGall[currImgValR][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValR]) && specImgGall[currImgValR].length === 4) {
    if (currImgSrcR === specImgGall[currImgValR][0].src) {
      $img.setAttribute('src', specImgGall[currImgValR][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][1].src) {
      $img.setAttribute('src', specImgGall[currImgValR][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][2].src) {
      $img.setAttribute('src', specImgGall[currImgValR][3].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][3].src) {
      $img.setAttribute('src', specImgGall[currImgValR][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValR]) && specImgGall[currImgValR].length === 3) {
    if (currImgSrcR === specImgGall[currImgValR][0].src) {
      $img.setAttribute('src', specImgGall[currImgValR][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][1].src) {
      $img.setAttribute('src', specImgGall[currImgValR][2].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][2].src) {
      $img.setAttribute('src', specImgGall[currImgValR][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (Array.isArray(specImgGall[currImgValR]) && specImgGall[currImgValR].length === 2) {
    if (currImgSrcR === specImgGall[currImgValR][0].src) {
      $img.setAttribute('src', specImgGall[currImgValR][1].src);
      selectedSpecies.img = $img.getAttribute('src');
    } else if (currImgSrcR === specImgGall[currImgValR][1].src) {
      $img.setAttribute('src', specImgGall[currImgValR][0].src);
      selectedSpecies.img = $img.getAttribute('src');
    }
  } else if (currImgSrcR === 'images/no-image-icon-15.png') {
    $loadSpin.setAttribute('class', 'load-spinner hidden');
  } else {
    if (currImgSrcR === specImgGall[currImgValR].src) {
      $loadSpin.setAttribute('class', 'load-spinner hidden');
    }
  }
});

$img.addEventListener('load', function () {
  $loadSpin.setAttribute('class', 'load-spinner hidden');
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
  firstColDiv.setAttribute('class', 'column-half first');
  var imgNode = document.createElement('img');
  imgNode.setAttribute('class', 'species-image-fav');
  imgNode.setAttribute('src', entry.img);
  var secondColDiv = document.createElement('div');
  secondColDiv.setAttribute('class', 'column-half');
  var innerDiv = document.createElement('div');
  innerDiv.className = 'inner-div';
  var h2Node = document.createElement('h2');
  h2Node.textContent = entry.title;
  var pNode = document.createElement('p');
  pNode.className = 'fav-p-element';
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
  secondColDiv.appendChild(pNode);
  var innInnInnDiv = document.createElement('div');
  innInnInnDiv.setAttribute('class', 'column-full inner');
  pNode.appendChild(innInnInnDiv);
  innInnInnDiv.appendChild(delButton);
  return liNode;
}

var $containerTwo = document.querySelector('.container-two');
var $confirmDeleteButton = document.querySelector('.confirm-delete-button');
var $cancelButton = document.querySelector('.cancel-button');

function displayModal(event) {
  if ($containerTwo.className === 'container-two hidden') {
    $containerTwo.className = 'container-two';
  }
}

function hideModal(event) {
  if ($containerTwo.className === 'container-two') {
    $containerTwo.className = 'container-two hidden';
  }
}

$ul.addEventListener('click', event => {
  if (event.target.matches('.del-button')) {
    displayModal();
    $confirmDeleteButton.setAttribute('data-entry-id', event.target.getAttribute('data-entry-id'));
    $confirmDeleteButton.addEventListener('click', event => {
      var nextEntryIdStr = $confirmDeleteButton.getAttribute('data-entry-id');
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
      $containerTwo.className = 'container-two hidden';
    });
  }
  $cancelButton.addEventListener('click', hideModal);
});

$containerTwo.addEventListener('click', hideModal);

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < dataFish.entries.length; i++) {
    var entry = favSpecies(dataFish.entries[i]);
    $ul.appendChild(entry);
  }
  $img.setAttribute('src', selectedSpecies.img);
  $img.setAttribute('value', selectedSpecies.imgVal);
  $speciesH2.textContent = selectedSpecies.specName;
  $speciesText.textContent = selectedSpecies.specText;
  $biologyText.textContent = selectedSpecies.biologyText;
  $habitatText.textContent = selectedSpecies.habitatText;
  $funFactText.textContent = selectedSpecies.funFactText;
  $caloriesText.textContent = selectedSpecies.caloriesText;
  $carbohydratesText.textContent = selectedSpecies.carbohydratesText;
  $cholesterolText.textContent = selectedSpecies.cholesterolText;
  $fatContentText.textContent = selectedSpecies.fatContentText;
  $healthBenefitsText.textContent = selectedSpecies.healthBenefitsText;
  $tasteText.textContent = selectedSpecies.tasteText;

  for (let j = 0; j < $buttons.length; j++) {
    $buttons[j].className = dataSelButtonContainer.buttons[j];
    $views[j].className = dataSelButtonContainer.views[j];
  }
});
