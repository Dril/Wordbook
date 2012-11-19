// Load the WordsModel and describe tests.
define(
    [
        "../src/models/WordsModel"
    ],
    function( WordsModel ){
	
        // Describe the test suite for this module.
        describe(
            "get only deciminal script",
            function(){

                // Create our test module.
                var word = new WordsModel();
                // Test numeral strings				
				it("should equal 3", function(){
                     expect( word.addValues(1, 2) ).toBe( 3 ); 
                 });
            }
        );
    }
);