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
