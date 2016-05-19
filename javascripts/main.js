//use Promises to handle the order of the asynchronous operations needed to load the data.
//user interface: Create a simple user interface for your product catalog where a user can select a category from a dropdown.
//When a category is selected, you must use Promises to read, first, from the categories.json to load that array of objects, then load types.json,
//then products.json.  Once all data is loaded, you need to display the products in a Bootstrap grid. Each product must display the string name
//of its product type, and product category. Not the integer id value.
"use strict";

//load categories json file
var acme = (function(acme) {
  function getCategories(selectedId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/javascripts/categories.json")
        // resolve with the single category matching the selectedId
        .done(data => resolve(data.categories.filter(e => e.id === selectedId)[0]))
        .fail((error) => reject(error));
    });
  }

  //load types json file
  function getTypes(categoryId) {
    return new Promise(function(resolve, reject) {
      $.ajax("/javascripts/types.json")
        // resolve with the list of types that match the categoryId
        .done(data => resolve(data.types.filter(e => e.category === categoryId)))
        .fail((error) => reject(error));
    });
  }

  //load products json file
  function getProducts(typeArray) {
    return new Promise(function(resolve, reject) {
      $.ajax("/javascripts/products.json")
        .done(data => {
          // resolve with the list of products matching any type in typeArray
          let typeIds = typeArray.map(t => t.id);
          resolve(data.products.filter(e => typeIds.indexOf(e[Object.keys(e)[0]].type) > -1));
        })
        .fail((error) => reject(error));
    });
  }

  //create category object with type/products arrays.
  acme.loadProducts = function(selectedId, callback) {
    var category = {};
    var types = [];
    var products = [];

    getCategories(selectedId).then(function(data) {
      category = data;
      return getTypes(category.id);
    }).then(function(data) {
      types = data;
      return getProducts(types);
    }).then(function(data) {
      products = data;
      //callback provides functionality for ajax.
      callback({ category, types, products });
      console.log('product json file', products);
      console.log('categories json:', category);
      console.log('types json:', types);
    });
  };

  return acme;
}(acme || {}));
