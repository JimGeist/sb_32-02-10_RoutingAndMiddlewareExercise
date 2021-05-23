// helper functions

const items = require("./fakeDb");


function cleanString(inString) {
    // cleanString removes any leading and trailing spaces and 
    // converts %20 to ' '.
    let cleanString = inString.trim();

    // lovely . . . no .replaceAll in node v12
    while (cleanString.search("%20") > -1) {
        cleanString = cleanString.replace("%20", " ");
    }

    return cleanString;

}


function retrieveItem(item) {
    // retrieveItem searches the 'item db' for the item passed in.
    // When found, return the item record, otherwise return undefined.

    const findItem = items.find(items => items.name === item)

    return findItem;

}


function retrieveItemIndex(item) {
    // retrieveItemIndex searches the 'item db' for the item passed in.
    // When found, return the index of where the item was found, otherwise return -1.

    const itemIndex = items.findIndex(items => items.name === item)

    return itemIndex;

}

module.exports = {
    cleanString: cleanString,
    retrieveItem: retrieveItem,
    retrieveItemIndex: retrieveItemIndex
};