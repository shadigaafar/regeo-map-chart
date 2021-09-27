module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    webpackFinal: (config, { configType }) => {
        const path = require("path");
        config.module.rules = config.module.rules.filter(
            (rule) => rule.test.toString() !== "/\\.css$/"
        );
        config.module.rules.push({
            test: /\.css$/,
            use: ["style-loader", "css-loader?modules=true"],
            include: path.resolve(__dirname, "../"),
        });

        return config;
    },
};
