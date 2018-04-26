import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbList: []//面包屑列表
  },
  mutations: {
    //填充面包屑列表
    dealData: function (state, payload) {
      var path = payload.path;
      var name = payload.name;
      state.breadcrumbList.splice(0, state.breadcrumbList.length);
      path = path.substr(1, path.length)
      var pathArray = path.split("/");
      var nameArray = name.split("/");
      var curPath = "";
      for (var i = 0; i < pathArray.length; i++) {
        state.breadcrumbList.push({
          path: curPath += "/" + pathArray[i],
          name: nameArray[i]
        })
      }
    }

  }
})
