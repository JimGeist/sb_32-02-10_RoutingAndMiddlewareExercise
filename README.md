# sb_32-02-10_RoutingAndMiddlewareExercise

## Assignment Details

Creation of a simple JSON API application to 'store' a shopping list. Each shopping list item consists of a name and a price. Applicaiton makes the use of Express Router, and since supertest is used, the app.listen is in server.js.

Application has the following routes:

**`GET /items`** - returns all items in the shopping list. 

- Response: `items: [{"name": item-1_name, "price": item-1_price}, ...{"name": item-x_name, "price": item-x_price}]`


**`POST /items`** - route is used to add a new item to the shopping list. The request must include the item name and item price.

- Request data: `{"name": "popsicle", "price": 1.45} `

- Response: `{"added": {"name": "popsicle", "price": 1.45}}`


**`GET /items/:name`** - route returns a single items name and price.

- Response: `{"item": {"name": "popsicle", "price": 1.45}}`


**`PATCH /items/:name`** - route should modifies a single item’s name and/or price.

- Request data: `{"name": "new popsicle", "price": 2.45} `

- Response: `{"updated": {"name": "new popsicle", "price": 2.45}}`


**`DELETE /items/:name`** - route  deletes a specific item from the 'db'.

- Response: `{message: "Deleted"}`



**Enhancements**
- Ensures name and price are included in `POST /items` route and provides meaningful messaging when keywords or values are missing. 
- Ensures an item with the same name is not already in the shopping list when a `POST /items` to add a new item is issued. 
- Ensures that the new name is not already in the shopping list when `PATCH /items/:name` is issued with a new name in the request data. 
- Ensures that the price is numeric in the request data for `POST /items` and `PATCH /items/:name` requests.


**Difficulties**

Testing - the delayed realization that `beforeEach` and `afterEach` functions run before after each `test` function not each `describe` function. Checking the json reponse from the api is valuable, but checking the actual datastore to ensure the change did indeed occur and was committed has a greater value.

