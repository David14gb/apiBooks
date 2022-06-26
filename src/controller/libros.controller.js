const connection = require("../database")

function getStart(request, response){

    let respuesta = {error: true, codigo:200, mensaje: 'Punto de inicio'}; 
    response.send(respuesta);
    // next();
}

function getLibros(request, response){

    let sql;

    if(request.query.id_usuario){
        sql = "SELECT id_libro, titulo, tipo, autor, precio, libro.foto FROM appbooks.libro WHERE id_usuario='" + request.query.id_usuario +"'";
    }

    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Usuarios Id_usuario y los libros");
            response.send(result);
        }
    });

}

function getLibrosId(request, response) {
    let sql;

    if(request.query.id_libro){
        sql = "SELECT id_libro, id_usuario, titulo, tipo, autor, precio, libro.foto FROM appbooks.libro WHERE id_libro='" + request.query.id_libro +"'";
    }

    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Libros con id");
            response.send(result);
        }
    });
}

function postLibros(request, response){

    console.log(request.body);
    let sql = "INSERT INTO libro (id_usuario, titulo, tipo, autor, precio, foto)" + 
        "VALUES ('" + request.body.id_usuario + "', '" +
                        request.body.titulo + "', '" +
                        request.body.tipo + "', '" +
                        request.body.autor + "', '" +
                        request.body.precio + "', '" +
                        request.body.foto + "')"; 
    console.log(sql);
    connection.query(sql, function(err, result){

        if(err)
            console.log(err);
        else
        {
            console.log("Libro añadido");
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

function putLibros(request, response){

    let id = request.body.id_libro
    let idUsuario = request.body.id_usuario;
    let titulo = request.body.titulo;
    let autor = request.body.autor;
    let precio = request.body.precio;
    let foto = request.body.foto;
    let params = [idUsuario, titulo, autor, precio, foto, id]
    let sql = "UPDATE libro SET id_usuario = COALESCE(?, id_usuario) , " + 
               "titulo = COALESCE(?, titulo), " + "autor = COALESCE(?, autor), " + 
               "precio = COALESCE(?, precio), " + "foto = COALESCE(?, foto)  WHERE id_libro = ?";
    console.log(sql); 
    connection.query(sql, params,function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {   
            console.log("Libro modificado");
            response.send(result);
        }
    })
}

function deleteLibros(request, response){
    let id = request.body.id;
    params = [id]
    console.log(id);

    let dele = `DELETE FROM libro WHERE id_libro=?`;

    connection.query(dele, params, function(err, result)
        {
            if(err){
                console.log(err);
            }else{
                console.log("Libro borrado");
                console.log(result);
            }
            response.send(result)
        })
}

module.exports = {getStart, getLibros, getLibrosId, postLibros, putLibros, deleteLibros}
