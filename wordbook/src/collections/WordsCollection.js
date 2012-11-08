define([
		'underscore', 
		'backbone',
		'src/models/WordsModel'], function(_, Backbone, WordsModel) {
		    var WordsCollection = Backbone.Collection.extend({
		        model: WordsModel,
		        url: '/addword'                
	});
	
	return WordsCollection;
});