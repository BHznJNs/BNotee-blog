module.exports = {
    publicPath: "/",
    devServer: {
        proxy: "http://localhost:3030"
    },
    pwa: {
        iconPaths: {
            faviconSVG: 'img/icons/favicon.svg',
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/ios/152.png',
            maskIcon: 'img/icons/favicon.svg',
            msTileImage: null,
        }
    }
}