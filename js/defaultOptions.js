export default {
    chart: {
      styledMode: true,
      type: "line",
      events:{
        redraw: ({target: chart}) =>{
          // Getting title from name of first column
          chart.setTitle({text: chart.data.columns[0].name}, false)
          const background = document.querySelector(".highcharts-background")
          const { fill } = getComputedStyle(background);
          if (fill === 'rgb(0, 0, 0)') {
            chart.renderer.image('https://financeinnovation.fra1.digitaloceanspaces.com/NCE_Finance_Innovation_logo_NCE_negative_rgb.svg',
              0, 0, 594 / 2, 432 / 2).align({ align: "left" }).add();
          } else {
            chart.renderer.image('https://financeinnovation.fra1.digitaloceanspaces.com/NCE_Finance_Innovation_logo_NCE_positive_rgb.svg',
              0, 0, 594 / 2, 432 / 2).align({ align: "left" }).add();
          }
        }
      }
    },
    title: {
      text: "NCE Finance Innovation"
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
      offset: -1
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