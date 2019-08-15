import Vue from 'vue';
import { UtilInterface } from '@/assets/utils'

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    Form: any,
    $utils: UtilInterface
  }
}
