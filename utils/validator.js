module.exports = {
    user: (app, req, res) => {

        req.assert('name', 'Name is required.');
        req.assert('age', 'Age is required.');
        req.assert('email', 'Invalid e-mail.').isEmail();
        
        let errors = req.validationErrors();

        if(errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }

    }
}