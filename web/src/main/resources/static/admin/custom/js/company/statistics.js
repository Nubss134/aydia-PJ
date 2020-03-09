$(document).ready(function () {
    let company_id = $("#company_id").val();

    configStartDateForCompanyAdmin('start_time_statistic');
    configEndDateForCompanyAdmin('end_time_statistic');


    $(document).on("change", "#select_app", function () {
        $("option[value=" + this.value + "]", this)
            .attr("selected", true).siblings()
            .removeAttr("selected")
    });

    let json_download_app_pie = {
        chart: {
            type: 'pie',
            height: 383,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: false,
        tooltip: {
            pointFormat: ' <b>{series.name} : {point.y} </b>  '
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} <br>{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                            'black'
                    }
                }
            }
        },
        series: [{
            animation: {
                duration: 1000
            },
            type: 'pie',
            name: 'デバイス',
            data: [{}]
        }],

        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_download_app_area = {
        chart: {
            type: 'area',
            height: 400
        },
        dateRangeGrouping: true,
        title: false,
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            },

        },
        yAxis: {
            title: {
                text: 'インストール数'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} : {point.y:,.0f}'
        },
        series: [
            {
                animation: {
                    duration: 1000
                },
                name: 'インストール数',
                data: []
            }
        ],
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,

                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_new_member_pie = {
        chart: {
            type: 'pie',
            height: 383,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: false,
        tooltip: {
            pointFormat: '<b>{series.name} : {point.y} </b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} <br>{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                            'black'
                    }
                }
            }
        },
        series: [{
            animation: {
                duration: 1000
            },
            type: 'pie',
            name: 'インストール後に会員カード連携数',
            data: [{}]
        }],
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_new_member_area = {
        chart: {
            type: 'area',
            height: 400
        },
        dateRangeGrouping: true,
        title: false,
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'インストール後に会員カード連携数'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} : {point.y:,.0f}'
        },
        series: [
            {
                animation: {
                    duration: 1000
                },
                name: 'インストール後に会員カード連携数',
                data: []
            }
        ],
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,

                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_device_active_pie = {
        chart: {
            type: 'pie',
            height: 383,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: false,
        tooltip: {
            pointFormat: '<b>{series.name} : {point.y} </b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} <br>{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                            'black'
                    }
                }
            }
        },
        series: [{
            animation: {
                duration: 1000
            },
            type: 'pie',
            name: 'アクティブ端末数',
            data: [{}]
        }],
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_device_active_area = {
        chart: {
            type: 'area',
            height: 400
        },
        dateRangeGrouping: true,
        title: false,
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'アクティブ端末数'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} : {point.y:,.0f}'
        },
        series: [
            {
                animation: {
                    duration: 1000
                },
                name: 'アクティブ端末数',
                data: []
            }
        ],
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,

                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_user_active_pie = {
        chart: {
            type: 'pie',
            height: 383,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: false,
        tooltip: {
            pointFormat: '<b>{series.name} : {point.y} </b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} <br>{point.percentage:.1f}%',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                            'black'
                    }
                }
            }
        },
        series: [{
            animation: {
                duration: 1000
            },
            type: 'pie',
            name: 'アクティブユーザー数',
            data: [{}]
        }],
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };
    let json_user_active_area = {
        chart: {
            type: 'area',
            height: 400
        },
        dateRangeGrouping: true,
        title: false,
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'アクティブユーザー数'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} : {point.y:,.0f}'
        },
        series: [
            {
                animation: {
                    duration: 1000
                },
                name: 'アクティブユーザー数',
                data: []
            }
        ],
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,

                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        lang: {
            noData: "データがありません"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '23px',
                color: '#303030'
            }
        }
    };

    let Initparams = {
        appAuthId: $("#select_app").val(),
        stTime: $('#start_time_statistic').val(),
        enTime: $('#end_time_statistic').val()
    };

    loadData(Initparams);
    function splitAndroidAndIOSFromDto(downloadAppList) {
        let listDownloadAndroidArea = [];
        let listDownloadIOSArea = [];
        for (let i = 0; i < downloadAppList.length; i++) {
            listDownloadAndroidArea.push(downloadAppList[i].numberAndroid);
            listDownloadIOSArea.push(downloadAppList[i].numberIos);
        }
        return [{
            name: 'ANDROID',
            data: listDownloadAndroidArea
        }, {
            name: 'IOS',
            data: listDownloadIOSArea,
            color: '#90ed7d'
        }];
    }

    function convertDtoToArrayForPieChart(pieChartDataDto) {
        if (pieChartDataDto[0].count === 0 && pieChartDataDto[1].count === 0) {
            return null;
        }
        return [['ANDROID', pieChartDataDto[0].count], ['IOS', pieChartDataDto[1].count]];
    }

    function loadData(params) {
        window.loader.show();
        $.get('/api/v1/company/' + company_id + '/statistic/get', params, function (response) {
            window.loader.hide();
            if (response.status.code === 111) {
                window.alert.show('error', response.status.message, 2000);
            } else {
                let downloadAppForPieChartDtoList = response.data.downloadAppForPieChartDtoList;
                json_download_app_pie.series[0].data = convertDtoToArrayForPieChart(downloadAppForPieChartDtoList);
                Highcharts.chart('container_download_app_pie', json_download_app_pie);
                customerContainerPieChart(downloadAppForPieChartDtoList, "container_download_app_pie");

                json_download_app_area.series = splitAndroidAndIOSFromDto(response.data.downloadAppForAreaChartDtoList);
                json_download_app_area.xAxis.categories =
                    response.data.downloadAppDateForAreaChartDtoList.map(function (date) {
                        return moment(new Date(date)).format('YYYY/MM/DD');
                    });

                Highcharts.chart('container_download_app_area', json_download_app_area);
                $(".highcharts-container").css('width', '50%');
                $('#container_download_app_pie').css('border-right', '1px solid #cecece');
                $('#container_download_app_area').css('margin-top', '8px');


                let newMemberForPieChartDtoList = response.data.newMemberForPieChartDtoList;
                json_new_member_pie.series[0].data = convertDtoToArrayForPieChart(newMemberForPieChartDtoList);
                Highcharts.chart('container_new_member_pie', json_new_member_pie);
                customerContainerPieChart(newMemberForPieChartDtoList, "container_new_member_pie");

                json_new_member_area.series = splitAndroidAndIOSFromDto(response.data.newMemberForAreaChartDtoList);
                json_new_member_area.xAxis.categories =
                    response.data.newMemberDateForAreaChartDtoList.map(function (date) {
                        return moment(new Date(date)).format('YYYY/MM/DD');
                    });
                $('#container_new_member_area').highcharts(json_new_member_area);
                $('#container_new_member_pie').css('border-right', '1px solid #cecece');
                $('#container_new_member_area').css('margin-top', '8px');

                let deviceActiveForPieChartDtoList = response.data.deviceActiveForPieChartDtoList;
                json_device_active_pie.series[0].data = convertDtoToArrayForPieChart(deviceActiveForPieChartDtoList);
                Highcharts.chart('container_device_active_pie', json_device_active_pie);
                customerContainerPieChart(deviceActiveForPieChartDtoList, 'container_device_active_pie');

                json_device_active_area.series = splitAndroidAndIOSFromDto(response.data.deviceActiveForAreaChartDtoList);

                json_device_active_area.xAxis.categories =
                    response.data.deviceActiveDateForAreaChartDtoList.map(function (date) {
                        return moment(new Date(date)).format('YYYY/MM/DD');
                    });
                $('#container_device_active_area').highcharts(json_device_active_area);
                Highcharts.chart('container_device_active_area', json_device_active_area);

                $('#container_device_active_pie').css('border-right', '1px solid #cecece');
                $('#container_device_active_area').css('margin-top', '8px');


                let userActiveForPieChartDtoList = response.data.userActiveForPieChartDtoList;
                json_user_active_pie.series[0].data = convertDtoToArrayForPieChart(userActiveForPieChartDtoList);
                Highcharts.chart('container_user_active_pie', json_user_active_pie);
                customerContainerPieChart(userActiveForPieChartDtoList, "container_user_active_pie");

                json_user_active_area.series = splitAndroidAndIOSFromDto(response.data.userActiveForAreaChartDtoList);
                json_user_active_area.xAxis.categories =
                    response.data.userActiveDateForAreaChartDtoList.map(function (date) {
                        return moment(new Date(date)).format('YYYY/MM/DD');
                    });
                Highcharts.chart('container_user_active_area', json_user_active_area);

                $('#container_user_active_pie').css('border-right', '1px solid #cecece');
                $('#container_user_active_area').css('margin-top', '8px');

                $(".highcharts-container").css('width', '99%');
            }
        });

    };

    $('#Filter_statistic').click(function () {
        let params = {
            appAuthId: $("#select_app").val(),
            stTime: $('#start_time_statistic').val(),
            enTime: $('#end_time_statistic').val()
        };
        loadData(params);
    });

    function customerContainerPieChart(dataForPieChartDtoList, idContainerChart) {
        if (dataForPieChartDtoList.length > 1) {
            $('#' + idContainerChart).append('<div class="row note" >' +
                '<div class="col-md-6 text_type_device text_center">合計 : ' + (dataForPieChartDtoList[0].count + dataForPieChartDtoList[1].count) + '</div>' +
                '<div class="col-md-3 text_type_device text_center">' + dataForPieChartDtoList[0].type + ' : ' + dataForPieChartDtoList[0].count + '</div>' +
                '<div class="col-md-3 text_type_device text_center">' + dataForPieChartDtoList[1].type + ' : ' + dataForPieChartDtoList[1].count + '</div>' +
                '</div>');
        } else if (dataForPieChartDtoList.length > 0) {
            $('#' + idContainerChart).append('<div class="row note" >' +
                '<div class="col-md-6 text_type_device text_center">合計 : ' + (dataForPieChartDtoList[0].count) + '</div>' +
                '<div class="col-md-3 text_type_device text_center">' + dataForPieChartDtoList[0].type + ' : ' + dataForPieChartDtoList.count + '</div>' +
                '</div>');
        }
    }
});
