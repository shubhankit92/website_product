# website_product

### Steps to Start the application
1. Pull the code
2. run `npm install`
3. Run the server via  `node server.js `
4. Now to search any product use  `GET http://localhost:3000/search?q=mac`



### Behind the scenes work

### API to create the Website Entry in the DB
```
POST http://localhost:3000/addWebsite

{
    "name": "reliance_digital"
}
```

### API to create the Product Entry in the DB
```
POST http://localhost:3000/addProduct

{
    "name": "Macbook Pro 16 M2 16 GB",
    "image": "some_image_url",
    "price": 199500.00,
    "website": "amazon"
}
```

### API to search the products based on name

```
GET http://localhost:3000/search?q=mac

```
