const index = {
    indexContent: [
        [
            {
                title: '国外即时运踪',
                icon: '',
                iconrest: 'icon-huo',
                rangeBtn: true,
                resultList: [
                    '输       入：车皮/集装箱号',
                    '跟踪周期：单次即时',
                    '反馈时间：8分钟（在运踪查询历史中查看）',
                    '运踪结果：仅反馈最新的一条运踪',
                    '适用情形：偶尔查某个车皮/集装箱运踪'
                ]
            },
            {
                title: '国外全程运踪',
                icon: '',
                resultList: [
                    '输       入：车皮/集装箱号；境外发到站；发运日期',
                    '跟踪周期：全程（持续跟踪至终点）',
                    '反馈时间：8分钟（在运踪查询历史中查看）',
                    '运踪结果：一般每天持续反馈2条-30条信息',
                    '适用情形：经常查某个车皮/集装箱运踪，最划算'
                ]
            }
            // ,
            // {
            //     title: '国外时段运踪',
            //     icon: '',
            //     resultList: [
            //         '输       入：车皮/集装箱号；境外发到站；发运日期',
            //         '跟踪周期：全月（当月全部运踪信息）',
            //         '反馈时间：8分钟（在运踪查询历史中查看）',
            //         '运踪结果：一般每天持续反馈2条-30条信息',
            //         '适用情形：常年管理某个集装箱/车皮运踪'
            //     ]
            // }
        ],
        [
            {
                title: '国内即时运踪',
                icon: '',
                resultList: [
                    '输       入：车皮/集装箱号',
                    '跟踪周期：单次即时',
                    '反馈时间：即时',
                    '运踪结果：仅反馈最新的一条运踪',
                    '适用对象：偶尔查某个车皮/集装箱运踪的用户'
                ]
            }
            // ,
            // {
            //     title: '国内全程运踪',
            //     icon: '',
            //     resultList: [
            //         '输       入：车皮/集装箱号',
            //         '跟踪周期：全程（持续跟踪至终点）',
            //         '反馈时间：即时',
            //         '运踪结果：一般每天持续反馈2条-30条信息',
            //         '适用对象：经常查某个车皮/集装箱运踪，最划算'
            //     ]
            // },
            // {
            //     title: '国内时段运踪',
            //     icon: '',
            //     resultList: [
            //         '输入：车皮/集装箱号',
            //         '跟踪周期：全月（当月全部运踪信息）',
            //         '反馈时间：即时',
            //         '运踪结果：一般每天持续反馈2条-30条信息',
            //         '适用对象：常年管理某个集装箱/车皮运踪'
            //     ]
            // }
        ]
    ],
    indexDialong: ['俄罗斯', '白俄罗斯', '蒙古', '哈萨克斯坦', '乌兹别克斯坦', '吉尔吉斯斯坦', '塔吉克斯坦', '土库曼斯坦', '乌克兰', '摩尔多瓦', '阿塞拜疆', '格鲁吉亚', '拉脱维亚', '立陶宛', '爱沙尼亚', '芬兰']
};

const manage = {
    avatarUrl: `data:image/png;base64,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`
};
module.exports = {
    indexData: index,
    manage: manage
};
