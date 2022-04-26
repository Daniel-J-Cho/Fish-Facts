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
