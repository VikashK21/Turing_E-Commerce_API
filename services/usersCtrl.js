const { Attribute, Attribute_value, Audit, Category, Customer, Department, Order_detail, Orders, Product, Product_attribute, Product_category, Review, Shipping, Shipping_region, Shopping_cart, Tax } = require('../models/tablesSche');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = class UserService {
    async allDapart() {
        return await Department.query();
    }

    async departmentByID(id) {
        console.log(id);
        return await Department.query().findOne({
            department_id: id
        });
    }

    async allCateg() {
        return await Category.query();
    }

    async categoryByID(id) {
        console.log(id);
        return await Category.query().findOne({
            category_id: id
        });
    }

    async categoryInProductByID(id) {
        // console.log(id);
        let result = await Product_category.query().findOne({
            product_id: id
        });
        if (result) {
            return await Category.query().select('category_id', 'department_id', 'name').where({
                category_id: result['category_id']
            })
        }
        return [] || {
            "error": "SequelizeDatabaseError: Out of range value for column 'inProductId' at row 1"
        }
    }

    async categoryInDepartmentByID(id) {
        // console.log(id);
        return await Category.query().where({
            department_id: id
        })
    }

    async allAttri() {
        return await Attribute.query();
    }

    async attributesByID(id) {
        // console.log(id);
        return await Attribute.query().findOne({
            attribute_id: id
        })
    }

    async attributesValByID(id) {
        // console.log(id);
        return await Attribute_value.query().select('attribute_value_id', 'value').where({
            attribute_id: id
        })
    }

    async attributesInProductByID(id) {
        // console.log(id);
        try {
            const result = await Product_attribute.query().select('attribute_value.attribute_value_id', 'attribute_value.value', 'attribute.name').join('attribute_value', 'product_attribute.attribute_value_id', 'attribute_value.attribute_value_id').join('attribute', 'attribute.attribute_id', 'attribute_value.attribute_id').where({
                'product_attribute.product_id': id
            });
            return result;
        } catch (err) {
            return err;

        }
    }

    async allProduct() {
        return await Product.query();
    }


    async productSearch(data) {
        try {
            console.log(data.name);
            return await Product.query().where('name', 'like', `%${data.name}%`).orWhere('description', 'like', `%${data.description}%`)
        } catch (err) {
            return err;

        }
    }


    async productById(id) {
        return await Product.query().findOne({ product_id: id })
    }


    async productsInCategoryByID(id) {
        // console.log(id);
        try {
            return await Product.query().join('product_category', 'product.product_id', 'product_category.producerrort_id').where({
                'product_category.category_id': id
            });
        } catch (err) {
            return err;
        }
    }


    async productsInDepartmentByID(id) {
        // console.log(id);
        try {
            const result = await Product.query().select('product.product_id', 'product.name', 'product.description', 'product.price', 'product.discounted_price', 'product.thumbnail').join('product_category', 'product.product_id', 'product_category.product_id').join('category', 'category.category_id', 'product_category.category_id').where({
                'category.department_id': id
            });
            return result;
        } catch (err) {
            return err;
        }
    }


    async productDetails(id) {
        return await Product.query().select('product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2').where({ product_id: id });
    }


    async productLocations(id) {
        // console.log(id);
        try {
            const result = await Product_category.query().select('category.category_id', 'category.category_name', 'department.department_id', 'department.department_name').join('category', 'product_category.category_id', 'category.category_id').join('department', 'category.department_id', 'department.department_id').where({
                'product_category.product_id': id
            });
            return result;
        } catch (err) {
            return err;
        }
    }


    async productReviews(id) {
        // console.log(id);
        try {
            const result = await Review.query().select('customer.name', 'review.review', 'review.rating', 'review.created_on').join('customer', 'customer.customer_id', 'review.customer_id').where({
                'review.product_id': id
            });
            return result;
        } catch (err) {
            console.log(err);
        }
    }


    async productPostReviews(data, id, userid) {
        try {
            const result = await Product.query().findOne({ product_id: id });
            // return result;
            if (result) {
                let together = { ...data, customer_id: userid, product_id: id }
                await Review.query().insert(together)
                return 'Your feedback is sent.';
            }
            return 'Something went wrong, try again later!!';
        } catch (err) {
            console.log(err);

        }
    }


    async loginCustomer(data) {
        try {
            const result = await Customer.query().findOne({ email: data.email });
            if (result) {
                const result2 = await bcrypt.compare(data.password, result.password);
                if (result2) {
                    return result;
                }
            }
            return false;
        } catch (err) {
            console.log(err);

        }
    }

    async registerCustomer(data) {
        try {
            const checkUp = await this.loginCustomer(data);
            console.log(checkUp);
            if (checkUp) {
                return 'This account already exist!!'
            }
            const pass = await bcrypt.hash(data.password, 10);
            data['password'] = `${pass}`
            const result = await Customer.query().insert(data);
            console.log(result);
            return 'You are successfully registered.'
        } catch (err) {
            console.log(err);

        }
    }

    async updateCustomer(data, USER_ID) {
        const result = await Customer.query().update(data).where({ customer_id: USER_ID });
        return result;
    }

    async getCustomerDe(USER_ID) {
        try {
            return await Customer.query().select('customer_id', 'name', 'email', 'address_1', 'address_2', 'city', 'region', 'postal_code', 'country', 'shipping_region_id', 'day_phone', 'eve_phone', 'mob_phone', 'credit_card').findOne({ customer_id: USER_ID });
        } catch (err) {
            return err;

        }
    }


    async addressCustomer(data, USER_ID) {
        try {
            return await Customer.query().update(data).where({ customer_id: USER_ID })
        } catch (err) {
            return err;

        }
    }


    async creditCardCustomer(data, USER_ID) {
        try {
            return await Customer.query().update(data).where({ customer_id: USER_ID })
        } catch (err) {
            return err;

        }
    }


    async shippingRegion() {
        return await Shipping_region.query();
    }


    async shippingRegionByID(id) {
        return await Shipping.query().where({shipping_region_id: id});
    }


    async taxDetails() {
        return await Tax.query();
    }


    async taxByID(id) {
        return await Tax.query().findOne({tax_id: id});
    }


    async ordersByID(id) {
        return await Order_detail.query().findOne({order_id: id})
    }


    async oredersInCustomer(id) {
        try {
            return await Order_detail.query().join('orders', 'orders.order_id', 'order_detail.order_id').where({'orders.customer_id': id})
        } catch (err) {
            console.log(err);
            
        }
    }


    async orderedDetailsByID(id) {
        try {
            return await Orders.query().findOne({order_id: id});
        } catch (err) {
            console.log(err);
            
        }
    }

    async orderCreate(data) {
        try {
            const cartID = crypto.randomBytes(6).toString('hex');
            await Shopping_cart.query().insert({ cart_id: cartID });
            const result = await Shipping.query().findOne({ shipping_id: data.shipping_id });
            const result2 = await Tax.query().findOne({ tax_id: data.tax_id });
            if (result && result2) {
                await Orders.query().insert(data);
                return 'Your order is successfully placed.'
            }
            return 'One of the ID is wrong!!'
        } catch (err) {
            console.log(err);
            
        }
        
    }

};

console.log(typeof crypto.randomBytes(6).toString('hex'));