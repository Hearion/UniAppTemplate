/**
 * 文件转 base64
 * @param img
 * @param callback
 */
export const getBase64 = (img, callback) => {
    // #ifdef MP-WEIXIN
    let base64Header = 'data:application/octet-stream;base64,'
    let FileSystemManager = wx.getFileSystemManager()
    callback(base64Header + FileSystemManager.readFileSync(img, "base64"))
    return
    // #endif

    // #ifdef H5
    let reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    return
    // #endif

    return uni.showToast({title: '暂不支持该平台转换！', icon: 'none'})
};


/**
 * 轻提示
 * @param text
 */
export const notificationFun = (text) => {
    uni.showToast({
        icon: 'none',
        title: text,
        duration: 2500,
        success: result => {}
    });
}

/**
 * 创建图片压缩至2M
 * @param src
 * @returns {Promise<unknown>}
 */
export const onCreateImageCompress = (src) => {
    // 利用 Promise 实现递归同步
    return new Promise((resolve, reject) => {
        onCompressImage(src, resolve, reject)
    })
}

/**
 * 压缩图片 onCreateImageCompress 子进程
 * @param src
 * @param resolve
 * @param reject
 */
export const onCompressImage = (src, resolve, reject) => {
    // 获取文件管理器
    const fileSystemManager = wx.getFileSystemManager()
    // 获取文件详情 size 文件大小
    fileSystemManager.getFileInfo({
        filePath: src,
        success: res => {
            if ((res.size / 1024 / 1024) > 2) {
                // 大于指定大小 继续压缩
                wx.compressImage({
                    src,
                    quality: 80,
                    success: (CRes) => {
                        // 大小不符合 递归重新压缩
                        fileSystemManager.getFileInfo({
                            filePath: CRes.tempFilePath,
                            success: CCRes => {
                                if (((res.size / 1024 / 1024) - (CCRes.size / 1024 / 1024) <= 0.1)) {
                                    reject('图片过大，无法压缩至2M内，请重新选择文件！')
                                } else {
                                    return onCompressImage(CRes.tempFilePath, resolve, reject)
                                }
                            }
                        })
                    },
                    fail: () => {
                        reject('图片压缩异常')
                    }
                })
            } else {
                // 大小符合 完成压缩 跳出递归 抛出数据
                resolve(src)
            }
        },
        fail: () => {
            reject('图片读取异常')
        }
    })
}

/**
 * 图片压缩
 * @param {object} file 图片信息：width、height、type、path
 * @param {string} canvasId canvas的id名
 * @param {object} config 限制最大宽高
 * @returns 压缩完成后的图片path
 */
export const contraction = (file, canvasId, thisPage, config = { maxWidth: 1080, maxHeight: 1080 }) => {
    try {
        return new Promise((resolve, reject) => {
            // 获取图片原始宽高
            let width = file.width
            let height = file.height

            // 计算图片当前大小和目标大小的比例：目标大小 / 图片当前大小
            // 根据比例调整图片的尺寸：
            // 新宽度 = 原始宽度 * √(目标大小 / 图片当前大小)
            // 新高度 = 原始高度 * √(目标大小 / 图片当前大小)
            // 宽高同比例调整
            // 宽度 > 最大限宽 -> 重置尺寸
            if (width > config.maxWidth) {
                const ratio = config.maxWidth / width
                width = config.maxWidth
                height = height * ratio
            }
            // 高度 > 最大限高度 -> 重置尺寸
            if (height > config.maxHeight) {
                const ratio = config.maxHeight / height
                width = width * ratio
                height = config.maxHeight
            }

            // 获取canvas元素
            const query = uni.createSelectorQuery().in(thisPage)
            let dom = query.select(`#${canvasId}`)
            dom.node(_ => {}).exec(res => {
                console.log(res, 'data2')
                // Canvas 对象
                const canvas = res[0].node
                // 渲染上下文
                const ctx = canvas.getContext('2d')

                // 根据设备像素比处理尺寸 = 大小 * 设备像素
                const dpr = uni.getSystemInfoSync().pixelRatio
                canvas.width = width * dpr
                canvas.height = height * dpr
                ctx.scale(dpr, dpr)

                //创建img对象
                let img = canvas.createImage();
                img.src = file.path; // 给图片添加路径
                //图片加载完毕
                img.onload = function () {
                    // 将图片绘制到 canvas
                    ctx.drawImage(img, 0, 0, width, height)
                    // 生成图片
                    uni.canvasToTempFilePath({
                        canvas,
                        canvasId,
                        x: 0,
                        y: 0,
                        destWidth: width,
                        destHeight: height,
                        success(res) {
                            console.log(res)
                            resolve(res); // 生成临时文件路径
                        },
                        fail(err) {
                            console.log(err)
                            reject(err);
                        }
                    })
                }
            })
        })
    } catch (err) { console.log(err); }
}


/**
 * 获取集合中，对应的属性的值。其中property为空时，取值为对应value
 * @param arr
 * @param property
 * @param value
 * @returns {*|null}
 */
export const getArrObjectByProperty = (arr, property, value) => {
    return arr.find((data) => {
        if (property) {
            return data[property] == value;
        } else {
            return data == value;
        }
    }) || null;
};

// 11位数字第一位为1
export const phoneReg = /^1\d{10}$/;

// 验证车牌号
export const carNumReg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/

// 验证身份证号
export const cardIdReg = /^[1-9]\d{5}(19\d{2}|2\d{3})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9xX]$/;


/**
 * 数值转时分秒
 * @param second
 * @returns {string}
 */
export const formatTime = (second) => {
    let h = 0, i = 0, s = parseInt(second);
    if (s > 60 && s < 3600) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    } else if (s >= 3600) {
        h = parseInt(s / 3600);
        i = parseInt((s % 3600) / 60);
        s = parseInt((s % 3600) % 60);
    }
    // 补零
    let zero = function (v) {
        return (v >> 0) < 10 ? "0" + v : v;
    };

    return [zero(h), zero(i), zero(s)].join(":");

    // if (h > 0) {
    //     return [zero(h), zero(i), zero(s)].join(":");
    // } else {
    //     return [zero(i), zero(s)].join(":");
    // }
}

/**
 * 获取文件后缀名
 * @param filename
 * @returns {*}
 */
export const getFileExtension = (filename) => {
    const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    return ext.toLowerCase();
}

/**
 * 写入base64数据到本地 目前只支持微信小程序
 * @param base64
 * @param fileName
 */
export const writeBase64 = (base64, fileName) => {
    // ifdef MP-WEIXIN
    let writeAddress = `${wx.env.USER_DATA_PATH}/${Math.floor(Date.now() / 1000) + fileName}`
    return new Promise((resolve, reject) => {
        // 获取文件管理器
        const FileSystemManager = uni.getFileSystemManager();
        // 注意，base64 编码，data 只需要传 base64 内容本身，不要传 Data URI 前缀，否则会报 fail base64 encode error 错误。
        // 例如，传 aGVsbG8= 而不是传 data:image/png;base64,aGVsbG8=
        let base64Str = base64.split('base64,')[1]
        FileSystemManager.writeFile({
            // 微信用户路径
            filePath: writeAddress,
            data: base64Str,
            encoding: 'base64',
            success: () => {
                resolve(writeAddress)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
    // endif
}
