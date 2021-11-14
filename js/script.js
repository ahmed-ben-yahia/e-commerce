// function to generatProductsTabsignup customer user with rol user
function customerSignup() {

    var firstName = document.getElementById('firsName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmePassword').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var userId = JSON.parse(localStorage.getItem('userId') || '1');



    var user = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phone: phoneNumber,
        role: 'user'
    };
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    usersTab.push(user);
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userId', userId + 1)


}
// login function that allows conect by email and password
function login() {
    var email = document.getElementById('emailUser').value;
    var passsword = document.getElementById('pwd').value;

    var findedUser = serchUser(email, passsword);
    console.log('user', findedUser)
    if (findedUser) {
        if (findedUser.role == "admin") {
            //save user id into ls
            localStorage.setItem('connectedUserId', findedUser.id);
            location.replace('shop.html')

        } else {
            (findedUser.role == "user")
            //save user id into ls
            localStorage.setItem('connectedUserId', findedUser.id);
            location.replace('shop.html');
        }


    } else {
        document.getElementById('loginmsgError').innerHTML = 'verif your donne';
        document.getElementById('loginmsgError').style.color = 'red'

    }
}
// function logout
function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace('index.html');

}
// search user by email and password
function serchUser(emailParam, passwordParam) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (emailParam == users[i].email && passwordParam == users[i].password) {
            findedUser = users[i];
            break;

        }


    }
    return findedUser;
}
//adminSignup function to add admi into local storge :user with rol admi
function adminSignup() {

    var firstName = document.getElementById('nameAdmi').value;
    var lastName = document.getElementById('lastNameAdmi').value;
    var email = document.getElementById('emailAdmi').value;
    var password = document.getElementById('passwordAdmi').value;
    var confirmPassword = document.getElementById('confirmePasswordAdmi').value;
    var phoneNumber = document.getElementById('phoneNumberAdmi').value;
    var phoneNumber = document.getElementById('phoneNumberAdmi').value;
    var fax = document.getElementById('faxAdmi').value;
    var addres = document.getElementById('addresAdmi').value;
    var companyId = document.getElementById('companyId').value;
    var companyName = document.getElementById('companyName').value;
    var connectedUserId = JSON.parse(localStorage.getItem('connectedUserId'))
    var userId = JSON.parse(localStorage.getItem('userId') || '1');

    var user = {
        id: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phone: phoneNumber,
        phfaxone: fax,
        addres: addres,
        companyId: companyId,
        companyName: companyName,
        role: 'admin'
    };
    var usersTabStor = JSON.parse(localStorage.getItem('users') || '[]');
    usersTabStor.push(user);
    localStorage.setItem('users', JSON.stringify(usersTabStor));
    localStorage.setItem('userId', userId + 1)


}
//function add-category on ls
function addCategory() {
    var name = document.getElementById('categoryName').value;
    var connectedUserId = JSON.parse(localStorage.getItem('connectedUserId'))
    var categoryId = JSON.parse(localStorage.getItem('categoryIdKey') || '1')
    var category = {
        id: categoryId,
        name: name,
        userId: connectedUserId
    };
    var categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('categoryIdKey', categoryId + 1);

}
// ha4a bch nijm n5ali gategories y4hro wa7adhom
function generateOptions() {
    var connectedUserId = JSON.parse(localStorage.getItem('connectedUserId'));

    var categories = JSON.parse(localStorage.getItem('categories') || '[]');
    var categoriesSelect = '';
    for (let i = 0; i < categories.length; i++) {
        if (connectedUserId == categories[i].userId) {
            categoriesSelect = categoriesSelect + `
            <option value="${categories[i].name}">${categories[i].name}</option>`
        }


    }
    document.getElementById('productCategory').innerHTML = categoriesSelect;

}
//function add-product on ls
function addProduct() {


    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var stock = document.getElementById('productStock').value;
    var category = document.getElementById('productCategory').value;
    var productId = JSON.parse(localStorage.getItem('productIdKey') || '1');
    var connectedUserId = JSON.parse(localStorage.getItem('connectedUserId'))

    var product = {
        id: productId,
        name: name,
        price: price,
        stock: stock,
        category: category,
        userId: connectedUserId,
        isConfirmed: false

    };
    var productTab = JSON.parse(localStorage.getItem('product') || '[]');
    productTab.push(product);
    localStorage.setItem('product', JSON.stringify(productTab));
    localStorage.setItem('productIdKey', productId + 1);
}
//
function displayUserProducts() {
    var products = JSON.parse(localStorage.getItem('product') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myProducts = getUserProduct(connectedUserId, products);
    var productDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        productDiv = productDiv + `
        <div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p4.jpg" alt="">
							<div class="product-details">
								<h6>${myProducts[i].name}</h6>
								<div class="price">
									<h6>${myProducts[i].price}</h6>
									<h6 class="l-through">${myProducts[i].price}</h6>
								</div>
                                <h6>${myProducts[i].category}</h6>
                                <h6>${myProducts[i].stock}</h6>
								<div class="prd-bottom">

									<div class="social-info">
                                   
										<span class="ti-bag"></span>
                                           <button class="hover-text btn" style="background-color:#fff" onclick="goToDisplay(${myProducts[i].id})">display-product</button>
                                           
									</div>
                                    <div class="social-info">
                                   
										<span class="ti-bag"></span>
                                        <button class="hover-text btn" style="background-color:#fff" onclick="deleteProduct(${i})">DELETE</button>                                           
									</div>
									
                                           </div>         
								</div>
							</div>
						</div>
					</div>
        `

    }
    document.getElementById('products').innerHTML = productDiv


}
// function getUserProduct that returns user products
function getUserProduct(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].userId && productsTab[i].isConfirmed == true) {
            myProducts.push(productsTab[i]);

        }


    }
    console.log('may product', myProducts);
    return myProducts;
}
function goToDisplay(x) {
    localStorage.setItem('selectesProductId', x);
    location.replace('single-product.html')
}
// function searchProductById(id) {
//     var products = JSON.parse(localStorage.getItem('product') || '[]');
//     var findedProduct;
//     for (let i = 0; i < products.length; i++) {
//        if (products[i].id == id) {
//            findedProduct = products[i];
//            break;

//        }

//     }
//     return findedProduct;
// }
// /////
// function validateEdit(params) {
//     var newPrice = document.getElementById('newPriceId').value;
//     var newStock = document.getElementById('newStockId').value;
//     var products = getObjectFrpmLs('product');
//     var selectedProduId = localStorage.getItem('selectedProductId');
//     for (let i = 0; i < products.length; i++) {
//         if (products[i].id = selectedProduId ) {
//             products[i].price = newPrice;
//             products[i].stock = newStock;
//             break;

//         }


//     }
//     localStorage.setItem('products',JSON.stringify(products));
//     location.replace('product.html')

// }
function searchProductById(id) {
    var products = JSON.parse(localStorage.getItem('product'));

    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {

            findedProduct = products[i];
            break;
        }

    }
    return findedProduct;

}
//function displayEditForm that display edit form btn click
function displayEditForm() {
    var idProduct = localStorage.getItem('selectesProductId');
    var findedProduct = searchProductById(idProduct);

    var editForm = `<div class="container">
<div class="row">
    
    <div class="col-lg-12">
        <div class="login_form_inner" style="margin-top:50px">
            <h3>Edit product</h3>
            <div class="row login_form" >
            <label for="price"></label>
                <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="newPriceId" value =${findedProduct.price}  >
                </div>
                <label for="Stock"></label>
                <div class="col-md-12 form-group">
                <input type="text" class="form-control"  id="newStockId" value =${findedProduct.stock}>
            </div>
                <div> 
                </div>
                <div class="col-md-12 form-group">
                    <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()">Validate Edit</button>
                    
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;




    document.getElementById('editFormDiv').innerHTML = editForm

}
// function validateEdit: update product price and stock by new values (getted from edit form)
function validateEdit() {
    var newPrice = document.getElementById('newPriceId').value;
    var newStock = document.getElementById('newStockId').value;
    var selectesProductId = localStorage.getItem('selectesProductId');
    var product = JSON.parse(localStorage.getItem('product'));
    for (let i = 0; i < product.length; i++) {
        if (product[i].id == selectesProductId) {
            product[i].price = newPrice;
            product[i].stock = newStock;
            break

        }


    }
    localStorage.setItem('product', JSON.stringify(product));
    location.replace('product.html')

}
//tnsach tlawij 3ala (splice)
// function deleteProduct
function deleteProduct(pos) {
    var product = JSON.parse(localStorage.getItem('product'));
    product.splice(pos, 1);
    localStorage.setItem('product', JSON.stringify(product));
    location.reload();
}
//function deleteOrderAndUpdateStock: that allows to delete order by id and update product stock by ID
function deleteOrderAndUpdateStock(pos, key, idProduct, qty) {
    var objects = JSON.parse(localStorage.getItem(key));
    console.log('higguifguyuofuf', objects)
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    // update product stock
    var products = JSON.parse(localStorage.getItem('product'));
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stock += Number(qty);
            break;

        }

    }
    localStorage.setItem('product', JSON.stringify(products));
    // reload page
    location.reload();


}
// function deleteObject
function deleteObject(pos, key) {
    var objects = JSON.parse(localStorage.getItem(key));
    objects.splice(pos, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}
//function generatProductsTabs that display all products into table(from ls:product)
function generatProductsTabs() {
    var product = JSON.parse(localStorage.getItem('product'));
    for (let i = 0; i < product.length; i++) {

        var productTable = `
        <table class="table">
          <tr>
            <th>name</th>
            <th>price</th>
            <th>stock </th>
            <th>category</th>
            <th>action </th>
            
            
            
          </tr>`;
        for (let i = 0; i < product.length; i++) {
            productTable += `
            <tr>
            <th>${product[i].name}</th>
            <th>${product[i].price}</th>
            <th>${product[i].stock} </th>
            <th>${product[i].category}</th>
            <th>
            <button class="btn btn-danger"onclick="deleteProduct(${i})">Delet</button>
            
            <button class="btn btn-success" onclick="confirmProduct(${product[i].id})">confirm</button>
            </th>
            
            
          </tr> `;

        }
        productTable += `</table>`;
        document.getElementById('productTable').innerHTML = productTable;


    }
}
//function generatUsersTable that display all products into table(from ls:users)
function generatUsersTable() {
    var users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {

        var userTable = `
        <table class="table">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email </th>
            <th>Tel</th>
            <th>Role </th>
            <th>action </th>

            
            
            
          </tr>`;
        for (let i = 0; i < users.length; i++) {
            userTable += `
            <tr>
            <td>${users[i].firstName}</td>
            <td>${users[i].lastName}</td>
            <td>${users[i].email} </td>
            <td>${users[i].phone}</td>
            <td>${users[i].role}</td>
            <td>
            <button class="btn btn-danger">Delet</button>
            </td>
            
          </tr> `;

        }
        userTable += `</table>`;
        document.getElementById('userTableId').innerHTML = userTable;


    }
}
//function confirmProduct that changes isConfirmed attribute by true 
function confirmProduct(id) {
    var product = JSON.parse(localStorage.getItem('product'));
    for (let i = 0; i < product.length; i++) {
        if (product[i].id == id) {
            product[i].isConfirmed = true;
            break;

        }
    }
    localStorage.setItem('product', JSON.stringify(product));
}
// function shopProduct that display all confirmed products to simpel user 
function shopProduct() {
    var product = JSON.parse(localStorage.getItem('product'));
    var confirmedProducts = [];
    for (let i = 0; i < product.length; i++) {
        if (product[i].isConfirmed = true) {
            confirmedProducts.push(product[i]);
        }
    }
    var productDiv = ``;
    for (let i = 0; i < confirmedProducts.length; i++) {
        productDiv += `<div class="col-lg-4 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="img/product/p1.jpg" alt="">
            <div class="product-details">
                <h6>${confirmedProducts[i].name}</h6>
                <div class="price">
                    <h6>${confirmedProducts[i].price}$</h6><br>
                    <h6>${confirmedProducts[i].category}</h6>
                    <h6 class="l-through">${confirmedProducts[i].price}$</h6>
                </div>
                <div class="prd-bottom">

                    <div  class="social-info">
                        <span class="ti-bag"></span>
                        <button class=" btn hover-text" onclick=" goToDisplay(${confirmedProducts[i].id})"style="background-color:"fff>Display</button>
                    </div>
                    <div  class="social-info">
                    <span class="ti-bag"></span>
                    <button class=" btn hover-text" onclick=" addToWishList(${confirmedProducts[i].id})"style="background-color:"fff>Wishlist</button>
                </div>
                  
                    <a href="" class="social-info">
                        <span class="lnr lnr-move"></span>
                        <p class="hover-text">view more</p>
                    </a>
                </div>
            </div>
        </div>
    </div>`



    }
    document.getElementById('shopProduct').innerHTML = productDiv

}
//function addToWishList : creat wishlist object and save it to LS (key : wishlist)
/* function addToWishList(id) {
    var connectedUserId = localStorage.getItem('connectedUserId');
    var wishlistId = JSON.parse(localStorage.getItem('wishlistIdKey') || '1');
    var   widhlistObj = {
          id:wishlistId,
          productId:id,
          userId:connectedUserId,
      }
      var wishlistTab = JSON.parse(localStorage.getItem('wishlist') || '[]');
      wishlistTab.push(widhlistObj);
      localStorage.setItem('wishlist', JSON.stringify(wishlistTab));
      localStorage.setItem('wishlistIdKey', wishlistId + 1);
      location.replace('wishlist.html');

} */
// function serchUserById that returns object (product) from local storage 
function serchUserById(id) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (id == users[i].id) {
            findedUser = users[i];
            break;

        }


    }
    return findedUser;
}
// function displayProductInfoByUserInfo that display product informations by Role 
function displayProductInfoByUserInfo() {
    var connectedUserId = localStorage.getItem('connectedUserId');
    var findedUser = serchUserById(connectedUserId);
    if (connectedUserId) {
        if (findedUser.role == "admin") {

            var productInfBloc = `
        
         <div class="s_product_text">
             <h3 id="prName"></h3>
             <h2 id="prPrice"></h2>
             <ul class="list">
                 <li><a class="active" href="#"> <span>Category</span> <span id="prCategory"></span></a></li>
                 <li><a href="#"><span>Availibility</span> : In Stock</a></li>
             </ul>
             <h4 id="prStock"></h4>
             <button class="btn btn-warning" onclick="displayEditForm()">Edit product</button>
         </div>
         <div id="editFormDiv">
    
         </div>
     
    `;

        } else {

            var productInfBloc = `
        
         <div class="s_product_text">
             <h3 id="prName"></h3>
             <h2 id="prPrice"></h2>
             <ul class="list">
                 <li><a class="active" href="#"> <span>Category</span> <span id="prCategory"></span></a></li>
                 <li><a href="#"><span>Availibility</span> : In Stock</a></li>
             </ul>
             <h4 id="prStock"></h4>
         </div>
         <input id="reservedQty" type="number"><br>
         <samp id ="msgEreur"></samp><br>
         <button onclick="reserve()">reserv</button>
    `;
        }





    } else {
        var productInfBloc = `
        
        <div class="s_product_text">
            <h3 id="prName"></h3>
            <h2 id="prPrice"></h2>
            <ul class="list">
                <li><a class="active" href="#"> <span>Category</span> <span id="prCategory"></span></a></li>
                <li><a href="#"><span>Availibility</span> : In Stock</a></li>
            </ul>
          
            <button class="btn btn-warning" onclick="goToLogin()">login</button>
        </div>
       
   `;

    }
    document.getElementById('productInfoBloc').innerHTML = productInfBloc;
}
///
function displayUserInfo() {
    var userInfo = `
   
    <div class="s_product_text">
        <h3 id="first Name"></h3>
        <h2 id="last Name"></h2>
        <h2 id="Email"></h2>
        <h2 id="Phone"></h2>

        <button class="btn btn-warning" onclick="displayEditUser()">Edit </button>
    </div>
    
    <div id="editFormDiv"></div>

    </div>

`;
    document.getElementById('userInfoBloc').innerHTML = userInfo;
}
// function to go to login
function goToLogin() {
    location.replace('login.html')

}
//...........
function displayEditUser() {


    var editForm = `<div class="container">
    <div class="row">
        
        <div class="col-lg-12">
            <div class="login_form_inner" style="margin-top:50px">
                <h3>Edit Profil</h3>
                <div class="row login_form" >
                <label for="price"></label>
                    <div class="col-md-12 form-group">
                        <input type="text" class="form-control" id="newEmailId" value =${serchUserById.email}  >
                    </div>
                    <label for="Stock"></label>
                    <div class="col-md-12 form-group">
                    <input type="text" class="form-control"  id="newPhoneId" value =${serchUserById.phone}>
                </div>
                    <div> 
                    </div>
                    <div class="col-md-12 form-group">
                        <button type="submit" value="submit" class="primary-btn" onclick="validateEditProfil()">Validate Edit Profil</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>`;
    document.getElementById('editFormDiv').innerHTML = editForm
}
//function validateEditProfil that updat the user information 
function validateEditProfil() {
    var newEmail = document.getElementById('newEmailId').value;
    var newPhone = document.getElementById('newPhoneId').value;
    var connectedUserId = localStorage.getItem('connectedUserId');
    var users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == connectedUserId) {
            users[i].email = newEmail;
            users[i].phone = newPhone;
            break
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload('Profile.html')

}
// function reserve that can user reserve product 
function reserve() {
    var qty = document.getElementById('reservedQty').value;
    var connectedUserId = localStorage.getItem('connectedUserId');
    var productId = localStorage.getItem('selectesProductId');
    var product = searchProductById(productId);
    var orderId = JSON.parse(localStorage.getItem('orderKey') || '1');
    var orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (product.stock >= qty) {
        var order = {
            id: orderId,
            qty: qty,
            userId: connectedUserId,
            productId: productId,
            status: false


        }
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('orderKey', orderId + 1);
        //update product stock
        updateProductStock(productId, qty)
        location.replace('basket.html');

    } else {
        document.getElementById('msgEreur').innerHTML = 'unavailable quantity '
        document.getElementById('msgEreur').style.color = 'red'
    }


}
// function updateProductStock tha updates product stock by new qty
function updateProductStock(id, qty) {
    var products = JSON.parse(localStorage.getItem('product'));
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products[i].stock -= qty;
            break;


        }

    }

    localStorage.setItem('product', JSON.stringify(products))
}
// basket function
function basket() {
    var orders = JSON.parse(localStorage.getItem('orders'));
    console.log('order', orders)
    var connectedUserId = localStorage.getItem('connectedUserId');
    var myOrders = userOrders(orders, connectedUserId);
    console.log('myOrders', myOrders)
    var userBasket = ``;
    if (myOrders.length == 0) {
        userBasket = `<div class="text-center"><h2>No reserved product</h2></div>`
    } else {
        userBasket =
            `
    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            var product = searchProductById(myOrders[i].productId)
            total = total + (product.price * myOrders[i].qty);
            userBasket += `
                            <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${product.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${product.price}</h5>
                                </td>
                                <td>
                                ${myOrders[i].qty}
                                </td>
                                <td>
                                    <h5>${product.price * myOrders[i].qty}</h5>
                                </td>
                                
                            `;
            if (!(myOrders[i].status)) {
                userBasket += `<td>
                                <button class="btn btn-danger"onclick="deleteOrderAndUpdateStock(${getObjectPositionById(myOrders[i].id, orders)},'orders',${product.id},${myOrders[i].qty})">Delete</button>
                            </td>
                            </tr>`
            } else {
                userBasket += `<td>
                                     Your order is confirmed by store
                            </td>
                            </tr>`

            }
        }
        userBasket += `
                           
                            <tr>
                                <td>
                                
                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>$${total}</h5>
                                </td>
                            </tr>
                            <tr class="shipping_area">
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <h5>Shipping</h5>
                                </td>
                                <td>
                                   
                                             ${shippingPrice(total)}
                                </td>
                            </tr>
                            <tr class="out_button_area">
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                        
                                        <a class="primary-btn" href="#">Proceed to checkout</a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>`

    }


    document.getElementById('basket').innerHTML = userBasket

}
// function that returns position of order into ordres by ID
function getObjectPositionById(id, tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i;
            break;

        }
    }
    console.log('POSITION', pos);
    return pos;

}
//function userOrder that returns all user order by Id
function userOrders(orders, id) {
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId == id) {
            myOrders.push(orders[i]);
        }
    }

    return myOrders;
}
// function that affiche the shippingPrice 
function shippingPrice(total) {
    return (total > 300) ? "free" : "7$";
}
/* function welcom() {
    var nameConect ;
    var connectedUserId = localStorage.getItem('connectedUserId');
    var serchUserByI = serchUserById(connectedUserId)
     nameConect = serchUserByI.firstName
     console.log(' nameConect', nameConect)
     return nameConect
} */
// function affiche user name 
function welcomName() {
    var nameConect;
    var connectedUserId = localStorage.getItem('connectedUserId');
    var serchUserByI = serchUserById(connectedUserId)
    nameConect = serchUserByI.firstName
    var name = `  <a class="nav-link" href="profile.html">welcom ${nameConect} </a>`
    return name
}
//function heder:  affiche  heder 
function header() {
    var connectedUserId = localStorage.getItem('connectedUserId');
    var header = ``;
    if (connectedUserId) {
        var serchUserByI = serchUserById(connectedUserId);
        if (serchUserByI.role == 'admin') {
            header = `<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
    <ul class="nav navbar-nav menu_nav ml-auto">
        <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item submenu dropdown">
            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
             aria-expanded="false">Product</a>
            <ul class="dropdown-menu">
                <li class="nav-item"><a class="nav-link" href="product.html">product</a></li>
                <li class="nav-item"><a class="nav-link" href="add-Product.html">add-Product</a></li>
                <li class="nav-item"><a class="nav-link" href="add-category.html">add-category</a></li>
            </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="stor-order.html" onclick="storAdmin(${serchUserByI.id})">Order</a></li>

    
        <li class="nav-item"><a class="nav-link" href="profil.html">${welcomName()}</a></li>
        <li class="nav-item"><a class="nav-link"  onclick="logout()">logout</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
        <li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
        <li class="nav-item">
            <button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
        </li>
    </ul>
    </div>`
        } else {
            var orders = JSON.parse(localStorage.getItem('orders'));
            var myOrders = userOrders(orders, connectedUserId)
            console.log('qgrfgrq', myOrders)

            header = `<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
        <ul class="nav navbar-nav menu_nav ml-auto">
        <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
        <li class="nav-item submenu dropdown">
            <a href="shop.html" class="nav-link" role="button" aria-haspopup="true"
             aria-expanded="false">Shop</a>
            
        </li>
       
                <li class="nav-item"><a class="nav-link" href="basket.html">basket(${myOrders.length})</a></li>
               
        
        
        <li class="nav-item"><a class="nav-link" href="wishlist.html">wishlist</a></li>
        <li class="nav-item"><a class="nav-link" href="profil.html">${welcomName()}</a></li>
        <li class="nav-item"><a class="nav-link"  onclick="logout()">logout</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
        <li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
        <li class="nav-item">
            <button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
        </li>
        </ul>
        </div>`

        }


    } else {
        header = `<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
<ul class="nav navbar-nav menu_nav ml-auto">
<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
<li class="nav-item submenu dropdown">
    <a href="shop.html" class="nav-link" role="button" aria-haspopup="true"
     aria-expanded="false">Shop</a>
    
</li>
<li class="nav-item submenu dropdown">
    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
     aria-expanded="false">Blog</a>
    <ul class="dropdown-menu">
        <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
        <li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
    </ul>
</li>
<li class="nav-item submenu dropdown">
    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
     aria-expanded="false">signup</a>
    <ul class="dropdown-menu">
    <li class="nav-item"><a class="nav-link" href="custemer-signup.html">custemer-signup</a></li>
    <li class="nav-item"><a class="nav-link" href="stor-signup.html">stor-signup</a></li>

    </ul>
</li>

<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
<li class="nav-item"><a class="nav-link" href="Login.html">Login</a></li>

</ul>
<ul class="nav navbar-nav navbar-right">
<li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
<li class="nav-item">
    <button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
</li>
</ul>
</div>`

    }



    document.getElementById('headerstyle').innerHTML = header;

}
// function search
function search() {
    var productName = document.getElementById('searchProdactName').value;
    var searchProduct = searchProductByName(productName)

    var productSerch = ``
    for (let i = 0; i < searchProduct.length; i++) {
        productSerch += ` <div class="col-lg-3 col-md-6">
        <div class="single-product">
            <img class="img-fluid" src="img/product/p4.jpg" alt="">
            <div class="product-details">
                <h6>${searchProduct[i].name}</h6>
                <div class="price">
                    <h6>${searchProduct[i].price}</h6>
                    <h6 class="l-through">${searchProduct[i].price}</h6>
                </div>
                <h6>${searchProduct[i].category}</h6>
                <h6>${searchProduct[i].stock}</h6>
                <div class="prd-bottom">

               
                          
                </div>
            </div>
        </div>
    </div>`

    }
    document.getElementById('searchByName').innerHTML = productSerch

}
// finction search productByName
function searchProductByName(name) {
    var products = JSON.parse(localStorage.getItem('product'));

    var findedProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name == name) {

            findedProduct.push(products[i]);

        }

    }
    return findedProduct;

}
//function goWishList : creat wishlist object and save it to LS (key : wishlist)
function goWishlist(id) {
    var serchProductById = searchProductById(id);
    var idWishlist = JSON.parse(localStorage.getItem('wishlistId') || '1');
    var widhlist = {
        id: idWishlist,
        idProduct: serchProductById.id,
        idUser: serchProductById.userId,
    }
    var wishlistTab = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlistTab.push(widhlist);
    localStorage.setItem('wishlist', JSON.stringify(wishlistTab));
    localStorage.setItem('wishlistId', idWishlist + 1);
}
// function displayUserWishlist
function displayUserWishlist() {
    var connectedUserId = localStorage.getItem('connectedUserId');
    var wishlistTab = JSON.parse(localStorage.getItem('wishlist') || '[]');
    var myWishlist = [];
    var wishlistTr = ``
    for (let i = 0; i < wishlistTab.length; i++) {
        if (wishlistTab[i].userId == connectedUserId) {
            myWishlist.push(wishlistTab[i]);

        }

    }
    if (myWishlist.length == 0) {
        wishlistTr = `<div class='text-center'> <h2>No wishlist product</h2> </div>`
    } else {

        wishlistTr = `
    <table class="table table-striped">
      <tr>
        <th>Product name</th>
        <th>Product price</th>
        <th>stock </th>
        <th>category</th>
        <th>action </th>
      </tr>`;
        for (let i = 0; i < myWishlist.length; i++) {
            var wishlist = myWishlist[i];
            var product = searchProductById(wishlist.productId);
            wishlistTr += `
         <tr>
         <td>${product.name} </td>
         <td>${product.price} </td>
         <td>${product.stock} </td>
         <td>${product.category} </td>
         <td> <button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishlist.id, wishlistTab)},'wishlist')"> Delete</td>


        


         </tr>`
        }
        wishlistTr += '</table>';
    }
    document.getElementById('wishListTable').innerHTML = wishlistTr;

}
// function that return all admin orders
function searchProductByIdToStor(id) {
    var products = JSON.parse(localStorage.getItem('product'));
    var findedProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].userId == id) {
            findedProduct.push(products[i]);
        }
    }
    return findedProduct;
}
// function that add-storAdmin on ls
function storAdmin(id) {
    var orders = JSON.parse(localStorage.getItem('orders'));

    var product = searchProductByIdToStor(id);


    var myOrder = [];
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < product.length; j++) {
            if (orders[i].productId == product[j].id) {
                myOrder.push(orders[i])

            }
        }
    }

    localStorage.setItem('orderAdmin', JSON.stringify(myOrder))
}
// function orderStor that generate order rows and inner into HTML
function orderStor() {
    var myOrders = JSON.parse(localStorage.getItem('orderAdmin'));
    var searchuser;
    var userBasket = ``;
    if (myOrders.length == 0) {
        userBasket = `<div class="text-center"><h2>No reserved product</h2></div>`
    } else {
        userBasket =
            `
    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total HT</th>
                                <th scope="col">Total TTC</th>
                                <th scope="col">first name</th>
                                <th scope="col">last name</th>
                                <th scope="col">phone</th>
                                <th scope="col">Actions</th>
                                
                            </tr>
                        </thead>
                        <tbody>`
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            searchuser = serchUserById(myOrders[i].userId)
            total = total + (searchProductById(myOrders[i].productId).price * myOrders[i].qty);
            console.log('total', searchProductById(myOrders[i].productId).price * myOrders[i].qty)

            userBasket += `
                            <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${searchProductById(myOrders[i].productId).name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${searchProductById(myOrders[i].productId).price}</h5>
                                </td>
                                <td>
                                ${myOrders[i].qty}
                                </td>
                                <td>
                                    <h5>${searchProductById(myOrders[i].productId).price * myOrders[i].qty}</h5>
                                </td>
                                <td>
                                <h5>${searchProductById(myOrders[i].productId).price * myOrders[i].qty * 1.19}</h5>
                            </td>
                                <td>
                                <h5>${searchuser.firstName}</h5>
                                </td>
                                <td>
                                <h5>${searchuser.lastName}</h5>
                                </td>
                                <td>
                                <h5>${searchuser.phone}</h5>
                                </td>`;
            if (!(myOrders[i].status)) {
                userBasket += `
                                    <td>
                                    <button class="btn btn-success" onclick="confirmOrder(${myOrders[i].id})">confirm</button>
                                    </td>`;
            } else {
                userBasket += `
                                    <td>order is validated </td>
                                
                               
                            </tr>`;
            }
        };
        userBasket += `
                           
                        </tbody>
                    </table>`
    }


    document.getElementById('baskete').innerHTML = userBasket

}
//function confirmOrder to update order status to true
function confirmOrder(id) {
    var orders = JSON.parse(localStorage.getItem('orders'));
    for (let i = 0; i < orders.length; i++)
        if (orders[i].id == id) {
            orders[i].status = true;
            break;

        }

    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload();
}
function generatAllProducts() {
    var product = JSON.parse(localStorage.getItem('product'));
        var productTable = `
        <table class="table">
          <tr>
            <th>name</th>
            <th>price</th>
            <th>stock </th>
            <th>category</th>
            <th>action </th>
          </tr>`;
        for (let i = 0; i < product.length; i++) {
            productTable += `
            <tr>
            <th>${product[i].name}</th>
            <th>${product[i].price}</th>
            <th>${product[i].stock} </th>
            <th>${product[i].category}</th>
            <td>
            <input type="checkbox" name="" id="${product[i].id}" onclick="addToArray(this)">
            <td> 
          </tr> `;
    }
    productTable += `</table>
    <div><button class="btn btn-danger"onclick="deletAllChecked()">Delet</button></div>`;
    document.getElementById('manageProduct').innerHTML = productTable;
}
var chekedRows = [];
function addToArray(element) {
    chekedRows.push(element.id);
    console.log('chekedRows',chekedRows);
}
function deletAllChecked() {
    var product = JSON.parse(localStorage.getItem('product'));
     for (let i = 0; i < chekedRows.length; i++) {
         console.log('chekedRows[i}',chekedRows[i])
        product.splice(getObjectPositionById(chekedRows[i], product), 1);
        console.log('getObjectPositionById(Number(chekedRows[i]), product)',getObjectPositionById(chekedRows[i], product));
    }
    localStorage.setItem('product',JSON.stringify(product));
   location.reload()
     
}
