var socket = io();
var token;
// const socket = io.connect("http://localhost:1337", {
//   query: "2b5b93233ca154bc4359d3ac83d1a64f",
// });

// listen for event name 'hello' & log it
socket.on("hello", (res) => {
  var respond = JSON.parse(res);
  token = respond.jwtToken;
});

socket.on("newOrder", (res) => {
  changeNav(0);
  document.getElementById("ring").play();
});

function changeNav(n) {
  const navs = document.getElementsByClassName("nav");
  // document.getElementsByClassName("nav")
  for (let i = 0; i < navs.length; i++) {
    const element = navs[i];
    element.classList.remove("selected");
  }
  document.getElementsByClassName("nav")[n].classList.add("selected");
  if (n == 0) {
    getOrders();
  } else if (n == 1) {
    getInProcess();
  } else if (n == 2) {
    getFinished();
  }
}
fetch("/api/checkAuth", {
  method: "GET",
  withCredentials: true,
  credentials: "include",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  },
})
  .then((res) => res.json())
  .then((json) => {
    if (json.data.verified == true) {
      mainFunction();
    }
  })
  .catch((err) => {
    console.log(err);
    handleUnAuth();
  });
function getFinished() {
  document.getElementsByClassName("order-containner")[0].innerHTML = "";
  fetch("/api/orders?sort[0]=updatedAt%3Adesc", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      json.data.map((data) => {
        if (data.attributes.hasFinished == false) return;
        document.getElementsByClassName("order-containner")[0].innerHTML += `
        <div class="order hasFinished">
        <div class="dishes">
        ${data.attributes.Dishes.data.map((dish) => {
          return `
          <div class="dish-card">

          <div class="dish-title">${dish.title}</div>
          <div class="dish-quantity">${dish.quantity}</div>
        </div>
          `;
        })}
          
        </div>
        <div class="customer-info">
          <div class="cus">Customer-Info</div>
          <div class="cus-name">Name: ${
            data.attributes.FirstName + " " + data.attributes.LastName
          }</div>
          <div class="cus-name">Address: ${data.attributes.Location}</div> 
          <div class="cus-phone">Ph-No.:${data.attributes.PhoneNumber}</div>
          <div class="cus-location">
          <iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
            data.attributes.Lng
          }%2C${data.attributes.Lat}%2C${data.attributes.Lng}%2C${
          data.attributes.Lat
        }&amp;layer=transportmap&amp;marker=${data.attributes.Lat}%2C${
          data.attributes.Lng
        }" style="border: 1px solid black"></iframe>
          </div>
          <div class="but-containner">
            <button class="button cancel" onClick="cancelMe(${
              data.id
            })">Remove</button>
          </div>
        </div>
      </div>
        `;
      });
    });
}
function getInProcess() {
  document.getElementsByClassName("order-containner")[0].innerHTML = "";
  fetch("/api/orders?sort[0]=updatedAt%3Adesc", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      json.data.map((data) => {
        if (
          data.attributes.inProcess == false ||
          data.attributes.hasFinished == true
        )
          return;
        document.getElementsByClassName("order-containner")[0].innerHTML += `
        <div class="order inProcess">
        <div class="dishes">
        ${data.attributes.Dishes.data.map((dish) => {
          return `
          <div class="dish-card">

          <div class="dish-title">${dish.title}</div>
          <div class="dish-quantity">${dish.quantity}</div>
        </div>
          `;
        })}
          
        </div>
        <div class="customer-info">
          <div class="cus">Customer-Info</div>
          <div class="cus-name">Name: ${
            data.attributes.FirstName + " " + data.attributes.LastName
          }</div>
          <div class="cus-name">Address: ${data.attributes.Location}</div> 
          <div class="cus-phone">Ph-No.: ${data.attributes.PhoneNumber}</div>
          <div class="cus-location">
          <iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
            data.attributes.Lng
          }%2C${data.attributes.Lat}%2C${data.attributes.Lng}%2C${
          data.attributes.Lat
        }&amp;layer=transportmap&amp;marker=${data.attributes.Lat}%2C${
          data.attributes.Lng
        }" style="border: 1px solid black"></iframe>
          </div>
          <div class="but-containner">
          <button class="button finish" onClick="finishMe(${
            data.id
          })">Finish</button>
            <button class="button cancel" onClick="cancelMe(${
              data.id
            })">Cancel</button>
          </div>
        </div>
      </div>
        `;
      });
    });
}
function getOrders() {
  document.getElementsByClassName("order-containner")[0].innerHTML = "";
  fetch("/api/orders?sort[0]=updatedAt%3Adesc", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      json.data.map((data) => {
        if (
          data.attributes.inProcess == true ||
          data.attributes.hasFinished == true
        )
          return;
        document.getElementsByClassName("order-containner")[0].innerHTML += `
        <div class="order ">
        <div class="dishes">
        ${data.attributes.Dishes.data.map((dish) => {
          return `
          <div class="dish-card">
          <div class="dish-title">${dish.title}</div>
          <div class="dish-quantity">${dish.quantity}</div>
        </div>
          `;
        })}
          
        </div>
        <div class="customer-info">
          <div class="cus">Customer-Info</div>
          <div class="cus-name">Name: ${
            data.attributes.FirstName + " " + data.attributes.LastName
          }</div>
          <div class="cus-name">Address: ${data.attributes.Location}</div> 
          <div class="cus-phone">Ph-No.:${data.attributes.PhoneNumber}</div>
          <div class="cus-location">
          <iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${
            data.attributes.Lng
          }%2C${data.attributes.Lat}%2C${data.attributes.Lng}%2C${
          data.attributes.Lat
        }&amp;layer=transportmap&amp;marker=${data.attributes.Lat}%2C${
          data.attributes.Lng
        }" style="border: 1px solid black"></iframe>
          </div>
          <div class="but-containner">
            <button class="button" onClick="processMe(${
              data.id
            })">Process</button>
            <button class="button cancel" onClick="cancelMe(${
              data.id
            })">Cancel</button>
          </div>
        </div>
      </div>
        `;
      });
    });
}
function handleUnAuth() {
  document.location.pathname = "/admin/auth/login";
}

function processMe(id) {
  if (confirm("Process this order?") == false) return;
  fetch(`/api/orders/${id}`, {
    method: "PUT",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        inProcess: "true",
      },
    }),
  }).then(() => {
    getOrders();
  });
}
function finishMe(id) {
  if (confirm("Finish this order?") == false) return;
  fetch(`/api/orders/${id}`, {
    method: "PUT",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        inProcess: "false",
        hasFinished: "true",
      },
    }),
  }).then(() => {
    getInProcess();
  });
}
function cancelMe(id) {
  if (confirm("Are you sure you want to DELETE this Order?") == false) return;
  fetch(`/api/orders/${id}`, {
    method: "DELETE",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(() => {
    document.location.reload();
  });
}

function mainFunction() {
  getOrders();
}
