module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      use: [
        'babel-loader',
        // 'eslint-loader'
      ],
      resolve: { extensions: ['.js', '.jsx'] },
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        { loader: 'file-loader' },
      ],
    },
    {
      test: /\.md$/,
      use: [
        { loader: 'html-loader' },
        { loader: 'markdown-loader' },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      exclude: /node_modules/,
      loader: 'url-loader',
    },
    {
      test: /\.svg$/,
      use: ({ resource }) => ({
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgProps: {
            className: `icon icon-${resource.split('/').pop().split('.').shift()}`,
          },
        },
      }),
    },
  ],
};
