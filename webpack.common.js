module.exports = {
    entry: "./src/main.js",
    module: {
        rules: [
            {
                test: require.resolve("./src/globals.js"),
                loader: "expose-loader",
                options: {
                    exposes: ["globals"]
                }
            }
        ]
    }
};
