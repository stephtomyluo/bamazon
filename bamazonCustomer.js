const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect(function(err){
    if (err) throw err;
    console.log('connection successful')
    displayProducts()
})

const displayProducts = () => {
    connection.query("SELECT * FROM products", function(err, res){
        for (let i = 0; i < res.length; i++){
            console.log(`${res[i].item_id}. ${res[i].product_name} || ${res[i].department_name} || $${res[i].price} || ${res[i].stock_quantity} available
            `)
        }
        promptCustomer(res)
    })
}

const promptCustomer = (res) => {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What would you like to purchase? [Quit with Q]'
    }]).then(function(answer){
        let correct = false;
        if (answer.choice.toUpperCase()=='Q'){
            process.exit()
        }
        for (let i = 0; i < res.length; i++){
            if(res[i].product_name==answer.choice){
                let correct = true
                let product = answer.choice;
                let id = i
                inquirer.prompt({
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to purchase?', 
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true
                        }else{
                            return false
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quantity) > 0){
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quantity)+"' WHERE product_name='"+product+"'", function(err, res2){
                            console.log('Made a purchase')
                            displayProducts()
                        })
                    }else{
                        console.log('Not available')
                        promptCustomer(res)
                    }
                })
            }
        }
    })
}