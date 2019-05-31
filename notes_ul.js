//function for creating a new note
var btn = document.getElementsByTagName('button');
// var counter = 0; //for counting indexes in DOM to remove from LS when note deleted
// to push objects into
// creates a note including local storage for later function to insert to DOM
function createNote(event) {
  if (document.getElementById('myText').value != '') {
    if (notesArr = JSON.parse(window.localStorage.getItem('notes')) != null) {
      var notesArr = JSON.parse(window.localStorage.getItem('notes'))
    }
    else {
      var notesArr = [];
    }
    var note = {};
    for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
      var myId = document.getElementsByTagName('input')[i].id;
      var myValue = document.getElementsByTagName('input')[i].value;
      note[myId] = myValue;
    }
    notesArr.push(note);
    addToDOM(note);
    window.localStorage.setItem('notes',JSON.stringify(notesArr));
  }
}

function addToDOM(object) {
  // add to DOM
  var myLi = document.createElement('li');
  myLi.className = 'w3-container w3-center w3-animate-opacity '+'previousNote' + ' ' + 'col-sm-2';
  // myLi.id = counter;
  var txtDiv = document.createElement('div');
  var nameDiv = document.createElement('div');
  var dateDiv = document.createElement('div');
  txtDiv.style.height = '65%';
  txtDiv.style.clear= 'both';
  txtDiv.id = 'txtDiv';
  txtDiv.className = 'col-sm-12';
  txtDiv.appendChild(document.createTextNode(object.myText));
  myLi.appendChild(txtDiv);
  nameDiv.style.height = '20%';
  nameDiv.id = 'nameDiv';
  nameDiv.className = 'col-sm-6';
  nameDiv.appendChild(document.createTextNode(object.myName));
  myLi.appendChild(nameDiv);
  dateDiv.style.height = '20%';
  dateDiv.id = 'dateDiv';
  dateDiv.className = 'col-sm-6';
  dateDiv.appendChild(document.createTextNode(object.myDeadline));
  myLi.appendChild(dateDiv);
  // create trash element for div
  var trashDiv = document.createElement('div');
  //defining trash glyphcon image
  trashDiv.className = 'glyphicon glyphicon-trash';
  myLi.appendChild(trashDiv);
  var myUl = document.getElementById('myNotes');
  myUl.appendChild(myLi);
  // document.getElementsByClassName('row')[0].appendChild(myUl);
  // counter++;
  //adds a dynamic index to the li
  for (var i = 0; i < document.getElementsByTagName('li').length; i++) {
    document.getElementsByTagName('li')[i].id = i;
  }
}

function resetNote(event) {
  // debugger;
  var note = {};
  for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
    document.getElementsByTagName('input')[i].value = '';
  }
}
// checks for the notesArr in the storage, then runs the 'click' scenarios
isInStorage();
//in here I will use the add to storage + to DOM
for(var i = 0; i < btn.length; i++) {
  if (btn[i].type == 'submit') {
    btn[i].addEventListener('click',createNote);
    //reset the input after submiting
    btn[i].addEventListener('click',resetNote);
  }
  else { //this is for the reset button
    btn[i].addEventListener('click',resetNote);
  }
}

//function for checking if there is something in local storage
function isInStorage () {
  if (JSON.parse(window.localStorage.getItem('notes')) != null) {
    var notesArr = JSON.parse(window.localStorage.getItem('notes'));
    for (var i = 0; i < JSON.parse(window.localStorage.getItem('notes')).length; i++) {
      //call to function to create notes in UI
      addToDOM(JSON.parse(window.localStorage.getItem('notes'))[i]);
    }
  }
  else {
    var notesArr = [];
  }
  return notesArr;
}

function deleteNote(event) {
    //deletes the html element only if trashcan is pressed
    if (event.target.className == 'glyphicon glyphicon-trash') {
      event.target.parentElement.parentElement.removeChild(event.target.parentElement);
      newArr = JSON.parse(window.localStorage.getItem('notes'));
      //deletes from new arr to get into storage
      delete newArr [event.target.parentElement.id];
      newArr = newArr.filter(function(i) {
                          return i !== null
                          })
                          //pushes the new Array to storage
      window.localStorage.setItem('notes',JSON.stringify(newArr));
      for (var j = 0; j < document.getElementsByTagName('li').length; j++) {
        document.getElementsByTagName('li')[j].id = j;
      }

    }
}

myDeleteBtn = document.getElementsByClassName('glyphicon glyphicon-trash');
//runs through all the delete icons "waiting" for a click
// for (var i = 0; i < document.getElementsByClassName('glyphicon glyphicon-trash').length; i++) {
  //function on click delete note (trashDiv)
  // deleteNoteStorage(JSON.parse(window.localStorage.getItem('notes')), i);
document.getElementsByClassName('container-fluid')[0].addEventListener('click',deleteNote);
  // myDeleteBtn[i].addEventListener('click',deleteNoteDOM);
