(()=>{"use strict";class t{constructor(t){this._handlers=[],this.name=t}raise=t=>this._handlers.forEach((e=>e(t)));addHandler=t=>this._handlers.push(t);removeHandler(t){const{_handlers:e}=this;e.forEach((a=>{a===t&&e.splice(e.indexOf(a),1)}))}}const e=(()=>{const e=[],a=a=>{let s=e.filter((t=>t.name===a))[0];return s||(s=new t(a),e.push(s)),s};return{subscribe:(t,e)=>a(t).addHandler(e),publish:(t,e)=>a(t).raise(e),unsubscribe:(t,e)=>{a(t).removeHandler(e)}}})(),a={createElement(t){const{tagName:e,className:a,id:s,innerHTML:r,attributes:n,text:i,children:o}=t,c=document.createElement(e);return a&&(c.className=a),s&&(c.id=s),o?c.append(...o):i?c.textContent=i:r&&(c.innerHTML=r),n&&Object.keys(n).forEach((t=>{c.setAttribute(t,n[t])})),c}},s=function(t,a){t.addEventListener("click",(t=>{e.publish(a,t)}))},r=(()=>{const t=a.createElement({tagName:"p",className:"board-title",text:"Your Board"}),e=a.createElement({tagName:"p",className:"board-title",text:"Opponent's Board"}),r=a.createElement({tagName:"div",className:"computer board-wrapper",children:[e]}),n=a.createElement({tagName:"div",className:"player board-wrapper",children:[t]}),i=a.createElement({tagName:"button",className:"btn reset-btn",text:"Reset"});s(i,"reset-button-clicked");const o=a.createElement({tagName:"div",className:"buttons-wrapper",children:[i]}),c=a.createElement({tagName:"div",className:"main-body",children:[n,r]}),l=a.createElement({tagName:"div",className:"main-container",children:[c,o]});return()=>l})(),n=(()=>{const t=a.createElement({tagName:"span"}),e=a.createElement({tagName:"h1",text:"Battleship"}),s=a.createElement({tagName:"header",className:"main-header",children:[e,t]});return()=>s})(),i=(()=>{const t=a.createElement({tagName:"a",className:"repo-link",text:"GitHub Repo",attributes:{href:"https://github.com/szmazhr/battleship"}}),e=a.createElement({tagName:"div",className:"footer-right",children:[t]}),s=a.createElement({tagName:"a",className:"profile-link",text:"Shahzar Mazhar",attributes:{href:"https://github.com/szmazhr/"}}),r=a.createElement({tagName:"span",text:"Made with ♥ by "}),n=a.createElement({tagName:"div",className:"footer-left",children:[r,s]}),i=a.createElement({tagName:"footer",className:"main-footer",children:[n,e]});return()=>i})(),o=(()=>{const t=n(),e=r(),s=i(),o=a.createElement({tagName:"div",className:"main-content",children:[t,e,s]});return()=>o})(),c=(()=>{const t=a.createElement({tagName:"button",className:"start-btn",text:"Start"});s(t,"start-button-clicked");const e=a.createElement({tagName:"div",className:"start-page-body",children:[t]}),r=a.createElement({tagName:"h1",className:"start-page-header",text:"Welcome to the BattleShip!"}),n=a.createElement({tagName:"div",className:"start-page-content",children:[r,e]}),i=a.createElement({tagName:"div",className:"start-page-box",children:[n]}),o=a.createElement({tagName:"div",className:"start-page-container shown",children:[i]});return()=>o})(),l=function(){const t=11,e=a.createElement({tagName:"div",className:"board"});for(let s=0;s<121;s++){const r=a.createElement({tagName:"div",className:"box",text:s%t==0?s/t:0===Math.floor(s/t)?String.fromCharCode(64+s%t):"",attributes:{"data-row":s%t-1,"data-col":Math.floor(s/t)-1}});e.appendChild(r)}return e};function d(t=Number,e=0){return Math.floor(Math.random()*(t-e+1)+e)}function h(t){let e=t();for(;!e;)e=t()}function u(t){this.length=t,this.hits=[]}Object.assign(u.prototype,{hit:function(t){-1===this.hits.indexOf(t)&&this.hits.push(t)},isSunk:function(){return this.hits.length===this.length}});const m=u;function p(t,e){const a=[];for(let s=0;s<e;s++){a.push([]);for(let e=0;e<t;e++)a[s].push(0)}return a}function b(t,e){this.board=p(t,e),this.trackShot=p(t,e),this.ships=[]}Object.assign(b.prototype,{addShip:function(t,e,a,s){if(!this.isValidCell(e,a))return!1;let r=e,n=a;if("y"===s){if(n+t>this.board.length&&(n=this.board.length-t),!this.isPlacementPossible(r,n,t,s))return!1;for(let e=0;e<t;e++)this.board[n+e][r]=1}else if("x"===s){if(r+t>this.board[n].length&&(r=this.board[n].length-t),!this.isPlacementPossible(r,n,t,s))return!1;for(let e=0;e<t;e++)this.board[n][r+e]=1}const i={ship:new m(t),cX:r,cY:n,axis:s,reported:!1};return this.ships.push(i),!0},isCellEmpty:function(t,e){return 0===this.board[e][t]},receiveAttack:function(t,a){return!!this.isValidCell(t,a)&&0===this.trackShot[a][t]&&(1===this.board[a][t]?(this.board[a][t]=2,this.recordHit(t,a),this.ships.forEach((s=>{const r="y"===s.axis?s.cY:s.cX,n="y"===s.axis?s.cX:s.cY,i="y"===s.axis?a:t,o="y"===s.axis?t:a,c=r+s.ship.length-1;r<=i&&i<=c&&n===o&&s.ship.hit(i-r),e.publish("hit",{x:t,y:a})}))):(this.trackShot[a][t]=1,e.publish("miss",{x:t,y:a})),!0)},isValidCell:function(t,e){return t>=0&&t<10&&e>=0&&e<10},isPlacementPossible:function(t,e,a,s){let r=!0;const n="y"===s?e:t,i="y"===s?e+a:t+a;return[-1,0,1].forEach((a=>{for(let o=n-1;o<i+1;o++){const n="y"===s?t+a:o,i="y"===s?o:e+a;this.isValidCell(n,i)&&!this.isCellEmpty(n,i)&&(r=!1)}})),r},recordHit:function(t,a){return!!this.isValidCell(t,a)&&(this.trackShot[a][t]=2,[a-1,a+1].forEach((a=>{[t-1,t+1].forEach((t=>{t>=0&&t<10&&a>=0&&a<10&&this.isValidCell(t,a)&&0===this.trackShot[a][t]&&(this.trackShot[a][t]=-1,e.publish("miss-auto",{x:t,y:a}))}))})),!0)},isGameOver:function(){return this.ships.every((t=>t.ship.isSunk()))}});const f=b;function g(t,e=!1){this.name=t,this.isComputer=e,this.board=new f(10,10),e&&(this.aiMove=function(){h((()=>this.attack(d(10),d(10))))})}Object.assign(g.prototype,{addOpponent:function(t){this.opponent=t},attack:function(t,e){return this.opponent.board.receiveAttack(t,e)}});const y=g;let N,v;const E={turn:1};function x(){N=new y("Human"),v=new y("Computer",!0),N.addOpponent(v),v.addOpponent(N);const t=[4,3,3,2,2,2,1,1,1,1];[N,v].forEach((e=>{t.forEach((t=>{h((()=>e.board.addShip(t,d(9),d(9),d(1)?"x":"y")))}))})),e.publish("player-initialized",{player1:N,player2:v})}function S(){const t=0===E.turn?N:v,a=1===E.turn?N:v;document.querySelector(".main-content").className=1===E.turn?"main-content your-turn":"main-content opponent-turn",t.board.ships.forEach((a=>{a.ship.isSunk()&&!a.reported&&(e.publish("ship-sunk",{board:t.board,ship:a}),a.reported=!0)})),t.board.isGameOver()?e.publish("game-over"):a.isComputer&&setTimeout((()=>{a.aiMove(),S()}),d(1500,500))}const w=function(){const t=a.createElement({tagName:"div",className:"alive-indicator"});return[4,3,3,2,2,2,1,1,1,1].forEach((e=>{const s=a.createElement({tagName:"div",className:"ship",attributes:{"data-length":e,"data-alive":!0}});for(let t=0;t<e;t++){const t=a.createElement({tagName:"div",className:"ship-part"});s.appendChild(t)}t.appendChild(s)})),t};e.subscribe("startApp",(function(){const t=document.querySelector("#container"),e=c(),a=o();t.append(e,a)})),e.subscribe("start-button-clicked",(function(){const t=document.querySelector(".start-page-container");t.classList.remove("shown"),t.classList.add("showing"),setTimeout((()=>{t.classList.remove("showing"),t.remove()}),300),e.publish("game-started")})),e.subscribe("game-started",x),e.subscribe("player-initialized",(({player1:t})=>{!function(t){const e=document.querySelector(".player.board-wrapper"),a=e.querySelector(".board"),s=e.querySelector(".alive-indicator");a&&a.remove(),s&&s.remove();const r=l(),n=w();e.append(r,n),t.board.ships.forEach((t=>{const{axis:e,cX:a,cY:s}=t,{length:r}=t.ship;for(let t=0;t<r;t++){const n="y"===e?a:a+t,i="y"===e?s+t:s,o=document.querySelector(`.player [data-row="${n}"][data-col="${i}"]`);0===t&&o.classList.add("ship_start"),"y"===e&&o.classList.add("ship_v"),"x"===e&&o.classList.add("ship_h"),t===r-1&&o.classList.add("ship_end")}}))}(t),function(){const t=document.querySelector(".computer.board-wrapper"),e=t.querySelector(".board"),a=t.querySelector(".alive-indicator");e&&e.remove(),a&&a.remove();const r=l(),n=w();t.append(r,n),r.querySelectorAll(".box").forEach((t=>{"-1"!==t.dataset.row&&"-1"!==t.dataset.col&&s(t,"player-made-move")}))}(),S()})),e.subscribe("reset-button-clicked",x),e.subscribe("player-made-move",(t=>{var e,a;e=+t.target.dataset.row,a=+t.target.dataset.col,N.attack(e,a),S()})),e.subscribe("opponent-mode-move",(()=>{})),e.subscribe("hit",(t=>{const e=0===E.turn?"player":"computer",{x:a,y:s}=t;document.querySelector(`.${e} [data-row="${a}"][data-col="${s}"]`).classList.add("hit")})),e.subscribe("miss",(t=>{const e=0===E.turn?"player":"computer",{x:a,y:s}=t;document.querySelector(`.${e} [data-row="${a}"][data-col="${s}"]`).classList.add("missed"),E.turn=0===E.turn?1:0})),e.subscribe("miss-auto",(t=>{const e=0===E.turn?"player":"computer",{x:a,y:s}=t,r=document.querySelector(`.${e} [data-row="${a}"][data-col="${s}"]`);r.classList.add("missed"),r.classList.add("auto")})),e.subscribe("ship-sunk",(t=>{!function(t){const{length:e}=t,a=0===E.turn?"player":"computer";document.querySelector(`.${a}.board-wrapper .ship[data-length="${e}"][data-alive="true"]`).dataset.alive="false"}(t.ship.ship),function(t,a){const{cX:s,cY:r,axis:n}=t,{length:i}=t.ship,o="y"===n?r:s,c="y"===n?r+i:s+i;[-1,0,1].forEach((t=>{for(let i=o-1;i<c+1;i++){const o="y"===n?s+t:i,c="y"===n?i:r+t;a.isValidCell(o,c)&&0===a.trackShot[c][o]&&(a.trackShot[c][o]=-1,e.publish("miss-auto",{x:o,y:c}))}}))}(t.ship,t.board)})),e.subscribe("game-over",(function(){const t=document.querySelector("#container"),a=c(),s=a.querySelector(".start-page-header"),r=a.querySelector(".start-btn");s.textContent=1===E.turn?"You won!":"You lost!",r.textContent="Play Again",t.append(a),a.classList.add("showing"),setTimeout((()=>{a.classList.remove("showing"),a.classList.add("shown")}),0),e.publish("game-ended")})),e.publish("startApp")})();