// Function to generate QR code
function generateQr() {
    const input = document.getElementById("qrInput").value;
    const qrContainer = document.querySelector(".qrcode");

    if (input) {
        qrContainer.innerHTML = "";
        new QRCode(qrContainer, input);
        
        // Show download button
        const downloadBtn = document.getElementById("download-btn");
        downloadBtn.style.display = 'block';

        // Set up download functionality
        downloadBtn.onclick = () => {
            const qrCanvas = qrContainer.querySelector("canvas");
            if (qrCanvas) {
                const imageUrl = qrCanvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = "qrcode.png";
                link.click();
            }
        };
    } else {
        alert("Please enter a URL");
    }
}

// Listen for the Enter key press for QR code generation
document.getElementById("qrInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generateQr();
    }
});

// Image search functionality
const search = document.querySelector('#search');
const search_btn = document.querySelector('#search-btn');
const img_container = document.querySelector('.img-container');

search_btn.addEventListener('click', async () => {
    const search_value = search.value;
    if (search_value === '') {
        alert('Please enter a search term');
        return;
    } else {
        const key = 'RuJTeKhXAyF9G-9VlCJJv1NlEMuCgGCDgIS-2Brjv3E';
        const url = `https://api.unsplash.com/search/photos?page=1&query=${search_value}&client_id=${key}`;
        let data = await fetch(url);
        data = await data.json();
        displayImages(data);
    }
});

function displayImages(data) {
    img_container.innerHTML = '';
    data.results.forEach(element => {
        const img = document.createElement('img');
        img.src = element.urls.regular;
        img_container.appendChild(img);
    });
}
