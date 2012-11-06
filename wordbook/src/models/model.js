var Word = Backbone.Model.extend({
  setSearchData: function() {
    var _search = ' 111';
    this.set({search: _search});
  }
});


var word = new Word;

word.on('keypress:search', function(model, search) {
  $('#search').val('111111');
});

word.set({search: '111111'});

word.setSearchData();