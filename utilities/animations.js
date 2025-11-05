document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable);
    

    resetGuessBox = function resetGuessBoxPosition(wContainer){
        gsap.set(box, {
            x: window.innerWidth / 2 - 25,
            y: container.getBoundingClientRect().y - 50
        });
        
        if(wContainer){
            gsap.set("#boxContainer", {
                x: window.innerWidth / 2 - 25,
                y: container.getBoundingClientRect().y - 50
            });
        }
    }
    
    document.getElementById("box").style.visibility = "visible";
    document.getElementById("boxContainer").style.visibility = "visible";
    
    Draggable.create(box, {
        type: "x,y",
        inertia: true,
        bounds: document.getElementsByTagName("body")[0],
        liveSnap: {
            points: function (point) {
                buttonState(false);
                
                for(const p of boxes){
                    const dx = point.x - p.x;
                    const dy = point.y - p.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 30) {
                        snapTo = [p.x, p.y];
                        return point;
                    }
                }
                snapTo = null;
                return point;
            }
        },
        onDragEnd: function(){
            if(snapTo){
                gsap.to("#box", {
                    x: snapTo[0],
                    y: snapTo[1],
                    delay: 0.2,
                    ease: "power2.inOut"
                });
                
                setTimeout(() => {buttonState(true); playBoxSnapSound();}, 400);
            }else{
                buttonState(false);
            }
        }
    });
});
