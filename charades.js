$(function() {
    Parse.$ = jQuery;

    Parse.initialize("ygVSxtL1Mhth4bDqQ64jpCL2F911WrH9JaDI8bSF", "UODjACVfGZq9IvQcGEWnrXSVSiIqXsjwb0WCK83e");

    getNewWord();

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

    },
    error: function(words, error) {
      console.log(error);
    }
  })

}

function getArrayOfUsed() {

  var Word = Parse.Object.extend("UsedWord"),
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

    },
    error: function(words, error) {
      console.log(error);
    }
  })

}

function displayUsed() {
  var cList = $('ul.mylist')
  $.each(countries, function(i)
  {
      var li = $('<li/>')
          .addClass('ui-menu-item')
          .attr('role', 'menuitem')
          .appendTo(cList);
      var aaa = $('<a/>')
          .addClass('ui-all')
          .text(countries[i])
          .appendTo(li);
  });
}

function submitForm() {

  var wordText = document.forms["sp2"].elements["word"].value;
  var wordType = document.forms["sp2"].elements["sel1"].value

  var WordNew = Parse.Object.extend("Word");
  var wordToSave = new WordNew();

  wordToSave.save({
    word: wordText,
    type: wordType
  }, {
    success: function(wordToSave) {
      // Execute any logic that should take place after the object is saved.
      alert('Saved: ' + wordToSave.word);
      document.forms["sp2"].reset();
    },
    error: function(wordToSave, error) {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      alert('Failed to create new object, with error code: ' + error.message);
    }
  });


}
