'use strict';
//shorthand for jquery document.ready() function to check status before running.
(function() {
  // using $ is convention to identify jquery object to be later identified.
  let $category = $("#selectCategories");//let declares block scope local variable.
  let $output = $("#output");//let also limits scope to block instead of whole function.

  //add id and name to each category in option tags
  $.ajax("/javascripts/categories.json").done(function(data) {
    //for each category in json file, run function.
    data.categories.forEach((e) =>
      //function = append id & name to option tags in $category.
      $category.append(`<option value="${e.id}">${e.name}</option>`));
  });

  let $types = $("#selectTypes");//let declares block scope local variable.
  //let $output = $("#output");//let also limits scope to block instead of whole function.

  //add id and name to each category in option tags
  $.ajax("/javascripts/types.json").done(function(data) {
    //for each category in json file, run function.
    data.types.forEach((e) =>
      //function = append id & name to option tags in $category.
      $types.append(`<option value="${e.id}">${e.name}</option>`));
  });

  let $products = $("#selectProducts");//let declares block scope local variable.
  //let $output = $("#output");//let also limits scope to block instead of whole function.

  //add id and name to each category in option tags
  $.ajax("/javascripts/products.json").done(function(data) {
    //for each category in json file, run function.
    data.products.forEach((e) =>
      //function = append id & name to option tags in $category.
      $products.append(`<option value="${e.id}">${e.name}</option>`));
      console.log('products', products);
  });

  //pass data argument into function and populate page.
  function display(data) {
    let html = `<h1>${data.category.name}</h1>`;
    //map translates all items to new array. 1st argument is value, 2nd is key object property
    let products = data.products.map(p => p[Object.keys(p)[0]]);
    console.log("products", products);
    console.log("data.types", data.types);
    products.forEach(p => p.typeName = data.types.filter(t => t.id === p.type)[0].name);
    products.forEach(p => html += `
      <h2>${p.name}</h2>
      <p>${p.typeName}</p>
      <p>${p.description}</p>
      `);

    $output.html(html);
  }

  $category.click(e => acme.loadProducts(parseInt(e.target.value), display));
  acme.loadProducts(0, display);
}());
