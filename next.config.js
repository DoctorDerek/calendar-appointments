module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/calendar",
        permanent: true,
      },
    ]
  },

  pageExtensions: ["js", "jsx", "ts", "tsx"],

  webpack5: true,

  webpack: (config, { dev, isServer, webpack }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: "esbuild-loader",
      options: { loader: "tsx", target: "esnext" },
    })

    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    ) // Support JSX Transform per https://dev.to/rsa/speed-up-next-js-build-with-typescript-and-tailwind-css-418d

    return config
  },

  experimental: {
    craCompat: true, // create-react-app compatibility
  },
}
