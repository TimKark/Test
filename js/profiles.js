
document.addEventListener("DOMContentLoaded", async function () {

    const container = document.getElementById("profile-container");

    try {
        // Retrieve profile data from our JSON file
        const response = await fetch("./data/profiles.json");

        if (!response.ok) {
            throw new Error("Could not load profiles.json");
        }

        const profiles = await response.json();

        // Handle Django dumpdata format
        profiles.forEach(function (item) {

            const profile = item.fields ? {
                id: item.pk,
                title: item.fields.title,
                content: item.fields.content,
                gambar: item.fields.gambar
            } : item;

            // Create the image element only if an image exists
            const imageHTML = profile.gambar
                ? `<img
                       src="./media/${profile.gambar}"
                       class="card-img-top profile-image"
                       alt="${escapeHTML(profile.title)}"
                   >`
                : "";

            // Show only the first four words
            const preview = (profile.content || "")
                .split(/\s+/)
                .slice(0, 4)
                .join(" ");

            const card = `
                <div class="col-md-4 mb-4" data-aos="fade-up">
                    <div class="card h-100 shadow-sm border-0">

                        ${imageHTML}

                        <div class="card-body d-flex flex-column">

                            <h5 class="card-title">
                                ${escapeHTML(profile.title)}
                            </h5>

                            <p class="card-text text-muted">
                                ${escapeHTML(preview)}...
                            </p>

                            <div class="mt-auto">
                                <a
                                    href="./detail.html?id=${encodeURIComponent(profile.id)}"
                                    class="btn btn-dark w-100"
                                >
                                    Lihat Detail
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += card;
        });

        if (profiles.length === 0) {
            container.innerHTML = "<p class='text-center'>No profiles found.</p>";
        }

        // Start animations after the cards are rendered
        AOS.init({
            duration: 900,
            once: true
        });

    } catch (error) {
        console.error(error);
        container.innerHTML =
            "<p class='text-center'>Unable to load profiles. Check your JSON file.</p>";
    }

});

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character];
    });
}
