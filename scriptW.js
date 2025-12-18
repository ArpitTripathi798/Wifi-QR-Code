function generate(){
  let ssid = document.getElementById("ssid").value.trim();
  let pass = document.getElementById("password").value;
  let sec  = document.getElementById("security").value;

  if(ssid === ""){
    alert("Wi-Fi name required");
    return;
  }

  document.getElementById("showSsid").innerText = ssid;

  document.getElementById("showPass").innerText =
    pass ? "••••••" : "None";
  document.getElementById("showPass").dataset.hidden = "true";

  let data = `WIFI:T:${sec};S:${ssid};P:${pass};;`;

  let qrImg = document.getElementById("qr");
  qrImg.crossOrigin = "anonymous";
  qrImg.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data="
    + encodeURIComponent(data)
    + "&_=" + new Date().getTime();

  document.getElementById("card").style.display = "block";
}

function togglePassword(){
  let passSpan = document.getElementById("showPass");
  let pass = document.getElementById("password").value;

  if(!pass) return;

  if(passSpan.dataset.hidden === "true"){
    passSpan.innerText = pass;
    passSpan.dataset.hidden = "false";
  } else {
    passSpan.innerText = "••••••";
    passSpan.dataset.hidden = "true";
  }
}

function downloadPNG(){
  const card = document.getElementById("card");

  html2canvas(card, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null
  }).then(canvas => {
    let link = document.createElement("a");
    link.download = "wifi-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}


