const mongoose = require('mongoose');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');
const connectDB = require('../config/db');
const { strict } = require('assert');


const productSchema = new mongoose.Schema({}, {strict:false});
const orderSchema = new mongoose.Schema({},{strict:false});
const inventorySchema = new mongoose.Schema({},{strict:false});
const usersSchema = new mongoose.Schema({},{strict:false});
// const products_itemsSchema = new mongoose.Schema({},{strict:false});
const distribution_centersSchema = new mongoose.Schema({},{strict:false});
const order_itemsSchema = new mongoose.Schema({},{strict:false});



const Product = mongoose.model('Product',productSchema);
const Order = mongoose.model('Order', orderSchema);
const Inventory = mongoose.model('Inventory', inventorySchema);
const Users = mongoose.model('Users', usersSchema);
// const Products_Items = mongoose.model('Product_Items', products_itemsSchema);
const Distribution_Centers = mongoose.model('Distribution_Centers', distribution_centersSchema);
const Order_Items = mongoose.model('Order_Items',order_itemsSchema);







const loadCSV = async (filename)=>{
    const filePath = path.join(__dirname, '..','data',filename);
    console.log('Looking for file');

    if(!fs.existsSync(filePath)){
        console.log("no file exist",filename);
        return [];
    }
    const jsonArray = await csv().fromFile(filePath);
    return jsonArray;
};

const importData = async()=>{
    try{
        await connectDB();

        await Product.deleteMany();
        await Order.deleteMany();
        await Inventory.deleteMany();
        await Users.deleteMany();
        await Distribution_Centers.deleteMany();
        // await Products_Items.deleteMany();
        await Order_Items.deleteMany();

        const products = loadCSV('products.csv');
        const orders = loadCSV('orders.csv');
        const inventory = loadCSV('inventory_items.csv');
        const distribution_centers = loadCSV('distribution_centers.csv');
        const order_items = loadCSV('order_items.csv');
        const users = loadCSV('users.csv');

        await Product.insertMany(products);
        await Order.insertMany(orders);
        await Inventory.insertMany(inventory);
        await Distribution_Centers.insertMany(distribution_centers);
        await Order_Items.insertMany(order_items);
        await Users.insertMany(users);

        console.log("Data Imported Successfully");
        process.exit();
    } catch (error){
        console.log("Error Importing Data:", error);
        process.exit(1);
    }
};

importData();