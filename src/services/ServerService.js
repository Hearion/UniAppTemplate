import { post } from '@/common/request';

//调试开发 - 门户
// export const urlContent = "http://192.168.2.62:19200/"; // 马晓杰
// export const urlContent = "http://192.168.2.203:19200/"; // 凌国辉

// 打包服务配置
let urlContent = "https://webtest.bjupi.com:9891/api/gkj/"; // 测试
// let urlContent = "https://xiaoguanzai.com/api/gkj/"; // 正式

export const urlPublicContent = urlContent + 'public/';
export const urlPublicSprogramContent = urlPublicContent + 'sprogram/'

/**
 * 获取验证令牌
 * @returns {string|string}
 */
const getAppKey = () => {
    let loginDataKey = uni.getStorageSync('loginData_key');
    return loginDataKey ? `appKey=${loginDataKey}` : '';
};

/**
 * 请求参数拼接
 * @param thisUrl
 * @param data
 * @returns {string}
 */
export function requestParams(thisUrl, data) {
    const getAppKeyData = getAppKey();
    const params = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    const timestampString = `?${Date.now()}`;
    const queryString = params.length ? `&${params.join('&')}` : '';
    const appKeyString = getAppKeyData ? `&${getAppKeyData}` : '';

    return `${thisUrl}${timestampString}${appKeyString}${queryString}`;
}

/**
 * 登录
 * @param phone
 * @param verificationCode
 * @returns {Promise<*>}
 */
export function login(phone, verificationCode) {
    return post(urlPublicSprogramContent + requestParams('login', {phone, verificationCode}), null, false);
}

/**
 * 获取与申请相关的人员照片
 * @param applyPhotoUuid
 */
export function getApplyPhotoUuid(applyPhotoUuid) {
    return urlPublicSprogramContent + 'getApplyPhotoUuid/' + applyPhotoUuid
}


