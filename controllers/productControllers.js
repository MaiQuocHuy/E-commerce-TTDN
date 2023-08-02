import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";
import cartModel from "../models/cartModel.js";
import paymentModel from "../models/paymentModel.js";
import checkoutModel from "../models/checkoutModel.js";
import orderModel from "../models/orderModel.js";
import paypal from "paypal-rest-sdk";
import commentModel from "../models/commentModel.js";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AWGcoI6SIGOVPlQ_KQh2bGKh8LvFgB8jZYdKZSXKAqqD1j11koB3yKziv2R3kQ3kwR50N9liTQc5x_z4",
  client_secret:
    "EJLp1fMiB7ghYYAiJ9Xq8dAZAWCxj9UpN5ICW2BVV_MbpaGe96xBrPw29NSultS_Zl55qNLea9VDLitw",
});

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("branch")
      .select("-photo");
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug: slug })
      .populate("branch");
    return res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const createProductController = async (req, res) => {
  console.log("server to create");
  try {
    // console.log(req.fields);
    const { name, price, branch, inventory, quantity, gender, description } =
      req.fields;
    const { photo } = req.files;

    if (!name) {
      return res.status(404).send({
        error: "Name is required",
      });
    }
    if (!price) {
      return res.status(404).send({
        error: "Price is required",
      });
    }
    if (!gender) {
      return res.status(404).send({
        error: "Gender is required",
      });
    }
    if (!branch) {
      return res.status(404).send({
        error: "branch is required",
      });
    }
    if (!description) {
      return res.status(404).send({
        error: "Description is required",
      });
    }
    if (!inventory) {
      return res.status(404).send({
        error: "Inventory is required",
      });
    }
    if (photo && photo.size > 1000000) {
      return res.status(404).send({
        error: "Photo is required and should be less than 1mb",
      });
    }
    const slug = slugify(name);
    const product = new productModel({
      ...req.fields,
      slug: slug,
    });
    if (photo) {
      // console.log(photo);
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Created product successfully",
      product,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Created product Failed",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(404).send({
      success: true,
      message: "Product is not deleted successfully",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, branch, inventory, gender } = req.fields;
    const { photo } = req.files;

    if (!name) {
      return res.status(404).send({
        error: "Name is required",
      });
    }
    if (!price) {
      return res.status(404).send({
        error: "Price is required",
      });
    }
    if (!gender) {
      return res.status(404).send({
        error: "Gender is required",
      });
    }
    if (!branch) {
      return res.status(404).send({
        error: "Branch is required",
      });
    }
    if (!inventory) {
      return res.status(404).send({
        error: "Inventory is required",
      });
    }
    if (photo && photo.size > 10000) {
      return res.status(404).send({
        error: "Photo is required and should be less than 1mb",
      });
    }
    const slug = slugify(name);
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slug,
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.contentType;
    }
    await product.save();
    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product is not updated successfully",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

export const paginatedProductController = async (req, res) => {
  try {
    const allProduct = await productModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("branch");
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalProduct = allProduct.length;
    results.pageCount = Math.ceil(allProduct.length / limit);

    if (lastIndex < allProduct.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = allProduct.slice(startIndex, lastIndex);
    return res.json({
      results,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const paginatedOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("payment")
      .populate("checkout")
      .populate({ path: "products.product", select: "-photo" });
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const results = {};
    results.totalOrder = orders.length;
    results.pageCount = Math.ceil(orders.length / limit);

    if (lastIndex < orders.length) {
      results.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
      };
    }

    results.result = orders.slice(startIndex, lastIndex);
    return res.json({
      results,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const product = req.params;
    console.log(product);
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: product.keyword, $options: "i" } },
          { slug: { $regex: product.keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    console.log(results);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const arr = {};
    arr.totalProduct = results.length;
    arr.pageCount = Math.ceil(results.length / limit);

    if (lastIndex < results.length) {
      arr.next = {
        page: page + 1,
      };
    }
    if (startIndex > 0) {
      arr.prev = {
        page: page - 1,
      };
    }

    arr.result = results.slice(startIndex, lastIndex);
    res.json(arr);
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getProductByBranchController = async (req, res) => {
  try {
    const { bid } = req.params;
    const products = await productModel
      .find({
        branch: bid,
      })
      .select("-photo")
      .limit(6)
      .populate("branch");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getArriveProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(4)
      .sort({ createdAt: -1 })
      .populate("branch");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const productFiltersProductController = async (req, res) => {
  try {
    const { gender, price } = req.body;
    let args = {};

    console.log(gender, price);
    if (price && parseInt(price.min) >= parseInt(price.max)) {
      return res.status(404).send({
        success: false,
        message: `${price.min} >= ${price.max}`,
      });
    }
    if (gender) args.gender = gender;
    if (price.min && price.max)
      args.price = { $gte: parseInt(price.min), $lte: parseInt(price.max) };
    const products = await productModel.find(args);
    return res.status(200).send({
      success: true,
      products,
      message: "Filter Product Success",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const { id, quantity, idProduct } = req.body;
    const existCart = await cartModel.findOne({
      user: id,
      "products.product": idProduct,
    });
    console.log(existCart);
    let cart;
    if (existCart) {
      let totalQuantity = 0;
      existCart.products.forEach((item) => {
        if (item.product == idProduct) {
          totalQuantity += item.quantity;
        }
      });
      const newQuantity = quantity + totalQuantity;
      console.log(newQuantity);
      cart = await cartModel
        .findOneAndUpdate(
          {
            user: id,
            "products.product": idProduct,
          },
          {
            $set: { "products.$.quantity": newQuantity },
          },
          { new: true }
        )
        .populate({
          path: "products.product",
          populate: {
            path: "branch",
            module: "Branch",
          },
        });
    } else {
      cart = await cartModel
        .findOneAndUpdate(
          { user: id },
          {
            $push: { products: { product: idProduct, quantity } },
          },
          { new: true }
        )
        .populate({
          path: "products.product",
          populate: {
            path: "branch",
            module: "Branch",
          },
        });
    }

    return res.status(200).send({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};

export const createCartController = async (req, res) => {
  try {
    const { id } = req.body;
    const cart = await new cartModel({
      products: [],
      user: id,
    }).save();
    return res.status(200).send({
      success: true,
      message: "Success",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: `${error}`,
      error,
    });
  }
};

export const getAllProductCartController = async (req, res) => {
  try {
    const { id } = req.body;
    const existCart = await cartModel
      .findOne({
        user: id,
      })
      .populate({
        path: "products.product",
        populate: {
          path: "branch",
          module: "Branch",
        },
      });
    console.log(existCart);
    return res.status(200).send({
      success: true,
      existCart,
    });
  } catch (error) {
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const { idPro, idAuth } = req.params;
    const cart = await cartModel
      .findOneAndUpdate(
        {
          user: idAuth,
        },
        {
          $pull: { products: { _id: idPro } },
        },
        { new: true }
      )
      .populate({
        path: "products.product",
        populate: {
          path: "branch",
          module: "Branch",
        },
      });
    return res.status(200).send({
      success: true,
      message: "Deleted successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      message: "Deleted not successfully",
    });
  }
};

export const updateQuantityProductController = async (req, res) => {
  try {
    const { quantity, idPro, idUs } = req.body;
    const cart = await cartModel
      .findOneAndUpdate(
        {
          user: idUs,
          "products.product": idPro,
        },
        {
          $set: { "products.$.quantity": quantity },
        },
        { new: true }
      )
      .populate({
        path: "products.product",
        populate: {
          path: "branch",
          module: "Branch",
        },
      });
    return res.status(200).send({
      success: true,
      message: "Update quantity  successfully",
      cart,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Update quantity not successfully",
      error,
    });
  }
};

export const ClearCartController = async (req, res) => {
  try {
    const { idUs } = req.body;
    const cart = await cartModel
      .findOneAndUpdate(
        {
          user: idUs,
        },
        { $set: { products: [] } },
        { new: true }
      )
      .populate({
        path: "products.product",
        populate: {
          path: "branch",
          module: "Branch",
        },
      });
    return res.status(200).send({
      success: true,
      message: "Cleared successfully",
      cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      message: "Cleared not successfully",
    });
  }
};

export const addCheckOutOrderPaymentController = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      streetAddress,
      orderNote,
      shipFree,
      subTotal,
      payment,
      id,
    } = req.fields;

    const product = JSON.parse(req.fields.product);

    const total = product.reduce((prevValue, curValue) => {
      const Price = prevValue + curValue.quantity * curValue.product.price;
      return Price;
    }, 0);

    const totalOffice = parseInt(total) + parseInt(shipFree);

    const newProduct = product.map((item, index) => {
      return {
        name: item?.product?.name,
        description: "Good",
        quantity: item?.quantity,
        price: item?.product?.price,
        tax: "0.01",
        sku: index,
        currency: "USD",
      };
    });

    const productOrder = product.map((item, index) => {
      return {
        product: item?.product?._id,
        quantity: item?.quantity,
      };
    });

    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!phone) {
      return res.status(404).send({
        success: false,
        message: "Phone is required",
      });
    }
    if (!streetAddress) {
      return res.status(404).send({
        success: false,
        message: "StreetAddress is required",
      });
    }
    if (!orderNote) {
      return res.status(404).send({
        success: false,
        message: "OrderNote is required",
      });
    }
    if (!payment) {
      return res.status(404).send({
        success: false,
        message: "Payment is required",
      });
    }
    const money = parseInt(parseInt(shipFree) + parseInt(subTotal));
    const params = {
      name,
      email,
      phone,
      streetAddress,
      id,
      productOrder: JSON.stringify(productOrder),
      money,
      orderNote,
      payment,
    };
    const existPay = await paymentModel.findById({
      _id: payment,
    });
    if (existPay.paymentName == "Paypal") {
      const invoiceId = "48787589673"; // Replace with your invoice ID
      const uniqueInvoiceId = invoiceId + "-" + Date.now();

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        transactions: [
          {
            amount: {
              total: totalOffice.toFixed(2),
              currency: "USD",
              details: {
                subtotal: parseInt(total).toFixed(2),
                tax: "5.00",
                shipping: "0.00",
                handling_fee: "1.00",
                shipping_discount: "-1.00",
                insurance: "0.00",
              },
            },
            description: "The payment transaction description.",
            custom: "EBAY_EMS_90048630024435",
            invoice_number: uniqueInvoiceId,
            payment_options: {
              allowed_payment_method: "INSTANT_FUNDING_SOURCE",
            },
            soft_descriptor: "ECHI5786786",
            item_list: {
              items: newProduct,
              shipping_address: {
                recipient_name: "Brian Robinson",
                line1: "4th Floor",
                line2: "Unit #34",
                city: "San Jose",
                country_code: "US",
                postal_code: "95131",
                phone: "011862212345678",
                state: "CA",
              },
            },
          },
        ],
        note_to_payer: "Contact us for any questions on your order.",
        redirect_urls: {
          return_url: `http://localhost:8080/api/e-commerce/product/payment/success?${new URLSearchParams(
            params
          ).toString()}`,
          cancel_url:
            "http://localhost:8080/api/e-commerce/product/payment/cancel",
        },
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          res.status(404).send({
            success: false,
            error,
          });
        } else {
          console.log("Create Payment Response");
          console.log(payment);
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.status(200).send({
                success: true,
                forwardLink: payment.links[i].href,
              });
            }
          }
        }
      });
    } else {
      productOrder.forEach(async (item) => {
        try {
          const updatedProduct = await productModel.findByIdAndUpdate(
            { _id: item.product },
            { $inc: { inventory: -item.quantity } },
            { new: true }
          );
          console.log("Updated product:", updatedProduct);
        } catch (error) {
          console.error("Error updating product:", error);
        }
      });

      const checkout = await new checkoutModel({
        checkoutName: name,
        checkoutPhone: phone,
        checkoutEmail: email,
        checkoutAddress: streetAddress,
        user: id,
      }).save();
      const order = await new orderModel({
        products: productOrder,
        payment,
        totalmoney: money,
        orderNote,
        checkout: checkout._id,
        user: id,
      }).save();
      const cart = await cartModel.findOneAndUpdate(
        {
          user: id,
        },
        { $set: { products: [] } },
        { new: true }
      );
      res.status(200).send({
        success: true,
        forwardLink: "",
        cart,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Failed",
      error,
    });
  }
};

export const createPaymentController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({
        success: false,
        error: "Name is required",
      });
    }
    const payment = await new paymentModel({
      paymentName: name,
    }).save();
    return res.status(200).send({
      success: true,
      payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Failed",
      error,
    });
  }
};

export const getAllPaymentController = async (req, res) => {
  try {
    const payment = await paymentModel.find({});
    return res.status(200).send({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Failed",
      error,
    });
  }
};

export const getSinglePaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentModel.findById(id);
    return res.status(200).send({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Failed",
      error,
    });
  }
};

export const updatePaymentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const payment = await paymentModel.findByIdAndUpdate(
      id,
      {
        paymentName: name,
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      payment,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const handleSuccessPayment = async (req, res) => {
  try {
    const paymentId = req.query.paymentId;
    const payerId = { payer_id: req.query.PayerID };
    const { name, email, phone, streetAddress, id, money, orderNote, payment } =
      req.query;

    const productOrder = JSON.parse(req.query.productOrder);

    productOrder.forEach(async (item) => {
      try {
        const updatedProduct = await productModel.findByIdAndUpdate(
          { _id: item.product },
          { $inc: { inventory: -item.quantity } },
          { new: true }
        );
        console.log("Updated product:", updatedProduct);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    });

    const checkout = await new checkoutModel({
      checkoutName: name,
      checkoutPhone: phone,
      checkoutEmail: email,
      checkoutAddress: streetAddress,
      user: id,
    }).save();
    const order = await new orderModel({
      products: productOrder,
      payment,
      totalmoney: money,
      orderNote,
      checkout: checkout._id,
      user: id,
    }).save();
    const cart = await cartModel.findOneAndUpdate(
      {
        user: id,
      },
      { $set: { products: [] } },
      { new: true }
    );
    paypal.payment.execute(paymentId, payerId, function (error, payment) {
      if (error) {
        console.error(error);
      } else {
        if (payment.state == "approved") {
          res.send(
            "<h1>Payment completed successfully. Reload your order page</h1>"
          );
        } else {
          res.send("Payment not successful");
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const handleCancelPayment = async (req, res) => {
  try {
    res.send("Payment cancel");
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("payment")
      .populate("checkout")
      .populate({ path: "products.product", select: "-photo" });
    const totalOrder = orders.length;
    return res.status(200).send({
      success: true,
      totalOrder,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const changeStatusOrderController = async (req, res) => {
  try {
    const { id, value } = req.body;
    const order = await orderModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: { status: value },
      },
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getOrderDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel
      .findById(id)
      .populate("user")
      .populate("payment")
      .populate("checkout")
      .populate({ path: "products.product" });
    return res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getAllOrderByUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const orders = await orderModel
      .find({
        user: id,
      })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("payment")
      .populate("checkout")
      .populate({ path: "products.product", select: "-photo" });
    return res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const createCommentProduct = async (req, res) => {
  try {
    const { idProduct } = req.body;
    const comment = await new commentModel({
      product: idProduct,
      comments: [],
    }).save();
    return res.status(200).send({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.state(404).send({
      success: false,
      error,
    });
  }
};

export const saveCommentController = async (req, res) => {
  try {
    const { comment, id, idProduct } = req.body;
    const comments = await commentModel.findOneAndUpdate(
      {
        product: idProduct,
      },
      {
        $push: { comments: { comment, user: id } },
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getAllCommentsController = async (req, res) => {
  try {
    const { idProduct } = req.body;

    const comments = await commentModel
      .findOne({
        product: idProduct,
      })
      .populate({
        path: "comments.user",
      });

    return res.status(200).send({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getTotalMoneyFollowYear = async (req, res) => {
  try {
    const totalmoneyfollowYear = await orderModel.aggregate([
      {
        $match: {
          status: "Finish",
        },
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          totalMoney: { $sum: "$totalmoney" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    console.log(totalmoneyfollowYear);

    // Tạo một mảng chứa 8 năm gần nhất
    const currentYear = new Date().getFullYear();
    const recentYears = [];
    for (let i = 0; i < 8; i++) {
      recentYears.push(currentYear - i);
    }

    // Tạo kết quả trả về với các năm cần hiển thị
    const totalmoneyfollowYearWithDefaults = recentYears.map((year) => {
      const foundYear = totalmoneyfollowYear.find((item) => item._id === year);
      return {
        year: foundYear ? foundYear._id : year,
        totalMoney: foundYear ? foundYear.totalMoney : 0,
      };
    });

    return res.status(200).send({
      success: true,
      totalmoneyfollowYear: totalmoneyfollowYearWithDefaults,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      error,
    });
  }
};

export const getQuantityProductSoldoutByYear = async (req, res) => {
  try {
    const order = await orderModel
      .find({ status: "Finish" })
      .populate("products.product", "name price");
    return res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getTotalMoneyFollowMonth = async (req, res) => {
  try {
    const yearValue = new Date().getFullYear();
    const totalmoneyfollowMonthByYear = await orderModel.aggregate([
      {
        $match: {
          status: "Finish",
          createdAt: {
            $gte: new Date(`${yearValue}-01-01`), // Ngày bắt đầu của năm
            $lte: new Date(`${yearValue}-12-31`), // Ngày kết thúc của năm
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group theo tháng
          totalMoney: { $sum: "$totalmoney" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const recentMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const totalmoneyfollowMonthWithDefaults = recentMonths.map((month) => {
      const foundMonth = totalmoneyfollowMonthByYear.find(
        (item) => item._id === month
      );
      return {
        month: foundMonth ? foundMonth._id : month,
        totalMoney: foundMonth ? foundMonth.totalMoney : 0,
      };
    });

    return res.status(200).send({
      success: true,
      totalMonthFollowYear: totalmoneyfollowMonthWithDefaults,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getQuantityProductSoldoutByMonthYear = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const month = new Date().getUTCMonth() + 1;

    if (
      typeof year !== "number" ||
      year <= 0 ||
      typeof month !== "number" ||
      month <= 0 ||
      month > 12
    ) {
      return res.status(400).send({
        success: false,
        error: "Year or month not correct.",
      });
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const orders = await orderModel
      .find({
        status: "Finish",
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .populate("products.product", "name price");

    return res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getTotalMoneyFollowDay = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Lấy ngày hôm nay và trừ đi 7 ngày

    const totalmoneyfollowWeek = await orderModel.aggregate([
      {
        $match: {
          status: "Finish",
          createdAt: {
            $gte: sevenDaysAgo,
            $lt: today,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group theo ngày tháng năm
          totalMoney: { $sum: "$totalmoney" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const allDays = [];
    let currentDate = new Date(today);
    while (currentDate >= sevenDaysAgo) {
      allDays.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Merge dữ liệu từ cơ sở dữ liệu với mảng các ngày, đặt totalMoney bằng 0 cho các ngày không có dữ liệu
    const result = allDays.map((day) => {
      const foundData = totalmoneyfollowWeek.find((item) => item._id === day);
      return {
        _id: day,
        totalMoney: foundData ? foundData.totalMoney : 0,
      };
    });
    return res.status(200).send({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      error,
    });
  }
};

export const getQuantityProductSoldoutByDay = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Lấy ngày hôm nay và trừ đi 7 ngày

    const orders = await orderModel
      .find({
        status: "Finish",
        createdAt: {
          $gte: sevenDaysAgo,
          $lt: today,
        },
      })
      .populate("products.product", "name price");

    return res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      error,
    });
  }
};
