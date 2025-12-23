import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "QQ空间时光机",
    description: "恢复与导出已删除的QQ空间内容",
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/logo.png',
        nav: [
            {text: '首页', link: '/'},
            {text: '使用教程', link: '/guide'},
            {text: '常见问题', link: '/faq'},
            {text: '更新日志', link: '/changelog'},
            {
                text: '关于',
                items: [
                    {text: 'Github', link: 'https://github.com/XuanRanDev'},
                    {text: "XuanRan's Blog", link: 'https://blog.xuanran.cc'},
                    {text: 'CodeBook', link: 'https://codebook.xuanran.cc'},
                ]
            }
        ]
        ,

        sidebar: {
            '/guide': [
                {
                    text: '使用教程',
                    items: [
                        {text: '软件下载与运行环境', link: '/guide#一、软件下载与运行环境说明'},
                        {text: '启动软件', link: '/guide#二、启动软件'},
                        {text: 'QQ 登录与权限校验', link: '/guide#三、qq-登录与权限校验'},
                        {text: '开始导出数据', link: '/guide#四、开始导出-qq-空间数据'},
                        {text: '导出完成与结果说明', link: '/guide#五、导出完成与结果说明'},
                        {text: '补充说明', link: '/guide#六、补充说明'}
                    ]
                }
            ]
        },

        socialLinks: []
    }
})
