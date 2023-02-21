import * as TYPES from '../action-types'
import api from '../../api';

const baseAction = {
    //异步获取 登录用户信息，完成派发
    async queryUserInfoAsync() {
        let info = null;
        try {
            let { data, code } = await api.getUserInfo();
            if (+code === 200) {
                info = data;
            }
        } catch (_) {

        }
        return {
            type: TYPES.BASE_INFO,
            info
        }
    },
    // 清除存储的登录者信息
    clearUserInfo() {
        return {
            type: TYPES.BASE_INFO,
            info: null
        };
    }

};
export default baseAction;