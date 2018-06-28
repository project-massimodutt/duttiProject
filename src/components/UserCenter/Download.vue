<template>
  <div class="wrapssss">
    <my-head></my-head>
    <h1 class="gagagaga">HELLO WORLD!!</h1>
  </div>
</template>

<script>
  import MyHead from "../MyHead/MyHead";
  
  export default {
    name: "Download",
    components: {
      MyHead
    },
    mounted() {
      let click_cnt = 0;
      let $html = document.getElementsByTagName("html")[0];
      let $body = document.getElementsByTagName("body")[0];
      let h1 = document.getElementsByTagName("h1")[0];
      
      function getColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
      }
      
      
      $html.onclick = function (e) {
        let $elem = document.createElement("b");
        $elem.style.color = getColor();
        $elem.style.zIndex = 9999;
        $elem.style.position = "absolute";
        $elem.style.fontSize = Math.random() * 10 + 18 + "px";
        $elem.style.transition = "color 1s linear";
        let x = e.pageX;
        let y = e.pageY;
        $elem.style.left = (x - 10) + "px";
        $elem.style.top = (y - 20) + "px";
        let anim;
        clearInterval(anim);
        click_cnt++;
        switch (true) {
          case click_cnt <= 10:
            $elem.innerText = "OωO";
            break;
          case click_cnt <= 20:
            $elem.innerText = "(๑•́ ∀ •̀๑)";
            break;
          case click_cnt <= 30:
            $elem.innerText = "(๑•́ ₃ •̀๑)";
            break;
          case click_cnt <= 40:
            $elem.innerText = "(๑•̀_•́๑)";
            break;
          case click_cnt <= 50:
            $elem.innerText = "（￣へ￣）";
            break;
          case click_cnt <= 60:
            $elem.innerText = "(╯°口°)╯(┴—┴";
            break;
          case click_cnt <= 70:
            $elem.innerText = "૮( ᵒ̌皿ᵒ̌ )ა";
            break;
          case click_cnt <= 80:
            $elem.innerText = "╮(｡>口<｡)╭";
            break;
          case click_cnt <= 90:
            $elem.innerText = "( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃";
            break;
          case click_cnt <= 100:
            $elem.innerText = "(ꐦ°᷄д°᷅)";
            break;
          default:
            $elem.innerText = "❤";
            break;
        }
        
        let increase = 0;
        setTimeout(function () {
          anim = setInterval(function () {
            if (++increase == 150) {
              clearInterval(anim);
              $body.removeChild($elem);
            }
            $elem.style.top = y - 20 - increase + "px";
            $elem.style.opacity = (150 - increase) / 120;
          }, 8);
        }, 70);
        $body.appendChild($elem);
      };
      
      setInterval(function () {
        h1.style.color = getColor();
      }, 1000)
    }
  }
</script>

<style lang="less">
  .wrapssss {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: radial-gradient(circle, #fbc2eb 0%, #a6c1ee 100%);
  }
  
  .gagagaga {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 60px;
    font-size: 100px;
    line-height: 100px;
    text-align: center;
    transition: color 1s linear;
  }
</style>
