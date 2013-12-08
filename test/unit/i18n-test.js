define(["app/i18n"], function(translator) {
    describe("Translation", function() {
        var uk, ru;
        beforeEach(function() {
            translator.locale("uk");
            uk = {
                locale: "uk",
                "translated": "translation_uk"
            };

            ru = {
                locale: "ru",
                "translated": "translation_ru"
            };
        });

        it("return key when no translation found", function() {
            var untranslatedKey = "not_translated";
            expect(translator.get(untranslatedKey)).toBe(untranslatedKey);
        });
        
        it("return translated value when translation is present", function(){
           var translatedKey = "translated";
           translator.registerTranslations(uk);
           expect(translator.get(translatedKey)).toBe(uk[translatedKey]);
        });
        
        it("returns values from correct locale", function(){
            var translatedKey = "translated";
           translator.registerTranslations(uk);
           translator.registerTranslations(ru);
           translator.locale("ru");
           expect(translator.get(translatedKey)).toBe(ru[translatedKey]);           
        });
        
        it("changes locale", function(){
           expect(translator.locale()).toBe("uk"); 
           translator.locale("ru");
           expect(translator.locale()).toBe("ru"); 
        });

    });

});