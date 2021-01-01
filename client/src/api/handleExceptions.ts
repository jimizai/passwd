import { Response } from './interface';
// 处理异常
const handleError = (res: Response): Response => {
  let errorMsg = '';
  if (!res.data) {
    errorMsg = '服务器繁忙';
  }

  if (res.data.code !== 200) {
    switch (res.data.code) {
      case 401:
        errorMsg = '请重新登录';
        break;
      case 403:
        errorMsg = '您没有相关权限';
        break;
      case 500:
        errorMsg = '服务器繁忙';
        break;
      default:
        errorMsg = res.data.msg;
    }
  }

  console.log(errorMsg);

  return res.data;
};

export default handleError;
