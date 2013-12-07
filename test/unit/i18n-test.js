describe("Translation", function(){
    var translator;
    var uk, ru;
    
    beforeEach(function(){
        translator = new Translator();
        uk = {
            locale: "uk",
            "translated":"translation_uk"
        };
        
        ru = {
            locale: "ru",
            "translated":"translation_ru"
        };
    });
    
    it("return key when no translation found", function(){
        var untranslatedKey = "not_translated";
        expect(translator.get(untranslatedKey)).toBe(untranslatedKey);
    });
    
    
});

