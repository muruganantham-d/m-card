class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
       let keyword =  this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'   //case insensitive
            }
       }: {};          //if not match emty object        

       this.query.find({...keyword})
       return this;       // why we return this object ? we also use filter , pagenat, so for chain funtion
    }


    filter(){
        const queryStrCopy = { ...this.queryStr };
  
        //removing unnessery fields from query, for avoid error
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach( field => delete queryStrCopy[field]);
        
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

        this.query.find(JSON.parse(queryStr));  //mongo db only acept object methoads only

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;















// $regex  --> mongo db query operatore