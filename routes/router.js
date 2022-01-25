const express = require('express');
const routes = express.Router();
const UserService = require('../services/usersCtrl');
const services = new UserService();
const { authenticationToken, authorizationToken } = require('../auth/security');
const joi = require('joi');


routes.get('/departments',authorizationToken, async (req, res) => {
    try {
        const result = await services.allDapart();
        res.send(result);
    } catch (err) {
        console.log(err);

    }
});

routes.get('/departments/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.departmentByID(ID);
        if(result) {
            res.send(result)
        }
        res.send('null');
    } catch (err) {
        console.log(err)

    }
})

routes.get('/categories',authorizationToken, async (req, res) => {
    try {
        const result = await services.allCateg();
        const updatedResult = {
            count: result.length,
            rows: result
        }
        res.send(updatedResult)
    } catch (err) {
        console.log(err);

    }
});

routes.get('/categories/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.categoryByID(ID);
        if(result) {
            res.send(result)
        }
        res.send('null');
    } catch (err) {
        console.log(err)

    }
});


routes.get('/categories/inProduct/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.categoryInProductByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err)

    }
});

routes.get('/categories/inDepartment/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.categoryInDepartmentByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err)

    }
});

routes.get('/attributes',authorizationToken, async (req, res) => {
    try {
        const result = await services.allAttri();
        res.send(result);
    } catch (err) {
        console.log(err);

    }
});


routes.get('/attributes/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.attributesByID(ID);
        if(result) {
            res.send(result)
        }
        res.send('null');
    } catch (err) {
        console.log(err)

    }
});


routes.get('/attributes/values/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.attributesValByID(ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/attributes/inProduct/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.attributesInProductByID(ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/products',authorizationToken, async (req, res) => {
    try {
        const result = await services.allProduct();
        const updatedResult = {
            count: result.length,
            rows: result
        }
        res.send(updatedResult)
    } catch (err) {
        console.log(err);

    }
});


routes.get('/products/search',authorizationToken, async (req, res) => {
    try {
        const uQuery = await req.query;
        console.log(uQuery);
        if (uQuery.hasOwnProperty('name') || uQuery.hasOwnProperty('description')) {
            const result = await services.productSearch(uQuery);
            const updatedResult = {
                count: result.length,
                rows: result
            }
            res.send(updatedResult)
        }
        else {
            res.send('No such column exist!!')
        }
        
    } catch (err) {
        console.log(err);
    }
});


routes.get('/products/:id',authorizationToken, async (req, res) => {
    try {
        const result = await services.productById(req.params.id);
        if (result) {
            res.send(result)
        }
        res.send('null')
        
    } catch (err) {
        console.log(err);
    }
});


routes.get('/products/inCategory/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.productsInCategoryByID(ID);
        const updatedResult = {
            count: result.length,
            rows: result
        }
        res.send(updatedResult)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/products/inDepartment/:id',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.productsInDepartmentByID(ID);
        const updatedResult = {
            count: result.length,
            rows: result
        }
        res.send(updatedResult)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/products/:id/details',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.productDetails(ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/products/:id/locations',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.productLocations(ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.get('/products/:id/reviews',authorizationToken, async (req, res) => {
    try {
        const ID = await req.params.id
        const result = await services.productReviews(ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.post('/products/:id/reviews',authorizationToken, async (req, res) => {
    try {
        const ID = await Number(req.params.id)
        const USER_ID = await Number(req.USER_ID);
        const data = await req.body;
        const schema = joi.object({
            review: joi.string().required(),
            rating: joi.number().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.productPostReviews(validated, ID, USER_ID);
        res.send(result)
    } catch (err) {
        console.log(err)

    }
});


routes.post('/customers', async(req, res) => {
    try {
        const data = await req.body;
        
        const schema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.registerCustomer(validated);
        console.log(result)
        res.send(result);

    } catch (err) {
        console.log(err);
        
    }
})



routes.post('/customers/login', async(req, res) => {
    try {
        const data = await req.body;
        
        const schema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.loginCustomer(validated);
        if (result) {
            const token = authenticationToken(result);
            res.cookie('key', token).send('You are successfully logged in.')
        }
        else {
            res.send('This account does not exist!!')
        }

    } catch (err) {
        console.log(err);
        
    }
})



routes.put('/customer/details',authorizationToken, async(req, res) => {
    try {
        const data = await req.body;
        const ID = await req.USER_ID;
        console.log(req.USER_ID);
        const schema = joi.object({
            day_phone: joi.string().min(10).max(12).required(),
            eve_phone: joi.string().min(10).max(12).required(),
            mob_phone: joi.string().min(10).max(12).required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.updateCustomer(validated, ID);
        if (result) {
            res.send('You have updated your account by detailing it.')
        }
        else {
            res.send('Your update did not occured!!')
        }

    } catch (err) {
        console.log(err);
        
    }
})



routes.get('/customer/details',authorizationToken, async(req, res) => {
    try {
        const userID = await req.USER_ID;
        console.log(userID);
        const result = await services.getCustomerDe(userID);
        res.send(result);
    } catch (err) {
        console.log(err);
        
    }
})



routes.put('/customer/address',authorizationToken, async(req, res) => {
    try {
        const data = await req.body;
        const ID = await req.USER_ID;
        console.log(req.USER_ID);
        const schema = joi.object({
            address_1: joi.string().required(),
            address_2: joi.string().required(),
            city: joi.string().required(),
            region: joi.string().required(),
            postal_code: joi.string().required(),
            country: joi.string().required(),
            shipping_region_id: joi.number().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.addressCustomer(validated, ID);
        console.log(result);
        if (result) {
            res.send('Your address is successfully submited.')
        }
        else {
            res.send('Something went wrong, try again!!')
        }

    } catch (err) {
        console.log(err);
        
    }
})



routes.put('/customer/creditCard',authorizationToken, async(req, res) => {
    try {
        const data = await req.body;
        const ID = await req.USER_ID;
        const schema = joi.object({
            creditCard: joi.string().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        const result = await services.creditCardCustomer(validated, ID);
        console.log(result);
        if (result) {
            res.send('Your Credit Card No. is accepted.')
        }
        else {
            res.send('Something went wrong, try again!!')
        }
    } catch (err) {
        console.log(err);
        
    }
})



routes.get('/shipping/regions', authorizationToken, async(req, res) => {
    try {
        const result = await services.shippingRegion();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})



routes.get('/shipping/regions/:id', authorizationToken, async(req, res) => {
    try {
        const ID = await req.params.id;
        const result = await services.shippingRegionByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})



routes.get('/tax', authorizationToken, async(req, res) => {
    try {
        const result = await services.taxDetails();
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})


routes.get('/tax/:id', authorizationToken, async(req, res) => {
    try {
        const ID = await req.params.id;
        const result = await services.taxByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})


routes.get('/orders/:id', authorizationToken, async(req, res) => {
    try {
        const ID = await req.params.id;
        const result = await services.ordersByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})


routes.get('/orders/inCustomer/:id', authorizationToken, async(req, res) => {
    try {
        const ID = await req.params.id;
        const result = await services.oredersInCustomer(ID);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})


routes.get('/ordered/shortDetails/:id', authorizationToken, async(req, res) => {
    try {
        const ID = await req.params.id;
        const result = await services.orderedDetailsByID(ID);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})


routes.post('/orders', authorizationToken, async(req, res) => {
    try {
        const data = await req.body;
        const schema = joi.object({
            shipping_id: joi.number().required(),
            tax_id: joi.number().required()
        })
        let validated = schema.validate(data);
        if (validated.error){
            return res.status(500).json({
                message: validated.error.message
            })
        }else{
            validated=validated.value;
        }
        validated['customer_id'] = await Number(req.USER_ID)
        const result = await services.orderCreate(validated);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
})




module.exports = routes;
