const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
Category.findById(id).exec((err, category) => {
    if (err || !category) {
    return res.status(400).json({
        error: "Category doesn't exist",
    });
    }
    req.category = category;
    next();
});
};

exports.create = (req, res) => {
const category = new Category(req.body);
category.save((err, data) => {
    if (err) {
    return res.status(400).json({
        error: errorHandler(err),
    });
    }
    res.json({ data });
});
};

exports.read = (req, res) => {
return res.json(req.category);
};

exports.update = (req, res) => {
// console.log('req.body', req.body);
// console.log('category update param', req.params.categoryId);
Category.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { name: req.body.name } },
    { new: true },
    (err, data) => {
        if (err) {
            console.log(err);
        return res.status(400).json({
            error: errorHandler(err),
        })
    }
    res.json(data);
    }
);
};

exports.remove = (req, res) => {
const category = req.category;
category.remove((err, data) => {
    if (err) {
    return res.status(400).json({
        error: errorHandler(err),
    });
    }
    res.json({
    message: 'Category deleted',
    });
});
};

exports.list = (req, res) => {
Category.find().exec((err, data) => {
    if (err) {
    return res.status(400).json({
        error: errorHandler(err),
    });
    }
    res.json(data);
});
};
