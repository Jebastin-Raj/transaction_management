const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {port} = require("./config")
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const database = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "transaction_management",
});

database.connect(err => err ? console.log("db error",err) : console.log("db connected successfully"));

app.get("/transactions",async(req,res)=>{
    try{
        const query = "SELECT * FROM transactions";
        database.query(query,(err,data)=>{
            if(err) {
                res.send({
                    status: 400,
                    errorMessage: "Oops, something went wrong with database, Please try again later"
                });
                return;
            }
            console.log(data)
            res.send({
                status: 200,
                result: data
            });
            return;
        })
    }
    catch(error){
        res.send({
            status: 400,
            errorMessage: "Oops, something went wrong with API, Please try again later"
        });
        return;
    }
});

app.post("/transactions",async (req,res)=>{
    try{
        const { transactionId, senderName, receiverName, senderAccountNumber, receiverAccountNumber, transactionDate, amount } = req?.body;

        const query = "INSERT INTO transactions (transactionId, senderName, receiverName, senderAccountNumber, receiverAccountNumber, transactionDate, amount) VALUES ('"+transactionId+"', '"+senderName+"', '"+receiverName+"', "+senderAccountNumber+", "+receiverAccountNumber+", DATE('"+transactionDate+"'), "+amount+")";
        database.query(query,(err,data)=>{
            if(err) {
                res.send({
                    status: 400,
                    errorMessage: "Oops, something went wrong with database, Please try again later"
                });
                return;
            }
            
            res.send({
                status: 200,
                result: data
            });
            return;
        })
    }
    catch(error){
        res.send({
            status: 400,
            errorMessage: "Oops, something went wrong with API, Please try again later"
        });
        return;
    }
});

app.put("/transactions/:id",async (req,res)=>{
    try{
        const { transactionId, senderName, receiverName, senderAccountNumber, receiverAccountNumber, transactionDate, amount } = req?.body;
        const { id } = req?.params;

        const query = "UPDATE transactions set transactionId = '"+transactionId+"', senderName = '"+senderName+"', receiverName = '"+receiverName+"', senderAccountNumber = "+senderAccountNumber+", receiverAccountNumber = "+receiverAccountNumber+", transactionDate = DATE('"+transactionDate+"'), amount = "+amount+" WHERE id = "+id+"";
    
        database.query(query,(err,data)=>{
            if(err) {
                res.send({
                    status: 400,
                    errorMessage: "Oops, something went wrong with database, Please try again later"
                });
                return;
            }
    
            res.send({
                status: 200,
                result: data
            });
            return;
        })
    }
    catch(error){
        res.send({
            status: 400,
            errorMessage: "Oops, something went wrong with API, Please try again later"
        });
        return;
    }
});

app.delete("/transactions/:id",async (req,res)=>{
    try{
        const { id } = req?.params;

        const query = "DELETE FROM transactions WHERE id = "+id+"";

        database.query(query,(err,data)=>{
            if(err) {
                res.send({
                    status: 400,
                    errorMessage: "Oops, something went wrong with database, Please try again later"
                });
                return;
            }

            res.send({
                status: 200,
                result: data
            });
            return;
        })
    }
    catch(error){
        res.send({
            status: 400,
            errorMessage: "Oops, something went wrong with API, Please try again later"
        });
        return;
    }
})


app.listen(port,err => err ? console.log("error",err): console.log("server running " + port))