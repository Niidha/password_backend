// const {createServer}=require("http")
// const {v4}=require("uuid")
// const {parse}=require("url")

// const app=createServer()
// let todoList=[]
// app.on("request",(req,res)=>{

//     const {query,pathname} = parse(req.url,true)
//     const method=req.method

//     if(pathname =="/todo"){
//         if(method=="POST"){
//             let obj;
//             req.on("data",(body)=>{
//                 const data=Buffer.from(body).toString()
//                 obj=data
//             })
//             req.on("end",()=>{
//                 const object=JSON.parse(obj)
//                 const taskObject={
//                     id:v4(),
//                     title:object.title
//                 }
//                 todoList.push(taskObject)
//                 return res.end(JSON.stringify(taskObject))
//             })

//         }else if(method=="GET"){
//             return res.end(JSON.stringify(todoList))
//         }else if(method=="DELETE"){
//             const {id}=query
//             if(!id){
//                 return res.end(JSON.stringify({message:"id is required"}))
//             }
//             const todo=todoList.find(todo=>todo.id==id)
//             if(!todo){
//                 return res.end(JSON.stringify({message:"Task does not exist"}))
//             }
//             todoList=todoList.filter(todo=>todo.id!=id)
//             return res.end(JSON.stringify({deleted:true,todo}))
//         }else{
//             return res.end(JSON.stringify({message:`${method} is not allowed`}))
//         }
//     }

// })
// app.listen(2021,(err)=>{
//     if(err){
//         return process.exit(1)
//     }
//     console.log("Running");
    
// })



// require("dotenv").config()
// const express=require("express")
// const {v4:createUUID}=require("uuid")
// const app=express()
// app.use(express.json())
// // app.get("/cart/:user_id/:product_id",(request,response)=>{
// //     return response.status(200).send(request.params)
// // })

// let todoList=[]
// app.post("/todo",(req,res)=>{
//     const {body}=req
//     const taskObject={
//       id:createUUID(),
//       title: body.title

//     }
//     todoList.push(taskObject)
//     return res.status(201).send({
//         message:"Task created!"
//     })
    
// })
// app.get("/todo",(req,res)=>{
//     return res.status(200).send({
//         message:"TaskList fetched!",
//         todoList
//     })
// })
// app.delete("/todo/:id?",(req,res)=>{
//     const {id}=req.params
//     if(!id){
//         return res.status(404).send({
//             message:"Id not found!"
//         })
//     }
//     todoList=todoList.filter(todo=>todo.id!=id)
//    return res.status(200).send({
//     message:"Task removed"
   
//    })
    
// })

// app.patch("/todo",(req,res)=>{
//     const {id,title}=req.body
//     const index=todoList.findIndex(todo=>todo.id==id)
//     if(index==-1){
//         return res.status(404).send({
//             message:"Task not found!"
//         })
//     }
//     todoList[index].title=title
//     return res.status(200).send({
//         message:"Task updated!",
//         response:todoList[index]
//     })
// })

// app.listen(process.env.PORT,(error)=>{
//     if(error){
//         return process.exit(1)
//     }
//     console.log("Server running on port",process.env.PORT);
    
// })

require("dotenv").config()


const express=require("express")
const todoRouter = require("./route/todo.route")
const userRouter = require("./route/user.route")
const passwordRouter=require("./route/password.route")
const cors=require("cors")
const db=require("./config/db")
const cartRouter = require("./route/cart.route")
const app = express()
db.connectDB()

app.use(express.json())
app.use(cors())
app.use("/v1", todoRouter)
app.use("/v2", userRouter)
app.use("/cart", cartRouter)

app.use("/password",passwordRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        return process.exit(1)
    }
    console.log("Server running on port", process.env.PORT)
})