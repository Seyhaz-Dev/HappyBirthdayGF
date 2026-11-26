# 🎂 Happy Birthday Mini Website 🎉

A beautiful, interactive mini website to celebrate a special birthday ❤️
Built with plain **HTML, CSS and JavaScript** – no frameworks, no build step, no libraries.

## 🚀 Live Demo
👉 [Click here to view the site](https://nikitayadav19.github.io/HappyBirthdayGF)

## 🎁 Features
- 💌 Heartfelt message with an emoji-safe typewriter effect
- 📱 Fully responsive – small phones (320px), tablets, laptops and large screens, portrait or landscape
- 👆 Touch-friendly: tap bursts, tap-to-peek GIF cards, swipeable photo viewer
- 🖼️ Photo viewer (lightbox) with keyboard + swipe navigation
- 🎊 Confetti celebration on the final page
- ♿ Respects "reduce motion", keyboard accessible, safe-area aware (notch phones)
- ✨ Easy to customise

## 📁 Files
| File | What it is |
|---|---|
| `index.html` + `style.css` + `script.js` | Landing page |
| `cause.html` + `cause.css` + `cause.js` | "Reasons / wishes" page (edit the `reasons` array) |
| `last.html` + `last.css` + `last.js` | Memories page (edit names, captions, photos in the HTML) |
| `common.css` + `common.js` | Shared styles, floating emoji, tap bursts, cursor, page transitions |

## 🛠️ How to Customise
1. Change the name in `index.html` and `cause.html`.
2. Edit the greeting text at the top of `script.js`.
3. Edit the wishes in `cause.js` (`reasons` array).
4. Replace `d1.jpg`, `d2.jpg`, `d3.jpg` (and `gif1.gif`, `gif2.gif`) with your own photos and update the captions in `last.html`.
   Tip: adjust `--pos` on each `<img>` (e.g. `50% 20%`) to choose which part of the photo stays visible on narrow screens.

## 🖼️ Adding your 22 photos
Put your pictures in the `photos/` folder named `photo04.jpg` … `photo22.jpg` (photos 1–3 are `d1`–`d3`),
or edit the list in `photos.js` to change file names, titles and captions. Missing photos show a cute placeholder.

## 🎉 How to Use
```bash
git clone https://github.com/nikitayadav19/HappyBirthdayGF.git
cd HappyBirthdayGF
# just open index.html in a browser, or host it on GitHub Pages
```
