var fs = require('fs');
var exercises = require('./exercises.json').exercises;
var legacyTranslations = require('./legacy_translations.json');

var exerciseTitles = exercises.map((exercise) => exercise.title).sort();

function writeObjToJson(jsonName, obj) {
    fs.writeFile('./' + jsonName + '.json', JSON.stringify(obj, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

var locales = ['de','en','fr','ru'];

function generateTranslations(locale) {
    var missingTranslations = [];

    var translations = exerciseTitles.reduce((memo, exerciseTitle) => {
        var legacyTranslation = legacyTranslations[exerciseTitle] || legacyTranslations[exerciseTitle.toUpperCase() + ' X'];
        if (legacyTranslation) {
            memo[`Exercises.Title.${exerciseTitle}`] = legacyTranslation[locale];
        } else {
            missingTranslations.push(exerciseTitle);
        }
        return memo;
    }, {});

    if (missingTranslations.length) {
        console.log('missing translations for '+ locale + ' locale (' + missingTranslations.length + '): ' + missingTranslations.join(','));
    } else {
        console.log(locale + ' locale done');
    }

    writeObjToJson('translations_' + locale, translations);
}

locales.forEach(generateTranslations);