import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/highcharts-more.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/exporting.src.js';


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

                });

                data.forEach((row, index) => {

                    if (index <= 1) {
                        return;
                    }

                    if (!seriesDataSets[row[3]]) {
                        seriesDataSets[row[3]] = [];
                    }

                    seriesDataSets[row[3]].push({
                        name: row[1],
                        value: row[2]
                    });

                });
                console.log(seriesDataSets);
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

const chart = Highcharts.chart(
    'container',
    {
        chart: {
            type: 'packedbubble',
            height: '100%'
        },
        title: {
            text: 'Medlemmar i clusteret'
        },
        //colors: ['#F0F', '#0F0', 'blue', 'pink','yellow'],
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} millionar NOK'
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '120%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }

    }
);

fetchSheet('1da82Nx3vYm14msH7oYtdYkrXoSSmsU84xlf8EMIofNg', 8)
    .then(
        seriesDataSets => {
            console.log(seriesDataSets);
            Highcharts.objectEach(
                seriesDataSets,
                (data, name) => chart.addSeries({ name, data })
            )
        }
    )
    .catch(
        error => {
            console.error(error);
        }
    );