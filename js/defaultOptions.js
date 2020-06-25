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
    distance: 0,
    positioner: function (e) {
      return { x: Number(this.chart.containerWidth) - (e + 32), y: this.chart.yAxis[0].height - this.label.box.height / 2};
    },
    shape: 'square'
  },
  title: {
    text: ""
  },
  credits: {
    enabled: false,
    text: "NCE Finance Innovation"
  },
  yAxis: {
    title: {
      text: null
    },
    color: 'white'
    //minPadding: 0.025
  },
  xAxis: {
    minTickInterval: 1,
    minPadding: 0.015,
    offset: -3.55
  },
  plotOptions: {
    series: {
      // pointStart: 0,
      // softThreshold: false,
      marker: {
        symbol: 'square'
      }
    }
  },
  defs: {
    glow: {
      tagName: 'filter',
      id: 'glow',
      opacity: 0.25,
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