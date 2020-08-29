require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');

(async function connectToDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
    }
})();

let productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image : String,
    price: Number,
    reviews: [{
        name : String,
        rating : Number,
        comments : String 
    }]
});
let Product = mongoose.model('Product', productSchema);

module.exports = Product;