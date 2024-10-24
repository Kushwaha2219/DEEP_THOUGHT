const togglePanelButton = document.querySelector('.panelHead i');
const sidePanel = document.querySelector('.leftPanel');
const listContainer = document.querySelector('#ul');
const firstItem = document.querySelector('.one');

// Initial Page Load Animations
function animatePanelsOnLoad() {
    gsap.from(sidePanel, {
        delay: 0.5,
        x: -120,
        duration: 0.4,
    });

    gsap.from(".rightPanel", {
        delay: 0.5,
        x: 110,
        duration: 0.4,
    });

    gsap.from(".Explore , .Technical, .card", {
        delay: 0.3,
        scale: 0.92,
        duration: 0.45,
        opacity: 0,
        zIndex: 6,
    });

    gsap.from(".navItems li", {
        delay: 0.25,
        y: -60,
        duration: 0.75,
        opacity: 0,
        stagger: 0.15,
        ease: "elastic.out(0.5,0.6)"
    });
}
animatePanelsOnLoad();

// Handle Side Panel Toggle
const timeline = gsap.timeline({ paused: true });
togglePanelButton.addEventListener('click', () => {
    if (togglePanelButton.className === "ri-arrow-right-circle-fill") {
        listContainer.style.opacity = 1;
        firstItem.style.opacity = 0;
        togglePanelButton.classList.replace("ri-arrow-right-circle-fill", "ri-arrow-left-circle-fill");

        // Panel open animation
        timeline.to(sidePanel, {
            left: 0,
            duration: 0.35
        });

        timeline.from("#ulbody li", {
            x: -110,
            duration: 0.25,
            stagger: 0.15,
            opacity: 0
        });
    } else {
        firstItem.style.opacity = 1;
        togglePanelButton.classList.replace("ri-arrow-left-circle-fill", "ri-arrow-right-circle-fill");

        // Panel close animation
        timeline.to(listContainer, {
            x: -10,
            opacity: 0,
            duration: 0.35,
        });

        timeline.to(sidePanel, {
            left: -300,
            duration: 0.35,
        });
    }
});

togglePanelButton.addEventListener("click", () => {
    timeline.play();
});

// Fetch and Display JSON Data
const jsonURL = 'project.json';
function loadJSONData() {
    const cardIds = [18882, 18883, 18884, 18885, 18886];

    fetch(jsonURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            const taskData = jsonData.tasks[0];
            taskData.assets.forEach(asset => {
                console.log("Credits: https://www.linkedin.com/in/vishalkumarkushwaha/");
                cardIds.forEach(cardId => {
                    const cardElement = document.getElementById(`${cardId}`);

                    if (cardElement.id == taskData.task_id) {
                        cardElement.children[0].innerHTML = `<h3>${taskData.task_title}</h3>`;
                        document.querySelector('#panelBodyTitle').innerHTML = `${taskData.task_title}`;
                        cardElement.children[1].innerHTML = `<p>${taskData.task_description.replace(/\r\n/g, '')}</p>`;
                    }

                    if (cardElement.id == asset.asset_id) {
                        cardElement.children[0].innerHTML = `<h2>${asset.asset_title}</h2> <i class="ri-information-2-fill"></i>`;
                        document.getElementById(`J${cardId}`).innerHTML = `${asset.asset_title}`;
                        cardElement.children[1].innerHTML = `<p><span class="bold">Details:</span> ${asset.asset_description.replace(/\r\n/g, '')}</p>`;
                    }
                });
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}
loadJSONData();
