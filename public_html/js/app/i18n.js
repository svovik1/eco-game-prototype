function Translator(){
    var locale = "uk";
    var translations = {};
    var translator = this;
    
    this.locale = function(l){
        if (l){
            locale = l;
        }
        return locale;
    };
    
    this.registerTranslations = function(t){
        translations[t.locale] = t;
    };
    
    this.get = function(key){
        var loc = translations[locale] || {};
        var translated = loc[key];
        return (translated) ? translated : key;
    };
    
    // Installs shortcut function into global context
    t = function(key){
        return translator.get.call(translator, key);
    };
};

var translator = new Translator();