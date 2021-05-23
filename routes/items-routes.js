const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");
const { cleanString, retrieveItem, retrieveItemIndex } = require("../helpers");


router.get("/", function (req, res) {
  // return all the items in the 'items db'
  res.json({ items });
})


router.post("/", function (req, res) {
  // add a new item to the 'items db'

  let itemName = req.body.name;
  const itemPrice = req.body.price;

  // check for missing keywords and values
  if (!(itemName) || !(itemPrice)) {
    if (!(itemName) && !(itemPrice)) {
      throw new ExpressError("Keyword 'name' and 'price' with values are required.", 400);
    } else {
      if (!(itemName)) {
        throw new ExpressError("Keyword 'name' and a value are required.", 400);
      } else {
        throw new ExpressError("Keyword 'price' and a value are required.", 400);
      }
    }
  }

  // Item validations
  // Make sure item does not already exist.
  itemName = itemName.trim();
  const findItem = retrieveItem(itemName);
  if (findItem !== undefined) {
    throw new ExpressError(`Item '${itemName}' already exists with a price of ${findItem.price}.`, 404)
  }

  // Make sure price is a number.
  numTest = +itemPrice;
  if (isNaN(numTest)) {
    throw new ExpressError(`Item '${itemName}' NOT added: Value '${itemPrice}' provided for 'price' is not a number. `, 400);
  }

  // numTest is used for the price since it was coereced into a number.
  const newItem = { name: itemName, price: numTest };

  items.push(newItem);
  res.status(201).json({ added: newItem });

})


router.get("/:name", function (req, res) {
  // Retrieve the requested item.

  // inName receives a cleaned version of req.params.name -- leading and trailing 
  //  spaces removed and all %20 replaced with ' '.
  const inName = cleanString(req.params.name);

  const findItem = retrieveItem(inName);
  if (findItem === undefined) {
    throw new ExpressError(`Item '${inName}' not found.`, 404);
  }

  res.json({ item: findItem });
})


router.patch("/:name", function (req, res) {
  // Change the name and/or price of an item. The item is retrieved 
  //  by the name in the url parameters while the updated name and/or
  //  price are in req.body.
  // Both new name and new price are checked for valid values. Errors in
  //  any value causes an error and no updates are performed.

  // clean the name parameter
  const inName = cleanString(req.params.name);

  // Retrieve the item
  const findItem = retrieveItem(inName);
  if (findItem === undefined) {
    throw new ExpressError(`ERROR: No changes were made to item '${inName}'. Item '${inName}' not found.`, 404);
  }

  let newItemName = req.body.name;
  let newItemPrice = req.body.price;

  // verify that we have name and/or price keywords in the body
  // check for missing keywords and values
  if (!(newItemName) && !(newItemPrice)) {
    throw new ExpressError(`ERROR: No changes were made to item '${inName}'. Keyword 'name' and/or 'price' with values are required.`, 400);
  }

  // Item validations
  // If a new name is provided in req.body, make sure the name does not already exist.
  if (newItemName) {
    newItemName = newItemName.trim()
    // An item name was specified. Cleanup and trimming is not necessary, it appears 
    //  that json already takes care of trimming and %20.
    if (retrieveItem(newItemName) !== undefined) {
      throw new ExpressError(`ERROR: No changes were made to item '${inName}'. Item name change from '${inName}' to '${newItemName}' is not allowed because an item named '${newItemName}' already exists.`, 404)
    } else {
      findItem.name = newItemName;
    }
  }

  if (newItemPrice) {
    // Make sure price is a number.
    numTest = +newItemPrice;
    if (isNaN(numTest)) {
      throw new ExpressError(`ERROR: No changes were made to item '${inName}'. Value '${newItemPrice}' provided for 'price' is not a number. `, 400);
    } else {
      // set the new price
      findItem.price = numTest;
    }

  }

  res.json({ updated: findItem });

})


router.delete("/:name", function (req, res) {
  // Deletes the item specified by :name (req.params.name).

  // inName receives a cleaned version of req.params.name -- leading and trailing 
  //  spaces removed and all %20 replaced with ' '.
  const inName = cleanString(req.params.name);

  let itemIndex = retrieveItemIndex(inName);
  if (itemIndex === -1) {
    throw new ExpressError(`Item '${inName}' not found.`, 404);
  }

  items.splice(itemIndex, 1);
  res.json({ message: "Deleted" });

})


module.exports = router;