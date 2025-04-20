/*
 why ? "productController.js" inside "Product.create" the create mongoosh function alway return promise
 EX:: If miss some filed mongoose throw some error this asyncrones fuction inside created error,
      so we need create this middlewere and catch the error,
      this middlewere send the erorr to error middlewere
  */


//es6:
module.exports = func => (req, res, next)=>
        Promise.resolve(func(req, res, next)).catch(next)


//resolve --> promise class have resolve function


/* catch -> if erorr is comming we can capture in catch function
   after catch, "next" fucntion its called another fuction
*/
