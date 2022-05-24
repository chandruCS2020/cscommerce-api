const express = require('express');
const router = express.Router();

const {
create,
categoryById,
read,
update,
remove,
list
} = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put(
'/category/:categoryId/:userId',
requireSignin,
isAuth,
isAdmin,
async(req,res) =>{
    console.log("body",req.body);
    let category=await Movie.findById(req.params.categoryId);
    console.log(category)
}
);
router.delete(
'/category/:categoryId/:userId',
requireSignin,
isAuth,
isAdmin,
remove
);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
