const {
  fs,
  path
} = require('@vuepress/shared-utils')

module.exports = ctx => ({
  base: '/doc/',
  dest: 'vuepress',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'wheel',
      description: ' '
    }
  },
  head: [
    ['link', {
      rel: 'icon',
      href: `/logo.png`
    }],
    ['link', {
      rel: 'manifest',
      href: '/manifest.json'
    }],
    ['meta', {
      name: 'theme-color',
      content: '#0366d6'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    }],
    ['meta', {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    }],
    ['meta', {
      name: 'msapplication-TileColor',
      content: '#000000'
    }]
  ],
  themeConfig: {
    // logo: '/logo.png',
    smoothScroll: true,
    locales: {
      '/': {
        lastUpdated: '上次更新',
        nav: require('./nav'),
        sidebar: {
          '/plugin/': getPluginSidebar(),
          '/vueRouter/': getVueRouterSidebar(),
        },
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用.",
            buttonText: "刷新"
          }
        },
      }
    }
  },
  plugins: [
    ['@vuepress/nprogress'],
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>'
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>'
    }],
    ['flowchart'],
    ['vuepress-plugin-code-copy', {
      successText: '复制成功！'
    }]
  ],
  extraWatchFiles: [
    '.vuepress/nav/index.js'
  ]
})

function getVueRouterSidebar() {
  return [{
    title: 'vue router',
    collapsable: false,
    children: [
      'extension'
    ]
  }]
}

function getPluginSidebar() {
  return [{
    title: 'Obfuscator',
    collapsable: false,
    children: [
      'obfuscator/extension'
    ]
  },
  {
    title: 'crypto',
    collapsable: false,
    children: [
      'obfuscator/crypto'
    ]
  },
  {
    title: 'Jenkins',
    collapsable: false,
    children: [
      'jenkins/extension'
    ]
  }
  ]
}
