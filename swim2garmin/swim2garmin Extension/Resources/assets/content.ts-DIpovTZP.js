(function(){chrome.runtime.onMessage.addListener((e,s,t)=>{if(e.action==="getToken"){const n=localStorage.getItem("token"),{access_token:o}=JSON.parse(n??"{}");t({token:o})}});
//# sourceMappingURL=content.ts-DIpovTZP.js.map
})()
