async function searchNASA() {
  const query = document.getElementById("nasaInput").value.trim();
  if (!query) return alert("Please enter a keyword");

  try {
    const res = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`);
    const data = await res.json();

    const container = document.getElementById("nasaContainer");
    container.innerHTML = "";

    if (!data.collection.items || data.collection.items.length === 0) {
      container.innerHTML = "<p>No images found.</p>";
      return;
    }

    data.collection.items.slice(0, 12).forEach(item => {
      const img = item.links ? item.links[0].href : "";
      const title = item.data[0].title;
      const description = item.data[0].description || "No description available";

      const div = document.createElement("div");
      div.className = "nasa-card";
      div.innerHTML = `
        <img src="${img}" alt="${title}" />
        <h3>${title}</h3>
        <p>${description.substring(0, 120)}...</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("nasaContainer").innerHTML = "<p>Error fetching NASA images.</p>";
  }
}
