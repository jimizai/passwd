import { Response } from './interface';
import store from '../store';
import { setGlobalMessage } from '../store/actions';
import { MessageType } from '../enums';
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

  store.dispatch(setGlobalMessage({ type: MessageType.Error, message: errorMsg }) as any);

  return res.data;
};

export default handleError;
