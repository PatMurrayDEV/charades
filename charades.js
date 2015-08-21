var thisWord;

$(function() {
    Parse.$ = jQuery;

    Parse.initialize("ygVSxtL1Mhth4bDqQ64jpCL2F911WrH9JaDI8bSF", "UODjACVfGZq9IvQcGEWnrXSVSiIqXsjwb0WCK83e");

});

function myFunction() {
  getNewWord();
}

function getNewWord() {

  var Word = Parse.Object.extend("Word"),
    Words = Parse.Collection.extend({
      model: Word
    })

  words = new Words();

  words.fetch({
    success: function(words) {
      console.log(words);
      console.log(words.length);
      var rand = Math.floor(Math.random() * words.length);
      console.log(rand);
      console.log(words.models[rand].attributes);

      var wordBox = document.getElementById("the-word");
      wordBox.innerHTML = words.models[rand].attributes.word;

      var typeBox = document.getElementById("the-type");
      typeBox.innerHTML = words.models[rand].attributes.type;

      var numbBox = document.getElementById("numb");
      numbBox.innerHTML = words.length;

      thisWord = words.models[rand];
      console.log(thisWord);

    },
    error: function(words, error) {
      console.log(error);
    }
  })

}

function getArrayOfUsed() {

  var Word = Parse.Object.extend("PlayedWord"),
    Words = Parse.Collection.extend({
      model: Word
    })

  words = new Words();

  words.fetch({
    success: function(words) {
      console.log(words);
      console.log(words.length);

      displayUsed(words);

    },
    error: function(words, error) {
      console.log(error);
    }
  })

}

function displayUsed(used) {

  var listContainer = document.getElementById("results");

  // Make the list itself which is a <ul>
  var listElement = document.createElement("ul");

  // add it to the page
  listContainer.appendChild(listElement);

  // Set up a loop that goes through the items in listItems one at a time
  var numberOfListItems = used.length;

  for( var i =  0 ; i < numberOfListItems ; ++i){

    // create a <li> for each one.
    var listItem = document.createElement("h3");

    // add the item text
    listItem.innerHTML = used.models[i].attributes.word;

    // add listItem to the listElement
    listElement.appendChild(listItem);

  }

  document.getElementById("loadingSign").innerHTML = "";

}

function submitForm() {

  var wordText = document.forms["sp2"].elements["word"].value;
  var wordType = document.forms["sp2"].elements["sel1"].value;

  if (wordText.length >= 1) {
    if (wordType.length >= 1) {

      var WordNew = Parse.Object.extend("Word");
      var wordToSave = new WordNew();

      wordToSave.save({
        word: wordText,
        type: wordType
      }, {
        success: function(wordToSave) {
          // Execute any logic that should take place after the object is saved.
          document.forms["sp2"].reset();
          alert('Saved: ' + wordText + ' to ' + wordType);
        },
        error: function(wordToSave, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    } else {
      alert('Please enter a type.')
    }
  } else {
    alert('Please enter a name.')
  }



}

function removeWord() {
  console.log(thisWord);

  var UsedWordNew = Parse.Object.extend("PlayedWord");
  var usedWordToSave = new UsedWordNew();


  usedWordToSave.save({
    word: thisWord.attributes.word,
    type: thisWord.attributes.type
  }, {
    success: function(usedWordToSave) {
      // Execute any logic that should take place after the object is saved.
      var wordBox = document.getElementById("the-word");
      wordBox.innerHTML = "No Word";

      var typeBox = document.getElementById("the-type");
      typeBox.innerHTML = " ";
      thisWord.destroy({
        success: function(thisWord) {
          // The object was deleted from the Parse Cloud.
        },
        error: function(thisWord, error) {
          // The delete failed.
          // error is a Parse.Error with an error code and message.
        }
      });
    },
    error: function(usedWordToSave, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });
}
