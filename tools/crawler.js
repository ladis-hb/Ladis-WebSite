//import express from 'express';
const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
var public = {
    src: [],
    href: []
}
var Default = 'http://www.ladis.com.cn'
var Index = 'http://www.ladis.com.cn/index.shtml' //index爬取主页

/**
 * @param {*} index 请求句柄的网页地址，
 * @returns 返回cheerio句柄
 */
async function jq(index1) {
    if (public.href.includes(index1)) {
        console.log(index1 + 'jq==：本页面已解析，跳过此次查询')
        return false
    }
    if(fileExist(index1) && public.href.includes(index1)){
        console.log(`jq==文件已存在`)
        return false
    }
    var ar = ['down','rar','mp4','mp3','tar.gz','pdf','exe','doc','ggpkg']
    for (var i of ar){
        if(index1.includes(i)){
            console.log(`jq===文件${index1}已限制下载`)
            return false
        }
    }
    console.log(`jq==：文件未记录和未存在${index1}`)
    var index = index1
    if (index !== Index) {
        var str = index.split('.')
        if (str[0] == '' && str[1].length > 2) {
            str.shift()
        }
        if (str[1] == '') {
            str.shift()
            str.shift()
        }
        strs = []
        str.map(s => {
            strs.push(s.trim())
        })
        index = encodeURI(strs.join('.'))
        index = `${Default}${index}`
    }
    //console.log(`准备爬取页面：${index}`)

    var data = await axios.get(index, { responseType: "arraybuffer" })
        .then(data => {
            return data
        }).catch(err => {
            console.log(`jq==${index}是空链接XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
            return false
        })
    //if返回的是false空，返回false
    if (!data) {
        return false
    } else {
        SaveFiles(index1, data.data)
        if(index.includes('shtml')){
            return {ch:cheerio.load(data.data),type:'obj'}
        }else{
            console.log(`${index}jq==文件已下载`)
            return {type:'file'}
        }
        
    }

}

/**
 * @param {*} jq cheerio句柄
 * @returns 返回句柄内href,src数组
 */
function GetlinkArr(jq) {
    if (!jq) {
        console.log('GetlinkArr==空对象，跳过')
        return false
    }
    if(jq.type == 'file'){        
        return false 
    }
    var arg = { hrefs: [], srcs: [] }
    jq.ch('[href],[src]').each((id, val) => {
        if (val.attribs.href) {
            var href = val.attribs.href
            !href.includes('http') ? arg.hrefs.push(href) : ''

        }
        if (val.attribs.src) {
            var src = val.attribs.src
            !src.includes('http') ? arg.srcs.push(src) : ''
        }
    })
    //console.log(`解析句柄，返回句柄内src，href链接的页面`)
    return arg
}

/**
 * @param {*} index href/src网址
 * @param {*} data  数据
 */
function SaveFiles(index, data) {
    var address = fileExist(index)
    if(address){
        console.log(`SaveFiles==保存文件${address}`)
        fs.writeFileSync(address, data)
    }
    
}
/**
 *
 *
 * @param {*} file 文件路径
 * @returns  存在文件则返回false，否则返回文件完整路径
 */
function fileExist (file) {
    var Fileadress = './ladis'
    var indexs = file.split('/')
    if (file.includes('www.ladis.com.cn')) {
        console.log('fileExist==Home Page')
        isDirectory(Fileadress)
        Fileadress += `/${indexs[3]}`
    } else {

        var length = indexs.length - 1
        var filename = indexs[length]
        for (var i = 1; i < length; i++) {
            Fileadress += `/${indexs[i]}`
            isDirectory(Fileadress)
        }
        Fileadress += `/${filename}`
    }
    if (fs.existsSync(Fileadress)) {
        console.log(`fileExist==文件:${Fileadress}已存在`)
        return false
    } else {
        console.log(`fileExist==文件:${Fileadress}不存在`)
        return Fileadress
    }
  }
/**
 * @param {*} directory 判断目录
 */
function isDirectory(directory) {
    path_d = path.join(__dirname, directory)
    //console.log(`判断目录：${path_d} 是否存在`)
    if (!fs.existsSync(path_d)) {
        //console.log(`目录:${path_d} 不存在，创建。。。`)
        fs.mkdirSync(path_d)
    } else {
        //console.log(`目录已存在`)
    }

}

var Get = async function start(add,n=1) {
    console.log(   `start==本文档为${n}级页面，文档地址${add}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`)

    var indexArray = GetlinkArr(await jq(add))
    if (indexArray) {
        console.log(`start==执行文档对象${indexArray}`)
        for (var src of indexArray.srcs) {
            if (public.src.includes(src)) {
                console.log(`${src}:start==文件已存在,跳过下载`)
            } else {
                public.src.push(src)
                await jq(src)
            }
        }
        for (var href of indexArray.hrefs) {
            if (public.href.includes(href)) {
                console.log(`${href}:start==文件已存在,跳过下载`)
            } else {
                if(href.includes('.shtml')){
                    GetlinkArr(await jq(href))
                    n += 1
                    Get(href,n)
                }else{
                    await jq(href) 
                }
                public.href.push(href)                
                console.log(`start==下载文档==${href}`)
            }
        }
        n = 0
    } else {
        console.log(`start==跳过`)
    }

}

Get(Index)

