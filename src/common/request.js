const STATUS_SUCCESS = 200;
const STATUS_SUCCESS_MESSAGE = 20003;
const STATUS_QUERY_NULL_MESSAGE = 40003;
const STATUS_QUERY_NULL_NOLOGIN = 405; //未登录
const STATUS_EXCEPTION_MESSAGE = 50001;

const message = (msg) => {
	uni.showToast({
		icon: 'none',
		title: msg,
		duration: 3000
	});
};

export const handleMessageFun = (data, isExam) => {
	const { code, msg } = data;
	if (code === STATUS_SUCCESS_MESSAGE || code === STATUS_QUERY_NULL_MESSAGE || code === STATUS_EXCEPTION_MESSAGE) {
		message(msg);
	} else if (code === STATUS_QUERY_NULL_NOLOGIN) {
		uni.removeStorageSync('loginData_key')
		uni.removeStorageSync('loginData')
		uni.reLaunch({
			url: '/pages/login/login'
		})
		setTimeout(() => {
			message('登录过期或在别处登录，请重新登录后重试。');
		}, 100);
	} else {
		const title = data.msg ? data.msg : isExam ? '网络连接断开，请与监考员联系！' : '服务器无法接连，请与运营商联系';
		message(title);
	}
	return null;
};

export const post = (url, data, hasLoading) => {
	return request(url, data, hasLoading, 'POST', 'application/x-www-form-urlencoded');
};

export const text = (url, data, hasLoading) => {
	return request(url, data, hasLoading, 'POST', 'application/text;charset=UTF-8');
};

const request = (url, data, hasLoading, method, contentType) => {
	if (hasLoading) {
		uni.showLoading({
			title: '加载中...',
			mask: true,
		});
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header: {
				'Content-Type': contentType
			},
			success: (res) => {
				if (hasLoading) {
					uni.hideLoading();
				}
				if (res.data && res.data.code === STATUS_SUCCESS) {
					resolve(res.data.data);
				} else {
					reject(handleMessageFun(res.data));
				}
			},
			fail: (e) => {
				if (hasLoading) {
					uni.hideLoading();
				}
				reject(handleMessageFun(e));
			}
		});
	});
};
