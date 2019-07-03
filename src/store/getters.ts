/*
 *@version: v0.0.1
 *@author: yckj0881
 *@date: 2019-06-21 18:36:04
 *@description:  vuex getters
*/
const getters = {
  sidebar: (state: any) => state.app.sidebar,
  spinning: (state: any) => state.user.spinning
};
export default getters;
