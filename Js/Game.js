AFRAME.registerComponent("game-play",{
    schema:{
        elementId:{type:"string",default:"#ring1"}
    },
    isCollided:function(elementId){
        const element = document.querySelector(elementId)
        element.addEventListener("collide",e=>{
            if(elementId.includes("#ring")){
                console.log(elementId+ " collision")
                element.setAttribute("visible",false)
                this.updateScore()
                this.updateTargets()
            }else{
                this.gameOver()
            }
            
        })
    },
    update:function(){
        this.isCollided(this.data.elementId)
    },
    init:function(){
        var duration = 300
        var timeEl = document.querySelector("#timer")
        this.startTimer(duration,timeEl)
    },
    startTimer:function(duration,timeEl){
        var minutes
        var seconds
   
        setInterval(() => {
          if(duration>=0)  {
            console.log(duration)
              minutes = parseInt(duration/60)
              seconds = parseInt(duration%60)
            
              if(minutes<10){
                  minutes = "0"+minutes
              }

              if(seconds<10){
                  seconds = "0"+seconds
              }
              
              timeEl.setAttribute("text",{value:minutes+":"+seconds})
              duration-=1

          }else{
              this.gameOver()
          }
        },1000);
    
    },
  updateTargets:function(){
      const Elements = document.querySelector("#target")
      var count = Elements.getAttribute("text").value
      let currentTargets = parseInt(count)
      currentTargets-=1
      Elements.setAttribute("text",{
          value:currentTargets
      })
  },

  updateScore:function(){
      const element = document.querySelector("#score")
    var count = element.getAttribute("text").value
    let currentScore = parseInt(count)
    currentScore+=50
    element.setAttribute("text",{
        value:currentScore
    })
  },

  gameOver:function(){
      var carEl = document.querySelector("#car_model")
      var element = document.querySelector("#gameOver")
      element.setAttribute("visible",true)
      carEl.setAttribute("dynamic-body",{mass:1})
  }

}
)