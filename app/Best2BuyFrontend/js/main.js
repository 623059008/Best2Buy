/* eslint-disable */
// const baseUrl = 'http://192.168.3.21:7001/';
const baseUrl = '/';
const infoText = {
    'networkError':'Services are not available, please try it again',
    'loginError': 'Username and Password are required!',
    'registryError': 'Required fields must be completed',
    'registryError2': 'Repeat password is not identical with password',
    'Got': ' Got it',
    
};

const request = async (api = '', data = {}) => {
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

function showModal(title = 'Info', content = '', btn1 = 'Ok', btn1Fn =null, btn2, btn2Fn = null) {
    window.btn1Fn = btn1Fn;
    window.btn2Fn = btn2Fn;
    $('#info-modal').remove();
    const modalHtml = `
    <div id="info-modal" class="modal" tabindex="-1" role="dialog">
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
        console.log('product res', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return null;
        }
        return res;
    });
}

function queryProduct() {
    const value = $("#product-keyword").val();
    const data = {
        Name: value,
    };
    Cookies.set('product_filter', JSON.stringify(data));
    location.href = '/products.html';
    // console.log('[*]', value);
    // const url = getUrl('queryProduct');
    // return request(url, {
    //     Name: value
    // }).then(res => {
    //     console.log('[*]search res: ', res);
    //     if(!res || !res.success) {
    //         showModal('Error', infoText['networkError'], infoText['Got']);
    //         return;
    //     }
        
    //     return res;
    // });
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
        Name: name,
        Password: password,
    }).then(res => {
        console.log('[*] login', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return;
        }
        // [TODO_Check] Login Successfully
        Cookies.set('username', res.data.name);
        Cookies.set('userid', res.data.id);
        showModal('Success','Login Successfully!', 'ok', ()=>{
            location.href = "/index.html";
        });
    });
}

function reigster() {
    const url = getUrl('signup');
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

    if(!name || !password || !repassword || !street || !city || !state || !zipcode) {
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
        Income
    }).then(res => {
        console.log('[*] registry', res);
        if(!res || !res.success) {
            showModal('Error', infoText['networkError'], infoText['Got']);
            return;
        }
        // [TODO_Check] Sign up Successfully
        location.href = "/login.html";
    });
}

function showlostpassword() {
    $("#lostpassword").show();
}

$(document).ready(function(){
    if($('#login-button')) {
        if(Cookies.get('username') && Cookies.get('userid')) {
            $('#login-button').empty();
            $('#login-button').attr('href','#');
            $('#login-button').append(`<span>Welcome ${Cookies.get('username')}</span>`);
        }
    }
});