const images = [
    '0.jpg',
    '1.jpg',
    '2.jpg',
]

const chosenImage = images[Math.floor(Math.random() * images.length)];

const image = document.createElement("img");

image.src=`./img/${chosenImage}`;

document.body.appendChild(image);