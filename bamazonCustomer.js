var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "Bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    startBamazon();
});

function startBamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("Welcome to Bamazon! Where you can find all your shopping needs!");
        console.log("----------------------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].itemID + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].deparment_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
            console.log("--------------------------------------------------------------");
        }

        inquirer
            .prompt([
                {
                    name: "ID",
                    type: "input",
                    message: "What is the ID of the product you would like to buy?",
                    //Make sure user inputs a value!
                    validate: function(value) {
                        if(isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }, {
                    name: "quantity",
                    type: "input",
                    message: "How many units of the product would you like to buy?",
                    validate: function(value) {
                        if(isNaN(value)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            ]).then (function(answer) {
                var whichProduct = (answer.ID)-1;
                var productQuantity = parseInt(answer.quantity);
                //Double check this formula. Not sure how to word it correctly. Research tofixed
                var totalCost = parseFloat(((res[whichProduct].price)*productQuantity).toFixed(2));

                //check against quantity
                if (res[whichProduct].stock_quantity >= productQuantity) {
                    connection.query("UPDATE products SET ? WHERE ?", [
                        {stock_quantity: (res[whichProduct].stock_quantity - productQuantity)},
                        {itemID: answer.ID}
                    ], function (err, result) {
                        if (err) throw err;
                        console.log("Your total is $" + totalCost.toFixed(2) + " for the item(s)!");
                        purchaseAnother();
                    });
                } else {
                    console.log("Sorry, that item is in limited stock.");
                }

            })
    })
}

function purchaseAnother() {
    inquirer
        .prompt([
            {
                name: "keepShopping",
                type: "confirm",
                message: "Would you like to continue shopping?"
            }
        ]).then(function(answer) {
            if (answer.reply) {
                startBamazon();
            } else {
                console.log("Thank you for your business, please shop with us again soon!")
            }
        })
}