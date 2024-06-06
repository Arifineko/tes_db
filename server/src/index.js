const express = require('express');
const mysql = require('mysql2')

const app = express()
app.use(express.json())

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'arifineko54321',
    database: 'wo',
})

app.post('/', (req, res) => {
    const body = req.body
    const query = `INSERT INTO form (Nama_Depan, Nama_Belakang, Email, No_HP, Konsep, id_user, is_update) VALUES ('${body.Nama_Depan}', '${body.Nama_Belakang}', '${body.Email}', '${body.No_HP}', '${body.Konsep}', '${body.id_user}', '${body.is_update}');`

    db.execute(query, (err, rows) => {
        if (err) {
            res.json({
                message: 'failed to connect db'
            })
        }

        res.json({
            message: 'success connect to db',
            data: rows
        })
    })
})

app.get('/', (req, res) => {
    const query = 'select * from form'
    db.execute(query, async (err, rows) => {
        if (err) {
            await res.json({
                message: 'failed to connect db'
            })
        }

        await res.json({
            message: 'success connect to db',
            data: rows
        })
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM form WHERE id_form = ?`;

    db.execute(query, [id], (err, rows) => {
        if (err) {
            return res.json({
                message: 'failed to connect db'
            });
        }

        res.json({
            message: 'success connect to db',
            data: rows
        });
    });
});


app.listen(3000, (req, res) => {
    console.log('server is running on port 3000')
})

