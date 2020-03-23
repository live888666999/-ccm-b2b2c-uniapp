(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/public/login"],{

/***/ 237:
/*!************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/main.js?{"page":"pages%2Fpublic%2Flogin"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/public/login.vue */ 238));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 238:
/*!*****************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=d96a2a78& */ 239);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 241);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=scss& */ 243);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 20);






/* normalize component */

var component = Object(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 239:
/*!************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=template&id=d96a2a78& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=d96a2a78& */ 240);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_d96a2a78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 240:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=template&id=d96a2a78& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 241:
/*!******************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 242);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 242:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;





















































var _vuex = __webpack_require__(/*! vuex */ 10);function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =




{
  data: function data() {
    return {
      mobile: '',
      password: '',
      logining: false,
      to: '',
      wechatUserInfo: {} };

  },
  onLoad: function onLoad(options) {
    var to = options.to;
    if (to) {
      this.to = unescape(to);
    }
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['applicationConfig'])),

  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['login']), {
    //微信小程序用户授权
    getuserinfo: function getuserinfo(e) {
      var that = this;
      that.wechatUserInfo = e.detail.userInfo;
      uni.login({
        provider: 'weixin',
        success: function success(res) {
          console.log('code: ' + res.code);
          that.wechatUserInfo.code = res.code;
          var requestData = {
            verifyType: 'WECHAT' };

          that.populateWechatUserInfo(requestData);
          that.$api.request.login(requestData, function (loginRes) {
            if (loginRes.body.status.statusCode === '0') {
              var tokenId = loginRes.header.tokenId;
              uni.setStorageSync('userToken', tokenId);
              that.login(loginRes.body.data); //将用户信息保存起来
              //如果未绑定手机号码则提示绑定手机号码
              if (!loginRes.body.data.personalPhone) {
                uni.showModal({
                  title: '',
                  content: '您还未绑定手机，绑定后体验更佳!',
                  showCancel: false,
                  cancelText: '',
                  confirmText: '立即绑定',
                  confirmColor: '#666666',
                  success: function success(res) {
                    uni.navigateTo({
                      url: '/pages/public/bindMobileNo?to=' + escape(that.to) });

                  } });

              } else {
                that.loginRedirect();
              }

            } else {
              that.$api.msg(loginRes.body.status.errorDesc);
              that.logining = false;
            }
          });
        } });

    },
    loginRedirect: function loginRedirect() {
      var that = this;
      if (that.to) {
        uni.navigateTo({
          url: that.to });

      } else {
        uni.switchTab({
          url: '/pages/user/user' });

      }
    },
    populateWechatUserInfo: function populateWechatUserInfo(requestData) {
      requestData.code = this.wechatUserInfo.code;
      requestData.name = this.wechatUserInfo.nickName;
      requestData.photoUrl = this.wechatUserInfo.avatarUrl;
      var sex = '未知';
      if (this.wechatUserInfo.gender === 1)
      sex = '男';else
      if (this.wechatUserInfo.gender === 2)
      sex = '女';
      requestData.sex = sex;
    },
    inputChange: function inputChange(e) {
      var key = e.currentTarget.dataset.key;
      this[key] = e.detail.value;
    },
    navBack: function navBack() {
      uni.navigateBack();
    },
    toRegister: function toRegister() {
      uni.navigateTo({
        url: '/pages/public/register?to=' + escape(this.to) });

    },
    toForgetPassword: function toForgetPassword() {
      uni.navigateTo({
        url: '/pages/public/forgetPassword' });

    },
    toLogin: function toLogin() {var _this = this;
      this.logining = true;var

      mobile =

      this.mobile,password = this.password;
      var isFormValid = true;
      if (!this.$api.util.validateMobileNo(mobile)) {
        this.$api.msg('手机号码格式错误');
        isFormValid = false;
      } else if (!this.$api.util.validatePassword(password)) {
        this.$api.msg('密码为8-20位字母数字下划线组合');
        isFormValid = false;
      }
      if (!isFormValid) {
        this.logining = false;
        return;
      }
      this.$api.request.login({
        verifyType: 'PASSWORD',
        personalPhone: mobile,
        personalPhoneCountryCode: '86',
        password: password },
      function (loginRes) {
        if (loginRes.body.status.statusCode === '0') {
          var tokenId = loginRes.header.tokenId;
          uni.setStorageSync('userToken', tokenId);
          _this.login(loginRes.body.data); //将用户信息保存起来
          if (_this.to) {
            uni.navigateTo({
              url: _this.to });

          } else {
            uni.switchTab({
              url: '/pages/user/user' });

          }
        } else {
          _this.$api.msg(loginRes.body.status.errorDesc);
          _this.logining = false;
        }
      });
    } }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 243:
/*!***************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=style&index=0&lang=scss& */ 244);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 244:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/public/login.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[237,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/public/login.js.map