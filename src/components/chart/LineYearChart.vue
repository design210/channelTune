<script>
import { Line } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
import { debounce } from "lodash";
export default {
  extends: Line,
  props: ["year", "price"],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: this.year,
        datasets: [
          {
            label: "",
            fill: false,
            borderWidth: 3,
            borderColor: "rgba(255,77,86,1)",
            data: this.price,
            pointRadius: 3,
            pointBorderWidth: 2,
            tension: 0, //기울기
          },
        ],
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        responsive: true,
        layout: {
          padding: 0,
        },
        onResize: debounce(() => {
          this.renderChart(this.datacollection, this.options);
        }, 250),
        elements: {
          point: {
            borderWidth: 3,

            radius: 10,
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false, //세로선 그리기
                drawTicks: false,
              },
              ticks: {
                fontSize: 13,
                padding: 10,
                labelOffset: 0,
                maxRotation: 0,
                fontFamily: "Montserrat",
                fontColor: "#828282",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                borderDash: [8, 4],
                drawOnChartArea: true, //가로선 그리기
                drawTicks: false,
                zeroLineColor: "rgba(0,0,0,0.01)",
              },
              ticks: {
                beginAtZero: true, //0부터 시작
                fontSize: 12,
                padding: 10,
                fontFamily: "Montserrat",
                fontColor: "#828282",
                callback: function (value) {
                  const parts = String(value).split(".");
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return parts.join(".");
                },
              },
            },
          ],
        },
        tooltips: {
          enabled: true,
          displayColors: false,
          fontWeight: "bold",
          caretSize: 0,
          callbacks: {
            label: (tooltipItems) => {
              const parts = String(tooltipItems.value).split(".");
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return parts.join(".") + "원";
            },
            labelColor: function (context) {
              return {
                borderColor: "",
                backgroundColor: "#fff",
                borderWidth: 2,
                borderDash: [4, 4],
                borderRadius: 2,
              };
            },
            labelTextColor: function (context) {
              return "#fff";
            },
          },
          custom: (tooltipModel) => {
            if (tooltipModel.opacity !== 0 && this.$data.datacollection.labels.length && this.$data.datacollection.datasets.length) {
              /* get dataPoints index */

              /* get the current color on index and datasetIndex position */
              var color = "#CC3E45";
              /* set backgroundColor */
              tooltipModel.backgroundColor = color;
              tooltipModel.fontSize = 20;
              tooltipModel.labelFontSize = 20;
            }
          },
        },

        legend: {
          display: false,
        },

        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
    this.addPlugin(chartjsPluginDatalabels);
  },
};
</script>
<style lang="scss"></style>
