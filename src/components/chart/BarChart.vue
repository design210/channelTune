<script>
//Importing Bar class from the vue-chartjs wrapper
import { HorizontalBar } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
//Exporting this so it can be used in other components
export default {
  extends: HorizontalBar,
  props: ["labels", "data"],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ["2018", "2019", "2020", "2021", "2022"],
        datasets: [
          {
            label: "# of Votes",
            backgroundColor: ["#E9EBED", "#CACDD1", "#A0A4A8", "#FFBBBE", "#FD767F"],
            borderWidth: 0,
            borderRadius: {
              topRight: 20,
              bottomRight: 20,
            },
            data: [10000, 12000, 14000, 16000, 18000],
            barThickness: 40,
            fill: false,
          },
        ],
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        indexAxis: "y",
        hover: { mode: null },
        layout: {
          padding: {
            top: 30,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                autoSkip: false,
                fontSize: 16,
                fontFamily: "Montserrat",
                fontColor: "white", //세로축 이름 값
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: false,
                fontSize: 15,
                fontFamily: "Roboto",
                fontColor: "#26282B",
                fontWeight: 400,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            borderColor: "white",
            borderRadius: 25,
            color: [],
            display: true,
            font: {
              weight: 400,
              size: 15,
              family: "Roboto",
            },
            padding: 10,
            align: "start",
            anchor: "end",
            clamp: true,
            offset: 10,
            formatter: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
    };
  },
  mounted() {
    this.addPlugin(chartjsPluginDatalabels);
    this.renderChart(this.datacollection, this.options);
  },
};
</script>
