const express = require("express");
const cors = require("cors");
const db = require("./database/db.js");
const controllers = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());


/* LOGIN */
app.get('/api/user/:id', controllers.getUserById);
app.post('/api/register', controllers.register);
app.post('/api/login', controllers.login);
/*  */


/* CART */
app.get("/api/products", controllers.getProducts);
app.get("/api/products-cart/", controllers.getProductsCart);
app.get("/api/products-getUserCart/:userId", controllers.getUserCart);	
app.delete("/api/products-emptyCart/", controllers.emptyCart);
app.post("/api/products-addCart/:userId", controllers.addProductCart);
app.put("/api/products-cart/:productId", controllers.putProduct);
app.delete("/api/products-cart/:productId", controllers.deleteProduct);

/* Password Recover*/
app.put("/api/recover", controllers.recover);
/* */

/*Edit Profile*/
app.put("/api/editprofile/:userId", controllers.editprofile);
/* */

/*pay*/
app.post('/api/pay/:userId', controllers.pay);
app.delete('/api/pay-delete/:userId', controllers.deleteCartUser);
/* */

/* Admin */
app.get('/api/admin/:id', controllers.getAdmins);
app.post('/api/adminLogin', controllers.loginAdmin);
app.get('/api/admin-payment', controllers.getPayments);
app.put('/api/admin-payment/:adminId/:invoiceId', controllers.updateInvoiceState);
/* */

/* Cocina */
app.get('/api/cocinero/:id', controllers.getCocinero);
app.post('/api/cocineroLogin', controllers.loginCocinero);
app.put('/api/cocinero-payment/:cocineroId/:invoiceId', controllers.updateInvoiceStateCocinero);
/* */


/* Comments */

app.post('/api/comment/:userId', controllers.addComment);
app.get('/api/get-comments/', controllers.getComments);

/* */ 


const PORT = 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  db();
});

module.exports = app;
