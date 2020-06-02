export default {
    chart: {
      styledMode: true,
      type: "line"
    },
    title: {
      text: "NCE Finance Innovation"
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