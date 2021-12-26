("use strict",
() => {
  const http = new XMLHttpRequest();
  const URL = "https://muhammadhassansiddique.github.io/delivery_tracker/data/data.json";

  let DATA = [];

  const tbody = $("#tbody");
  const inputRef = $("#trackerInput");
  const buttonRef = $("#trackerButton");
  const clearButtonRef = $("#clearButton");

  const tracking_number = $("#tracking_number");
  const tracking_origin = $("#tracking_origin");
  const tracking_destination = $("#tracking_destination");
  const tracking_shipment = $("#tracking_shipment");
  const tracking_description = $("#tracking_description");
  const tracking_items = $("#tracking_items");
  const tracking_weight = $("#tracking_weight");

  let number = undefined;

  http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      DATA = JSON.parse(this.responseText);
      renderTrackerIdList(DATA);
    }
  };

  http.open("GET", URL, true);
  http.send();

  function renderTrackerIdList(data) {
    let innnerHtml = "";

    data.forEach((d, i) => {
      innnerHtml += `<tr>
            <td>${i + 1}</td>
            <td>${d.id}</td>
            <td class="border-none">${d.description}</td>
        </tr>`;
    });

    tbody.html(innnerHtml);
  }

  inputRef.on("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    if (e.target.value) {
      number = parseInt(e.target.value, 10);
    }
  });

  buttonRef.on("click", async () => {
    if (number) {
      inputRef.val("");
      const data = DATA.find((e) => +e.id === number);

      if (!data) {
        alert("NO DATA FOUND");
        return;
      }

      tracking_number.html(data.id);
      tracking_origin.html(`${data.origin}, ${data.origin_country}`);
      tracking_destination.html(
        `${data.destination}, ${data.destination_country}`
      );
      tracking_shipment.html(data.type);
      tracking_description.html(data.description);
      tracking_items.html(data.items);
      tracking_weight.html(data.weight);
    }
  });

  clearButtonRef.on("click", () => {
    tracking_number.html("");
    tracking_origin.html("");
    tracking_destination.html("");
    tracking_shipment.html("");
    tracking_description.html("");
    tracking_items.html("");
    tracking_weight.html("");
  });
})();
