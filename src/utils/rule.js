export default {
    '0': [
        {
            yu: true,
            chepi: true,
            fazhan: true,
            daozhan: true,
            fayun: true,
            kehu: true,
            hongbao: true,
            explain: [
                [
                    '服务说明：',
                    '输       入：车皮/集装箱号；境外发到站；发运日期',
                    '跟踪周期：全程（持续跟踪至终点）',
                    '反馈时间：8分钟（在查询记录中查看）',
                    '运踪结果：一般每天持续反馈2条-30条信息',
                    '适用情形：经常查某个车皮/集装箱运踪，最划算'
                ]
            ],
            ruleOptions: {
                name: '国外全程追踪',
                price: 52,
                discount: 21
            }
        },
        {

            yu: true,
            chepi: true,
            kehu: true,
            hongbao: true,
            explain: [
                [

                    '服务说明：',
                    '输       入：车皮/集装箱号',
                    '跟踪周期：单次即时',
                    '反馈时间：8分钟（在查询记录中查看）',
                    '运踪结果：仅反馈最新的一条运踪',
                    '适用情形：偶尔查某个车皮/集装箱运踪'
                ],
                [

                    '追踪范围：',
                    '俄罗斯、白俄罗斯、蒙古、哈萨克斯坦、乌兹别克斯坦、吉尔吉斯斯坦、塔吉克斯坦、土库曼斯坦、乌克兰、摩尔多瓦、阿塞拜疆、格鲁吉亚、拉脱维亚、立、陶宛、爱沙尼亚、芬兰'
                ]
            ],
            ruleOptions: {
                name: '国外即时运踪',
                price: 30,
                discount: 21
            }

        },
        {

            yu: true,
            chepi: true,
            fazhan: true,
            daozhan: true,
            fayun: true,
            shiduan: true,
            kehu: true,
            hongbao: true,
            explain: [
                [
                    '服务说明：',
                    '输       入：车皮/集装箱号；境外发到站；发运日期',
                    '跟踪周期：全月（当月全部运踪信息）',
                    '反馈时间：8分钟（在查询记录中查看）',
                    '运踪结果：一般每天持续反馈2条-30条信息',
                    '适用情形：常年管理某个集装箱/车皮运踪'
                ]
            ],
            ruleOptions: {
                name: '国外时段运踪',
                price: 60,
                discount: 21
            }

        }
    ],
    '1': [
        {
            chepi: true,
            kehu: true,
            hongbao: true,
            explain: [],
            ruleOptions: {
                name: '国内即时运踪'
            }
        },
        {
            chepi: true,
            yu: true,
            kehu: true,
            hongbao: true,
            explain: [],
            ruleOptions: {
                name: '国内全程运踪',
                price: 10,
                discount: 7
            }
        },
        {
            chepi: true,
            yu: true,
            shiduan: true,
            kehu: true,
            hongbao: true,
            explain: [],
            ruleOptions: {
                name: '国内时段运踪',
                price: 15,
                discount: 7
            }
        }
    ]
};
