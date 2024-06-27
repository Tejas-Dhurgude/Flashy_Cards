/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'hover-green': '#F3FDE8',
      },
      backgroundImage: {
        'sky-cloud': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSootr9lpT7HmWqkWcYKBxAYDcp1YtRBMUwTQ&usqp=CAU')",
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
}

