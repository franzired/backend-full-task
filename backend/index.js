import express from 'express';
import DB from './db.js'
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './keycloak.config.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger.config.js';

const PORT = process.env.PORT || 3000;

/** Passport-Options */

const passport_options = {
    'jwtFromRequest' : (req)=>{
        console.log("in jwt from Request");
        let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if(!token){
            if(req.cookies.token){
                token = req.cookies.token;
            }
        }
        return token;
    },
    'secretOrKey' : `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy8yBKM7qsdM/NhsUpjPPwFuhYxTTUmWddJ0J5pIpgVBnFuSBFkTk3AzvYJrFLaHjOahEbs6/WaRuR2TOgbtJi1SEcwNk/mArwGpeTzOGo3g6chiy4ScmEtHTK5+18Mz5+NDhQ6S23joDm6zpQLM2yoNIUDMCPctlb3IiuZl2LKqOCdqCiBExORGKkDKlU8UH5hTSc+C8sp0EOx/xoN0UoWVFjd74fu30Vvw4tS0QomUN19L0VMrS14HmOFbJQaEMGIWmP2hJhGjFd8GTqQmN6OJzeM3cG/VdYfAyeY9yBMxtGTkSvuqVH2NIEPnACtHU3IfGpRCk7GsQ9fJc4BB6yQIDAQAB
-----END PUBLIC KEY-----`
}

/** Swagger-Dokumentation erstellen */

const swaggerDocs = swaggerJsdoc(swaggerOptions);


/** Zentrales Objekt für unsere Express-Applikation */
const app = express();

app.use(express.json());
app.use(cookieParser());

passport.use(new Strategy(passport_options,(payload,done)=>{
    return done(null,payload);
}))

app.use("/todos",passport.authenticate('jwt',{session:false, failureRedirect:'/login'}));

//Swagger Middleware

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/** global instance of our database */
let db = new DB();

/** Initialize database connection */
async function initDB() {
    await db.connect();
    console.log("Connected to database");
}

// implement API routes

/**
 * @swagger
 * /todos:
 *  get:
 *    summary: Gibt alle Todos zurück
 *    tags: [Todos]
 *    responses:
 *      '200':
 *        description: Eine Liste aller Todos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Todo'
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


/**
 * Login
 */

app.get("/login",(req,res)=>{
    if(req.user || req.cookies.token){
        console.log("Token already set.");
        return res.sendStatus(200);
    }
    console.log("Fetching token..");
    const params = new URLSearchParams();
    params.append('grant_type','password');
    params.append('username','public');
    params.append('password','todo');
    fetch(config.token_endpoint,{
        method:"POST",
        headers:{
            "Authorization": "Basic dG9kby1iYWNrZW5kOjFWTlRsQ3ZzaHJjWkQ0Zm0wZUpqVE9QZWN2d210M0x5",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
    }).then((response)=>{
        if(response.ok){
            return response.json();
        }else{
            console.log(response);
            throw new Error("Response not ok.");
        }
    })
    .then((data)=>{
        res.cookie('token',data.access_token,{maxAge:data.expires_in*1000}).sendStatus(200);
    })
    .catch((error)=>{
        console.log(error.message);
        res.sendStatus(401);
    })
});