import { MongoClient,ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todos';
const MONGO_DB = process.env.MONGO_DB || 'todos';

let db = null;
let collection = null;
export default class DB {
    connect() {
        return MongoClient.connect(MONGO_URI)
            .then(function (client) {
                db = client.db(MONGO_DB);
                collection = db.collection('todos');
            })
    }

    queryAll() {
        return collection.find().toArray();
    }

    queryById(id) {
        let objid;
        return new Promise((resolve,reject)=>{
            try{
                objid = ObjectId.createFromHexString(id);
                resolve(collection.findOne({_id: objid}));
            }catch(error){
                reject(new Error(error.message));
            }
        })
    }
        // TDO: Implement queryById

    update(id, todo) {
        return new Promise((resolve,reject)=>{
            try{
                const objId = ObjectId.createFromHexString(id);
                resolve( collection.updateOne({_id: objId},
                {$set:todo}));
            }catch{
                reject(new Error("Could not resolve id."));
            }
        })
    }

    delete(id) {
        return new Promise((resolve,reject)=>{
            try{
                const objId = ObjectId.createFromHexString(id);
                resolve(collection.deleteOne({_id: objId}));
            }catch{
                reject(new Error("Could not resolve id."));
            }
        })
    }

    insert(todo) {
        return collection.insertOne(todo);
    }
}
