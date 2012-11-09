define(['underscore', 
	     'backbone'], function(_, Backbone) {
  return {
      shortName:   'Wordbook',
      version:     '0.1',
      displayName: 'Wordbook Database',
      maxSize:     100000,         
      queries: {
          getAllWordsQuery: 'SELECT en.name AS `en_name`, ru.name AS `ru_name` ' + 
                            'FROM translate_en_ru AS `en_ru` ' +
        	   	              'LEFT JOIN  word_en AS `en` ON en.id = en_ru.id_from ' +
        	   	              'LEFT JOIN  word_ru AS `ru` ON ru.id = en_ru.id_to ' +
                            'ORDER BY en.id DESC LIMIT 5', 

         insertEnWordQuery:        'INSERT INTO word_en(name)  VALUES (?)',
         insertRuWordQuery:        'INSERT INTO word_ru(name)  VALUES (?)',
         insertEnRuWordQuery:      'INSERT INTO translate_en_ru(id_from, id_to)  VALUES (?, ?)',
         createWordsFromTable:     'CREATE TABLE IF NOT EXISTS word_en(id INTEGER NOT NULL PRIMARY KEY, name TEXT NULL);',
         createWordsToTable:       'CREATE TABLE IF NOT EXISTS word_ru(id INTEGER NOT NULL PRIMARY KEY, name TEXT NULL);',        
         createWordsRelationTable: 'CREATE TABLE IF NOT EXISTS translate_en_ru(id INTEGER NOT NULL PRIMARY KEY, id_from INTEGER NOT NULL, id_to INTEGER NOT NULL);',
         droptTables:              'DROP TABLE word_en; DROP TABLE word_ru; DROP TABLE translate_en_ru;'
        }
   };
});
