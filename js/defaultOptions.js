const params = new URLSearchParams(window.location.search)
const spreadsheet = params.get("spreadsheetkey") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 1;


export default {
  chart: {
    styledMode: true,
    type: "line",
    events: {
      load: (e) => {
        if (params.get("cycle")) {
          let currentVisibleSeries = 0;
          setInterval(() => {
            if (e.target.series.length > 1) {
              const series = e.target.series[currentVisibleSeries];
              series.points[Math.floor((series.points.length - 1) / 2)].onMouseOver();
              if (currentVisibleSeries === e.target.series.length - 1) currentVisibleSeries = 0;
              else currentVisibleSeries++;
            }
            if (e.target.series.length === 1) {
              e.target.series[0].points[currentVisibleSeries].onMouseOver();
              if (currentVisibleSeries === e.target.series[0].points.length - 1) currentVisibleSeries = 0;
              else currentVisibleSeries++;
            }
          }, params.get("cycleSpeed") || 5000);
        }
      }
    }
  },
  tooltip: {
    formatter: function () {
      const [min, max] = [this.series.dataMin, this.series.dataMax];
      const total = this.series.processedYData.reduce((a, x) => a + x);
      const avg = total / this.series.processedYData.length;
      return `${this.series.name}<br>
      <span style="color:lightgreen">Beste: ${max}<span><br>
      <span style="color:red">Laveste: ${min}<span><br>
      Gjennomsnitt: ${avg}<br>
      Totalt: ${total}
      `;
    },
    positioner: function (e) {
      return { x: Number(this.chart.containerWidth) - (e + 32), y: this.chart.yAxis[0].height - this.label.box.height / 2};
    }
  },
  title: {
    text: ""
  },
  credits: {
    enabled: false,
    text: "NCE Finance Innovation"
  },
  yAxis: {
    title: null,
    offset: 0
  },
  xAxis: {
    offset: -3
  },
  plotOptions: {
    series: {
      marker: {
        symbol: 'square'
      }
    }
  },
  defs: {
    glow: {
      tagName: 'filter',
      id: 'glow',
      opacity: 0.5,
      children: [{
        tagName: 'feGaussianBlur',
        result: 'coloredBlur',
        stdDeviation: 2.5
      }, {
        tagName: 'feMerge',
        children: [{
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'coloredBlur'
        }, {
          tagName: 'feMergeNode',
          in: 'SourceGraphic'
        }]
      }]
    }
  }
}