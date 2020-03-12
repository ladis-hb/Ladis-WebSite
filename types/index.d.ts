// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from "vue";
import { Auth } from "nuxtjs__auth";
import { BvModal, BvToast } from "bootstrap-vue";


// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module "vue/types/vue" {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $auth: Auth;
    
  }
  interface VueConstructor {
    $auth: Auth;
    $bvModal: BvModal;
    $bvToast: BvToast;
    
   /*  $router: VueRouter
    $route: Route */
  }
}
// type DataDef<Data, Props, V> = Data | ((this: Readonly<Props> & V) => Data);
declare module "vue/types/options" {
  
  interface ComponentOptions<V extends Vue> {
    auth?: boolean | string;
  }
}
