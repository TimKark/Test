
// Get the profile ID from the URL
const params = new URLSearchParams(window.location.search);
const profileId = params.get("id");

// Find the HTML element where the profile will appear
const detailContainer = document.getElementById("profile-detail");

// Load profile data from JSON
fetch("./data/profiles.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load profiles.json");
        }
        return response.json();
    })
    .then(profiles => {

        // Find the profile matching the ID
        const selectedProfile = profiles.find(
            profile => String(profile.pk) === String(profileId)
        );

        // If the profile doesn't exist
        if (!selectedProfile) {
            detailContainer.innerHTML = "<h2>Profile not found</h2>";
            return;
        }

        // Extract profile information
        const title = selectedProfile.fields.title;
        const content = selectedProfile.fields.content;
        const gambar = selectedProfile.fields.gambar;

        // Display the profile
        detailContainer.innerHTML = `
            <div class="card shadow">
                ${gambar ? `
                    <img src="./media/${gambar}"
                         class="card-img-top"
                         style="max-height:400px; object-fit:cover;">
                ` : ""}

                <div class="card-body">
                    <h2>${title}</h2>
                    <p class="text-muted">${content}</p>
                </div>
            </div>
        `;
    })
    .catch(error => {
        console.error("Error:", error);
        detailContainer.innerHTML =
            "<p>Something went wrong loading this profile.</p>";
    });
