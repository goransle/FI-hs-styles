import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js'
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js'

Highcharts.chart("container", {
    chart: {
      styledMode: true,
      type: "line",
      events:{
        render: ({target: chart}) =>{
          chart.renderer.image('https://financeinnovation.fra1.digitaloceanspaces.com/NCE_Finance_Innovation_logo_NCE_positive_rgb.svg',
  0,0,594/2, 432/2).align({align: "left"}).add();
        }
      }
    },
    title: {
      text: "Antall medlemmer FI"
    },
    credits: {
      enabled: true,
      text: "NCE Finance Innovation"
    },
    yAxis: {
      title: null,
      offset: 0
    },
    xAxis: {
      tickInterval: 1,
      offset: -1
    },
    plotOptions: {
      chart: {
        animation: false
      },
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
    },
    data: {
      googleSpreadsheetKey: "1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg",
      googleSpreadsheetWorksheet: 1, // fane nr 1
      switchRowsAndColumns: true
    }
  });