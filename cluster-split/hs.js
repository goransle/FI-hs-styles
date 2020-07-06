import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js'
import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
import defaultOptions from '../js/defaultOptions.js';
import setImages from '../js/setImages.js'

const params = new URLSearchParams(window.location.search);
const spreadsheet = params.get("spreadsheetID") || '1fLdwO1JAYL7WEnwuTm5srHCqwCOhwm6d8ds6RvT00Tw';
const spreadSheetKey = params.get("spreadsheetKey") || 4;

let title = '';

let highestValue = 0;

async function fetchSheet(googleSpreadsheetKey, worksheet) {
    var url = [
        'https://spreadsheets.google.com/feeds/cells',
        googleSpreadsheetKey,
        worksheet,
        'public/values?alt=json'
    ].join('/');

    return new Promise((resolve, reject) => {
        Highcharts.ajax({
            url: url,
            dataType: 'json',
            success: function (json) {
                const cells = json.feed.entry;
                const data = [];
                const seriesDataSets = {};

                cells.forEach(cell => {

                    const colIndex = cell.gs$cell.col;
                    const rowIndex = cell.gs$cell.row;

                    if (!data[rowIndex]) {
                        data[rowIndex] = [];
                    }

                    if (!data[rowIndex][colIndex]) {
                        data[rowIndex][colIndex] = (
                            (cell.gs$cell.numericValue && parseInt(cell.gs$cell.numericValue)) ||
                            cell.gs$cell.$t
                        );
                    }
                    //console.log(data[2]);

                });

                data.forEach((row, index) => {

                    if (index <= 1) {
                        title = data[1][1];
                        return;
                    }

                    if (!seriesDataSets[row[3]]) {
                        seriesDataSets[row[3]] = [];
                    }
                    seriesDataSets[1]
                    seriesDataSets[row[3]].push({
                        name: row[1],
                        value: row[2]
                    });
                    console.log(row[2])
                    if (+row[2] > highestValue) highestValue = +row[2]

                });

                // console.log(seriesDataSets);
                resolve(seriesDataSets);

            },
            error: function (
                xhr,
                text
            ) {
                reject(text, xhr);
            }
        });
    });
}

let hoverFx;

fetchSheet(spreadsheet, spreadSheetKey || 4)
    .then(
        seriesDataSets => {
            const chart = Highcharts.chart(
                'container',
                {
                    chart: {
                        type: 'packedbubble',
                        events: {
                            addSeries: function () {
                                const seriesArray = chart.series;
                                var timesRun = 0;
                                if (params.get('cycle') && !hoverFx) {

                                    hoverFx = window.setInterval(function () {

                                        if (!seriesArray.length) {
                                            return;
                                        }

                                        let hoverSeries = (
                                            chart.hoverPoint && chart.hoverPoint.series ||
                                            chart.hoverSeries
                                        );

                                        if (hoverSeries) {
                                            hoverSeries.points[0].onMouseOut();
                                        }

                                        if (!hoverSeries || hoverSeries.index >= (seriesArray.length - 1)) {
                                            hoverSeries = seriesArray[0];
                                        } else {
                                            hoverSeries = seriesArray[hoverSeries.index + 1];
                                        }

                                        hoverSeries.points[0].onMouseOver();

                                        // A this if stops the infinite hovering after ca. 120 seconds.
                                        // Can be deleted if infinite hovering is wanted.
                                        timesRun++;
                                        if (timesRun === 60) {
                                            hoverSeries.onMouseOut();
                                            clearInterval(hoverFx)
                                        }
                                    }, params.get('cycleSpeed') || 2000);
                                }
                                chart.setTitle({ text: title })
                                setImages();
                            }
                        },
                        styledMode: true
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: title,
                        y: 50
                    },
                    legend: {
                        ...defaultOptions.legend
                    },
                    //colors: ['#F0F', '#0F0', 'blue', 'pink','yellow'],
                    // tooltip are turned off, the information is only valuable due to bubble sizes
                    tooltip: {
                        enabled: false,
                        style: {
                            display: 'none'
                        }
                    },
                    plotOptions: {
                        packedbubble: {
                            minSize: '20%',
                            maxSize: '175%',
                            zMin: 0,
                            zMax: highestValue * 2.5,
                            layoutAlgorithm: {
                                splitSeries: true,
                                //integration: 'euler',
                                gravitationalConstant: 0.35,
                                //bubblePadding: 10,
                                //initialPositions: 'random',
                                //enableSimulation: false,
                                //maxSpeed: 10,
                                friction: -0.5,
                                parentNodeLimit: true,
                                maxIterations: 2000
                            },
                            dataLabels: {
                                useHTML: true,
                                enabled: true,
                                style: {
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    textOutline: '0'
                                },
                                //format: '{point.name}',
                                formatter: function () {
                                    var label = this.point.name;
                                    var labelLength = this.point.name.length;
                                    if (labelLength > 3) {
                                        var twoLines = label.slice(0, 3) + label.slice(3, labelLength).replace(/\s/g, '<br>');
                                        return twoLines;
                                    } else {
                                        return this.point.name;
                                    }
                                }
                            },
                            style: {
                                color: 'black',
                                textOutline: 'none',
                                fontWeight: 'normal',
                                width: '3px'
                            }
                        }
                    }, // Plot options
                    //series :{},
                    exporting: {
                        ...defaultOptions.exporting
                    }
                }
            );

            Object.keys(seriesDataSets).forEach((key, i) => {
                    //setTimeout(() => {
                        chart.addSeries({ name: key, data: seriesDataSets[key] }) 
                    //}, i * 500);
                }
            )
        }
    )
    .catch(
        error => {
            console.error(error);
        }
    );
