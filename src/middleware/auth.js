const auth=(req,res,next)=>{
    console.log("authorisation is checking");
    const token ="xyz";
    const isAuthorised =token==="xyz";
    if(!isAuthorised){

        res.status(404).send("unauthorised request");
    }
    else{
        console.log("you are authorised , welcome ")
        next();
    }
}
module.exports={auth}