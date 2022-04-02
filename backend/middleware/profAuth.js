const jwt = require('jsonwebtoken');





 exports.profguide = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        next();
    } 
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded);
        req.prof = decoded;
        console.log(req.prof);
          
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  }


