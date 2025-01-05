import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { sidebarWeekly, sidebarBusiness, sidebarCases } from './sidebar.js'



export default defineConfig({
  ignoreDeadLinks: true,
  title: 'Money Hub',
  description: '无人抚我青云志, 我自踏雪至山巅',
  lastUpdated: true,
  cleanUrls: true,
  lang: 'zh-CN',
  head: [
    ['link', { rel: "icon", type: "image/png", href: "/favicon.png" }],
    ['script', {
      src: '/_vercel/insights/script.js', defer: ''
    }],
    // ['script', {
    //   src: '/analytic.js', defer: '',
    //   'data-website-id': 'd49602a4-673c-4b6f-b2ca-8e5c2b358850',
    //   'data-host-url': "https://api.counter.plantree.me/umami"
    // }],
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Money Hub| 小站' }],
    ['meta', { property: 'og:description', content: '生意小小会发家, 工资多多是渡生' }],
    ['meta', { property: 'og:image', content: 'https://moneyhub.site/thumbnail.jpg' }],
    ['meta', { property: 'og:url', content: 'https://moneyhub.site/' }],
    // google analytics
    // ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-2QFP04Q1TY' }],
    // ['script', {}, `window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());

    //   gtag('config', 'G-2QFP04Q1TY');`],
  ],
  markdown: {
    headers: {
      level: [0, 1]
    }
  },
  themeConfig: {
    nav: [
      {
        text: '阮一峰的网络日志',
        link: 'http://www.ruanyifeng.com/blog/',
      },
      {
        text: '技术周刊',
        link: 'https://github.com/ruanyf/weekly'
      },
      {
        text: '个人博客',
        link: 'https://dantefung.github.io/'
      }
    ],
    sidebar: {
      '/md/business/': sidebarBusiness(),
      '/md/cases/': sidebarCases(),
      '/weekly/': sidebarWeekly(),
      
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/plantree/ruanyf-weekly' },
      { icon: 'discord', link: 'https://discord.gg/ffRG4mWzFZ' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present <a href="https://dantefung.github.io/" target="_blank">DANTE FUNG</a>'
    },
    algolia: {
      appId: 'JMQN3OHTS2',
      apiKey: '9bb35b7fbb4b3ae36bb0f2ac9af77b5e',
      indexName: 'ruanyf-weekly',
      // https://docsearch.algolia.com/docs/api
      maxResultsPerGroup: 20
    },
  },
});




