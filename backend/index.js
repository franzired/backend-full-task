import express from 'express';
import DB from './db.js'

const PORT = process.env.PORT || 3000;

/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

app.use(express.json());

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/** Return all todos. 
 *  Be aware that the db methods return promises, so we need to use either `await` or `then` here! 
 */

app.get('/todos', async (req, res) => {
    let todos = await db.queryAll();
    res.send(todos);
});

/**
 * Return to do with specific id
 */
app.get('/todos/:id',async (req,res)=>{
    try{
        let todo = await db.queryById(req.params.id);
        if(!todo){
            throw new Error("No Data.");
        }
        res.send(todo);
    }catch(error){
        console.log(error.message);
        res.sendStatus(404);
    }
});

/**
 * Create new todo
 */

app.post('/todos',(req,res)=>{
    const {body} = req;
    //Aufbau des geposteten Todos prüfen
    delete body._id;
    if('title' in body && 'due' in body && 'status' in body){
        const todo = {
            title:body.title,
            due:body.due,
            status:body.status
        }
        db.insert(todo)
        .then((data)=>{
            res.set('Location','/todos/'+data.insertedId.toString()).status(201).end();
        })
        .catch((error)=>{
            console.log(error.message);
            res.sendStatus(400);
        })
    }
        
});

/**
 * Edit existing todo
 */
app.put("/todos/:id",(req,res)=>{
    const {body} = req;
    let todo = {};
    //Aufbau des geposteten Todos prüfen
    if(!('title' in body || 'due' in body || 'status' in body)){
        res.sendStatus(400);
    }
    if('title' in body){ todo.title= body.title;}
    if('due' in body){ todo.due= body.due;}
    if('title' in body){ todo.title= body.title;}
    db.update(req.params.id,todo)
        .then((data)=>{
            if(data.modifiedCount > 0){
                res.sendStatus(204);
            }else{
                res.sendStatus(500);
            }
        })
        .catch((error)=>{
            console.log(error.message);
            res.sendStatus(400);
        })
});

/**
 * Delete todo
 */
app.delete("/todos/:id",(req,res)=>{
    db.delete(req.params.id)
    .then((data)=>{
        res.sendStatus(204);
    })
    .catch((error)=>{
        console.log(error.message);
        res.sendStatus(404);
    })
})

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    })

