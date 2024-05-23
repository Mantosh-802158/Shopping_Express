const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const mysql = require("mysql2");
app.use(cors());

app.use(express.json());
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.CARTS,
  password: process.env.PASSWORD,  
});
app.listen(8080, () => {
  console.log("app is listening at port 8080");
});

/*app.get("/", (req, res) => {
  // res.send("hello from backend");
  try {
    db.query("select * from mycart", (err, result) => {
      if (err) return res.send("error");
      //   console.log(typeof(res.json(result)));
      return res.json(result);
    });
  } catch (err) {
    console.log("Error is: ", err);
  }
});*/

/*app.get("/purchaseTable", (req, res) => {
  try {
    db.query("select *from purchase", (err, result) => {
      if (err) return res.send("error");
      return res.json(result);
    });
  } catch (err) {
    console.log("errrr is : --------", err);
  }
});*/
app.get('/currentUser',(req,res)=>{
  db.query('select *from current_customer',(err,result)=>{
    if(err) return res.json('error');
    else return res.json(result);
  })
})

app.get("/currentUserProducts",(req, res)=>{
  db.query('select uc.product_id from all_users_cart uc, current_customer cc where cc.present_user=uc.username',(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})

app.post("/", (req, res) => {
  const sql =
    "insert into all_users_cart(`username`,`product_id`,`product_quantity`,`total_price`,`final_price`) values(?)";
  const values = [
    req.body.currentUser,
    req.body.productId,
    1,  
    req.body.discountPrice,
    req.body.discountPrice
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json("error");
    return res.json(result);
  });
});


app.post("/purchaseTable", async (req, res) => {
  console.log("post request for purchase table");
  let sql =
    "update purchase set `product_id`=?, `product_quantity`=?,`total_price`=? where `product_id`=?";
  
  db.query(
    sql,
    [req.body.productId, req.body.quant, req.body.total_p, req.body.productId],
    (err, result) => {
      if (err) return res.json(console.log("err----", err));
      return res.json(result);
    }
  );
 
});

app.post("/getProductRecord", (req, res) => {
  let sql = "select *from purchase where `product_id`=?";
  db.query(sql, [req.body.productId], (err, result) => {
    if (err) return res.json("error occured while giving data:", err);
    return res.json(result);
  });
});

/*app.post("/removeFromPurchase", (req, res) => {
  db.query(
    "delete from purchase where `product_id`=?",
    [req.body.p_id],
    (err, result) => {
      if (err) return res.json("error");
      return res.json(result);
    }
  );
});*/

/*app.post("/removeRow", (req, res) => {
  // deleteFromPurchase(res.body.p_id);
  let sql = "delete from mycart where `product_id`=?";
  db.query(sql, [req.body.p_id], (err, result) => {
    if (err) res.json("error");
    return res.json(result);
  });
});*/


/*app.post('/insertIntoPurchase',(req,res)=>{
  db.query('insert into purchase values(?)',[[req.body.productId,1,req.body.discountPrice]],(err,result)=>{
    if(err) res.json("error");
    return res.json(result);
  })
})*/

app.post('/verifyProductInCart',(req,res)=>{
  db.query('select *from mycart where `product_id`=?',[req.body.productId],(err,result)=>{
    if(err) res.json('error');
    return res.json(result);
  })
})

/*app.get('/getTotalPrice',(req,res)=>{
  db.query('select sum(total_price) as total_sum from purchase',(err,result)=>{
    if(err) return res.json("error");
    return res.json(result);
  })
})*/

app.post('/signUpCustomer',(req,res)=>{
  let customerDetails = [req.body.username,req.body.firstName,req.body.lastName,req.body.phoneNumber,req.body.city,req.body.password];
  db.query('insert into customer values(?)',[customerDetails], (err,result)=>{
    if(err) return res.json("error")
    else return res.json(result);
  })
})

app.post('/getUserPassword',(req,res)=>{

  db.query('select username, user_password from customer where username=? and user_password=?',[req.body.username, req.body.password],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})

app.post('/updateCurrentUser',(req,res)=>{
  db.query('truncate current_customer');
  db.query('insert into current_customer values(?)',[[req.body.username]],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})

app.get('/getAllProducts',(req,res)=>{
  db.query('select *from product',(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})
app.post('/getSpecificProduct',(req,res)=>{
  db.query('select * from product where product_id like ?',[req.body.inpValue+"%"],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})

app.post('/getCurrentCustomerProducts',(req,res)=>{
  let sql = 'select p.product_id, p.product_image, p.product_title, p.product_price, uc.total_price, uc.product_quantity, uc.final_price from product p, all_users_cart uc where uc.username=? and uc.product_id=p.product_id';
  db.query(sql,[req.body.currentUser],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})
function calcFinalPrice(user, productId){
  let sql = 'update all_users_cart set final_price=product_quantity*total_price where product_id=? and username=?';
  db.query(sql,[productId,user])
}
app.post('/increaseProductQuantity',(req,res)=>{
  let sql = 'update all_users_cart set product_quantity=product_quantity+1 where product_id=? and username=?';
  db.query(sql,[req.body.productId, req.body.currentUser],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
  calcFinalPrice(req.body.currentUser,req.body.productId);
})

app.post('/decreaseProductQuantity',(req,res)=>{
  let sql = 'update all_users_cart set product_quantity=product_quantity-1 where product_id=? and username=?';
  db.query(sql,[req.body.productId, req.body.currentUser],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
  calcFinalPrice(req.body.currentUser,req.body.productId);
})

app.post('/removeProduct',(req,res)=>{
  db.query('delete from all_users_cart where product_id=? and username=?',[req.body.productId,req.body.currentUser],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})

app.post('/calcTotalPrice',(req,res)=>{
  db.query('select sum(final_price) as totalFinalPrice from all_users_cart where username=?',[req.body.currentUser],(err,result)=>{
    if(err) return res.json("error");
    else return res.json(result);
  })
})