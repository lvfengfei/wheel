const PASSWORD = 'fun'
export default ({ Vue, router, isServer }) => {
  if (!isServer) {
    import('vue-toasted' /* webpackChunkName: "notification" */).then((module) => {
      Vue.use(module.default)
    })
  }


  // Vue.mixin({
  //   beforeMount() {
  //     if (!window.sessionStorage.getItem('docSign')) {
  //       var password = window.prompt('请输入密码');
  //       if (password === PASSWORD) {
  //         window.sessionStorage.setItem('docSign', true)
  //       } else {
  //         alert('密码错误')
  //         location.href = 'https://baidu.com/'
  //       }
  //     }
  //   }
  // })
}
