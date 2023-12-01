//! validate req.body
const validation = (schema) => {
  return (req, res, next) => {
    console.log(req.body.error);

    let { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "Err", error });
    } else {
      next(); //if all is good with validation, go execute the next function where validation function is called (inside user.routes.js)
    }
  };
};
export { validation };
