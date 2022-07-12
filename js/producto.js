const apiUrl = "http://localhost:5215/api/Producto/";

$(document).ready(function () {
  loadData();
});

const loadData = () => {
  $.ajax({
    url: apiUrl,
    type: "GET",
    datatype: "JSON",
    success: function (data) {
      let myItems = data.response;
      //   console.log(myItems);
      let value = "";
      for (let i = 0; i < myItems.length; i++) {
        value +=
          "<tr>" +
          "<td >" +
          myItems[i].idProducto +
          "</td >" +
          "<td>" +
          myItems[i].nombre +
          "</td>" +
          "<td>" +
          myItems[i].marca +
          "</td>" +
          "<td>" +
          myItems[i].categoria +
          "</td>" +
          "<td>" +
          myItems[i].precio +
          "</td>" +
          "<td>" +
          myItems[i].cantidad +
          "</td>" +
          "<td>" +
          '<button class="btn btn-danger" onclick="deleteProduct(' +
          myItems[i].idProducto +
          ', event)">Borrar</button>' +
          '<button class="btn btn-warning" onclick="getProduct(' +
          myItems[i].idProducto +
          ', event)">Detalles</button>' +
          "</td>" +
          "</tr > ";
      }
      $("#tBodyProducto").html(value);
    },
  });
};

const crearProducto = (e) => {
  e.preventDefault();

  let formData = {
    nombre: $("#nombre").val(),
    marca: $("#marca").val(),
    categoria: $("#categoria").val(),
    precio: $("#nompreciobre").val(),
    cantidad: $("#cantidad").val(),
  };

  let dataJson = JSON.stringify(formData);

  $.ajax({
    url: apiUrl + "Create",
    type: "POST",
    contentType: "Application/json;charset=utf-8",
    data: dataJson,
    dataType: "JSON",
    success: function (data) {
      //   console.log(data);
      loadData();
      document.getElementById("createProduct").reset();
    },
    error: function (error) {
      alert("Error: " + error);
    },
  });
};

const deleteProduct = (id, e) => {
  e.preventDefault();

  let formData = {
    idProducto: id,
  };

  let dataJson = JSON.stringify(formData);

  $.ajax({
    data: dataJson,
    url: apiUrl + `Delete/${id}`,
    type: "DELETE",
    contentType: "Application/json;charset=utf-8",
    dataType: "JSON",
    success: function (data) {
      //   console.log(data);
      loadData();
    },
    error: function (error) {
      alert("Error: " + error);
    },
  });
};

const getProduct = (id, e) => {
  e.preventDefault();
  $.ajax({
    url: apiUrl + `Get/${id}`,
    type: "GET",
    dataType: "JSON",
    success: function (data) {
      let myItem = data.response;
      // console.log(myItem);
      let value =
        "<strong>Id:</strong> " +
        myItem.idProducto +
        " <br>" +
        "<strong>Nombre:</strong> " +
        myItem.nombre +
        " <br>" +
        "<strong>Marca:</strong> " +
        myItem.marca +
        " <br>" +
        "<strong>Categoría:</strong> " +
        myItem.categoria +
        " <br>" +
        "<strong>Precio:</strong> " +
        myItem.precio +
        " <br>" +
        "<strong>Cantidad:</strong> " +
        myItem.cantidad +
        " <br>" +
        '<button class="btn btn-warning" onclick="getProductDetails(' +
        myItem.idProducto +
        ')">Editar</button>';
      $("#productDetails").html(value);
    },
    error: function (error) {
      alert("Error: " + error);
    },
  });
};

const getProductDetails = (id) => {
  console.log(id);
  $.ajax({
    url: apiUrl + `Get/${id}`,
    type: "GET",
    dataType: "JSON",
    success: function (data) {
      let myItem = data.response;
      $("#nombre").val(myItem.nombre);
      $("#marca").val(myItem.marca);
      $("#categoria").val(myItem.categoria);
      $("#precio").val(myItem.precio);
      $("#cantidad").val(myItem.cantidad);

      let valor =
        '<input id="btnActualizar" type="submit" onclick="updateProduct(' +
        myItem.idProducto +
        ')" value="Actualizar" class="btn btn-warning">';
      $("#btnFormulario").html(valor);
    },
    error: function (error) {
      alert("Error: " + error);
      console.log(error);
    },
  });
};

function updateProduct(id) {
  let formData = {
    idProducto: id,
    nombre: $("#nombre").val(),
    marca: $("#marca").val(),
    categoria: $("#categoria").val(),
    precio: $("#nompreciobre").val(),
    cantidad: $("#cantidad").val(),
  };

  let formDataJson = JSON.stringify(formData);
  console.log(id);
  $.ajax({
    url: apiUrl + `Edit/${id}`,
    type: "PUT",
    data: formDataJson,
    datatype: "JSON",
    contentType: "Application/json;charset=utf-8",
    success: function (data) {
      loadData();
      document.getElementById("createProduct").reset();
    },
  });
  let valor =
    '<input id="btnCrear" type="submit" onclick="crearProducto()" value="Crear" class="btn btn-primary"> ';
  $("#btnFormulario").html(valor);
  $("#productDetails").hide();
}
