const model=require("../../models");
const jwt=require('jsonwebtoken');

module.exports=async function(req,res,date){
  let dateObj;
  if(!date){
    const tmp=new Date();
    dateObj=new Date(`${tmp.getFullYear()}-${tmp.getMonth()}-${tmp.getDate()}`);
  }
  else{
    try{
      dateObj=new Date(date);
    }
    catch(e){
      res.status(400).send(`${date}is not date`);
      return;
    }
  }
  const nextDateObj=new Date(dateObj.getTime()+(24*60*60*1000));
  console.log(dateObj, nextDateObj);
  const smallIssues=await model.vote.findAll({
    attributes:[
      [model.Sequelize.fn('COUNT',model.Sequelize.col('vote')),'cnt']
    ],    
    include:{
      model:model.post,
      required:false,
      right:true,
      attributes:['title','id',"userId"]
    },
    where:{
      "$post.userId$":{
        [model.Sequelize.Op.ne]:1
      },
      "$post.createdAt$":{
        [model.Sequelize.Op.in]:[dateObj,nextDateObj]
      }
    },
    group:'post.id',
    order:[[model.Sequelize.literal('cnt'),'desc'],[model.Sequelize.literal('post.id'),'desc']],
    limit:3
  });
  res.send({
    hotIssues:smallIssues.map(x=>{
      console.log(x.dataValues);
      return{
        postId:x.post.id,
        title:x.post.title,
        createdAt:x.post.createdAt
      }
    })
  });
};