import { defineStore } from "pinia";

export const useMainInfoStore = defineStore("mainInfoStore", {
  state: () => ({
    main: [],
    info: {},
    isReady: true,
  }),
  actions: {
    async setHeaderData(res) {
      this.main = res.data.main;
      this.info = {
        phone: res.data.site_info[0].field_phone,
        email: res.data.site_info[0].field_email,
        address: res.data.site_info[0].field_address,
        social: {
          vk: '',
          telegram: '',
          whatsapp: '',
        }
      };
      this.isReady = true;
    },
  },
});