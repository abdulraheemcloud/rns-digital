function showPlan(plan){

let content = document.getElementById("plan-content");
let buttons = document.querySelectorAll(".tab-btn");

buttons.forEach(btn => btn.classList.remove("active"));
event.target.classList.add("active");

if(plan === "basic"){
content.className = "plan-box fade-in basic-style";
content.innerHTML = `
<h3>Basic Business Plan</h3>
<h2>₹4,999</h2>
<p>1st Year All-Inclusive</p>
<ul>
<li>✔ 1-Page Website</li>
<li>✔ WhatsApp Integration</li>
<li>✔ Contact Form</li>
<li>✔ Basic SEO Setup</li>
<li>✔ Google Business Setup</li>
<li>✔ 1-Year Domain Included</li>
<li>✔ Free Hosting Setup</li>
</ul>
`;
}else{
content.className = "plan-box fade-in growth-style";
content.innerHTML = `
<h3>Growth Business Plan</h3>
<h2>₹8,499</h2>
<p>1st Year All-Inclusive</p>
<ul>
<li>✔ 3–5 Page Professional Website</li>
<li>✔ Advanced SEO</li>
<li>✔ Local Keyword Optimization</li>
<li>✔ Google Business Optimization</li>
<li>✔ Lead Tracking Setup</li>
<li>✔ 1-Year Domain Included</li>
<li>✔ 30 Days Free Support</li>
</ul>
`;
}

}

showPlan('growth');