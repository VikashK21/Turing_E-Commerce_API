const { Model } = require('objection');
const knex = require('../config/config');
Model.knex(knex);


class Attribute extends Model {
    static get tableName() {
        return 'attribute';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 12 }
            }
        }
    }
};

class Attribute_value extends Model {
    static get tableName() {
        return 'attribute_value';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['value'], 
            properties: {
                attribute_value_id: { type: 'integer' },
                attribute_id: { type: 'integer' },
                value: { type: 'string', maxLength: 100 }
            }
        }
    }
};

class Audit extends Model {
    static get tableName() {
        return 'audit';
    }

    $beforeInsert() {
        this.created_on = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['message'], 
            properties: {
                audit_id: { type: 'integer' },
                order_id: { type: 'integer' },
                message: { type: 'string' },
                code: { type: 'integer' }
            }
        }
    }
};

class Category extends Model {
    static get tableName() {
        return 'category';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                category_id: { type: 'integer' },
                department_id: { type: 'integer' },
                name: { type: 'string', maxLength: 100 },
                description: { type: 'string', maxLength: 1000 }
            }
        }
    }
};

class Customer extends Model {
    static get tableName() {
        return 'customer';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                customer_id: { type: 'integer' },
                name: { type: 'string', maxLength: 50 },
                email: { type: 'string', maxLength: 100 },
                password: { type: 'string', minLength: 8},
                credit_card: { type: 'string' },
                address_1: { type: 'string', maxLength: 100 },
                address_2: { type: 'string', maxLength: 100 },
                city: { type: 'string', maxLength: 100 },
                region: { type: 'string', maxLength: 100 },
                postal_code: { type: 'string', maxLength: 100 },
                country: { type: 'string', maxLength: 100 },
                shipping_region_id: { type: 'integer' },
                day_phone: { type: 'string', maxLength: 100 },
                eve_phone: { type: 'string', maxLength: 100 },
                mob_phone: { type: 'string', maxLength: 100 },
            }
        }
    }
};

class Department extends Model {
    static get tableName() {
        return 'department';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                department_id: { type: 'integer' },
                name: { type: 'string', mixLength: 100 },
                description: { type: 'string', mixLength: 1000 }
            }
        }
    }
};

class Order_detail extends Model {
    static get tableName() {
        return 'order_detail';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                item_id: { type: 'integer' },
                order_id: { type: 'integer' },
                product_id: { type: 'integer' },
                attributes: { type: 'string', maxLength: 1000 },
                product_name: { type: 'string', maxLength: 100 },
                quantity: { type: 'integer' },
                unit_cost: { type: 'decimal' },
            }
        }
    }
};

class Orders extends Model {
    static get tableName() {
        return 'orders';
    }

    $beforeInsert() {
        this.created_on = new Date();
    }
    $afterUpdate() {
        this.shipped_on = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                order_id: { type: 'integer' },
                // total_amount: { type: 'decimal' },
                status: { type: 'integer' },
                comments: { type: 'string', maxLength: 225 },
                customer_id: { type: 'integer' },
                auth_code: { type: 'string', maxLength: 50 },
                reference: { type: 'string', maxLength: 50 },
                shipping_id: { type: 'integer' },
                tax_id: { type: 'integer' }
            }
        }
    }
};

class Product extends Model {
    static get tableName() {
        return 'product';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                product_id: { type: 'integer' },
                name: { type: 'string', maxLength: 100 },
                description: { type: 'string', maxLength: 100 },
                price: { type: 'decimal' },
                discounted_price: { type: 'decimal' },
                image: { type: 'string', maxLength: 150 },
                image2: { type: 'string', maxLength: 150 },
                thumbnail: { type: 'string', maxLength: 150 },
                display: { type: 'integer' }
            }
        }
    }
};

class Product_attribute extends Model {
    static get tableName() {
        return 'product_attribute';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            // properties: {
            product_id: { type: 'integer' },
            attribute_value_id: { type: 'integer' }
        }
    }
};

class Product_category extends Model {
    static get tableName() {
        return 'product_category';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                product_id: { type: 'integer' },
                category_id: { type: 'integer' }
            }
        }
    }
};

class Review extends Model {
    static get tableName() {
        return 'review';
    }

    $beforeInsert() {
        this.created_on = new Date();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['review', 'rating'], 
            properties: {
                review_id: { type: 'integer' },
                customer_id: { type: 'integer' },
                product_id: { type: 'integer' },
                review: { type: 'string' },
                rating: { type: 'integer' },
            }
        }
    }
};

class Shipping extends Model {
    static get tableName() {
        return 'shipping';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                shipping_id: { type: 'integer' },
                shipping_type: { type: 'string', minLength: 12 },
                shipping_cost: { type: 'desimal' },
                shipping_region_id: { type: 'integer' },
            }
        }
    }
};

class Shipping_region extends Model {
    static get tableName() {
        return 'shipping_region';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['name'], 
            properties: {
                shipping_region_id: { type: 'integer' },
                Shipping_region: { type: 'string', maxLength: 100 }
            }
        }
    }
};

class Shopping_cart extends Model {
    static get tableName() {
        return 'shopping_cart';
    }
    $afterInsert() {
        this.added_on = new Date();
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                item_id: { type: 'integer' },
                cart_id: { type: 'string', maxLength: 32 },
                product_id: { type: 'integer' },
                attributes: { type: 'string', maxLength: 1000 },
                quantity: { type: 'integer' },
                buy_now: { type: 'integer' }
            }
        }
    }
};

class Tax extends Model {
    static get tableName() {
        return 'tax';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                tax_id: { type: 'integer' },
                tax_type: { type: 'string', minLength: 12 },
                tax_percentage: { type: 'decimal' }
            }
        }
    }
};


module.exports = { Attribute, Attribute_value, Audit, Category, Customer, Department, Order_detail, Orders, Product, Product_attribute, Product_category, Review, Shipping, Shipping_region, Shopping_cart, Tax }