let clothes = [];
let saved = [];
let current = null;
// ADD CLOTHES
function addItem() {
    const name = document.getElementById("name").value.trim();
    if (name === "") {
        alert("Enter clothing item");
        return;
    }
    clothes.push({
        name: name,
        type: document.getElementById("type").value,
        style: document.getElementById("style").value
    });
    document.getElementById("name").value = "";
    render();
}
// SHOW ITEMS
function render() {
    const cards = document.getElementById("cards");

    cards.innerHTML = "";

    clothes.forEach((item, index) => {
        cards.innerHTML += `
        <div class="card">

            <h3>${item.name}</h3>

            <p>
                Type: ${item.type}
            </p>

            <p>
                Style: ${item.style}
            </p>

            <button onclick="removeItem(${index})">
                Delete
            </button>

        </div>
        `;
    });
}
// DELETE
function removeItem(index) {
    clothes.splice(index, 1);
    render();
}
// SUGGEST
function suggest() {
    const tops =
        clothes.filter(x => x.type === "Top");
    const bottoms =
        clothes.filter(x => x.type === "Bottom");
    let matches = [];
    tops.forEach(top => {
        bottoms.forEach(bottom => {
            if (top.style === bottom.style) {
                matches.push({
                    top,
                    bottom
                });
            }
        });
    });
    if (matches.length === 0) {
        document.getElementById("result").innerHTML = `
            <h2>No Combination Found</h2>
            <p>
                Try adding items with matching styles.
            </p>
        `;
        return;
    }
    current =matches[Math.floor(Math.random() * matches.length)];
    document.getElementById("result").innerHTML = `
        <h2>Suggested Outfit</h2>
        <p>${current.top.name}</p>
        +
        <p>${current.bottom.name}</p>
        <p>
            Style: ${current.top.style}
        </p>
        <button onclick="saveOutfit()">
            Save Outfit
        </button>
    `;
}
// SAVE
function saveOutfit() {
    if (!current)
        return;
    const exists =
        saved.some(x =>
            x.top.name === current.top.name &&
            x.bottom.name === current.bottom.name
        );
    if (exists) {
        alert("Already Saved");
        return;
    }
    saved.push(current);
    showSaved();
}
// SHOW SAVED

function showSaved(){

    const box =
        document.getElementById(
            "saved"
        );

    if(!box)
        return;

    if(saved.length===0){

        box.innerHTML="";

        return;

    }

    box.innerHTML=
    `
    <h2
    style="
    grid-column:1/-1;
    text-align:center;
    margin-bottom:20px;
    font-size:36px;
    "
    >

    Saved Outfits

    </h2>
    `;

    saved.forEach(x=>{

        box.innerHTML+=
        `
        <div class="card">

            <h3>
            ${x.top.name}
            </h3>

            +

            <h3>
            ${x.bottom.name}
            </h3>

            <p>
            Style:
            ${x.top.style}
            </p>

        </div>
        `;

    });

}
// CLEAR
function clearAll() {
    clothes = [];
    saved = [];
    current = null;
    render();
    showSaved();
    document.getElementById("result").innerHTML =
        "Add clothes first";

}
