(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/createSecKillOrder"],{

/***/ 315:
/*!************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/main.js?{"page":"pages%2Forder%2FcreateSecKillOrder"} ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _createSecKillOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/order/createSecKillOrder.vue */ 316));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_createSecKillOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 316:
/*!*****************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=template&id=33d9293d& */ 317);
/* harmony import */ var _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=script&lang=js& */ 319);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createSecKillOrder.vue?vue&type=style&index=0&lang=scss& */ 321);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 20);






/* normalize component */

var component = Object(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 317:
/*!************************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=template&id=33d9293d& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=template&id=33d9293d& */ 318);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_template_id_33d9293d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 318:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=template&id=33d9293d& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 319:
/*!******************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=script&lang=js& */ 320);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 320:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



















































































































var _vuex = __webpack_require__(/*! vuex */ 10);function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var uniPopup = function uniPopup() {return __webpack_require__.e(/*! import() | components/uni-popup/uni-popup */ "components/uni-popup/uni-popup").then(__webpack_require__.bind(null, /*! @/components/uni-popup/uni-popup.vue */ 567));};var _default =




{
  data: function data() {
    return {
      tabCurrentIndex: 0,
      navList: [{
        state: '1',
        text: '快递配送' }],

      quanlificationId: '',
      seckillId: '',
      seckill: {},
      productId: '',
      product: {},
      productSkuId: '',
      productSku: {},
      productAmount: 0.00, //商品金额, 未扣减任何优惠
      deductAmount: 0.00, //优惠金额
      actualAmount: 0.00, //实付金额
      freightAmount: 0.00, //运费
      addressData: {}, //收货地址
      merchantData: {}, //门店地址
      memo: '', //备注
      type: '' };

  },
  components: {
    uniPopup: uniPopup },

  onLoad: function onLoad(option) {
    //商品数据
    this.quanlificationId = option.quanId;
    this.seckillId = option.seckillId;
    this.productId = option.productId;
    this.productSkuId = option.productSkuId;
    //如果开启了门店
    if (this.applicationConfig.applicationMerchantEnabled) {
      this.navList.push({
        state: '2',
        text: '门店自提' });

    }
    this.inquirySeckillById(this.seckillId);
    this.inquiryDefaultAddress(this.userInfo.userUuid);
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['hasLogin', 'userInfo', 'applicationConfig'])),

  watch: {
    addressData: function addressData(val) {
      this.calculateFreightAmount(this.seckillId, val.province, val.city, val.area);
    } },

  methods: {
    toActualAmount: function toActualAmount(productAmount, deductAmount, freightAmount) {
      return (productAmount - deductAmount + freightAmount).toFixed(2);
    },
    tabClick: function tabClick(index) {
      this.tabCurrentIndex = index;
      if (index == 1) {
        this.actualAmount = this.toActualAmount(this.productAmount, this.deductAmount, 0);
      } else if (index == 0) {
        this.actualAmount = this.toActualAmount(this.productAmount, this.deductAmount, this.freightAmount);
      }
    },
    //查询默认收货地址
    inquiryDefaultAddress: function inquiryDefaultAddress(userUuid) {
      var that = this;
      var postData = {
        userDTO: {
          userUuid: userUuid } };


      this.$api.request.userShip(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          res.body.data.addresses.forEach(function (val, index) {
            if (val.default) {
              that.addressData = val;
            }
          });
        } else {
          console.log(res.body.status.errorDesc);
        }
      });
    },
    //查询秒杀活动
    inquirySeckillById: function inquirySeckillById(seckillId) {var _this = this;
      var that = this;
      var postData = {
        secKillProductUuid: seckillId };

      this.$api.request.secKillDetail(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          _this.seckill = res.body.data;
          _this.product = res.body.data.productDTO;
          if (_this.productSkuId) {
            _this.product.skuList.forEach(function (val, index) {
              if (that.productSkuId === val.productSkuUuid) {
                that.productSku = val;
              }
            });
          }
          that.productAmount = that.seckill.unitPrice.toFixed(2);
          _this.actualAmount = _this.toActualAmount(_this.productAmount, _this.deductAmount, _this.freightAmount);
        } else {
          console.log(res.body.status.errorDesc);
        }
      });
    },
    // 计算运费金额
    calculateFreightAmount: function calculateFreightAmount(seckillId, province, city, area) {
      var that = this;
      var postData = {
        secKillProduct: {
          secKillProductUuid: seckillId },

        orderDTO: {
          deliveryProvince: province,
          deliveryCity: city,
          deliveryArea: area } };


      this.$api.request.calculateSecKillFreightAmount(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          that.freightAmount = res.body.data.orderDTO.freightAmount;
          that.actualAmount = that.toActualAmount(that.productAmount, that.deductAmount, that.freightAmount);
        } else {
          that.$api.msg(res.body.status.errorDesc);
        }
      }, false);
    },
    //计算总金额
    calcSelectedProductAmount: function calcSelectedProductAmount(cartData) {
      var amount = 0;
      cartData.forEach(function (val, index) {
        if (val.productDTO.skuEnabled) {
          amount = amount + val.productSkuDTO.skuUnitPrice * val.unit;
        } else {
          amount = amount + val.productDTO.unitPrice * val.unit;
        }
      });
      return amount;
    },
    change: function change(e) {
      console.log('是否打开:' + e.show);
    },
    togglePopup: function togglePopup(type, open) {var _this2 = this;
      switch (type) {
        case 'top':
          this.content = '顶部弹出 popup';
          break;

        case 'bottom':
          this.content = '底部弹出 popup';
          break;
        case 'center':
          this.content = '居中弹出 popup';
          break;}

      this.type = type;
      this.$nextTick(function () {
        _this2.$refs['show' + open].open();
      });
    },
    submit: function submit() {var _this3 = this;
      //检查收货地址是否选择
      if (this.tabCurrentIndex == 0 && !this.addressData.userDeliveryAddressUuid) {
        this.$api.msg('未选择收货地址');
        return;
      }
      if (this.tabCurrentIndex == 1 && !this.merchantData.merchantUuid) {
        this.$api.msg('未选择提货门店');
        return;
      }
      //post订单数据到后台
      var postData = {
        secKillProduct: {
          secKillProductUuid: this.seckillId },

        orderDTO: {
          userDTO: {
            userUuid: this.userInfo.userUuid },

          deliveryAddressDTO: {
            userDeliveryAddressUuid: this.addressData.userDeliveryAddressUuid },

          merchantDTO: {
            merchantUuid: this.merchantData.merchantUuid },

          deliveryType: this.tabCurrentIndex == 0 ? '1' : '2' },

        productDTO: {
          productUuid: this.productId },

        productSkuDTO: {
          productSkuUuid: this.productSkuId },

        quanlificationId: this.quanlificationId };

      this.$api.request.createSecKillOrder(postData, function (res) {
        if (res.body.status.statusCode === '0') {
          uni.redirectTo({
            url: '/pages/money/pay?orderNo=' + res.body.data.orderNo });

        } else {
          _this3.$api.msg(res.body.status.errorDesc);
        }
      });

    },
    stopPrevent: function stopPrevent() {} } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 321:
/*!***************************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./createSecKillOrder.vue?vue&type=style&index=0&lang=scss& */ 322);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_createSecKillOrder_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 322:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/order/createSecKillOrder.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[315,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/createSecKillOrder.js.map