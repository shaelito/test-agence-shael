app.controller('DesempenhoCtrl', function MainCtrl($scope, Toast, DesempenhoService, staticData, util) {
    var vm = this,
        monthFormat = buildLocaleProvider("MMM-YYYY"),
        ymdFormat = buildLocaleProvider("YYYY-MM-DD");
    vm.consultorsQuery = [];
    vm.datosDesempenho = [];
    vm.fechaIni = null;
    vm.fechaFin = null;
    vm.consultorsQuery = [];
    vm.rotateClass = "";
    vm.showPizza = false;
    vm.showGrafico = false;
    vm.showRelatorio = false;
    vm.dateFields = {
        type: 'date',
        required: true,
        startView: 'month',
        locale: monthFormat
    };
    vm.pizzaDataSource = {
        chart: {
            caption: "Participação na Receita",
            startingangle: "120",
            showlabels: "0",
            showlegend: "1",
            enablemultislicing: "0",
            slicingdistance: "15",
            showpercentvalues: "1",
            showpercentintooltip: "0",
            plottooltext: "$label, $datavalue%",
            theme: "fint"
        },
        data: []
    };
    vm.graficoDataSource = {
        "chart": {
            "caption": "Performance Comercial",
            "subcaption": "",
            "xaxisname": "Períodos",
            "yaxisname": "Quantidade (Em R$)",
            "numberprefix": "R$",
            "showValues": 0,
            "theme": "fint"
        },
        "categories": [
            {
                "category": []
            }
        ],
        "dataset": []
    };

    $scope.chartOptions = {
        "chart": {"type": "column"},
        "plotOptions": {"series": {"stacking": ""}},
        "series": [],
        "title": {text: 'Performance Comercial'},
        subtitle: {text: "akakakak"},
        xAxis: {
            categories: []
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}$R',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Quantidade (Em R$)',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }]
    };


    vm.addConsultortoQuery = addConsultortoQuery;
    vm.removeConsultorFromQuery = removeConsultorFromQuery;
    vm.addConsultorsToQuery = addConsultorsToQuery;
    vm.removeConsultorsFromQuery = removeConsultorsFromQuery;
    vm.addAllConsultorsToQuery = addAllConsultorsToQuery;
    vm.removeAllConsultorsFromQuery = removeAllConsultorsFromQuery;
    vm.getDatosFaturaDesempenho = getDatosFaturaDesempenho;
    vm.relatorio = relatorio;
    vm.pizza = pizza;
    vm.grafico = grafico;
    getConsultors();

    function getConsultors() {
        util.showWait();
        DesempenhoService.getConsultors()
            .success(function (consultors) {
                vm.consultors = consultors;
                util.hideWait();
            })
            .error(function (error) {
                util.hideWait();
                $scope.status = 'Unable to load consultors data: ' + error.message;
            });
    }

    function getDatosFaturaDesempenho(callback) {
        if (!vm.fechaIni || !vm.fechaFin || !vm.consultorsQuery.length) {
            var msg = !vm.consultorsQuery.length ? 'Escolha pelo menos um consultor' : 'Escolha el período';
            Toast.show(msg, 'top right', 3000);
            return;
        }
        util.showWait();
        var periods = getPeriods();
        var params = {
            consultorsQuery: vm.consultorsQuery,
            fechaIni: vm.fechaIni,
            fechaFin: vm.fechaFin,
            periods: periods
        }
        DesempenhoService.getDatosFaturaDesempenho(params)
            .success(function (data) {
                util.hideWait();
                if (!data.relatorio.datos.length)
                    Toast.show('Não há dados que correspondam aos critérios especificados', 'top right', 3000);
                else
                    callback({success: true, relatorio: data.relatorio, grafico: data.grafico});
            })
            .error(function (error) {
                util.hideWait();
                callback({success: false, error: error});
                $scope.status = 'Unable to load consultors data: ' + error.message;
            });
    }

    function relatorio() {
        vm.getDatosFaturaDesempenho(function (result) {
            util.hideWait();
            if (result.success) {
                vm.datosDesempenho = result.relatorio.datos;
                vm.showPizza = false;
                vm.showGrafico = false;
                vm.showRelatorio = true;
            } else {
                Toast.show('Ocorreu um erro ao carregar os dados', 'top right', 3000);
            }
        })
    }

    function pizza() {
        vm.pizzaDataSource.data = [];
        vm.getDatosFaturaDesempenho(function (result) {
            util.hideWait();
            if (result.success) {
                result.relatorio.datos.forEach(function (el) {
                    var piePiece = {
                        label: el.no_usuario,
                        value: el.receita_liquida_total * 100 / result.relatorio.receita_liquida_total
                    }
                    vm.pizzaDataSource.data.push(piePiece);
                });
                vm.showPizza = true;
                vm.showGrafico = false;
                vm.showRelatorio = false;
            } else {
                Toast.show('Ocorreu um erro ao carregar os dados', 'top right', 3000);
            }
        });
    }

    function grafico() {
        $scope.chartOptions.xAxis.categories = [];
        $scope.chartOptions.series = [];
        vm.getDatosFaturaDesempenho(function (result) {
            if (result.success || true) {
                var periodsResult = getPeriods();
                var sameYear = periodsResult.sameYear;
                var periods = periodsResult.data;
                var firstPeriod = periods[0];
                var lastPeriod = periods[periods.length - 1];
                //vm.graficoDataSource.chart.subcaption = firstPeriod.monthName
                //    + " de " + firstPeriod.year + " a "
                //    + lastPeriod.monthName + " de " + lastPeriod.year;
                $scope.chartOptions.subtitle.text = firstPeriod.monthName
                    + " de " + firstPeriod.year + " a "
                    + lastPeriod.monthName + " de " + lastPeriod.year;

                periods.forEach(function (period) {
                    var category = {
                        label: sameYear ? period.monthName : period.monthName + "-" + period.year
                    };
                    $scope.chartOptions.xAxis.categories.push(category.label);
                    //vm.graficoDataSource.categories[0].category.push(category);
                });
                $scope.chartOptions.series = result.grafico;
                //while (result.grafico.length) {
                //    $scope.chartOptions.series.push(result.grafico.pop());
                //}

                vm.showPizza = false;
                vm.showGrafico = true;
                vm.showRelatorio = false;
            } else {
                Toast.show('Ocorreu um erro ao carregar os dados', 'top right', 3000);
            }
        })
    }

    function getPeriods() {
        var periods = [];
        var fechaIni = vm.fechaIni;
        var fechaFin = moment(vm.fechaFin).endOf('month').format();
        var year = moment(fechaIni).year();
        var sameYear = true;
        while (moment(fechaIni).isBefore(fechaFin)) {
            var monthIndex = moment(fechaIni).month();
            if (sameYear && year != moment(fechaIni).year())
                sameYear = false;
            var period = {
                month: monthIndex + 1,
                year: moment(fechaIni).year(),
                monthName: staticData.meses[monthIndex].name
            }
            periods.push(period);
            fechaIni = moment(fechaIni).add(1, 'months').format();
        }
        return {data: periods, sameYear: sameYear};
    }

    function addConsultortoQuery(consultor) {
        vm.consultorsQuery.push(consultor);
        vm.consultors = vm.consultors.filter(function (cons) {
            return cons.co_usuario !== consultor.co_usuario;
        });
    };

    function removeConsultorFromQuery(consultor) {
        vm.consultors.push(consultor);
        vm.consultorsQuery = vm.consultorsQuery.filter(function (cons) {
            return cons.co_usuario !== consultor.co_usuario;
        });
    };

    function addConsultorsToQuery() {
        vm.consultors.forEach(function (consultor) {
            if (consultor.checked) {
                consultor.checked = false;
                vm.addConsultortoQuery(consultor);
            }
        });
    };

    function removeConsultorsFromQuery() {
        vm.consultorsQuery.forEach(function (consultor) {
            if (consultor.checked) {
                consultor.checked = false;
                vm.removeConsultorFromQuery(consultor);
            }
        });
    };

    function addAllConsultorsToQuery() {
        while (vm.consultors.length) {
            vm.consultorsQuery.push(vm.consultors.pop());
        }
    };

    function removeAllConsultorsFromQuery() {
        while (vm.consultorsQuery.length) {
            vm.consultors.push(vm.consultorsQuery.pop());
        }
    };


    function buildLocaleProvider(formatString) {
        return {
            formatDate: function (date) {
                if (date) return moment(date).format(formatString);
                else return null;
            },
            parseDate: function (dateString) {
                if (dateString) {
                    var m = moment(dateString, formatString, true);
                    return m.isValid() ? m.toDate() : new Date(NaN);
                } else return null;
            }
        };
    }
});