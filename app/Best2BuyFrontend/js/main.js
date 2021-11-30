/* eslint-disable */
// const baseUrl = 'http://192.168.3.21:7001/';
const baseUrl = '/';
const infoText = {
  'networkError': 'Services are not available, please try it again',
  'buyError': 'Unable to send transaction, please try it again',
  'deleteError': 'Unable to send delete operation, please try it again',
  'deleteSuccess': 'Delete successfully!',
  'deleteConfirm': '[DANGER] Do you really want to delete this record?',
  'loginError': 'Username and Password are required!',
  'loginError2': 'Fail to login by this information',
  'registryError': 'Required fields must be completed',
  'registryError2': 'Repeat password is not identical with password',
  'registrySuccess': 'Your Account has been created successfully',
  'buySuccess': 'Order has been placed successfully!',
  'InsertFail': 'Unable to insert, please try it again',
  'InsertSuccess': 'Insert Successfully',
  'UpdateFail': 'Unable to update, please try it agian',
  'UpdateSuccess': 'Update Successfully',
  'Got': ' Got it',
  'confirm': 'I confirm',
  'cancel': 'Cancel',
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

const request = async(api = '', data = {}) => {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('request function can not receive non-object data');
  }
  const myHeaders = new Headers();
  myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000/');
  myHeaders.append('mode', 'no-cors');
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const urlencoded = new URLSearchParams();
  for (const key in data) {
    urlencoded.append(key, data[key]);
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };
  console.log('[*]Send Request', api, data);
  return fetch(api, requestOptions)
    .then(response => {
      return response.json().then(res => {
        if (!res.success) {
          // errno
          console.log('[Server Error]', res.msg);
          return {
            ...res,
          };
        }
        return {
          data: res.data,
          total: res.total || 10,
          msg: res.msg,
          errno: res.msg,
          success: true,
        };
      });
    })
    .catch(error => console.log('[Network Error]', error));
};

function showModal(title = 'Info', content = '', btn1 = 'Ok', btn1Fn = null, btn2, btn2Fn = null) {
  window.btn1Fn = btn1Fn;
  window.btn2Fn = btn2Fn;
  $('#info-modal').remove();
  const modalHtml = `
    <div id="info-modal" class="modal" tabindex="-1" role="dialog" style="z-index:11999">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>${content}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="window.btn1Fn && window.btn1Fn()">${btn1}</button>
                ${!!btn2 ? `<button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="window.btn2Fn && window.btn2Fn()">${btn2}</button>` : ''}
            </div>
            </div>
        </div>
    </div>`;
    $("body").append(modalHtml);
    $('#info-modal').modal();
}

const getUrl = (api) => {
    return baseUrl + api;
}

function queryAllProduct(filter={}) {
    const url = getUrl('queryProduct');
    return request(url, filter).then(res => {
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryProductDetail(filter ={}) {
    const url = getUrl('queryDetail');
    return request(url, filter).then(res => {
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryAllStores(filter={}) {
    const url = getUrl('queryStore');
    return request(url, filter).then(res => {
        console.log('stores res', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryAllRegion(filter={}) {
    const url = getUrl('queryRegion');
    return request(url, filter).then(res => {
        console.log('Region res', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryAllSalesperson(filter={}) {
    const url = getUrl('querySalesPerson');
    return request(url, filter).then(res => {
        console.log('Salesperson res', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryAllTransaction(filter={}) {
    filter.CustomerID = Cookies.get('userid');
    const url = getUrl('queryTransaction');
    return request(url, filter).then(res => {
        console.log('Transaction res', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function buyProduct(ProductID) {
    const url = getUrl('insertTransaction');
    const CustomerID = Cookies.get('userid');
    const qty = parseInt($('#buyqty>option:selected').val());
    const StoreID = parseInt($('#store>option:selected').val(),10) 
    const SalesPersonID = parseInt($('#salesperson>option:selected').val(),10);
    
    const data = {ProductID, NumberOfProducts: qty, CustomerID, StoreID, SalesPersonID};
    console.log('[*] buy', data);
    return  request(url, data).then(res => {
        if(!res || !res.success) {
            showModal('Error', infoText['buyError'] + '\n' + res.msg, infoText['Got']);
            return;
        }
        showModal('Info', infoText['buySuccess'], infoText['Got'], ()=>{
            location.href="/profile.html#transaction";
        });
    });
}

function addProduct() {
    const url = getUrl('insertProduct');
    const Name = $('#Name').val();
    const InventoryAmount = $('#InventoryAmount').val();
    const Price = $('#Price').val();
    const ProductKind = $('#ProductKind').val();
    const ImgUrl = $('#ImgUrl').val();
    request(url, {Name, InventoryAmount, Price, ProductKind, ImgUrl}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['InsertFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['InsertSuccess'], infoText['Got']);
    });
}

function updateProduct() {
    const url = getUrl('updateProduct');
    const Name = $('#Name').val();
    const InventoryAmount = $('#InventoryAmount').val();
    const Price = $('#Price').val();
    const ProductKind = $('#ProductKind').val();
    const ImgUrl = $('#ImgUrl').val();
    const ProductID = $('#ProductID').val();
    request(url, {ProductID, Name, InventoryAmount, Price, ProductKind, ImgUrl}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['UpdateFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['UpdateSuccess'], infoText['Got']);
    });
}

function updateProfile() {
    const url = getUrl('updateUsr');
    const CustomerID = $('#CustomerID').val();
    const Email = $('#email').val();
    const Tel = $('#tel').val();
    const name = $("#username").val();
    const password = $("#password").val();
    const repassword = $("#repassword").val();
    const street = $("#street").val();
    const state = $("#state").val();
    const city = $("#city").val();
    const zipcode = $("#zipcode").val();
    const Kind = Cookies.get('userrole');
    const BusinessCategory = $("#BusinessCategory").val();
    const GrossAnnualIncome = $("#GrossAnnualIncome").val();
    const Gender = $("#Gender").val();
    const Age = $("#Age").val();
    const MarriageStatus = $("#MarriageStatus").val();
    const Income = $("#Income").val();

    if(!CustomerID || !Email || !Tel || !name || !password || !repassword || !street || !city || !state || !zipcode) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if(Kind==='Home' && (!Gender || !Age || !MarriageStatus || !Income)) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if(Kind==='Business' && (!BusinessCategory || !GrossAnnualIncome)) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if (password!==repassword) {
        showModal('Info', infoText['registryError2'], infoText['Got']);
        return;
    }
    request(url, {
        CustomerID,
        Name: name,
        Password: password,
        Street: street,
        State: state,
        City: city,
        ZipCode: zipcode,
        Kind: Kind,
        BusinessCategory,
        GrossAnnualIncome,
        Gender,
        Age,
        MarriageStatus,
        Income,
        Email,
        Tel,
    }).then(res => {
        console.log('[*] updateProfile', res);
        Cookies.set('username', name);
        Cookies.set('userdata', JSON.stringify({
            CustomerID,
            Name: name,
            Street: street,
            State: state,
            City: city,
            ZipCode: zipcode,
            Kind: Kind,
            BusinessCategory,
            GrossAnnualIncome,
            Gender,
            Age,
            MarriageStatus,
            Income,
            Email,
            Tel,
        }));
        if(!res || !res.success) {
            showModal('Error', infoText['UpdateFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['UpdateSuccess'], infoText['Got'], ()=>{
            location.href = "/profile.html";
        });
    });
}

function addInventory() {
    const url = getUrl('insertInventory');
    const StoreID = $('#StoreID').val();
    const ProductID = $('#ProductID').val();
    const NumberOfProduct = $('#NumberOfProduct').val();

    request(url, {StoreID, ProductID, NumberOfProduct}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['InsertFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['InsertSuccess'], infoText['Got']);
    });
}

function addStore() {
    const url = getUrl('insertStore');
    const Address = $('#Address').val();
    const Manager = $('#Manager').val();
    const NumberOfSalespersons = $('#NumberOfSalespersons').val();
    const Region = $('#Region').val();
    request(url, {Address, Manager, NumberOfSalespersons, Region}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['InsertFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['InsertSuccess'], infoText['Got']);
    });
}

function addSalesPerson() {
    const url = getUrl('insertSalesPerson');
    const Name = $('#Name').val();
    const Address = $('#Address').val();
    const Email = $('#Email').val();
    const JobTitle = $('#JobTitle').val();
    const StoreAssigned = $('#StoreAssigned').val();
    const Salary = $('#Salary').val();
    request(url, {Name, Address, Email, JobTitle, StoreAssigned, Salary}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['InsertFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['InsertSuccess'], infoText['Got']);
    });
}

function updateSalesPerson(id) {
    id = String(id);
    const url = getUrl('updateSalesPerson');
    const Name = $('#Name_'+id).val();
    const Address = $('#Address_'+id).val();
    const Email = $('#Email_'+id).val();
    const JobTitle = $('#JobTitle_'+id).val();
    const StoreAssigned = $('#StoreAssigned_'+id).val();
    const Salary = $('#Salary').val();
    request(url, {SalesPersonID: id, Name, Address, Email, JobTitle, StoreAssigned, Salary}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['UpdateFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['UpdateSuccess'], infoText['Got']);
    });
}

function addRegion() {
    const url = getUrl('insertRegion');
    const Name = $('#Name').val();
    const Manager = $('#Manager').val();
    request(url, {Name, Manager}).then(res => {
       if(!res || !res.success) {
            showModal('Error', infoText['InsertFail'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['InsertSuccess'], infoText['Got']);
    });
}

function deleteProduct(ProductID) {
    const okFunc = ()=>{
        const url = getUrl('deleteProduct');
        request(url, {ProductID}).then(res => {
            if(!res || !res.success) {
                showModal('Error', infoText['deleteError'], infoText['Got']);
                return;
            }
            showModal('Info', infoText['deleteSuccess'], infoText['Got']);
        });
    }
    showModal('Info', infoText['deleteConfirm'], infoText['confirm'], okFunc, infoText['cancel'], ()=>{});
}

function deleteStore(StoreID) {
    const okFunc = ()=>{
        const url = getUrl('deleteStore');
        request(url, {StoreID}).then(res => {
            if(!res || !res.success) {
                showModal('Error', infoText['deleteError'], infoText['Got']);
                return;
            }
            showModal('Info', infoText['deleteSuccess'], infoText['Got']);
        });
    }
    showModal('Info', infoText['deleteConfirm'], infoText['confirm'], okFunc, infoText['cancel'], ()=>{});
}

function deleteStuff(SalesPersonID) {
    const okFunc = ()=>{
        const url = getUrl('deleteSalesPerson');
        request(url, {SalesPersonID}).then(res => {
            if(!res || !res.success) {
                showModal('Error', infoText['deleteError'], infoText['Got']);
                return;
            }
            showModal('Info', infoText['deleteSuccess'], infoText['Got']);
        });
    }
    showModal('Info', infoText['deleteConfirm'], infoText['confirm'], okFunc, infoText['cancel'], ()=>{});
}

function deleteCustomer(CustomerID) {
    const okFunc = ()=>{
        const url = getUrl('cancel');
        request(url, {CustomerID}).then(res => {
            if(!res || !res.success) {
                showModal('Error', infoText['deleteError'], infoText['Got']);
                return;
            }
            showModal('Info', infoText['deleteSuccess'], infoText['Got']);
        });
    }
    showModal('Info', infoText['deleteConfirm'], infoText['confirm'], okFunc, infoText['cancel'], ()=>{});
}


function queryProductByKeyword() {
    const value = $("#product-keyword").val();
    const data = {
        Keyword: value,
    };
    Cookies.set('product_filter', JSON.stringify(data));
    location.href = '/products.html';
}

function login() {
    const url = getUrl('signin');
    const name = $("#username").val();
    const password = $("#password").val();
    console.log('[*]', name, password);
    if(!name || !password) {
        showModal('Info', infoText['loginError'], infoText['Got']);
        return;
    }
    request(url, {
        Email: name,
        Password: password,
    }).then(res => {
        console.log('[*] login', res);
        if(!res || !res.success) {
            if(res.errno === 1001) {
                showModal('Error', infoText['loginError2'], infoText['Got']);    
                return;
            }
            showModal('Error', infoText['networkError'], infoText['Got']);
            return;
        }
        // [TODO_Check] Login Successfully
        Cookies.set('username', res.data.Name);
        Cookies.set('userid', res.data.CustomerID);
        Cookies.set('userrole', res.data.Kind);
        Cookies.set('userdata', JSON.stringify(res.data));
        showModal('Success','Login Successfully!', 'ok', ()=>{
            location.href = "/index.html";
        });
    });
}

function reigster() {
    const url = getUrl('signup');
    const Email = $('#email').val();
    const Tel = $('#tel').val();
    const name = $("#username").val();
    const password = $("#password").val();
    const repassword = $("#repassword").val();
    const street = $("#street").val();
    const state = $("#state").val();
    const city = $("#city").val();
    const zipcode = $("#zipcode").val();
    const Kind = $('input[type=radio][name=Kind]:checked').val();
    const BusinessCategory = $("#BusinessCategory").val();
    const GrossAnnualIncome = $("#GrossAnnualIncome").val();
    const Gender = $("#Gender").val();
    const Age = $("#Age").val();
    const MarriageStatus = $("#MarriageStatus").val();
    const Income = $("#Income").val();

    if(!Email || !Tel || !name || !password || !repassword || !street || !city || !state || !zipcode) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if(Kind==='Home' && (!Gender || !Age || !MarriageStatus || !Income)) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if(Kind==='Business' && (!BusinessCategory || !GrossAnnualIncome)) {
        showModal('Info', infoText['registryError'], infoText['Got']);
        return;
    }
    if (password!==repassword) {
        showModal('Info', infoText['registryError2'], infoText['Got']);
        return;
    }
    request(url, {
        Name: name,
        Password: password,
        Street: street,
        State: state,
        City: city,
        ZipCode: zipcode,
        Kind: Kind,
        BusinessCategory,
        GrossAnnualIncome,
        Gender,
        Age,
        MarriageStatus,
        Income,
        Email,
        Tel,
    }).then(res => {
        console.log('[*] registry', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return;
        }
        showModal('Info', infoText['registrySuccess'], infoText['Got'], ()=>{
            location.href = "/login.html";
        });
    });
}

function showlostpassword() {
    $("#lostpassword").show();
}

function logout() {
    Cookies.set('username', '');
    Cookies.set('userid', '');
    Cookies.set('userdata', '');
    Cookies.set('userrole', '');
    location.href = '/index.html';
}

$(document).ready(function(){
    const role = Cookies.get('userrole') || 'Home';
    if(Cookies.get('username') && Cookies.get('userid') && Cookies.get('userid')!=='undefined') {
        if (role !== 'Administrator') {
            $('#login-button').empty();
            $('#login-button').attr('href','#');
            $('#login-button').append(`<span>Welcome ${Cookies.get('username')}</span>`);
            $('#login-button').mouseenter(function(){
                $('#login-button>span').text('Logout');
            });
            $('#login-button').mouseleave(function(){
                $('#login-button>span').text(`Welcome ${Cookies.get('username')}`);
            });
            $('#login-button').click(function(){
                logout();
            });
        } else {
            const adminHtml = `
                <ul class="pulldown-ul">
                    <li><a href="#">Welcome, Admin</a></li>
                    <li><a href="/product-manage.html">Product Management</a></li>
                    <li><a href="/store-manage.html">Store Management</a></li>
                    <li><a href="/salesperson-manage.html">Staff Management</a></li>
                    <li><a href="#" onclick="logout()">Logout</a></li>
                </ul>
            `;
            $('#login-button').empty();
            $('#login-button').append(adminHtml);
        }
    }
    if(role !== 'Administrator') {
        const url = location.href.split('//')[1];
        const pageName = url.split('/')[1].split('.')[0];
        authList =  ['product-manage', 'store-manage', 'salesperson-manage']
        if(authList.includes(pageName)) {
            location.href = 'index.html';
        }
    }
    const footerHtml = `
    <div class="container">
                <div class="top-footer row">
                    <div class="col-md-5 col-sm-7 col-xs-12 footer-logo">
                        <h3 class="gradient-title">Best2Buy</h3>
                        <span class="titleanimi"></span>
                        <p>We provide the best shopping with our powerful websites and backend.</p>
                        <ul class="icon">
                            <li><a href="https://github.com/623059008/Best2Buy" class="tran3s"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a href="https://github.com/623059008/Best2Buy" class="tran3s"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a href="https://github.com/623059008/Best2Buy" class="tran3s"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            <li><a href="https://github.com/623059008/Best2Buy" class="tran3s"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                    <!-- /.footer-logo -->

                    <div class="col-md-4 col-sm-5 col-xs-12 footer-about">
                        <h5>About Us</h5>

                        <ul>
                            <li><i class="flaticon-placeholder"></i> 5562 Hobort St., Pittsburgh, PA, 15217</li>
                            <li><i class="flaticon-multimedia"></i> 623059008@qq.com</li>
                            <li><i class="flaticon-telephone"></i> +1 4129839571</li>
                        </ul>
                    </div>
                    <!-- /.footer-about -->

                    <div class="col-md-3 col-xs-12 footer-list">
                        <h5>Short Link</h5>
                        <ul>
                            <li><a style="color: rgba(255, 255, 255, 0.4);font-size: 16px;" href="https://github.com/623059008/Best2Buy" class="tran3s">Project Detail</a></li>
                            <li><a style="color: rgba(255, 255, 255, 0.4);font-size: 16px;" href="https://github.com/623059008/Best2Buy" class="tran3s">Database</a></li>
                            <li><a style="color: rgba(255, 255, 255, 0.4);font-size: 16px;" href="https://github.com/623059008/Best2Buy" class="tran3s">Backend</a></li>
                            <li><a style="color: rgba(255, 255, 255, 0.4);font-size: 16px;" href="https://github.com/623059008/Best2Buy" class="tran3s">Frontend</a></li>
                        </ul>
                    </div>
                    <!-- /.footer-list -->
                </div>
                <!-- /.top-footer -->
            </div>
            <!-- /.container -->

            <div class="bottom-footer">
                <div class="container">
                    <div class="clear-fix">
                        <p class="float-right" style="color: rgba(255, 255, 255, 0.4);font-size: 16px;">Copyright &copy; 2021. INFSCI 2710  All rights reserved.</p>
                    </div>
                </div>
                <!-- /.container -->
            </div>
    `;
    $('footer').empty();
    $('footer').append(footerHtml);
});
