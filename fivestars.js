(function (root, factory) {
  /* CommonJS */
  if (typeof exports == "object") module.exports = factory();
  /* AMD module */
  else if (typeof define == "function" && define.amd) define(factory);

  /* 修改: 将 wwclassName 改为元素标识 */
  else root.fivestars = factory();
}(this, function () {
  "use strict";

  /* 修改: 将 wwclassName 改为元素标识 */
  var wwclassName = /*INSBEGIN:WWCLSNAME*/
    "fivestars"
    /*INSEND:WWCLSNAME*/
    ;

  // BEGIN: 加载依赖部分
  // 无依赖资源请使用本函数
  // function loadDependence(fncallback) {
  //   if (typeof fncallback === "function") {
  //     fncallback();
  //   }
  // }

  // 有依赖资源使用本函数
  // 使用方式:
  //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
  //  - 如libs中无该插件, 则申请添加该插件
  //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
  //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
  //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
  //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档

  var loadDependence = function (fncallback) {
    // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
    if (!window.wwload.raty) {
      window.wwload.raty = "wait";
      // requirejs.config({
      //   paths: {
      //     "raty": "libs/raty/lib/jquery.raty",

      //   }
      // });
      require(["libs/raty/lib/jquery.raty"], function () {
        window.wwload.raty = true;
        replace();
        fncallback();
      });
    } else if (window.wwload.raty === "wait") {
      setTimeout(function () {
        loadDependence(fncallback);
      }, 100);
    } else {
      replace();
      fncallback();
    }

    function replace() {
      loadDependence = function (fncallback) {
        fncallback();
      };
    }
  };
  //
  // END: 加载依赖部分 


  // BEGIN: 元素首次初始化处理
  var init = function () {
    // 重写初始化函数
    init = function () {
      return true;
    };
    $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

    // 如有初始化动作, 请在下方添加
  };
  // END: 元素首次初始化处理


  /*
   * @description 初始化每个元素
   * @param {jQuery object} $ele - 需要初始化的元素
   */
  function restraty($ele) {
    var config = {};

    config.number = eval($ele.attr("data--number") || "5")
    config.score = eval($ele.attr("data--score"));
    config.readOnly = eval($ele.attr("data-readonly"));
    config.path = $ele.attr("data-path") || "/libs/raty/lib/images";
    config.starOn = $ele.attr("data-startOn") || "star-on.png";
    config.starOff = $ele.attr("data-starOff") || "star-off.png"

    $ele.find('.star').raty({
      number: config.number,//多少个星星设置
      score: config.score,//初始值是设置
      readOnly: config.readOnly,
      path: config.path,
      starOn: config.starOn,
      starOff: config.starOff,
      click: function (score, evt) {
        $.wwclass.helper.updateProp($ele, "data-x-score", score)
      }
    });
  }
  function processElement($ele) {
    // 对 $ele 元素做对应处理
    restraty($ele);
    setTimeout(function () {
      $.wwclass.helper.updateProp($ele, "data-x-inited", true);
      $ele.find(".starbtn").removeClass("hidden");

    }, 100);


  };

  /*
   * @description 析构每个元素, 也就是该元素该删除时的处理代码
   * @param {jQuery object} $ele - 需要处理的元素
   */
  function finalizeElement($ele) {
    // 对 $ele 元素做对应处理

  };

  // BEGIN: 监听属性处理
  /*
   * @description 监听函数, 元素的控制属性(data--)改变时处理
   * @param {jQuery object} $ele - 控制属性改变的元素
   * @param {string} attribute - 控制属性的名称
   * @param {string} value - 控制属性改变为何值
   */
  var evtInHandler = function ($ele, attribute, value) {
    switch (attribute) {
      case "data--number":
        // 处理动作
        restraty($ele);
        break;

      case "data--score":
        restraty($ele);
        // $.wwclass.helper.anijsTrigger($ele,"changescore",{});
        break;
      case "finalize":
        finalizeElement($ele);
        break;
      default:
        console.info("监听到 " + attribute + " 属性值改变为 " + value + ", 但是没找到对应处理动作.");
    }
  };
  // END: 监听属性处理

  // 以下部分不需要修改
  if (!$.wwclass) {
    console.error("Can not use without wwclass.js");
    return false;
  }

  var ret = /*INSBEGIN:WWCLSHANDLER*/
    function (set) {
      if (set.length > 0) {
        loadDependence(function () {
          init();
          $(set).each(function (index, targetDom) {
            processElement($(targetDom));
          });
        });
      }
    }
    /*INSEND:WWCLSHANDLER*/
    ;

  return ret;

}));
