/**
 * Created by Neo on 2017/5/23.
 */
$(function () {
    "use strict";

    /**
     * TODO: 建议单独维护该API
     * TODO: 建议增加替换原参数功能
     * @param originUrl 原始URL
     * @param params 要新增的参数，暂不支持替换原参数
     * @return {string} 包含新参数的新url
     */
    function buildUrl(originUrl, params) {
        var newParameters = $.param(params);
        var sep = (originUrl.indexOf('?') > -1) ? '&' : '?';
        return originUrl + sep + newParameters;
    }

    var table = $('#agentTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('body').attr('data-agent-url'),
            "data": function (d) {
                return $.extend({}, d, extendData());
            }
        },
        "ordering": false,
        "lengthChange": false,
        "searching": false,
        "columns": [
            {
                title: '',
                target: 0,
                className: 'treegrid-control table-action',
                data: function (item) {
                    if (item.children) {
                        return '<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>';
                    }
                    return '';
                }
            },
            {
                "title": "级别", "data": "rank", "name": "rank"
            },
            {
                "title": "用户", "data": "name", "name": "name"
            },
            {
                "title": "手机号", "data": "phone", "name": "phone"
            },
            {
                "title": "所佣下属", "data": "subordinate", "name": "subordinate"
            },
            {
                title: "操作",
                className: 'table-action',
                data: function (item) {
                    return '<a href="javascript:;" class="js-checkUser" data-id="' + item.id + '"><i class="fa fa-check-circle-o" aria-hidden="true"></i>&nbsp;查看</a>';
                }
            }
        ],
        "treeGrid": {
            "left": 20,
            "expandIcon": '<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
            "collapseIcon": '<span><i class="fa fa-chevron-down" aria-hidden="true"></i></span>'
        },
        "displayLength": 15,
        "drawCallback": function () {
            clearSearchValue();
        }
    });

    $(document).on('click', '.js-search', function () {
        table.ajax.reload();
    }).on('click', '.js-checkUser', function () {
        // buildUri()
        location.href = buildUrl($('body').attr('data-detail-url'), {
            id: $(this).attr('data-id')
        });
    });

    function extendData() {
        var formItem = $('.js-selectToolbar').find('.form-control');
        if (formItem.length === 0)  return {};
        var data = {};

        formItem.each(function () {
            var t = $(this);
            var n = t.attr('name');
            var v = t.val();
            if (v) data[n] = v;
        });
        return data;
    }

    function clearSearchValue() {
        //TODO
    }
});