module.exports = {
    devServer:{
        proxy:{
            '/user':{
                target:'http://localhost:8181',
                changeOrigin: true,
                secure: false,
                pathRewrite:{
                    "^/user": ""
                }
            }
        }
    }

}