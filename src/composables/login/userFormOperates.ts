import { getCurrentInstance } from "vue";
import { userSign, userLogin } from "@/api/login";
import type { ResponseType } from "@/api/type";
import { useStore } from '@/store'

type InfoType = {
  phone: string;
  password: string;
};

export default function userFormOperates(router: any, params: any) {
  const { proxy } = getCurrentInstance();
  const { commit } = useStore();
  // 注册接口
  const fetchSign = (params: InfoType) => {
    userSign(params).then((res: ResponseType) => {
      if (res.code === 200) {
        proxy.$message.success(res.message);
      } else {
        proxy.$message.error(res.message);
      }
    });
  };

  // 登录接口
  const fetchLogin = (params: InfoType) => {
    userLogin(params).then((res: ResponseType) => {
      if (res.code === 200) {
       commit("setUserStatus", res.data.status);
        router.push({
          path: "/",
        });
      } else {
        proxy.$message.error(res.message);
      }
    });
  };

  return {
    fetchSign,
    fetchLogin
  }
}
