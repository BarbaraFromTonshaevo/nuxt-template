import { defineStore } from 'pinia'

export const useScrollbarStore = defineStore('ScrollbarStore', {
	state: () => ({
		isActive: false,
        body: null,
	}),
	actions: {
        setScrollbarBody(value){
            this.body = value;
        },
        changeActive(value){
            this.isActive = value;
        }
	},
})
