const $ = require('jquery');
const STORAGE_NAME = 'darkmode';

/**
 * @returns {Boolean}
 */
getStorage = () => {
    try {
        return window.localStorage.getItem(STORAGE_NAME) === 'true';
    } catch (error) {
        return false;
    }
}

/**
 * @param  {Boolean}  val
 */
setStorage = (val) => {
    window.localStorage.setItem(STORAGE_NAME, val);
}

const dark = {
    getVal: () => {
        return getStorage();
    },
    
    setVal: (val) => {
        setStorage(val);
    },
    
    change: (enable) => {
        $('.dark-css').remove();
        enable && $('head').append('<link href="/css/dark.css" rel="stylesheet" class="dark-css">');
    }
};

module.exports = dark;
