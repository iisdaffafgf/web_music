module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 1576, // 视口的宽度，对应设计稿的宽度
            // viewportHeight: 667, // 视口的高度，对应设计稿的高度（可以省略）
            unitPrecision: 5,  // 指定 ‘px’ 转换为视口单位值的小数位（因为很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议就使用vw
            selectorBlackList: ['ignore'], //指定不需要转换的类,这个类是值css中的class类
            minPixelValue: 1, // 小于等于‘1px’的不转换为视窗单位
            mediaQuery: false // 是否允许在谋体查询中转换‘px’
        }
    }
}