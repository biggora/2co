/**
 * @created     2012-03-11 16:18:05
 * @category    Payments Gatways
 * @package     2CO
 * @version     0.0.1
 * @copyright   Copyright (c) 2009-2011 - All rights reserved.
 * @license     MIT License
 * @author      Alexey Gordeyev IK <aleksej@gordejev.lv>
 * @link        http://www.gordejev.lv
 */

module.exports = {
        create_comment:{
            url:'/api/sales/create_comment',
            method:'POST'
        },
        create_coupon :{
            url:'/api/products/create_coupon',
            method:'POST'
        },
        create_option :{
            url:'/api/products/create_option',
            method:'POST'
        },
        create_product:{
            url:'/api/products/create_product',
            method:'POST'
        },
        delete_coupon :{
            url:'/api/products/delete_coupon',
            method:'POST'
        },
        delete_option :{
            url:'/api/products/delete_option',
            method:'POST'
        },
        delete_product:{
            url:'/api/products/delete_product',
            method:'POST'
        },
        detail_company_info:{
            url:'/api/acct/detail_company_info',
            method:'GET'
        },
        detail_contact_info:{
            url:'/api/acct/detail_contact_info',
            method:'GET'
        },
        detail_coupon:{
            url:'/api/products/detail_coupon',
            method:'GET'
        },
        detail_option:{
            url:'/api/products/detail_option',
            method:'GET'
        },
        detail_pending_payment:{
            url:'/api/acct/detail_pending_payment',
            method:'GET'
        },
        detail_product:{
            url:'/api/products/detail_product',
            method:'GET'
        },
        detail_sale:{
            url:'/api/sales/detail_sale',
            method:'GET'
        },
        list_products :{
            url:'/api/products/list_products',
            method:'GET'
        },
        list_coupons :{
            url:'/api/products/list_coupons',
            method:'GET'
        },
        list_options :{
            url:'/api/products/list_options',
            method:'GET'
        },
        list_payments :{
            url:'/api/acct/list_payments',
            method:'GET'
        },
        list_sales :{
            url:'/api/sales/list_sales',
            method:'GET'
        },
        mark_shipped :{
            url:'/api/sales/mark_shipped',
            method:'POST'
        },
        reauth :{
            url:'/api/sales/reauth',
            method:'POST'
        },
        refund_invoice :{
            url:'/api/sales/refund_invoice',
            method:'POST'
        },
        refund_lineitem :{
            url:'/api/sales/refund_lineitem',
            method:'POST'
        },
        stop_lineitem_recurring :{
            url:'/api/sales/stop_lineitem_recurring',
            method:'POST'
        },
        update_coupon :{
            url:'/api/products/update_coupon',
            method:'POST'
        },
        update_option :{
            url:'/api/products/update_option',
            method:'POST'
        },
        update_product:{
            url:'/api/products/update_product',
            method:'POST'
        }
    };

