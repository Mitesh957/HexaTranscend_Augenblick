
function displayResources() {
    const resourceList = document.getElementById("resource-list");

    resources.forEach((resource) => {
        const resourceCard = document.createElement("div");
        resourceCard.classList.add("resource-card");

        const titleElement = document.createElement("div");
        titleElement.classList.add("resource-title");
        titleElement.textContent = resource.title;

        const descriptionElement = document.createElement("div");
        descriptionElement.classList.add("resource-description");
        descriptionElement.textContent = resource.description;

        resourceCard.appendChild(titleElement);
        resourceCard.appendChild(descriptionElement);

        resourceList.appendChild(resourceCard);
    });
}

displayResources();
