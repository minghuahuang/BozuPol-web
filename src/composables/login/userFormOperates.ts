import { getCurrentInstance } from "vue";
import { userSign, userLogin } from "@/api/login";
import type { ResponseType } from "@/api/type";
import { useStore } from '@/store'
import { useRoute } from "vue-router";

type InfoType = {
  phone: string;
  password: string;
};

export default function userFormOperates(router: any, params: any) {
  const { proxy } = getCurrentInstance();
  const { commit } = useStore();
  const route = useRoute();
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
       localStorage.setItem('userId', res.data.userId)
       const { redirect }: any = route.query
        router.push({
          path: redirect || '/home',
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
