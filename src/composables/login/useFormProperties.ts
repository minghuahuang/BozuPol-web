import { ref, reactive } from "vue";

type InfoType = {
  phone: string;
  password: string;
};

export default function useFormProperties(t: any) {

  const activeName = ref("login");

  const loginText = ref(t("login.loginBtn"));

  const info: InfoType = reactive({
    phone: "",
    password: "",
  });
  const rules = reactive({
    phone: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t("login.placeMobile"),
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: t("login.placePass"),
        trigger: "blur",
      },
    ],
  });

  return {
    activeName,
    loginText,
    info,
    rules
  }
}

