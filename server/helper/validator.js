const {  check, validationResult } = require('express-validator')
const validationRules = {};

// ***   **  * Product rule *  **   ***  
// start
validationRules.productCreate = () => {
  return [
    check('product_name').not().isEmpty(),
    check('brand_id').isInt(),
    check('main_category_id').isInt(),
    check('sub_category_id').isInt(),
    check('third_party_url').not().isEmpty(),
    check('twod_file').optional(),
    check('threed_file').optional(),
    check('product_desc').not().isEmpty(),
    check('product_designer').not().isEmpty(),
    check('brand_desc').not().isEmpty(),
    check('product_features').not().isEmpty(),
    check('dimension_depth').optional().isInt(),
    check('dimension_height').optional().isInt(),
    check('dimension_width').optional().isInt(),
    check('multiple_flag').isBoolean()
  ]
}

validationRules.productUpdate = () => {
  return [
    check('product_id').isInt(),
    check('product_name').not().isEmpty(),
    check('brand_id').isInt(),
    check('main_category_id').isInt(),
    check('sub_category_id').isInt(),
    check('third_party_url').not().isEmpty(),
    check('twod_file').optional(),
    check('threed_file').optional(),
    check('hero_img').optional(),
    // check('product_images').not().isEmpty(),
    // check('product_image_2').optional(),
    // check('product_image_3').optional(),
    // check('product_image_4').optional(),
    check('brand_img').optional(),
    check('product_desc').not().isEmpty(),
    check('product_designer').not().isEmpty(),
    check('brand_desc').not().isEmpty(),
    check('product_data_id').optional().isInt(),
    check('features').not().isEmpty(),
    check('dimension_depth').optional().isInt(),
    check('dimension_height').optional().isInt(),
    check('dimension_width').optional().isInt(),
    check('dimention_id').optional().isInt(),
    check('multiple_flag').isBoolean()
  ]
}


validationRules.downloadZip = () => {
  return [
    check('product_list').not().isEmpty()
  ]
}

validationRules.createMainCategory = () => {
  return [
    check('main_category_name').not().isEmpty()

  ]
}

validationRules.updateMainCategoryActive = () => {
  return [
    check('main_category_id').isInt(),
    check('status').isBoolean()
  ]
}

validationRules.updateMainCategoryName = () => {
  return [
    check('main_category_id').isInt(),
    check('main_category_name').not().isEmpty()  ]
}

validationRules.createSubCategory = () => {
  return [
    check('main_category_id').isInt(),
    check('sub_category_name').not().isEmpty()
  ]
}

validationRules.updateSubCategoryActive = () => {
  return [
    check('sub_category_id').isInt(),
    check('status').isBoolean()
  ]
}

validationRules.updateSubCategoryName = () => {
  return [
    check('sub_category_id').isInt(),
    check('sub_category_name').not().isEmpty()  ]
}

validationRules.createBrand = () => {
  return [
    check('comment').not().isEmpty()
  ]
}
validationRules.createComment = () => {
  return [
    check('product_id').not().isEmpty(),
    check('user_id').not().isEmpty(),
    check('status').not().isEmpty(),
    check('comment').not().isEmpty()
  ]
}

validationRules.updateBrandActive = () => {
  return [
    check('brand_id').isInt(),
    check('status').isBoolean()
  ]
}

validationRules.updateBrandName = () => {
  return [
    check('brand_id').isInt(),
    check('brand_name').not().isEmpty()
  ]
}

validationRules.updateProductStatus = () => {
  return [
    check('product_id').not().isEmpty(),
    check('active_status').isBoolean()
  ]
}



// end


const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    // errors: extractedErrors,
    errors: errors.array(),
  })
}




module.exports = {
  validationRules,
  validate,
}
