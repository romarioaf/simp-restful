const NeDB = require('nedb');

let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {

    let route = app.route('/users')

    route.get((req, res) => {

        db.find({}).exec((err, data) => {

            if(err)
                app.utils.error.send(err, req, res)
            else
                res.status(200).json(data);

        })
        
    })

    route.post((req, res) => {

        console.log('body :', req.body);

        db.insert(req.body, (err, user) => {

            if(err)
                app.utils.error.send(err, req, res)
            else
                res.status(200).json(user);

        });
    
    })

    let routeId = app.route('/users/:id')

    routeId.get((req, res) => {

        db.findOne({_id: req.params.id}).exec((err, user) => {
            
            if(err)
                app.utils.error.send(err, req, res)
            else
                res.status(200).json(user)

        });

    })

    routeId.put((req, res) => {

        db.update({_id: req.params.id}, req.body, err => {
            if(err)
                app.utils.error.send(err, req, res)
            else
                res.status(200).json(req.body)
        })

    })

    routeId.delete((req, res) => {

        db.remove({_id: req.params.id}, {}, err => {
            if(err)
                app.utils.error.send(err, req, res)
            else
                res.status(200).json({id: req.params.id})
        })

    })

};