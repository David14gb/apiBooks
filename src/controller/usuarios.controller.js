const connection = require("../database")

function getStart(request, response){

    let respuesta = {error: true, codigo:200, mensaje: 'Punto de inicio'}; 
    response.send(respuesta);
    // next();
}

function postUser(request, response){

    console.log(request.body);
    let sql = "INSERT INTO usuario (nombre, apellidos, correo, foto, password)" + 
        "VALUES ('" + request.body.nombre + "', '" +
                        request.body.apellidos + "', '" +
                        request.body.correo + "', '" +
                        request.body.foto + "', '" +
                        request.body.password + "')"; 
    console.log(sql);
    connection.query(sql, function(err, result){

        if(err)
            console.log(err);
        else
        {
            console.log("Usuario añadido");
            console.log(result);
            // if(result.insertId){
            //     console.log("Alumno añadido");
            //     response.send(String(result, insertId));
            // }else{
            //     response.send("-1")
            // }
        }
        response.send(result)
    })

}

function postLogin(request, response){
    let sql; 
    let correo = request.body.correo
    let password = request.body.password;

        // sql = 'SELECT id_usuario, nombre, apellidos, correo, foto FROM usuario WHERE (correo=' + correo + ' AND password=' + password + ')';

        sql = "SELECT id_usuario, nombre, apellidos, correo, foto FROM usuario WHERE (correo= '"+ correo +"'AND password= '"+ password +"')"

            connection.query(sql, function(err, result){

                if(err){
                    console.log(err);
                }else{
                    if(result.length>0){
                    console.log("Todos los Datos");
                    console.log(result);
                    let json = [{
                        error: false,
                        message: "Datos correctos",
                        result: result
                    }]
                    response.send(json)
                    }
                    else{
                        let json = [{
                            error: true,
                            message: "Datos incorrectos",
                            result: result
                        }]
                        response.send(json)
                    }
                }
            })
        
}

module.exports = {getStart, postUser, postLogin}