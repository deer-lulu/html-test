<template>
  <div :id="id"></div>
</template>
<script>
let AMapUI = AMapUI;
import G2 from "@antv/g2";
import { DataSet } from "@antv/data-set";
export default {
  name: "mapchart",
  props: ["chartId"],
  data() {
    return {
      id: "",
      dataAMap: {}
    };
  },
  watch: {},
  methods: {},
  created() {
    this.id = this.chartId;
    this.dataAMap = AMapUI;
  },
  mounted() {
    let that = this;
    console.log(that.id);
    // 当前聚焦的区域
    var currentAreaNode = void 0;
    this.dataAMap.load(["ui/geo/DistrictExplorer", "lib/$"], function(
      DistrictExplorer
    ) {
      // 创建一个实例
      var districtExplorer = (window.districtExplorer = new DistrictExplorer({
        eventSupport: true //打开事件支持
      }));

      //加载区域
      function loadAreaNode(adcode, callback) {
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            if (callback) {
              callback(error);
            }
            return;
          }
          renderG2Map(areaNode); // 使用 G2 绘制地图

          if (callback) {
            callback(null, areaNode);
          }
        });
      }

      // 全国
      loadAreaNode(100000);
      // 上海
      // loadAreaNode(310000);
    });

    // 开始使用 G2 绘制地图
    var provinceChart = void 0;

    function renderG2Map(areaNode) {
      console.log(areaNode);
      var adcode = areaNode.getAdcode();
      var geoJSON = areaNode.getSubFeatures(); // 获取 geoJSON 数据
      // var name = areaNode.getName();
      provinceChart && provinceChart.destroy();
      provinceChart = null;
      if (
        !geoJSON ||
        (currentAreaNode && "" + currentAreaNode.getAdcode() === "" + adcode)
      ) {
        return;
      }
      var dv = processData(geoJSON);
      // start: 计算地图的最佳宽高
      var longitudeRange = dv.range("longitude");
      var lantitudeRange = dv.range("latitude");
      var ratio =
        (longitudeRange[1] - longitudeRange[0]) /
        (lantitudeRange[1] - lantitudeRange[0]);
      var width = void 0;
      var height = void 0;
      if (ratio > 1) {
        width = document.querySelector("#" + that.id).clientWidth;
        height = width / ratio;
      } else {
        width = document.querySelector("#" + that.id).clientHeight * ratio;
        height = document.querySelector("#" + that.id).clientHeight;
      }
      if (areaNode.adcode === 100000) {
        width = document.querySelector("#" + that.id).clientWidth;
        height = document.querySelector("#" + that.id).clientHeight;
      }
      // end: 计算地图的最佳宽高
      provinceChart = new G2.Chart({
        container: that.id,
        width: width,
        height: height,
        padding: 0
      });
      provinceChart.source(dv);
      provinceChart.axis(false);
      provinceChart.tooltip({
        showTitle: false,
        itemTpl:
          "<li data-index={index}>" +
          '<span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
          "机构数量:<span class='g2-tooltip-value'>{value}</span>" +
          "</li>"
      });
      provinceChart
        .polygon()
        .position("longitude*latitude")
        .label("name", {
          textStyle: {
            fill: "#fff",
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)"
          }
        })
        .style({
          stroke: "#fff",
          lineWidth: 1
        })
        .color("value", "#BAE7FF-#1890FF");
      provinceChart.guide().text({
        position: ["min", "max"],
        offsetY: 20,
        style: {
          fontSize: 14,
          fontWeight: "bold"
        }
      });

      provinceChart.render();
      provinceChart.on("polygon:click", ev => {
        console.log(ev.data.point);
      });
    }

    function processData(geoJSON) {
      var mapData = {
        type: "FeatureCollection",
        features: geoJSON
      };
      // 实际应用请将数据填写进value
      // 构造虚拟数据
      var userData = [];
      console.log(geoJSON);
      for (var i = 0; i < geoJSON.length; i++) {
        var name = geoJSON[i].properties.name;
        var adcode = geoJSON[i].properties.adcode;
        userData.push({
          name: name,
          adcode: adcode,
          value: Math.round(Math.random() * 1000)
        });
      }
      console.log(userData);
      var ds = new DataSet();
      var geoDataView = ds.createView().source(mapData, {
        type: "GeoJSON"
      }); // geoJSON 经纬度数据

      // 用户数据
      var dvData = ds.createView().source(userData);
      dvData.transform({
        type: "geo.region",
        field: "name",
        geoDataView: geoDataView,
        as: ["longitude", "latitude"]
      });

      return dvData;
    }
  }
};
</script>
<style lang="scss"></style>
