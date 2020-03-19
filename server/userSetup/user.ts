export interface userSetup {
    // 主页配置
    home: {
        // 客服咨询
        serve?: {
            show: boolean
            src: string
        }
        // 备案信息
        beian?: string,
        // 联系方式
        contact?: {
            qq: string
            tel: string[]
        }
        // 
    }
    // 产品
    product?: {
        showUps: boolean
        showDataCenter: boolean
        showAir: boolean
    }
    // 服务
    support?: {

    }
    // 购买指南
    buy?: {
        serverCenter: boolean
        Tmall: boolean
        jd: boolean
        blue: boolean
        userMall?: {
            title: string
            src: string
        }[]
    }
    // vr
    vr?: boolean
    // 案例
    case?: boolean
    //
    news?: boolean

}
const defaults: userSetup = {
    home: {
        serve: {
            show: true,
            src: "https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1DER4Qq&scene=SCE00003943#/"
        },
        beian: "雷迪司 浙ICP备09040710号"
    },
    product: {
        showAir: true,
        showDataCenter: true,
        showUps: true,
    },
    support: {

    },
    buy: {
        serverCenter: true,
        Tmall: true,
        jd: true,
        blue: true,
    },
    vr: true,
    case: true,
    news: true
}

const ladisHb: userSetup = {
    home: {
        serve: {
            show: false,
            src: "https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1DER4Qq&scene=SCE00003943#/"
        },
        beian: "雷迪司 浙ICP备09040710号",
        contact: {
            qq: "260338538",
            tel: ['15337364316蔡先生']
        }
    },
    product: {
        showAir: true,
        showDataCenter: true,
        showUps: true,
    },
    support: {

    },
    buy: {
        serverCenter: true,
        Tmall: false,
        jd: false,
        blue: false,
        userMall: [{ title: "天猫湖北雷迪司", src: '#' }]
    },
    vr: true,
    case: true,
    news: true
}

export const content = {
    "default": defaults,
    ladisHb
}