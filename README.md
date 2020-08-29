# E-commerce-Application
Backend for a simple E-commerce application

# Demo
The backend is deployed at: 
https://terribly-tiny-tales-challenge.herokuapp.com/

It uses the MongoDB Atlas cloud provider for database hosting

# API
For your convenience, the repo includes a postman collection to test the API.

Summary of endpoints:

| HTTP method | Endpoint |
| ------ | ------ |
| POST | https://terribly-tiny-tales-challenge.herokuapp.com/products/create |
| GET | https://terribly-tiny-tales-challenge.herokuapp.com/products |
| GET | https://terribly-tiny-tales-challenge.herokuapp.com/products/:name |
| PATCH | https://terribly-tiny-tales-challenge.herokuapp.com/products/:name |
|DELETE | https://terribly-tiny-tales-challenge.herokuapp.com/products/:name |



# Future Improvements
In the future, the following improvements can be implemented if the application needs to scale:

1) Instead of storing the images as a base64 encoded string, we can store it as binary data. (Buffer type in MongoDB). This will save ~30% space. 
2) Furthermore, if the restriction that the request content-type should be application/json is removed, we can upload the file. Save it to a separate directory. And store only the URL in the database. This can later be replaced by a cloud file storage provider like Amazon S3. 
2) If the application needs to scale, we can use references to the documents, instead of embedding review documents into the products document. 

