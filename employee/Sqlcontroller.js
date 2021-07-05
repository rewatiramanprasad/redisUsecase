const {ValidationError}=require('../utility/errorHandler.js')
const db = require('../utility/db.js');


async function login(emp_id,password,next) {
    let query = 'select * from empuser where emp_id=$1 and password_md5=$2'
    let value=[emp_id,password]
    let result = await db.executeWithParameter(query,value)
    if (result.rows.length==1){
        return result.rows
    }
    else{
        
        next(new ValidationError('wrong combination of id and password'))
        return []
    }

    
}

async function getAll() {
    let query = 'SELECT * FROM employee ORDER BY id ASC'
    
    let result = await db.execute(query)
    return result

    
}

async function getById(id) {
    let query = 'select * from employee where department=$1'
    let value = [id]
    
        const result = await db.executeWithParameter(query, value)
        return result.rows
    
}

async function addEmployee(value) {
    let query = 'insert into employee values($1,$2,$3,$4,$5,$6)'
   
        const result = await db.executeWithParameter(query, value)
        return result.rows
    
}

async function deleteEmployee(id) {
    let query = 'DELETE FROM employee WHERE id=$1'
    let value = [id]
    const result = await db.executeWithParameter(query, value)
    return result
   
}

async function updateEmployee(columname, newvalue, id) {
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

    
        const result = await db.executeWithParameter(query, value)
        //console.log("controller"+result.rowCount);
        return result
    
}



module.exports = { getAll, getById, addEmployee, deleteEmployee, updateEmployee,login }