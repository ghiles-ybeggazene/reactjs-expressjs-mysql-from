const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_USER_QUERY = 'SELECT * FROM usuarios'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())

app.get('/', (req, res) =>{
    res.send('ecoute sur le port 4000')
})

app.get('/user', (req, res) => {
    connection.query(SELECT_ALL_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/user/add', (req, res) => {
    const{ nome, sobrenome, email } = req.query
    const INSERT_USER_QUERY = `INSERT INTO usuarios(nome, sobrenome, email) VALUES('${nome}', '${sobrenome}', '${email}')`
    connection.query(INSERT_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('usuario adicionado com sucesso')
        }
    })
})


app.listen(4000, () => {
    console.log('le serveur ecoute sur le port 4000')
})