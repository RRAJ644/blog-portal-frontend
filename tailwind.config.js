/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E26433E8',
        'header-bg': '#272727',
        'heading-color': 'rgb(244, 240, 225)',
        'social-color': '#F4F0E1',
        'card-text': '#777777',
        'tag-bg': '#69727d',
        'link-color': '#471FF3',
      },
      typography: {
        customHeading: {
          css: {
            color: '#E26433E8',
            fontSize: '1.6rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            // paddingTop: '0.8em',
            // paddingBottom: '0.8rem',
          },
        },
        customParagraph: {
          css: {
            // color: '#000',
            // color: '#E26433E8',
            fontSize: '1.4rem',
          },
        },
      },
      border: {
        borderCustom: '#F4F0E1', // custom border color
      },
      backgroundImage: {
        'blogs-header': "url('/src/assets/blogs-header1.png')",
      },
      listStyleType: {
        'custom-disc': 'disc',
      },
      spacing: {
        'custom-pl': '1.25rem', // Adjust this value as needed
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Include the typography plugin
  ],
}
