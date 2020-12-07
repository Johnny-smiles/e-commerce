const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  }).then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Tag.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.post('/', (req, res) => {
  // create a new category
  Tag.create(
    req.body
  )
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Tag.update(req.body, {
    where:{
      id: req.params.id,
    },
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tag => res.json(tag))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;
