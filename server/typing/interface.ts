/* 用户信息 */
export interface UserInfo {
    user: string
    name: string
    passwd: string
    tel?: number
    mail?: string
    DateTime: Date
    stat: boolean
    Group?: string
    IP?: string
}
// apollo server result
export interface ApolloMongoResult {
    msg?: string
    ok: number
    n?: number
    nModified?: number
    upserted?: any
  }
// apollo ctx
export interface ApolloCtx extends UserInfo {
    loggedIn: boolean
  }
type HtmlString = string
export type contentType = "html" | ""
// 公用包装
export interface GMpack {
    title: string
    parent?: string
    date: Date
}
//公用链接格式
export interface GMlink {
    target: string
    href: string
    title: string

}
// 产品目录
export interface product {
    title: string
    href: string
    img: string
    link: string
}
// 产品包装
export interface productPack extends GMpack {
    data: product[]
}
// 产品详情
export interface productList {
    t1: {
        type: contentType
        content: HtmlString
    },
    t2: {
        type: contentType
        content: HtmlString
    }
    img: string[]
    down: GMlink[]
}
// 产品包装
export interface productListPack extends GMpack {
    data: productList[]
}

// 软件资料目录
export interface support {
    language: string
    type: string
    title: string
    date: Date
    platform: string
    size: string
    version: string
    updateReason: string
    down: string

}
// 产品包装
export interface supportPack extends GMpack {
    data: support[]
}

// 教程
export interface supportList {
    title: string
    link: string
    href: string
    movie?: string
    html?: HtmlString
    date: Date
    parentsUntil: string
    parent: string
    data: string
}
// 产品包装
export interface supportListPack extends GMpack {
    data: supportList[]
}

// 经销商
export interface buy {
    alt: string
    shape: string
    coords: string
    href: string
}
export interface buyPack extends GMpack {
    data: buy[]
}
// 经销商详情
export interface buyList {
    parentsUntil: string
    link: string
    parent: string
    title: string
    content: string
    table: string
}
export interface buyListPack extends GMpack {
    data: buyList[]
}

// vr
export interface vr {
    img: string
    name: string
    time: string
    text: string
    link: string
    href: string
    linkText: string
}
export interface vrPack extends GMpack {
    data: vr[]
}
// 案例
export interface cases extends vr {
}
export interface casesPack extends vrPack {
}
// 案例详情
export interface caseList {
    text: string
    pic: string
}
export interface casesListPack extends GMpack {
    data: caseList
}
// about
export interface about extends GMpack {
    body?: string[]
    content?: {
        body: string[]
        webSite: string
    }
}
// head
export interface head extends GMpack {
    data?: string[]
}
//page
export interface pageLink {
    title: string
    href: string
    link: string
    args?: pageLink
}
export interface page extends GMpack {
    data: pageLink[]
}
// router
export interface router {
    title: string
    rout: string
}
/* 跨域查询 */
type DbTables = "Product" | "Product_list" | "Support"
    | "Support_list" | "Buy_list" | "Buy" | "VR" | "Case"
    | "Case_list" | "News" | "News_list" | "About" | "Head"
    | "Page" | "Router"

export interface CrorQuary {
    i18n?: string
    SiteName?: string
    table: DbTables
    title?: string
    parent?: string
    isNews?: boolean
    [T: string]: any
}