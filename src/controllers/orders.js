const orderModel = require("../models/orders");
const helpers = require("../helpers/helpers");
const short = require("short-uuid");

const getAllOrder = (req, res, next) => {
  const limit = req.params.limit;
  orderModel
    .getAllOrder(limit)
    .then((result) => {
      const orders = result;
      helpers.response(res, "Success get orders", orders, 200);
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Failed get orders", null, 404);
    });
};

const getOrder = (req, res, next) => {
  const id = req.params.id;
  orderModel
    .getOrder(id)
    .then((result) => {
      const order = result;
      helpers.response(res, "Success get order", order, 200);
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Failed get order", null, 404);
    });
};

const insertOrder = (req, res, next) => {
  const id = short.generate();
  const { id_user, total, payment, detailproducts } = req.body;
  const data = {
    id_order: id,
    id_user: id_user,
    total: total,
    payment: payment,
    status_payment: "unpaid",
    createdAt_order: new Date(),
  };

  orderModel
    .insertOrder(data)
    .then((data) => {
      detailproducts.map((item) => {
        const detailProduct = {
          id_order: data.id_order,
          id_product: item.id_product,
          size_order: item.size_order,
          quantity: item.quantity,
        };
        orderModel
          .insertOrderDetail(detailProduct)
          .then((datadetail) => {
            helpers.response(
              res,
              `Success insert orderdetails ${index}`,
              datadetail,
              200
            );
          })
          .catch((error) => {
            console.log(error);
            helpers.response(res, `Failed insert order ${index}`, null, 404);
          });
        helpers.response(res, "Success insert order", data, 200);
      });
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Failed insert order", null, 404);
    });
};

const updateOrder = (req, res) => {
  const id = req.params.id;
  const { id_user, total, payment, status_payment } = req.body;
  const data = {
    id_order: id,
    id_user: id_user,
    total: total,
    payment: payment,
    status_payment: status_payment,
  };
  orderModel
    .updateOrder(id, data)
    .then(() => {
      helpers.response(res, "Success update order", data, 200);
    })
    .catch((error) => {
      console.log(error);
      helpers.response(res, "Failed update order", null, 404);
    });
};
const deleteOrder = (req, res) => {
  const id = req.params.id;
  orderModel
    .deleteOrder(id)
    .then(() => {
      helpers.response(res, "Success delete data", id, 200);
    })
    .catch((err) => {
      console.log(err);
      helpers.response(res, "Failed delete order", null, 404);
    });
};

module.exports = {
  getAllOrder,
  getOrder,
  insertOrder,
  insertOrderDetail,
  updateOrder,
  deleteOrder,
};