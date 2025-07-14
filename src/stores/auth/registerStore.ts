// stores/register.ts
import { defineStore } from "pinia";

interface RegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterStore = defineStore("register", {
  state: (): RegisterInfo => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  actions: {
    setRegister(data: Partial<RegisterInfo>) {
      Object.assign(this, data);
    },
    clearRegister() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
});
