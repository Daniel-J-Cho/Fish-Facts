/* exported data */
var dataFish = {
  entries: [],
  editing: null,
  nextEntryId: 1
};

var newObject = localStorage.getItem('js-local-storage-2');
if (newObject !== null) {
  dataFish = JSON.parse(newObject);
}

window.addEventListener('beforeunload', function (event) {
  var dataObj = JSON.stringify(dataFish);
  this.localStorage.setItem('js-local-storage-2', dataObj);
});

var selectedSpecies = {
  img: '',
  imgVal: '',
  specName: '',
  specText: '',
  biologyText: '',
  habitatText: '',
  funFactText: '',
  caloriesText: '',
  carbohydratesText: '',
  cholesterolText: '',
  fatContentText: '',
  healthBenefitsText: '',
  tasteText: ''
};

var storedObj = localStorage.getItem('js-local-storage-3');
if (storedObj !== null) {
  selectedSpecies = JSON.parse(storedObj);
}

window.addEventListener('beforeunload', function (event) {
  var dataSpecies = JSON.stringify(selectedSpecies);
  this.localStorage.setItem('js-local-storage-3', dataSpecies);
});

var dataSelButtonContainer = {
  buttons: [],
  views: []
};

var savedSettings = localStorage.getItem('js-local-storage-buttons-views');
if (savedSettings !== null) {
  dataSelButtonContainer = JSON.parse(savedSettings);
}

window.addEventListener('beforeunload', function () {
  var savedSettingsObject = JSON.stringify(dataSelButtonContainer);
  this.localStorage.setItem('js-local-storage-buttons-views', savedSettingsObject);
});
