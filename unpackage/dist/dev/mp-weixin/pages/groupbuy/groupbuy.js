(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/groupbuy/groupbuy"],{

/***/ 483:
/*!*****************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/main.js?{"page":"pages%2Fgroupbuy%2Fgroupbuy"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _groupbuy = _interopRequireDefault(__webpack_require__(/*! ./pages/groupbuy/groupbuy.vue */ 484));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_groupbuy.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 484:
/*!**********************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./groupbuy.vue?vue&type=template&id=e8fd8744& */ 485);
/* harmony import */ var _groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groupbuy.vue?vue&type=script&lang=js& */ 487);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groupbuy.vue?vue&type=style&index=0&lang=scss& */ 489);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 20);






/* normalize component */

var component = Object(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__["render"],
  _groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 485:
/*!*****************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=template&id=e8fd8744& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./groupbuy.vue?vue&type=template&id=e8fd8744& */ 486);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_template_id_e8fd8744___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 486:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=template&id=e8fd8744& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 487:
/*!***********************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./groupbuy.vue?vue&type=script&lang=js& */ 488);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 488:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
















































var _Json = _interopRequireDefault(__webpack_require__(/*! @/Json */ 24));
var _vuex = __webpack_require__(/*! vuex */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var uniLoadMore = function uniLoadMore() {return __webpack_require__.e(/*! import() | components/uni-load-more/uni-load-more */ "components/uni-load-more/uni-load-more").then(__webpack_require__.bind(null, /*! @/components/uni-load-more/uni-load-more.vue */ 581));};var uniBadge = function uniBadge() {return __webpack_require__.e(/*! import() | components/uni-badge/uni-badge */ "components/uni-badge/uni-badge").then(__webpack_require__.bind(null, /*! @/components/uni-badge/uni-badge.vue */ 560));};var empty = function empty() {return __webpack_require__.e(/*! import() | components/empty */ "components/empty").then(__webpack_require__.bind(null, /*! @/components/empty */ 588));};var _default =



{
  components: {
    uniLoadMore: uniLoadMore,
    uniBadge: uniBadge,
    empty: empty },

  data: function data() {
    return {
      groupBuyList: [],
      pageNo: 1,
      pageSize: 10,
      tabCurrentIndex: 0,
      loadingType: '',
      navList: [{
        state: '0',
        text: '全部',
        loadingType: 'more',
        groupBuyList: [] },

      {
        state: '1',
        text: '拼团中',
        loadingType: 'more',
        groupBuyList: [] },

      {
        state: '2',
        text: '拼团失败',
        loadingType: 'more',
        groupBuyList: [] },

      {
        state: '3',
        text: '拼团成功',
        loadingType: 'more',
        groupBuyList: [] }] };



  },

  onLoad: function onLoad(options) {
    this.tabCurrentIndex = Number('0');
    this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
  },
  //下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    //重新加载数据
    this.resetPage();
    this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['hasLogin', 'userInfo', 'footPrint'])),

  methods: {
    //加载更多
    loadMore: function loadMore() {
      if (this.loadingType === 'more') {
        this.pageNo = this.pageNo + 1;
        this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
      }
    },
    searchGroupBuy: function searchGroupBuy(groupBuyStatus) {var _this = this;
      var that = this;
      var keyArray = ['USER'];
      var searchOptions = {
        userUuid: this.userInfo.userUuid,
        startIndex: (this.pageNo - 1) * this.pageSize,
        pageSize: this.pageSize };

      if (groupBuyStatus) {
        keyArray.push('GROUP_BUY_STATUS');
        searchOptions.groupBuyStatus = groupBuyStatus;
      }
      searchOptions.keyArray = keyArray;
      this.loadingType = 'loading';
      this.$api.request.searchGroupBuy(searchOptions, function (res) {
        if (res.body.status.statusCode === '0') {
          var groupBuys = res.body.data.groupBuys;
          var total = res.body.data.total;
          var groupBuyList = _this.groupBuyList;
          groupBuys.forEach(function (val, index) {
            var groupBuyStatusTran = that.$api.util.translateGroupBuyStatus(val.status);
            val.groupBuyStatusDesc = groupBuyStatusTran.groupBuyStatusDesc;
            val.groupBuyStatusColor = groupBuyStatusTran.groupBuyStatusColor;
            groupBuyList.push(val);
          });
          _this.groupBuyList = groupBuyList;
          if (_this.groupBuyList.length >= total) {
            _this.loadingType = 'noMore';
          } else {
            _this.loadingType = 'more';
          }
        } else {
          console.log(res.body.status.errorDesc);
        }
      }, true);
    },
    translateTabIndex: function translateTabIndex(tabIndex) {
      var groupBuyStatus = '';
      switch (tabIndex) {
        case 0:
          groupBuyStatus = '';
          break;
        case 1:
          groupBuyStatus = '1';
          break;
        case 2:
          groupBuyStatus = '2';
          break;
        case 3:
          groupBuyStatus = '3';
          break;}

      return groupBuyStatus;
    },
    //swiper 切换
    changeTab: function changeTab(e) {
      this.tabCurrentIndex = e.target.current;
      this.resetPage();
      this.searchGroupBuy(this.translateTabIndex(this.tabCurrentIndex));
    },
    //顶部tab点击
    tabClick: function tabClick(index) {
      this.tabCurrentIndex = index;
    },
    //删除订单
    deleteOrder: function deleteOrder(item) {var _this2 = this;
      var that = this;
      uni.showModal({
        content: '确认要删除订单吗？',
        success: function success(e) {
          if (e.confirm) {
            _this2.$api.request.delOrder({
              actionType: 'DELETE',
              orderNo: item.orderNo },
            function (res) {
              if (res.body.status.statusCode === '0') {
                that.$api.msg('订单已成功删除');
                that.resetPage();
                that.searchGroupBuy(that.translateTabIndex(that.tabCurrentIndex));
              } else {
                that.$api.msg(res.body.status.errorDesc);
              }
            }, false);
          }
        } });

    },
    resetPage: function resetPage() {
      this.pageNo = 1;
      this.groupBuyList = [];
    },
    pay: function pay(item) {
      uni.navigateTo({
        url: '/pages/money/pay?orderNo=' + item.orderNo });

    },
    navProductDetail: function navProductDetail(item) {
      uni.navigateTo({
        url: '/pages/product/product?id=' + item.productDTO.productUuid });

    },
    viewGroupBuy: function viewGroupBuy(item) {
      uni.navigateTo({
        url: '/pages/groupbuy/detail?id=' + item.groupBuyUuid });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 489:
/*!********************************************************************************************************!*\
  !*** E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!../../../../../../MyDownloads/HBuilderX.2.3.0.20190919/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./groupbuy.vue?vue&type=style&index=0&lang=scss& */ 490);
/* harmony import */ var _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_MyDownloads_HBuilderX_2_3_0_20190919_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_groupbuy_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 490:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/work/ccm/b2b2c/ccm-b2b2c-uniapp/pages/groupbuy/groupbuy.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[483,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/groupbuy/groupbuy.js.map