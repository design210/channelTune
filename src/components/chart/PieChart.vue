<script>
import { Doughnut } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
Chart.Tooltip.positioners.custom = function (elements, eventPosition) {
  //<-- custom is now the new option for the tooltip position
  /** @type {Chart.Tooltip} */
  var tooltip = this;

  /* ... */

  return {
    x: eventPosition.x,
    y: eventPosition.y,
  };
};
export default {
  extends: Doughnut,
  props: ["dataSet", "percentage", "labels"],
  data() {
    return {
      colorSets: ["#C83A3A", "#44B548", "#4264D4", "#EE9610"],
      chartData: {
        labels: this.labels,
        datasets: [
          {
            label: "Doughnut Chart",
            data: this.percentage,
            fill: false,
            // borderColor: "#ccc", //비율 구분석 색
            backgroundColor: ["#FF9595", "#CEF2CF", "#B6C7FF", "#FFCA78"],
            borderWidth: 0, //비율 구분선 두께
          },
        ],
      },
      options: {
        legend: {
          display: false, //위에 제목? 색상과 함께 나타내는
          position: "right",
        },
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: true,
          borderColor: "white",
          custom: (tooltipModel) => {
            if (tooltipModel.opacity !== 0 && this.$data.chartData.labels.length && this.$data.chartData.datasets.length) {
              /* get dataPoints index */
              var index = tooltipModel.dataPoints[0].index;

              /* get dataPoints datasetIndex */
              var dataSetIndex = tooltipModel.dataPoints[0].datasetIndex;

              /* get the current color on index and datasetIndex position */
              var color = this.$data.colorSets[index];
              /* set backgroundColor */
              tooltipModel.backgroundColor = color;
            }
          },

          position: "custom",
          padding: 5,
          footerFont: {
            size: 100,
          },
          displayColors: false,
          callbacks: {
            label: (tooltipItems) => {
              const parts = String(this.dataSet[tooltipItems.index]).split(".");
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return parts.join(".") + "원";
            },
            labelColor: function (context) {
              const colorSets = ["#C83A3A", "#44B548", "#4264D4", "#EE9610"];
              return {
                borderColor: "",
                backgroundColor: colorSets[context.index],
                borderWidth: 2,
                borderDash: [4, 4],
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#fff";
            },
          },
        },
        plugins: {
          datalabels: {
            color: "#1b1d1f", //값 출력에 대한 color
            font: {
              //값 노출에 대한 font
              weight: "bold",
              size: 20,
            },
            padding: 10,
            display: "auto",
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
              value: {
                color: "blue",
              },
            },
            formatter: function (value) {
              if (Math.round(value) < 1) {
                return "";
              }
              return Math.round(value) + "%";
            },
            // listeners: {
            //   enter: function (context) {
            //     console.log("들어왔습니다.");
            //     console.log(context);
            //   },
            //   leave: function (context) {
            //     console.log("나갑니다.");
            //     console.log(context);
            //   },
            // },
          },
        },
      },
    };
  },
  mounted() {
    this.addPlugin(chartjsPluginDatalabels);
    this.renderChart(this.chartData, this.options);
  },
};
</script>
