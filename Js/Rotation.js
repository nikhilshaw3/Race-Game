//Terrain Rotation
AFRAME.registerComponent("terrain-rotation-reader", {
    schema: {
      speedOfRotation: { type: "number", default: 0 },
    },
    init: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          if (this.data.speedOfRotation < 0.1) {
            this.data.speedOfRotation -= 0.01;
            console.log(this.data.speedOfRotation)
          }
        }
        if (e.key === "ArrowLeft") {
          if (this.data.speedOfRotation > -0.1) {
            this.data.speedOfRotation += 0.01;
            console.log(this.data.speedOfRotation)
          }
        }
      });
    },
    tick: function () {
      var mapRotation = this.el.getAttribute("rotation");
  
      mapRotation.y += this.data.speedOfRotation;
  
      this.el.setAttribute("rotation", {
        x: mapRotation.x,
        y: mapRotation.y,
        z: mapRotation.z,
      });
    },
  });
  
  //car rotation component
  AFRAME.registerComponent("car-rotation-reader", {
    schema: {
      speedOfRotation: { type: "number", default: 0 },
      speedOfAscent: { type: "number", default: 0 },
    },
    init: function () {
      window.addEventListener("keydown", (e) => {
        //get the data from the attributes
        this.data.speedOfRotation = this.el.getAttribute("rotation");
        this.data.speedOfAscent = this.el.getAttribute("position");
  
        var carRotation = this.data.speedOfRotation;
        var carPosition = this.data.speedOfAscent;
  
        //control the attributes with the Arrow Keys
        if (e.key === "ArrowRight") {
          carRotation.x += 0.5;
        }
        if (e.key === "ArrowLeft") {
       
            carRotation.x -= 0.5;
          
          
        }
        if (e.key === "ArrowUp") {
          if (carRotation.z < 20) {
            carRotation.z += 0.5;
            this.el.setAttribute("rotation", carRotation);
          }
          if (carPosition.y < 2) {
            carPosition.y += 0.01;
            this.el.setAttribute("position", carPosition);
          }
        }
        if (e.key === "ArrowDown") {
          if (carRotation.z > -10) {
            carRotation.z -= 0.5;
            this.el.setAttribute("rotation", carRotation);
          }
          if (carPosition.y > -2) {
            carPosition.y -= 0.01;
            this.el.setAttribute("position", carPosition);
          }
        }
      });
    },
  });
  