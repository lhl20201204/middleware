
class MiddleWare {

  constructor()
  { 
    this.info = {
        name:'lhl',
        age:21
    }
    
  }

  run()
  {
      console.log('我开始执行',[...arguments]);
  }

  call()
  {
    console.log('我开始第二次执行',[...arguments]);
  }

  use()
  {
   const proto = this.__proto__
   const attrs = (Object.getOwnPropertyNames(proto))
   const unProxyAttr = ['constructor','use']
   for(let attr of attrs){
       if(unProxyAttr.includes(attr)||(typeof proto[attr] !== 'function'))
       {
           continue
       }
    
  const  middleWares = [...arguments].map(v=>v(this)).reverse()
    Object.defineProperty(this, attr,{
         get(){           
           return  middleWares.reduce((m,v)=>v(m),proto[attr])
         }
    })

   }

  }

}
const middleWare1 = (ctx)=>(next)=>function (){
    console.log(1)
      next(...arguments)
    console.log(4)
    console.log('运行结束', ctx)
}
const middleWare2 = (ctx)=>(next)=>function(){
    console.log(2)
    next(...arguments)
    console.log(3)
}
const obj = new MiddleWare()

obj.use(middleWare1,middleWare2)

obj.run('ddjsaljasl','yuhinkjlkml')
   
obj.call('13234','7678879')


