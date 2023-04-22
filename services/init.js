const mongoose = require('mongoose');
const config = require('config');
const Role = require("../models/Role");

const role_default = config.get('role_default');

const init = {
    
    startApp : async (app) => {
        try {
            await mongoose.connect(process.env.DATABASE_URI, {})
            let role_query = { role : role_default}
            let role = await Role.findOne(role_query)
            if (role === null){
                await Role.create(role_query)
            }
            app.listen(process.env.PORT, () => console.log(`App is starting on port ${process.env.PORT}...`))
        } catch(e){
            console.log('Init Error', e.message)
            process.exit(1)
        }
    }
}

module.exports = init