const error_handler=require('../utility/error_handler.js')

const db = require('../utility/db.js');

async function get_all() {
    let query = 'select * from employee'
    
    let result = await db.execute(query)
    return result

    
}

async function get_by_id(id) {
    let query = 'select * from employee where department=$1'
    let value = [id]
    
        const result = await db.execute_with_parameter(query, value)
        return result.rows
    
}

async function add_employee(value) {
    let query = 'insert into employee values($1,$2,$3,$4,$5,$6)'
   
        const result = await db.execute_with_parameter(query, value)
        return result.rows
    
}

async function delete_employee(id) {
    let query = 'DELETE FROM employee WHERE id=$1'
    let value = [id]

        const result = await db.execute_with_parameter(query, value)
        return result
   
}

async function update_employee(columname, newvalue, id) {
    let value = [newvalue, id]
    let query = ''
    if (columname == 'name') {
        query = "update employee set name=$1 where id=$2"
    }
    else if (columname == "department") {
        query = "update employee set department=$1 where id=$2"
    }
    else if (columname == "gender") {
        query = "update employee set gender=$1 where id=$2"
    }
    else if (columname == "role_id") {
        query = "update employee set role_id=$1 where id=$2"
    }
    else if (columname == "active") {
        query = "update employee set active=$1 where id=$2"
    }
    console.log(query, columname, id, newvalue);

    
        const result = await db.execute_with_parameter(query, value)
        //console.log("controller"+result.rowCount);
        return result
    
}



module.exports = { get_all, get_by_id, add_employee, delete_employee, update_employee }