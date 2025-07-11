async function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const token = document.getElementById('token').value;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "⏳ Sto generando...";

  const response = await fetch("https://api-inference.huggingface.co/models/gsdf/Counterfeit-V2.5", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  console.log("Response status:", response.status);
  const data = await response.text();
  console.log("Response data:", data);

  if (!response.ok) {
    resultDiv.innerHTML = "❌ Errore durante la generazione:<br>" + data;
    return;
  }

  const blob = await response.blob();
  const imageURL = URL.createObjectURL(blob);
  resultDiv.innerHTML = `<img src="${imageURL}" /><br><a href="${imageURL}" download="immagine.png">📥 Scarica Immagine</a>`;
}
