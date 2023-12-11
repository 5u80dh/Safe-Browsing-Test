const urlInput = document.getElementById('url');
const resultDiv = document.getElementById('result');
const apiKey = 'AIzaSyDMEDsdjfHvuyFKPj7whoGXQUiu-Bev_eI'; // Replace with your actual API key

const checkUrlSafety = async (url) => {
    try {
        const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                threatTypes: ['MALWARE', 'PHISHING'],
                platformTypes: ['ANY'],
                threatEntryTypes: ['URL'],
                url: url
            })
        });
        const data = await response.json();
        if (data.matches && data.matches.length > 0) {
            resultDiv.innerHTML = `<p style="color: red">Website is considered unsafe!</p>`;
        } else {
            resultDiv.innerHTML = '<p style="color: green">Website appears to be safe.</p>';
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red">Error: ${error.message}</p>`;
    }
};

const form = document.getElementById('check-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = urlInput.value;
    if (url.length > 0) {
        resultDiv.innerHTML = '<p>Checking...</p>';
        checkUrlSafety(url);
    } else {
        alert('Please enter a URL');
    }
});
